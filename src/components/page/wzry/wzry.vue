<template>
  <transition name="zoom-left">
    <div class="wzry">
      <heads></heads>
      <router-view/>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/wzry/arms/0">
            <span>{{titleArr[0]}}</span></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wzry/hero/1">
            <span>{{titleArr[1]}}</span></router-link>
        </li>
      </ul>
    </div>
  </transition>

</template>

<script>
  import heads from "./head.vue";
  import {mapState,mapActions} from "vuex";
  export default {
    components: {
      heads
    },
    computed: {
      ...mapState(["titleArr"])
    },
    methods:{
      ...mapActions(["setData"])
    },
    created(){

    }
  }
</script>


