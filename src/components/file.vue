<template lang="pug">
  div.file-warp
    headS(:title="title")
    div.file
      i(class=["fa", " fa-plus"])
      input(type="file", ref="yin", accept="image/*", @change="changeS")
    p.text-center(v-show="!imgS") 点击上传
    div.file-show(v-show="imgS")
      img(:src="imgS", :class="resultImg")
    div.Cao
        ul.clearfix(ref="itemS")
          li.pull-left(v-for="item in Arr", @click="imgChange(item.class)")
            img(src="http://fm.xiaofany.com/APIpage/imgs/wzry.jpg", :class="item.class")
            p {{item.name}}
</template>
<script>
  import BScroll from 'better-scroll';
  import headS from "./header.vue"
  export default{
    data(){
      return {
        imgS: "",
        resultImg: "",
        Arr: [{"name": "原图", "class": ""}, {"name": "黑白", "class": "filter-grayscale"}, {
          "name": "模糊",
          "class": "filter-blur"
        }, {
          "name": "反相",
          "class": "filter-invert"
        }, {"name": "透明", "class": "filter-opacity"}, {"name": "饱和", "class": "filter-saturate"}, {
          "name": "怀旧",
          "class": "filter-sepia"
        }],
      }
    },
    methods: {
      changeS(){
        let formdata = new FormData();
        formdata.append('file', this.$refs.yin.files[0]);
        this.$axios({
          url: 'http://fm.xiaofany.com/phone/file_updata.php',
          method: 'post',
          data: formdata,
        }).then((res) => {
          this.imgS = `http://fm.xiaofany.com/phone/upload/${res.data}`;
        });

      },
      imgChange(item){
        console.log(item);
        this.resultImg = item;
      }
    },
    props: ["title"],
    components: {
      headS
    },
    created(){
//      this.$nextTick(() => {
//        this.scroll = new BScroll(this.$refs.itemS, {scrollY: true})
//      })
    }
  }
</script>
