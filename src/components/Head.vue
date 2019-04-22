<template>
    <div class="head">
        <h1>Music</h1>
        <div class="user_center">
            <svg class="icon" aria-hidden="true" @click="toUserCenter">
                <use xlink:href="#icon-xxhdpiShape"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Head',
  methods:{
    toUserCenter(){
      this.$router.push('/user_center')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/variable.styl'
.head
    display:flex
    height:44px
    width: 100%
    font-size $font-size-medium
    color: $color-theme
    background: $color-background
    h1
        flex-basis 300px
        display flex
        justify-content center
        align-items center
    .user_center
        flex-grow 1
        display flex
        justify-content center
        align-items center
</style>
