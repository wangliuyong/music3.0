`
<template>
    <div class="recomend">
        <i-slide></i-slide>
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
        obj: {}
      }
    },
    mounted () {
      getRecommend().then((data) => {
        console.log(data)
      })
    }
  }
</script>

<style scoped>

</style>

`
