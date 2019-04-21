<template>
    <ul class="nav">
        <li v-for="(item,index) in list" :key="index">
            <router-link :to="item.path">{{item.text}}</router-link>
        </li>
        <slot></slot>
    </ul>
</template>

<script>
  /* eslint-disable */
export default {
  name: 'Navbar',
  props: {
    list: {
      type: Array,
      default(){
        return [{path:'/recomend',text:'推荐'}]
      }
    }
  },
  data(){
    return {
      isActive:false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../common/stylus/variable.styl'
.nav
    display flex
    li
        flex-grow 1
        height:44px
        display flex
        align-items center
        justify-content center
        font-size $font-size-medium
    li
        .router-link-active
            border-bottom 1px solid $color-theme
            color $color-theme
</style>
