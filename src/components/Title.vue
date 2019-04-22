<template>
    <div class="i-title">
        <h1>{{text}}</h1>
    </div>
</template>

<script>
  export default {
    name: "Title",
    props:{
      text:{
        type:String,
        default:''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../common/stylus/variable.styl'
.i-title
    h1
        padding:10px 0
        height:20px
        width:100%
        line-height 20px
        font-size $font-size-medium-x
        color: $color-theme
        background: $color-background
</style>
