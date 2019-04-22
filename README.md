# vue3-music
## 技术栈
1.vue3.0

2.使用fastclick解决手机端300ms的延迟问题

3.使用jsonp进行跨域获取歌曲资源(https://github.com/webmodules/jsonp)

    npm install jsonp

4.axios+node.js开启本地代理服务器解决接口跨域问题,开启本地服务器代理方法
   ,本工程目录下执行
    
    yarn musicServe
5.vue-lazyload懒加载插件，实现图片的懒加载

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
