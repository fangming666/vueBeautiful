<template lang="pug">
  div.robot
    div.robot-head(class=["text-center", "text-primary"])
      img(:src="robotImg")
      span 大头
      i.text-error(class=["fa fa-close"], @click="hideRobot")
    div.robot-content(ref="robotContent")
      ul(ref="robotChat")
        li(v-for="(item,index) in robotArr", :class="item.other?'other':''", class=["robot-item"]) {{item.text}}
    div.robot-foot(class=["text-danger"])
      v-form.clearfix(direction="horizontal")
        v-input.pull-left(v-model="data1")
        v-button.pull-left(type="primary", @click="send")
          span 发送
</template>
<script>
  import {mapState, mapActions} from "vuex";
  import BScroll from 'better-scroll';
  import jquery from "jquery";
  export default{
    data(){
      return {
        robotArr: [],
        data1: "",
        urlS: "http://fm.xiaofany.com/APIpage/robot.php",
        typeS: "robot"
      }
    },
    computed: {
      ...mapState(["robotImg", "robotInfo"])
    },
    methods: {
      ...mapActions(["ajaxOpenS"]),
      send(){
        this.robotArr.push({"text": this.data1, "other": false});
        let params = {};
        params.name = `robot=${this.data1}`;
        params.url = this.urlS;
        params.type = this.typeS;
        this.ajaxOpenS(params).then(() => {
          this.scroll = new BScroll(this.$refs.robotContent, {});
          this.robotArr.push({"text": this.robotInfo.result.text, "other": true});
          (this.$nextTick(() => {
              let itemArr = jquery(".robot-item");
              for (let i = 0; i < itemArr.length; i++) {
                let topS = "";
                if (i > 0) {
                  topS = Number.parseFloat(itemArr.eq(i - 1).css("height")) + Number.parseFloat(itemArr.eq(i - 1).css("top")) + 10;
                  itemArr.eq(i).css("top", topS);
                  console.log(topS, jquery(".robot-content").eq(0).css("height").split("px")[0]);
                  if (topS >= jquery(".robot-content").eq(0).css("height").split("px")[0]) {
                    jquery(".robot-content").eq(0).find("ul").css("height", topS + Number.parseFloat(itemArr.eq(i).css("height")) + 30 + "px");
                  }
                }
              }
              this.robotInfo.result.text = "";
              this.data1 = "";
            }
          ))(this);
        });
      },
      hideRobot(){
        this.$emit("hideR")
      }
    }

  }
</script>
