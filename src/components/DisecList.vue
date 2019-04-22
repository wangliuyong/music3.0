<template>
    <ul>
        <li class="card_wrap" v-for="item in disecList" :key="item.id">
            <div class="img_wrap">
                <img v-lazy="item.imgurl" alt="" width="60" height="60">
            </div>
            <div class="text_wrap">
                <h1 class="name">{{item.creator.name}}</h1>
                <p class="diss">{{item.dissname}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
  export default {
    name: "DisecList",
    props:{
      disecList:{
        type:Array
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../common/stylus/variable.styl"
ul
    background: $color-background
.card_wrap
    display flex
    margin-bottom 5px
    padding:8px
    font-size $font-size-medium
    .img_wrap
        padding 2px
    .text_wrap
        padding: 8px
        .name
            color $color-text
            text-align left
            padding 3px
        .diss
            color $color-dialog-background
            padding 3px
</style>
