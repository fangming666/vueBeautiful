<template lang="pug">
  div.header(class=["text-center"]) {{title}} #[i(class=["fa","pull-left","fa-angle-left"], @click="initial")]
</template>
<script>
  export default{
    props: ["title"],
    methods: {
      initial(){
        this.$router.push({path: "/"})
      },
    },
  }
</script>
