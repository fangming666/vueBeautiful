<template lang="pug">
  transition(name="move-left")
    div
      div.intensionLoading(v-if="loadings == 'loading'", class=["loading"])
        v-spin(size="large")
      div.historyS
        headS(:title="title")
        div.content
          ul
            li(v-for="item in historySInfo.result")
              h5.text-center {{item.title}}
              p {{item.year}}-{{item.month}}-{{item.day}}, {{item.lunar}}
              img(:src="item.pic", v-if="item.pic")
              p {{item.des}}
      v-back-top(:visibilityHeight="10")
</template>
<script>
  import headS from "./../header.vue";
  import {mapActions, mapState} from "vuex";
  export default{
    data(){
      return {
        urlS: "http://fm.xiaofany.com/APIpage/history.php",
      }
    },
    props: ["title"],
    components: {
      headS
    },
    computed: {
      ...mapState(["historySInfo", "loadings"]),
    },
    methods: {
      ...mapActions(["ajaxOpenS", "loading"]),
      result(){
        let params = {};
        params.url = this.urlS;
        params.name = "";
        params.type = "historyS";
        this.ajaxOpenS(params);
      },
    },
    created()
    {
      this.loading();
      this.result();
    }
  }
</script>
