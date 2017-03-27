#!/usr/bin/env coffee

###
    修改微信菜单
###

got = require 'got'

createMenu = (appId, appSecret, host)->
    menuStr =
        button: [
            {
                name: '体测&报告',
                sub_button: [{
                    type: 'view',
                    name: '体型评估',
                    url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent host + '/wechat/auth?target=device'}&response_type=code&scope=snsapi_base"
                }, {
                    type: 'view',
                    name: '体检报告',
                    url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent host + '/wechat/auth?target=report'}&response_type=code&scope=snsapi_base"
                }]
            }, {
                name: '咨询医生',
                sub_button: [{
                    type: 'view',
                    name: '快速咨询',
                    url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent host + '/wechat/nim-auth'}&response_type=code&scope=snsapi_base"
                }, {
                    type: 'view',
                    name: '专家帮你',
                    url: "http://m.haodf.com/touch/jibing/list.html"
                }, {
                    type: 'view',
                    name: '疾病百科',
                    url: "http://wapjbk.39.net/"
                }, {
                    type: 'view',
                    name: '药品查询',
                    url: "http://wapypk.39.net/index.aspx"
                }]
            }, {
                name: '更多服务',
                sub_button: [{
                    type: 'view',
                    name: '必备应用',
                    url: host + '/apps'
                }, {
                    type: 'view',
                    name: '预约转诊',
                    url: "http://m.haodf.com/touch/booking/hospitallistbyarea?areaName=%D5%E3%BD%AD&type=1"
                }, {
                    type: 'view',
                    name: '医药商城',
                    url: "http://m.star365.com/"
                }, {
                    type: 'view',
                    name: '个人中心',
                    url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent host + '/wechat/auth?target=usercenter'}&response_type=code&scope=snsapi_base"
                }, {
                    type: 'view',
                    name: '产品介绍',
                    url: "http://cdnst.icontinua.com/html/intro.html"
                }]
            }
        ]

    getToken = ->
        url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#{appId}&secret=#{appSecret}"

        got(url).then (res) ->
            res = JSON.parse res.body
            token = res.access_token
            console.log host, " - TOKEN: #{token}"
            token

    getToken()
    .then (token) ->
        url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=#{token}"

        got.post url,
            body: JSON.stringify menuStr
        .then (res) ->
            console.log host, ' - ', res.body
    .catch (e) ->
        console.error e

# 苏州服务器
appId = 'wx1071ef65b25ab039'
appSecret = '235aaa4ed220afbf47af54939bebcff3'
host = 'http://112.80.52.187'

# 阿里云服务器
appId1 = 'wxfe9b0e3e8fbb136b'
appSecret1 = '7b3eb61c4a25a4bcd4b4f3766fd34ed3'
host1 = 'http://icontinua.com'


createMenu appId, appSecret, host
createMenu appId1, appSecret1, host1
