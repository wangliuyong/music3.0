`
<template>
    <div class="recomend">
        <i-slide :slideList="slideList"></i-slide>
    </div>
</template>

<script>
  import {getRecommend} from '../api/recomend'
  import Slide from '../components/Slide'

  export default {
    name: 'Recomend',
    components:{
      'i-slide':Slide
    },
    data () {
      return {
        slideList: []
      }
    },
    mounted () {
      getRecommend().then((data) => {
        console.log(data);
        this.slideList=data.data.slider
      })
    }
  }
</script>

<style scoped>

</style>

`
