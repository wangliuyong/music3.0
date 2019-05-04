<template>
    <div class="singer">
        <BetterScroll :data="singerList" ref="betterScroll">
            <div @touchstart="touchList">
                <SingerList>
                    <ul class="singerList_wrap">
                        <li v-for="item in singerList" :key="item.id" ref="singerItem">
                            <h1 class="title_name">{{item.title}}</h1>
                            <ul class="singerList_item">
                                <li v-for="(i,index) in item.item" :key="i.id" class="item_wrap" :data-index="index">
                                    <img v-lazy="i.avatar" alt="">
                                    <span class="text">{{i.name}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </SingerList>

            </div>
        </BetterScroll>
        <div class="list-wrap" @touchstart="touchList">
            <List :list="getList"></List>
        </div>
    </div>
</template>

<script>
  import {getSingerList} from '../api/singer'
  import SingerList from '../components/base/SingerList'
  import BetterScroll from '../components/base/BetterScroll'
  import {ERR_OK} from '../api/config'
  import Singer from '../common/js/singer'
  import List from '../components/List'
  import getData from '../common/js/dom'

  const HOT_NAME = '热门'
  const SHOW_LENGTH = 10
  export default {
    name: 'Singer',
    data() {
      return {
        singerList: []
      }
    },
    components: {SingerList, BetterScroll,List},
    mounted() {
      this._getSingerList()
    },
    computed:{
      getList(){
        return this.singerList.map((item)=>{
          return item.title.substring(0,1)
        })
      }
    },
    methods: {
      touchList(e){
        let index=getData(e.target,'data-index')
        this.$refs.betterScroll.scrollToElement(this.$refs.singerItem[index],0)
        //this.$refs.betterScroll.scrollTo(index)
      },
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
    .list-wrap
        position fixed
        right 0
        top 175px
</style>
