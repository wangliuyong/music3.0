<template>
<div class="singer-detail">

</div>
</template>

<script>
    import {getSingerDetail} from '../api/singer';
  export default {
    name: "Singer-detail",
    mounted() {
      this._getSingerDetail('004AlfUb0cVkN1')
    },
    methods:{
      _getSingerDetail(singerId){
        getSingerDetail(singerId).then((e)=>{
          console.log(e);
        })
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
