isProduction = do ->
    process.env.NODE_ENV == 'production'

gulp = require 'gulp'
path = require 'path'

cfg =
    src: './src/'
    dist: './dist/'
    CDN: '//cdnst.icontinua.com'

# clean-css 配置
cssminConfig =
    keepSpecialComments: 0
    advanced: false
    aggressiveMerging: false

# autoprefixer 配置
autoPrefixConfig =
    browsers: ['android > 2', 'ios >= 6']
    cascade: true

# 使用webpack编译jsx
gulp.task 'jsx', (cb) ->
    webpack = require 'webpack'
    autoprefixer = require 'autoprefixer'

    plugins = [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
            'Promise': 'yaku'
        })
    ]

    if isProduction
        plugins = plugins.concat [
            new webpack.optimize.UglifyJsPlugin(), # uglify
        ]

    webpack
        entry:
            report: cfg.src + "jsx/report/index.jsx"
            app: cfg.src + "jsx/app/index.jsx"
            user: cfg.src + "jsx/user/index.jsx"
            libsheet: cfg.src + "jsx/libsheet/index.jsx"
            viewReport: cfg.src + "jsx/viewReport/index.jsx"
            login: cfg.src + "jsx/login/login.jsx"
            admin: cfg.src + "jsx/admin/index.jsx"
        output:
            filename: cfg.dist + 'js/[name].js'
        module:
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader?minimize!postcss-loader!'
                },
                {
                    test: /\.jsx?$/,
                    loader: 'babel',
                    query: {
                        cacheDirectory: '.cache',
                    }
                }
            ]
        postcss: -> [autoprefixer(autoPrefixConfig)]
        plugins: plugins
        externals:
            jquery: 'window.$'
            react: 'window.React'
            'react-dom': 'window.ReactDOM'
    , (err, stats) ->
        if err then throw err
        if not isProduction then console.log stats.toString colors: yes, chunks: no
        cb()

# 编译stylus, 压缩
gulp.task 'css', ->
    stylus = require 'gulp-stylus'
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-clean-css'
    nib = require 'nib'
    gulpif = require 'gulp-if'
    cssBase64 = require 'gulp-css-base64'

    gulp.src cfg.src + 'styl/*.styl'
    .pipe stylus(use: nib(), "include css": true)
    .pipe autoprefixer autoPrefixConfig
    .pipe cssBase64 baseDir: "./src/"
    .pipe gulpif isProduction, cssmin cssminConfig
    .pipe gulp.dest cfg.dist + 'css'

# 编译压缩ant-design的css
gulp.task '_antd_css', ->
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-clean-css'
    rename = require 'gulp-rename'


    gulp.src 'node_modules/antd/dist/antd.css'
    .pipe autoprefixer autoPrefixConfig
    .pipe cssmin cssminConfig
    .pipe rename 'antd.min.css'
    .pipe gulp.dest cfg.dist + 'css'

# 打包第三方js库
gulp.task 'lib_js', ['_antd_css'], (cb) ->
    webpack = require 'webpack'
    webpack
        entry:
            antd: cfg.src + "antd.js"
            echarts: cfg.src + "echarts.js"
        output:
            filename: cfg.dist + 'js/lib/[name].min.js'
        module:
            loaders: [{
                test: /\.js$/, loader: 'babel'
            }]
        plugins: do ->
            [new webpack.optimize.UglifyJsPlugin()]
        externals:
            jquery: 'window.$'
            react: 'window.React'
            'react-dom': 'window.ReactDOM'
    , (err, stats) ->
        if err then throw err
        if not isProduction then console.log stats.toString colors: yes, chunks: no
        cb()

# 编译html
gulp.task 'html', ->
    pug = require 'gulp-pug'
    replace = require 'gulp-replace'
    gulpif = require 'gulp-if'

    gulp.src [cfg.src + 'html/*.pug'], base: cfg.src + 'html'
    .pipe pug pretty: '    ', compileDebug: true
    .pipe gulpif isProduction, replace("_TIMESTAMP_", +new Date())
    .pipe gulpif isProduction, replace /((src|href|url)\s*=?\s*('|"|\()(\/)?((js)|(css)|(img)))\S*/g, (match)->
        match.replace(/\/?js/, cfg.CDN + '/js')
        .replace(/\/?css/, cfg.CDN + '/css')
        .replace(/\/?img/, cfg.CDN + '/img')
    .pipe gulpif isProduction, replace("react.js", "react.min.js")
    .pipe gulp.dest cfg.dist + 'html'

gulp.task 'copy', ->
    gulp.src [cfg.src + 'img/**', cfg.src + 'html/*.html'], base: cfg.src
    .pipe gulp.dest cfg.dist

gulp.task 'build', ['jsx', 'css', 'html', 'copy']
gulp.task 'default', ['build', 'lib_js']

gulp.task 'watch', ['build'], ->
    gulp.watch "./src/jsx/**", ["jsx"]
    gulp.watch "./src/styl/**", ["css"]
    gulp.watch "./src/html/**", ["html"]
