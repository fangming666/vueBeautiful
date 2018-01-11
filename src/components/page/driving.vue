<template lang="pug">
  transition(name="zoom-left")
    div.dirving
      headS(:title="title")
      div.content
        div.text-center
          span 请选择
          v-select(placeholder="题目类别", style="width: 30%;", :data="optionsOne", @change="changeOne")
          v-select(placeholder="科目类别", style="width: 30%;", :data="optionsTwo", @change="changeTwo")
        div.info(v-if="drivingInfo")
          p #[span.text-warning 题目：] {{drivingInfo.result.result.type}}
          p #[span.text-warning 科目：] {{selectTwo}}
          p.text-danger(v-if="showInfo") 选择科目（或题目）不存在
          div.item(v-else, v-for="(item,index) in drivingInfo.result.result.list", v-show="index === pages")
            p #[span.text-primary 第{{+index+1}}题:]  {{item.question}}
            img(v-show="item.pic", :src="item.pic")
            ul
              li.list-none {{item.option1}}
              li.list-none {{item.option2}}
              li.list-none {{item.option3}}
              li.list-none {{item.option4}}
            p #[span.text-primary 答案：] {{item.answer}}
            p #[span.text-primary 解析：] {{item.explain}}
            p #[span.text-primary 知识点：] {{item.chapter}}
        v-pagination.nav(v-if="drivingInfo&&drivingInfo.result.result", class=["text-center"], @change="loadPage", :total="drivingInfo.result.result.pagesize*10")

</template>
<script>
  import headS from "./../header.vue";
  import {mapState, mapActions} from "vuex";
  export default{
    data(){
      return {
        urlS: "http://fm.xiaofany.com/APIpage/driving.php",
        pages: 0,
        info: "",
        optionsOne: [{
          value: "1",
          label: "A1"
        },
          {
            value: "2",
            label: "A2"
          },
          {
            value: "3",
            label: "A3"
          },
          {
            value: "4",
            label: "B1"
          },
          {
            value: "5",
            label: "B2"
          },
          {
            value: "6",
            label: "C1"
          }, {
            value: "7",
            label: "C2"
          }, {
            value: "8",
            label: "C3"
          }, {
            value: "9",
            label: "D"
          }, {
            value: "10",
            label: "E"
          }, {
            value: "11",
            label: "F"
          }],
        optionsTwo: [{
          value: "1",
          label: "科目一"
        }, {
          value: "2",
          label: "科目二"
        }, {
          value: "3",
          label: "科目三"
        }, {
          value: "4",
          label: "科目四"
        }],
        selectOne: "",
        selectTwo: "",
        subject: 1,
      }
    },
    props: ["title"],
    components: {
      headS
    },
    computed: {
      ...mapState(["drivingInfo"]),
      showInfo(){
          if(this.drivingInfo.result.result){
              return false
          }
          return true;
      }
    },
    watch: {},
    methods: {
      ...mapActions(["ajaxOpenS"]),
      result(){
        if (this.selectOne && this.selectTwo) {
          let params = {};
          params.url = this.urlS;
          params.name = `type=${this.selectOne}&subject=${this.subject}`;
          params.type = "driving";
          this.ajaxOpenS(params);
        }
      },
      changeOne(index){
        this.selectOne = this.optionsOne[index - 1].label;
        this.result();

      },
      changeTwo(index){
        this.selectTwo = this.optionsTwo[index - 1].label;
        this.subject = index;
        this.result();
      },
      loadPage(i){
        this.pages = i - 1
      }
    }
  }
</script>
