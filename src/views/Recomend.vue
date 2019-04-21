`
<template>
    <div class="recomend">
        <i-slide :slideList="slideList"></i-slide>
    </div>
</template>

<script>
  import {getRecommend, getDiscList} from '../api/recomend'
  import Slide from '../components/Slide'

  export default {
    name: 'Recomend',
    components: {
      'i-slide': Slide
    },
    data() {
      return {
        slideList: []
      }
    },
    mounted() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.slideList = res.data.slider
          } else {
            console.log(res.code)
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          console.log(res.data);
        })
      }
    }
  }
</script>

<style scoped>

</style>

`
