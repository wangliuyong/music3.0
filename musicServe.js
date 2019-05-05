const axios = require('axios')
var http = require('http')
var fs = require('fs')
var querystring = require("querystring");
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号如:\n node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  //将arg参数字符串反序列化为一个对象
  var params = querystring.parse(parsedUrl);


  /********相应的配置************/
  //获取歌曲接口
  if (path == '/api/getDiscList') {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: query
    }).then((res) => {
      setResponse(response,200,JSON.stringify(res.data))
    }).catch((e) => {
      console.log(e)
    })



  }else if(path==='/api/getCdInfo'){
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: query
    }).then((res) => {
      let ret = res.data
      if (typeof ret === 'string') {
        const reg = /^\w+\(({.+})\)$/
        const matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      setResponse(response,200,JSON.stringify(ret))
    }).catch((e) => {
      console.log(e)
    })
  }else if(path==='/api/lyric'){
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: query
    }).then((res) => {
      let ret = res.data
      if (typeof ret === 'string') {
        const reg = /^\w+\(({.+})\)$/
        const matches = ret.match(reg)
        if (matches) {
          ret = JSON.parse(matches[1])
        }
      }
      setResponse(response,200,JSON.stringify(ret))
    }).catch((e) => {
      console.log(e)
    })

  }else if(path==='/api/getPurlUrl'){
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.get(url, params, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com',
      },
      params: query
    }).then((res) => {
      setResponse(response,200,JSON.stringify(res.data))
    }).catch((e) => {
      console.log(e)
    })

  }else if(path==='/api/search'){
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    axios.get(url, {
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      params: query
    }).then((res) => {
      setResponse(response,200,JSON.stringify(res.data))
    }).catch((e) => {
      console.log(e)
    })

  }else {
    setResponse(response,404,'响应失败')
  }
})

server.listen(port)
console.log('代理服务器开启成功： http://localhost:' + port)


//设置响应内容
function setResponse(response,status=200,write=''){
  response.statusCode = status;
  response.setHeader('Content-Type', 'text/html;charset=utf-8');
  response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  response.write(write)
  response.end()
}
