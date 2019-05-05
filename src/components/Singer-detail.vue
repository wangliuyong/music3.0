<template>
    <div class="singer-detail">
        <button @click="getData">vuex</button>
    </div>
</template>

<script>
    import {mapActions,mapGetters ,mapMutations} from 'vuex'
  export default {
    name: "Singer-detail",
    mounted() {
      this.getSingerDetailById({singerid:'002J4UUk29y8BY'})
    },
    computed:{
        ...mapGetters(['singer'])
    },
    methods:{
      ...mapActions(["getSingerDetailById"]),
      getData(){
        console.log(this.singer);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer-detail
    position fixed
    top 0
    bottom 0
    left 0
    z-index 20
    width 100%
    background: #000
</style>
