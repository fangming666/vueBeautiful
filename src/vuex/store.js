/**
 * Created by DELL on 2017/12/29.
 */
import vue from "vue";
import vueX from "vuex";
import * as actions from "./action";
import * as data from "../../static/json/db.json";
import * as hero from "./../../static/json/hero.json"
import * as arms from "./../../static/json/arms.json"

vue.use(vueX);

const state = {
  data: data.data,
  loading:"",
  cityInfo: "",
  newOneInfo:"",
  newTwoInfo:"",
  menuInfo:"",
  phoneInfo:"",
  drivingInfo:"",
  robotInfo:"",
  intensionInfo:"",
  headTitle: "武器",
  titleArr: ["武器", "英雄"],
  heroData: hero.data,
  armsData: arms.data,
  robotImg:"http://fm.xiaofany.com/APIpage/imgs/robot.png"
};

const mutations = {
  POST_AXIOS(state, list){
    state.loading = "success";
    switch(list.type){
      case "city":
        state.cityInfo = list.data;
        break;
      case "newsOne":
        state.newOneInfo = list.data;
        break;
      case "newsTwo":
        state.newTwoInfo = list.data;
        break;
      case "menu":
        state.menuInfo = list.data;
        break;
      case "phone":
        state.phoneInfo = list.data;
        break;
      case "driving":
        state.drivingInfo = list.data;
        break;
      case "robot":
        state.robotInfo = list.data;
        break;
      case "intension":
        state.intensionInfo = list.data;
        break;
    }
    console.log(200,list.data);
  },
  ERROR(){
    state.loading = "fail";
    alert("获取数据失败");
  },

  TITLEINFO(state, index) {
    state.headTitle = state.titleArr[index];
  },


  SETDATA(state, index){
    let arr = [];
    if (index) {
      arr = arms.data;
      if (typeof(arr[0].item_id) == "number") {
        for (let i in arr) {
          arr[i].item_id = `http://game.gtimg.cn/images/yxzj/img201606/itemimg/${arr[i].item_id}.jpg`
        }
      }
      state.armsData = arr;
    } else {
      arr = hero.data;
      for (let i in arr) {
        arr[i].hero_id = `http://cdn.tgp.qq.com/kog/v3/images/heroPortrait/${arr[i].hero_img_id}.png`
      }
      state.heroData = arr;
    }
  }

};

export default new vueX.Store({
  state,
  mutations,
  actions
})
