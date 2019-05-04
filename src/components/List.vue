<template>
    <ul class="list_wrap">
        <li v-for="(item, index) in list" :data-index="index" :key="index" :class="{'current':currentIndex===index}">{{item}}</li>
    </ul>
</template>

<script>
  export default {
    name: "List",
    props:{
      list:{
        type:Array
      },
      currentIndex:{
        type:Number,
        default:0
      }
    },
    mounted() {

    },
    methods:{
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../common/stylus/variable.styl'
.list_wrap
    display flex
    flex-direction column
    width 20px
    padding 15px 2px
    background #333
    border-radius 15px
    li
        height:20px
        width:20px
        font-size:$font-size-medium
    .current
        color $color-theme
        font-size $font-size-medium-x
</style>
