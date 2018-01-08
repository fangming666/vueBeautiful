<template lang="pug">
  div.live-assistant
    v-carousel(autoplay)
      v-carousel-item(v-for="item in imgArr")
        div.demo-carousel
          img(:src="item")
    ul.clearfix
      li.pull-left(v-for="item in data", @click="openRouter(item.name,item.text)")
        img(:src="item.img", :class="item.imgType?'imgOne':'imgTwo'")
        p {{item.text}}
      div.mascot
</template>
<script>
  import {mapState} from "vuex";
  export default{
    data(){
      return {
        imgArr: ["http://114.115.143.201/APIpage/imgs/weather.jpg","http://114.115.143.201/APIpage/imgs/wzry.jpg","http://114.115.143.201/APIpage/imgs/menu.jpg"]
      }
    },
    computed: {
      ...mapState(["data"])
    },
    methods: {
      openRouter(name, title){
        this.$router.push({path: `/${name}/${title}`})
      }
    },
    created(){
//        console.log(this.data)
    }

  }
</script>
