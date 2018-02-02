<template lang="pug">
  div.live-assistant
    v-carousel(autoplay)
      v-carousel-item(v-for="item in imgArr")
        div.demo-carousel
          img(:src="item")
    ul.clearfix
      li.pull-left(v-for="item in data", @click="openRouter(item.name,item.text)")
        img( :data-id="item.img", :src="item.img", :class="item.imgType?'imgOne':'imgTwo'", ref="imgItem")
        p {{item.text}}
      div.mascot(@click="handle(true)", v-show="!visible" )
      v-modal(:visible="visible", )
        robot(@hideR="handRo")
</template>
<script>
  import robot from "./robotS.vue";
  import jquery from "jquery";
  import {mapState} from "vuex";
  export default{
    data(){
      return {
        visible: false,
        imgArr: ["http://fm.xiaofany.com/APIpage/imgs/weather.jpg", "http://fm.xiaofany.com/APIpage/imgs/wzry.jpg", "http://fm.xiaofany.com/APIpage/imgs/menu.jpg"]
      }
    },
    computed: {
      ...mapState(["data"])
    },
    methods: {
      openRouter(name, title){
        this.$router.push({path: `/${name}/${title}`})
      },
      handle(result){
        this.visible = result;
      },
      handRo(){
        this.visible = false;
      },
      layZe(){

        window.onscroll = () => {
//          let result = jquery(this.$refs.imgItem).eq(0).offset().top;
//          console.log(result);
         this.$refs.imgItem.map((index, item) => {
              console.log(jquery(item).offset().top);
//              if(item.offset().top>document.documentElement.scrollTop){
//                  item.attr("src",item.attr("data-id"));
//              }
          })
//            document.documentElement.scrollTop;
//              console.log(this.$refs.imgItem.getAttribute("src"));
        }
      }
    },
    created(){
//      this.layZe();
    },
    components: {
      robot
    }

  }
</script>
