<template lang="pug">
  transition(name="move-left")
    div.news
      headS(:title="title")
      div.content(ref="nav")
        div.nav-warp
          ul
            li(v-for="(item,index) in navArr", @click="openNew(index)", :class="resultNum===index?'active':''" ref="newsList") {{item}}
        div.newsInfo(ref="contentS", v-if="newTwoInfo")
          div(v-if="newTwoInfo.result.result")
            h6.text-center {{newTwoInfo.result.result.channel}}
            dl(v-for="item in newTwoInfo.result.result.list")
              dt {{item.title}}
              dd(v-html="item.content")
              dd   --{{item.src}}
              dd   时间：{{item.time}}
          div(v-else)
            p.text-danger(class=["text-center"]) 系统繁忙，请重新刷新
</template>
<script>
  import BScroll from 'better-scroll';
  import headS from "./../header.vue";
  import {mapActions, mapState} from "vuex";
  export default{
    data(){
      return {
        urlOne: "http://114.115.143.201/APIpage/news_one.php",
        urlTwo: "http://114.115.143.201/APIpage/news_two.php",
        navArr: [],
        num: 0
      }
    },
    props: ["title"],
    components: {
      headS
    },
    computed: {
      ...mapState(["newOneInfo", "newTwoInfo"]),
      resultNum(){
          return this.num
      }
    },
    methods: {
      ...mapActions(["ajaxOpenS"]),
      result(){
        let params = {};
        params.url = this.urlOne;
        params.name = "";
        params.type = "newsOne";
        this.ajaxOpenS(params);
      },
      openNew(index){
        this.num = index;
        let value = this.$refs.newsList[index].innerHTML;
        for (let i in this.$refs.newsList) {
          this.$refs.newsList[i].classList.remove("active");
        }
        this.$refs.newsList[index].classList.add("active");
        let params = {};
        params.url = this.urlTwo;
        params.name = `channel=${value}`;
        params.type = "newsTwo";
        this.ajaxOpenS(params);
      },
      infoInit(){
        let that = this;
        that.result();
        let params = {};
        params.url = that.urlTwo;
        params.name = "channel=头条";
        params.type = "newsTwo";
        that.ajaxOpenS(params);
        this.$nextTick(() => {
          setTimeout(() => {
            this.scroll = new BScroll(this.$refs.contentS, {})
          }, 1000);

        });

      }
    },
    created(){
      this.infoInit();
      this.$nextTick(() => {
        setTimeout(() => {
          if (this.newOneInfo.result) {
            this.navArr = this.newOneInfo.result.result;
          }
        }, 500)
      });


    }
  }
</script>
