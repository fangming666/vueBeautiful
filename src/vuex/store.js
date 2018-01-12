/**
 * Created by DELL on 2017/12/29.
 */
import vue from "vue";
import vueX from "vuex";
import axios from "axios";
import * as actions from "./action";
import * as data from "../../static/json/db.json";
import * as hero from "./../../static/json/hero.json"
import * as arms from "./../../static/json/arms.json"

vue.use(vueX);

const state = {
  data: data.data,
  loading:"",
  loadings:"",
  cityInfo: "",
  newOneInfo:"",
  newTwoInfo:"",
  menuInfo:"",
  phoneInfo:"",
  drivingInfo:"",
  robotInfo:"",
  intensionInfo:"",
  spinning:"",
  headTitle: "武器",
  titleArr: ["武器", "英雄"],
  heroData: hero.data,
  armsData: arms.data,
  robotImg:"http://fm.xiaofany.com/APIpage/imgs/robot.png"
};

const mutations = {
  LOADING(start){
    axios.interceptors.request.use(function(config){    //在请求发送之前做一些事，比如说 设置loading动画显示
      start.loadings = "loading";
      start.spinning = true;
      return config;
    },function(error){
      return Promise.reject(error);
    });
//添加一个返回拦截器
    axios.interceptors.response.use(function(response){
      //对返回的数据进行一些处理，比如说把loading动画关掉
      start.loadings = "success";
      start.spinning = false;
      // setTimeout(start.loadings = "",100);
      return response
    },function(error){
      //对返回的错误进行一些处理
      start.loadings = "fail";
      // setTimeout(start.loadings = "",100);
    });
  },
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
    // alert("获取数据失败");
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
