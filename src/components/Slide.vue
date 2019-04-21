<template>
    <div class="block">
        <div class="block">
            <el-carousel height="150px" width="100%" arrow="always">
                <el-carousel-item v-for="item in slideList" :key="item.id">
                    <a :href="item.linkUrl"><img :src="item.picUrl" alt="" height="150" width="100%"></a>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
  import {Carousel, CarouselItem} from 'element-ui';
  export default {
    name: 'Slide',
    components:{
      'el-carousel':Carousel,
      'el-carousel-item':CarouselItem
    },
    props:{
      slideList:{
        type:Array
      }
    }
  }
</script>

