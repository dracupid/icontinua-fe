# fs = require 'fs'
# path = require 'path'
got = require 'got'

# configFile = fs.readFileSync path.join(__dirname, './config/application.yaml'), encoding: 'utf-8'

# [_, appId] = configFile.match /\s*appId:\s*(\w*)/
# [_, appSecret] = configFile.match /\s*appSecret:\s*(\w*)/

appId = 'wx1071ef65b25ab039'
appSecret = '235aaa4ed220afbf47af54939bebcff3'

if not appId or not appSecret
    throw new Error "appId or appSecret is required"

menuStr =
    button: [
        {
            type: 'view',
            name: '我的体检报告',
            url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent 'http://112.80.52.187/wechat/auth'}&response_type=code&scope=snsapi_base" # 702ea5a.nat123.net
        }
#        {
#            name: '产品中心',
#            sub_button: [{type: 'click', name: '中医治未病', key: 'TREATMENT'}]
#        }, {
#            name: '报告查询',
#            sub_button: [{
#                type: 'view',
#                name: '我的体检报告',
#                url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent 'http://112.80.52.187/wechat/auth'}&response_type=code&scope=snsapi_base" # 702ea5a.nat123.net
#            }, {
#                type: 'view',
#                name: '我的二维码',
#                url: 'http://mp.weixin.qq.com/s?__biz=MzA3MDEwMjA1Ng==&mid=209560360&idx=1&sn=5608f0f9f36e327a20aa353a9a1adc49&scene=18#rd'
#            }]
#        }, {
#            name: '服务咨询',
#            sub_button: [{type: 'click', name: '时令咨询', key: 'INFORMATION'}, {type: 'click', name: '新闻动态', key: 'NEWS'}]
#        }
    ]

getToken = ->
    url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#{appId}&secret=#{appSecret}";

    got(url).then (res) ->
        res = JSON.parse res.body
        token = res.access_token
        console.log "TOKEN: #{token}"
        token

getToken()
.then (token) ->
    url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=#{token}"

    got.post url,
        body: JSON.stringify menuStr
    .then (res) ->
        console.log res.body
.catch (e) ->
    console.error e
