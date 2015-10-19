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
    browsers: ['android > 2', 'ios >= 5'] # , 'and_ff > 30', 'and_chr > 10'
    cascade: true

gulp.task 'jsx', (cb) ->
    webpack = require 'webpack'
    webpack
        entry:
            main: cfg.src + "jsx/main.jsx"
            admin: cfg.src + "jsx/admin.jsx"
            'admin/user': cfg.src + "jsx/admin/user.jsx"
            'admin/report': cfg.src + "jsx/admin/report.jsx"
        output:
            filename: cfg.dist + 'js/[name].js'
        module:
            loaders: [
                {
                    test: /\.jsx?$/, loader: 'babel?stage=0'
                }, {
                    test: /\.coffee$/, loader: 'coffee-loader'
                }
            ]
#        plugins: [
#            new webpack.optimize.UglifyJsPlugin()
#        ]
        externals:
            jquery: 'window.$'
            react: 'window.React'
    , (err, stats) ->
        if err then throw err
        console.log stats.toString colors: yes, chunks: no
        cb()

gulp.task 'css', ->
    stylus = require 'gulp-stylus'
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-minify-css'
    nib = require 'nib'

    gulp.src cfg.src + 'styl/*.styl'
    .pipe stylus(use: nib())
    .pipe autoprefixer autoPrefixConfig
    .pipe cssmin cssminConfig
    .pipe gulp.dest cfg.dist + 'css'

gulp.task 'lib_css', ->
    autoprefixer = require 'gulp-autoprefixer'
    cssmin = require 'gulp-minify-css'
    rename = require 'gulp-rename'

    gulp.src 'node_modules/antd/lib/index.css'
    .pipe autoprefixer autoPrefixConfig
    .pipe cssmin cssminConfig
    .pipe rename 'antd.min.css'
    .pipe gulp.dest cfg.dist + 'css'


gulp.task 'lib_antd', (cb) ->
    webpack = require 'webpack'
    webpack
        entry: "./antd.js"
        output:
            filename: cfg.dist + '/js/lib/antd.min.js'
        module:
            loaders: [
                {
                    test: /\.js$/, loader: 'babel'
                }
            ]
        plugins: [
            new webpack.optimize.UglifyJsPlugin()
        ]
        externals:
            jquery: 'window.$'
            react: 'window.React'
    , (err, stats) ->
        if err then throw err
        console.log stats.toString colors: yes, chunks: no
        cb()

gulp.task 'lib', ['lib_css', 'lib_antd']

gulp.task 'html', ->
    jade = require 'gulp-jade'

    gulp.src [cfg.src + 'html/**/*.jade', '!**/html/layout/**'], base: cfg.src + 'html'
    .pipe jade pretty: '    ', compileDebug: true
    .pipe gulp.dest cfg.dist + 'html'

gulp.task 'default', ['jsx', 'css', 'lib', 'html']

gulp.task 'watch', ['jsx', 'css', 'html'], ->
    gulp.watch "./src/jsx/**", ["jsx"]
    gulp.watch "./src/styl/**", ["css"]
    gulp.watch "./src/html/**", ["html"]
