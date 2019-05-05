<template>
    <div>
        <div class="singer">
            <BetterScroll :data="singerList" ref="betterScroll" :listerScroll="listerScroll" @scroll="scroll" :propType="3">
                <div>
                    <SingerList>
                        <ul class="singerList_wrap">
                            <li v-for="item in singerList" :key="item.id" ref="singerItem">
                                <h1 class="title_name">{{item.title}}</h1>
                                <ul class="singerList_item">
                                    <li v-for="(i,index) in item.item" :key="i.id" class="item_wrap" :data-index="index" @click="selectItem(i)">
                                        <img v-lazy="i.avatar" alt="">
                                        <span class="text">{{i.name}}</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </SingerList>
                </div>
            </BetterScroll>
            <div class="list-wrap" @touchstart="onTouchStart" @touchmove="onTouchMove">
                <List :list="getList" :currentIndex="currentIndex"></List>
            </div>
        </div>
        <transition name="slide">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
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
  const ANCHOR_HEIGHT=20
  export default {
    created(){
      this.touch={},
        this.listerScroll=true
    },
    name: 'Singer',
    data() {
      return {
        singerList: [],
        currentIndex:0
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
      selectItem(singer){
        this.$router.push({
          path:`/singer/${singer.id}`
        })
      },
      onTouchStart(e){
        let index=parseInt(getData(e.target,'data-index')||0)
        this.currentIndex=index
        this.touch.anchorIndex=index
        this.$refs.betterScroll.scrollToElement(this.$refs.singerItem[index],0)
        this.touch.y1=e.touches[0].pageY
        //this.$refs.betterScroll.scrollTo(index)
      },
      onTouchMove(e){
        this.touch.y2=e.touches[0].pageY
        let detal=Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT)
        let index= parseInt(this.touch.anchorIndex)+detal
        this.currentIndex=index
        this.$refs.betterScroll.scrollToElement(this.$refs.singerItem[index],0)
      },
      scroll(e){
        console.log('singer',e);
      },
      //获取歌手列表
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singerList = this._normalSinger(res.data.list)
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
            map.hot.item.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
            //console.log('map',map);
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

.slide-enter-active, .slide-leave-active {
    transition: all 1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform translate3d(100%,0,0)
}
</style>
