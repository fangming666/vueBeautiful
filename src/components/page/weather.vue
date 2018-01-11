<template lang="pug">
  transition(name="fade")
    div.weather
      headS(:title="title")
      div.content
        modelS(:urlS="URLs", :type="type", :label="label", :placeholder="placeholder", :disc="disc")
        p.text-danger(v-if="showDanger") 请输入正确的城市名称
        p(v-for="(item,index) in titleArr", v-if="!showDanger&&cityInfo")
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
        type: "city",
        label: "城市",
        disc:0,
        placeholder: "请输入需要查询的城市",
        URLs: "http://fm.xiaofany.com/APIpage/weather.php",
        titleArr: ["城市", "天气", "最高温度", "风向", "风速", "AQI指数", "臭氧一小时平均", "空气质量", "对健康的影响", "更新时间", "最低温度"]
      }
    },
    props: ["title"],

    created(){
//      console.log(1, this.cityInfo)
    },
    computed: {
      ...mapState(["cityInfo"]),
      contentArr(){
        let arr = [];
        if (this.cityInfo) {
          arr.push(this.cityInfo.result.HeWeather5[0].basic.city,this.cityInfo.result.HeWeather5[0].daily_forecast[0].cond.txt_d,this.cityInfo.result.HeWeather5[0].daily_forecast[0].tmp.max,this.cityInfo.result.HeWeather5[0].daily_forecast[0].wind.dir,this.cityInfo.result.HeWeather5[0].daily_forecast[0].wind.spd,this.cityInfo.result.HeWeather5[0].aqi.city.aqi,this.cityInfo.result.HeWeather5[0].aqi.city.o3,this.cityInfo.result.HeWeather5[0].suggestion.air.brf,this.cityInfo.result.HeWeather5[0].suggestion.air.txt,this.cityInfo.result.HeWeather5[0].basic.update.utc,this.cityInfo.result.HeWeather5[0].daily_forecast[0].tmp.min);
          return arr;
        }
      },
      showDanger(){
          if(this.cityInfo){
              if(this.cityInfo.result.HeWeather5[0].status === 'unknown city' ){
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

