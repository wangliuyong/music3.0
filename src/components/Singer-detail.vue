<template>
    <div class="singer-detail">
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import { createSong, isValidMusic, processSongsUrl }  from '../common/js/song'
  //import Singer from '../common/js/singer'
  import {ERR_OK} from '../api/config'
  import {getSingerDetail} from '@/api/singer'
  export default {
    name: "Singer-detail",
    data(){
      return {
        songs:[],
        singerMessage:{}
      }
    },
    created() {
      this._getDetail()
    },
    destroyed(){
      if(this.timerid){
        clearTimeout(this.timerid)
      }
    },
    computed: {
      ...mapGetters(['singer'])
    },
    methods: {
      _getDetail(){
        // console.log(this.singer);
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            processSongsUrl(this._normalSong(res.data.list)).then((songs) => {
              this.songs = songs
              console.log(this.songs);
            })
          }
        })
      },
      _normalSong(list){
        let ret = []
        list.forEach((item) => {
          let { musicData } = item
          if (isValidMusic(musicData)) {
            ret.push(createSong(musicData))
          }
        })
        //跨域问题不可用，暂时用同一首歌来代替
        this.songs = ret
        console.log(ret);
        return ret

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
