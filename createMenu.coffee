got = require 'got'

# appId = 'wx1071ef65b25ab039'
# appSecret = '235aaa4ed220afbf47af54939bebcff3'

appId = 'wxfe9b0e3e8fbb136b'
appSecret = '7b3eb61c4a25a4bcd4b4f3766fd34ed3'
host = 'http://icontinua.cn'

menuStr =
    button: [
        {
            type: 'view',
            name: '我的体检报告',
            url: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent host + '/wechat/auth'}&response_type=code&scope=snsapi_base"
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
    url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=#{appId}&secret=#{appSecret}"

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
