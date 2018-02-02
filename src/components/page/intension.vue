<template lang="pug">
  transition(name="slide-up")
    div
      div.intensionLoading(v-if="loadings == 'loading'", class=["loading"])
        v-spin(size="large")
      div.intension
        headS(:title="title")
        div.intension-content(v-if="intensionInfo")
          mt-loadmore(:top-method="loadTop", @top-status-change="handleTopChange", ref="loadmore")
            div(slot="top", class="mint-loadmore-top")
              span(v-show="topStatus == 'pull'", :class="{ 'rotate': topStatus === 'pull' }")
              span(v-show="topStatus == 'drop'", :class="{ 'rotate': topStatus === 'drop' }") ↓
              <!--span(v-show="topStatus === 'loading'") Loading...-->
            h6.text-center {{titles}}
            ul
              li.clearfix(v-for="(item,index) in infoArr")
                p #[span 分类:]{{item.group.category_name}}
                p.user #[span 作者:]  #[img(:src="item.group.user.avatar_url")] {{item.group.user.name}}
                p {{item.group.text}}
                div.video(v-if="item.group.mp4_url")
                  video(controls, :poster="item.group.large_cover.url_list[0].url")
                    source(:src="http+item.group.mp4_url", type="video/mp4")
                p #[span 时间:] {{item.online_time}}
        v-back-top(:visibilityHeight="10")


</template>
<script>
  import headS from "./../header.vue";
  import {mapActions, mapState} from "vuex";
  export default{
    data(){
      return {
        urlS: "http://fm.xiaofany.com/APIpage/intension.php",
        typeS: "intension",
        titles: "",
        http: "http://fm.xiaofany.com/APIpage/read.php?link=",
        infoArr: [],
        topStatus: ''
      }
    },
    props: ["title"],
    computed: {
      ...mapState(["intensionInfo", "loadings"])
    },
    methods: {
      ...mapActions(["ajaxOpenS", "loading"]),
      hideTitle(){
        this.titles = ""
      },
      open(){
        let params = {};
        params.name = "";
        params.url = this.urlS;
        params.type = this.typeS;
        this.ajaxOpenS(params).then(() => {
          if (this.intensionInfo) {
            this.titles = this.intensionInfo.data.tip;
            setTimeout(this.hideTitle, 1000);
            this.intensionInfo.data.data.map((item, index) => {
              this.infoArr.unshift(item)
            });
            this.infoArr = this.infoArr.slice(0, 50)
          }
          (this)
        });

      },
      handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
        this.$refs.loadmore.onTopLoaded();
        this.open();
      }
    }
    ,
    components: {
      headS,
    }
    ,
    watch: {
      loadings(n, o){
      }
    },
    created()
    {
      this.loading();
      this.open();
    }
  }
  ;
</script>
