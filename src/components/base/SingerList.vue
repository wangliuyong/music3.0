<template>
    <ul class="singerList_wrap">
        <li v-for="item in singerList" :key="item.id">
            <h1 class="title_name">{{item.title}}</h1>
            <ul class="singerList_item">
                <li v-for="i in item.item" :key="i.id" class="item_wrap">
                    <img v-lazy="i.avatar" alt="">
                    <span class="text">{{i.name}}</span>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
  export default {
    name: "SingerList",
    props:{
      singerList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    mounted() {
      console.log(this);
    }
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
