/* eslint-disable no-new */
<template>
  <div id="app">
    <div class="wrap">
        <Head></Head>
        <Navbar :list="list"></Navbar>
    </div>
    <keep-alive>
        <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Head from './components/Head'
import Navbar from './components/Navbar'
export default {
  name: 'app',
  components: { Head, Navbar},
  data(){
    return {
      list:[{path:'/recomend',text:'推荐'},{path:'/singer',text:'歌手'},{path:'/rank',text:'排行'},{path:'/search',text:'搜索'}]
    }
  },
  mounted () {
    // console.log('data',this.list)
  }
}
</script>

<style lang="stylus">
    @import './common/stylus/variable.styl'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  .wrap
    background $color-background
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
