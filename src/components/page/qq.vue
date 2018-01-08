<template lang="pug">
  transition(name="fade")
    div.qq
      headS(:title="title")
      div.modalS
      v-form.text-center
        v-form-item(:label="label")
          v-input.pull-left(:placeholder="placeholder", v-model="num",)
          v-button.pull-left(type="primary", :icon="init?'':'search'", @click="submit", :loading="init")
            span(v-if="!init") 搜索
      p.text-danger(v-if="showDanger", class=["p-l-3"]) 请输入正确的QQ号
      p.qq-item(v-else, v-show="userName") #[span 昵称:] {{userName}}
      p.qq-item(v-show="userName&&!showDanger") #[span 头像:]
        img(:src="imgSrc")
</template>
<script>
  import vue from "vue";
  import headS from "./../header.vue"
  export default{
    props: ["title"],
    data(){
      return {
        label: "QQ号",
        placeholder: "请输入QQ号",
        userName: "",
        imgSrc: "",
        num: "",
        init: false,
        loading: "",
        showDanger:false
      }
    },
    methods: {

      submit(){
        this.init = true;
        this.$axios({
          method: "get",
          url: `${process.env.API_HOST}/api?qq=${this.num}`,
        }).then((res) => {
          if (res.status === 200) {
            if (res.data) {
              this.init = false;
              this.showDanger = false;
              let num1 = res.data.indexOf("(");
              let num2 = res.data.indexOf(")");
              let resultData = eval(`(${res.data.substring(num1 + 1, num2)})`);
              for (let i in resultData) {
                this.userName = resultData[i][6];
              }
              this.imgSrc = `http://q1.qlogo.cn/headimg_dl?dst_uin=${this.num}&spec=100`;
            }else{
               this.showDanger = true;
               setTimeout(this.init = false,500);
            }

          }
        });


      }
    },
    components: {
      headS
    }

  }
</script>

