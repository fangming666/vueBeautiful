<template lang="pug">
  transition(name="slide-up")
    div.menu
      headS(:title="title")
      div.content
        modelS(:urlS="URLs", :type="type", :label="label", :placeholder="placeholder", :disc="disc")
        div.text-danger(v-if="showDanger") 请输入正确的菜名
        div(v-else-if="menuInfo", v-for="(item,index) in menuInfo.result.result.list", v-show="index === pages")
          p.menu-item(v-for="(item2,index2) in titleArr")
            span {{item2}}:
            span(v-html="contentArr[index][index2]")
            img(:src="item.pic", v-if="index2 ===0")
        v-pagination(v-if="menuInfo&&menuInfo.result.result",  size="small",  v-model="value", @change="loadPage", :total="menuInfo.result.result.num*10")

</template>
<script>
  import modelS from "./../model.vue";
  import headS from "./../header.vue";
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        type: "menu",
        pages: 0,
        label: "菜名",
        disc:0,
        placeholder: "请输入您想搜索的菜名",
        URLs: "http://fm.xiaofany.com/APIpage/menu.php",
        titleArr: ["名称", "简介", "时间", "分类", "食材", "步骤"],
      }
    },
    props: ["title"],
    methods: {
      loadPage(i){
        this.pages = i - 1
      }
    },
    created(){

    },
    computed: {
      ...mapState(["menuInfo"]),
      contentArr(){
        if (this.menuInfo) {
          let arr = [];
          for (let i = 0; i < 10; i++) {
            arr.push([])
          }
          for (let i in arr) {
            let str1, str2 = "";
            for (let a in this.menuInfo.result.result.list[i].material) {
              str1 += `${this.menuInfo.result.result.list[i].material[a].mname}:${this.menuInfo.result.result.list[i].material[a].amount};      `
            }
            for (let n in this.menuInfo.result.result.list[i].process) {
              let imgS = this.menuInfo.result.result.list[i].process[n].pic;
              str2 += `<p style="margin-left: 2rem;margin-bottom: 1rem"><span style="margin-bottom: .5rem">第${+n + 1}步${this.menuInfo.result.result.list[i].process[n].pcontent}</span><br>
<img src=${imgS} style="margin-top: .5rem">
</p>`
            }
            arr[i].push(this.menuInfo.result.result.list[i].name, this.menuInfo.result.result.list[i].content, this.menuInfo.result.result.list[i].cookingtime, this.menuInfo.result.result.list[i].tag, str1, str2)
          }
          return arr
        }
      },


      showDanger(){
        if (this.menuInfo) {
          if (!this.menuInfo.result.result) {
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

