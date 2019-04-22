const axios = require('axios')
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号如:\nnode server.js 8888')
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

      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(JSON.stringify(res.data));
      response.end();
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
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(JSON.stringify(ret));
      response.end();
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
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(JSON.stringify(ret));
      response.end();
    }).catch((e) => {
      console.log(e)
    })

  }else if(path==='/api/getPurlUrl'){
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
    axios.post(url, {}, {
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com',
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(JSON.stringify(res.data));
      response.end();
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
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html;charset=utf-8');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.write(JSON.stringify(res.data));
      response.end();
    }).catch((e) => {
      console.log(e)
    })

  }else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.write('响应失败')
    response.end()
  }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用浏览器打开 http://localhost:' + port)
