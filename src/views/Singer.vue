<template>
    <div class="singer">
        <BetterScroll :data="singerList">
            <div>
                <SingerList :singerList="singerList"></SingerList>
            </div>
        </BetterScroll>
    </div>
</template>

<script>
  import {getSingerList} from '../api/singer'
  import SingerList from '../components/base/SingerList'
  import BetterScroll from '../components/base/BetterScroll'
  import {ERR_OK} from '../api/config'
  import Singer from '../common/js/singer'

  const HOT_NAME = '热门'
  const SHOW_LENGTH = 10
  export default {
    name: 'Singer',
    data() {
      return {
        singerList: []
      }
    },
    components: {SingerList, BetterScroll},
    mounted() {
      this._getSingerList()
    },
    methods: {
      //获取歌手列表
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalSinger(res.data.list)
            //console.log(this.singerList);
          }
        })
      },
      //格式化数据
      _normalSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            item: []
          }
        }
        //对数据按字母进行分类
        list.forEach((item, index) => {
          if (index < SHOW_LENGTH) {
            //console.log(item);
            map.hot.item.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          let key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              item: []
            }
          }
          map[key].item.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        //console.log(map)
        //获取有序的数据列表
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title===HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '../common/stylus/variable.styl';
.singer
    position fixed
    top 88px
    bottom 0
    z-index:-1
    width 100%
</style>
