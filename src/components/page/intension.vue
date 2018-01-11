<template lang="pug">
  transition(name="slide-up")
    div.intension
      headS(:title="title")
      div.intension-content(v-if="intensionInfo")
        pull-to(:top-load-method="refresh")
          h6.text-center {{titles}}
          ul
            li.clearfix(v-for="(item,index) in infoArr")
              p #[span 分类:]{{item.group.category_name}}
              p.user #[span 作者:]  #[img(:src="item.group.user.avatar_url")] {{item.group.user.name}}

              p {{item.group.text}}

              div.video(v-if="item.group.mp4_url")
                video(controls)
                  source(:src="http+item.group.mp4_url", type="video/mp4")
              p #[span 时间:] {{item.online_time}}
      v-back-top(visibilityHeight="10")


</template>
<script>
  import headS from "./../header.vue";
  import PullTo from 'vue-pull-to';
  import {mapActions, mapState} from "vuex";
  export default{
    data(){
      return {
        urlS: "http://fm.xiaofany.com/APIpage/intension.php",
        typeS: "intension",
        titles: "",
        http: "http://fm.xiaofany.com/APIpage/read.php?link=",
        infoArr: [],
        goShow: false,
      }
    },
    props: ["title"],
    computed: {
      ...mapState(["intensionInfo"])
    },
    methods: {
      ...mapActions(["ajaxOpenS"]),
      hideTitle(){
        this.titles = ""
      },
      open(){
        let params = {};
        params.name = "";
        params.url = this.urlS;
        params.type = this.typeS;
        this.ajaxOpenS(params);
        this.$nextTick(() => {
          if (this.intensionInfo) {
            this.titles = this.intensionInfo.data.tip;
            setTimeout(this.hideTitle, 1000);
            this.intensionInfo.data.data.map((item, index) => {
              this.infoArr.unshift(item)
            });
          }
        })

      },
      refresh(loaded) {
        setTimeout(() => {
          this.open();
          loaded('done');

        }, 2000);
      },
    },
    components: {
      headS,
      PullTo
    }
    ,
    created()
    {
      this.open();
    }
  };
</script>
