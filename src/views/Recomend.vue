<template>
    <div class="recomend">
        <i-slide :slideList="slideList"></i-slide>
        <i-title :text="'热门歌曲推荐'"></i-title>
        <DisecList :disecList="disecList"></DisecList>
    </div>
</template>

<script>
  import {getRecommend, getDiscList} from '../api/recomend'
  import Slide from '../components/Slide'
  import Title from '../components/Title'
  import DisecList from '../components/DisecList'

  export default {
    name: 'Recomend',
    components: {
      'i-slide': Slide,
      'i-title':Title,
      DisecList
    },
    data() {
      return {
        slideList: [],
        disecList:[]
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
          this.disecList=res.data.list
        })
      }
    }
  }
</script>

<style scoped>

</style>

