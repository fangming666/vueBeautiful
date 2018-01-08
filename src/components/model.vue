<template lang="pug">
  div.modalS
    v-form.text-center
      v-form-item(:label="label")
        v-input.pull-left(:placeholder="placeholder", v-model="valS", :class="disc?'otherInput':''")
        slot(name="slot1")
        v-button.pull-left(type="primary", :icon="init?'':'search'", @click="result", :loading="init")
          span(v-if="!init") 搜索
</template>
<script>
  import {mapActions, mapState} from "vuex";
  export default{
    data(){
      return {
        valS: "",
        init: false,
        menuArr :[]
      }
    },
    props: ["label", "placeholder", "type", "urlS","disc","valS2","type2"],
    computed: {
      ...mapState(["loading"])
    },
    methods: {
      ...mapActions(["ajaxOpenS"]),
      result(){
        this.init = true;
        console.log(this.valS2);
        let params = {};
        if(!this.desc){
          params.name =  `${this.type}=${this.valS}`;
        }else{
          params.name =  `${this.type}=${this.valS}&${this.type2}=${this.type2}`;
        }
        params.url = this.urlS;
        params.type = this.type;
        setTimeout(
          function () {
            this.ajaxOpenS(params);
            this.init = false;
          }.bind(this), 1000);

      }
    }
  }
</script>
