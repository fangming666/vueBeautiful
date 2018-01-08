<template lang="pug">
  transition(name="zoom")
    div.phone
      headS(:title="title")
      div.content
        modelS(:urlS="URLs", :type="type", :label="label", :placeholder="placeholder", :disc="disc")
        p.text-danger(v-if="showDanger") 请输入正确的手机号码
        p(v-for="(item,index) in titleArr", v-if="!showDanger&&phoneInfo")
          span {{item}}:
          span {{contentArr[index]}}
</template>
<script>
  import modelS from "./../model.vue";
  import headS from "./../header.vue";
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        cityInfoS: "",
        type: "phone",
        label: "手机号",
        disc:0,
        placeholder: "请输入需要查询的手机号",
        URLs: "http://114.115.143.201/APIpage/phone.php",
        titleArr: ["手机号码", "归属地", "运营商", "卡类型"]
      }
    },
    props: ["title"],

    created(){
//      console.log(1, this.cityInfo)
    },
    computed: {
      ...mapState(["phoneInfo"]),
      contentArr(){
        let arr = [];
        if (this.phoneInfo) {
          let str = `${this.phoneInfo.result.result.province}  ${this.phoneInfo.result.result.city}`;
          arr.push(this.phoneInfo.result.result.shouji, str,this.phoneInfo.result.result.company,this.phoneInfo.result.result.cardtype);
          return arr;
        }
      },
      showDanger(){
        if (this.phoneInfo) {
          if (!this.phoneInfo.result.result) {
            return true
          }
          return false
        }
      },
    },
    components: {
      modelS,
      headS
    }
  }
</script>

