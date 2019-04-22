<template>
    <ul class="singerList_wrap">
        <li v-for="item in singerList" :key="item.id">
            <h1 class="title_name">{{item.name}}</h1>
            <ul class="singerList_item">
                <li v-for="i in item" :key="i.id">
                    <img ="" alt="">
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
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
