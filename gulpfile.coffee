isProduction = do ->
    process.env.NODE_ENV == 'production'

gulp = require 'gulp'
path = require 'path'

cfg =
    src: './src/'
    dist: './dist/'

cssminConfig =
    keepSpecialComments: 0
    advanced: false
    aggressiveMerging: false

autoPrefixConfig =
    browsers: ['android > 2', 'ios >= 6']
    cascade: true

gulp.task 'jsx', (cb) ->
    webpack = require 'webpack'

    plugins = [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
            'Promise1': 'yaku'
        })
    ]

    if isProduction
        plugins = plugins.concat [
            new webpack.optimize.UglifyJsPlugin(),
        ]

    webpack
        entry:
            main: cfg.src + "jsx/main.jsx"
        output:
            filename: cfg.dist + 'js/[name].js'
        module:
            loaders: [
                {
                    test: /\.jsx?$/, loader: 'babel'
                }
            ]
        plugins: plugins
        externals:
            jquery: 'window.$'
            react: 'window.React'
            'react-dom': 'window.ReactDOM'
    , (err, stats) ->
        if err then throw err
        if not isProduction then console.log stats.toString colors: yes, chunks: no
        cb()

gulp.task 'css', ->
    stylus = require 'gulp-stylus'
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-minify-css'
    nib = require 'nib'
    gulpif = require 'gulp-if'
    cssBase64 = require 'gulp-css-base64'

    gulp.src cfg.src + 'styl/*.styl'
    .pipe stylus(use: nib())
    .pipe autoprefixer autoPrefixConfig
    .pipe cssBase64 baseDir: "./src/"
    .pipe gulpif isProduction, cssmin cssminConfig
    .pipe gulp.dest cfg.dist + 'css'

gulp.task '_antd_css', ->
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-minify-css'
    rename = require 'gulp-rename'


    gulp.src 'node_modules/antd/lib/index.css'
    .pipe autoprefixer autoPrefixConfig
    .pipe cssmin cssminConfig
    .pipe rename 'antd.min.css'
    .pipe gulp.dest cfg.dist + 'css'

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
            if isProduction
                [new webpack.optimize.UglifyJsPlugin()]
            else
                null
        externals:
            jquery: 'window.$'
            react: 'window.React'
            'react-dom': 'window.ReactDOM'
    , (err, stats) ->
        if err then throw err
        if not isProduction then console.log stats.toString colors: yes, chunks: no
        cb()

gulp.task 'html', ->
    jade = require 'gulp-jade'
    replace = require 'gulp-replace'
    gulpif = require 'gulp-if'

    gulp.src [cfg.src + 'html/**/*.jade', '!**/html/layout/**'], base: cfg.src + 'html'
    .pipe jade pretty: '    ', compileDebug: true
    .pipe gulpif isProduction, replace("_TIMESTAMP_", +new Date())
    .pipe gulpif isProduction, replace("react.js", "react.min.js")
    .pipe gulp.dest cfg.dist + 'html'

gulp.task 'copy', ->
    gulp.src [cfg.src + 'img/**', cfg.src + 'data/**'], base: cfg.src
    .pipe gulp.dest cfg.dist

gulp.task 'build', ['jsx', 'css', 'html', 'copy']
gulp.task 'default', ['build', 'lib_js']

gulp.task 'watch', ['build'], ->
    gulp.watch "./src/jsx/**", ["jsx"]
    gulp.watch "./src/styl/**", ["css"]
    gulp.watch "./src/html/**", ["html"]
