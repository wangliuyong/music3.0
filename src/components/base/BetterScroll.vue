<template>
    <div class="scroll_wrap" ref="scroll_wrap">
        <slot></slot>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "BetterScroll",
    props: {
      propType: {
        type: Number,
        default: 0
      },
      data: {
        type: Array
      },
      click: {
        type: Boolean,
        default: true
      }

    },
    mounted() {
      // this.$nextTick(() => {
      //   this._initScroll()
      //   console.log('dom monted');
      // })
      this.timer=setTimeout(()=>{
        this._initScroll()
      },300)
    },
    methods: {
      _initScroll() {
        if (this.$refs.scroll_wrap) {
          console.log(this.$refs.scroll_wrap);
          this.scroll = new BScroll(this.$refs.scroll_wrap, {
            propType: this.propType,
            click: this.click
          })
        } else {
          return
        }
      },
      enable() {
        this.scroll & this.scroll.enable()
      },
      disable() {
        this.scroll & this.scroll.disable()
      },
      refresh() {
        this.scroll & this.scroll.refresh()
      }
    },
    watch: {
      data:function(){
        if(this.scroll){
          this.refresh()
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.scroll_wrap
    height 100%
</style>
