import Vue from 'vue'
import Router from 'vue-router'
const content = () => import('./../components/content.vue');
const news = () => import('./../components/page/news.vue');
const weather = () => import("./../components/page/weather.vue");
const driving = () => import("./../components/page/driving.vue");
const menu = () => import("./../components/page/menu.vue");
const phone = () => import("./../components/page/phone.vue");
const qq = () => import("./../components/page/qq.vue");
const wzry = () => import("./../components/page/wzry/wzry.vue");
const hero = () => import('./../components/page/wzry/hero.vue');
const arms = () => import("./../components/page/wzry/arms.vue");
const intension = () => import("./../components/page/intension.vue");
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'content',
      component: content
    }, {
      path: "/weather/:title",
      name: "weather",
      component: weather,
      props: true
    }, {
      path: "/intension/:title",
      name: "intension",
      component: intension,
      props: true
    }, {
      path: "/news/:title",
      name: "news",
      component: news,
      props: true
    }, {
      path: "/driving/:title",
      name: "driving",
      component: driving,
      props: true
    }, {
      path: "/menu/:title",
      name: "menu",
      component: menu,
      props: true
    }, {
      path: "/phone/:title",
      name: "phone",
      component: phone,
      props: true
    },
    {
      path: "/qq/:title",
      name: "qq",
      component: qq,
      props: true
    },
    {
      path: "/wzry/:title",
      name: "wzry",
      component: wzry,
      props:true,
      children:[
        {
          path: '/wzry/arms/:title2',
          name: 'arms',
          component: arms,
          props: true
        }, {
          path:"/wzry/hero/:title2",
          name:"hero",
          component:hero,
          props: true
        },
      ]
    },
  ]
})
