<template>
  <header>
    <span>{{headTitle}}</span>
    <i class="fa pull-left fa-angle-left" @click="initial" style="position:relative;left: 1rem;top: 12px;font-size: 1.2rem;
    font-weight: 600;"></i>
  </header>
</template>
<script>
  import {mapState,mapActions} from "vuex";
  export default{
    computed: {
      ...mapState(["headTitle"])
    },
    methods:{
      ...mapActions(["titleInfo"]),
      initial(){
        this.$router.push({path: "/"})
      }
    },
    created(){
      console.log(this.headTitle,'title')
    }
  }
</script>
