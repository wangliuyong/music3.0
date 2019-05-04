<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "SingerList"
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/variable.styl'
.singerList_wrap
    color: $color-text
    .title_name
        text-align left
        padding 8px 7px
        font-size $font-size-medium-x
        background $color-dialog-background
    .singerList_item
        font-size $font-size-medium
        .item_wrap
            display flex
            padding 20px 0 0 30px
            img
                width 50px
                height:50px
                border-radius 50%
            .text
                display flex
                align-items center
                padding-left 10px
        .item_wrap:last-child
            padding-bottom: 30px;


</style>
