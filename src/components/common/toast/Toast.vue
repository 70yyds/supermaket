<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  /* props: {
    message: {
      type: String,
      default: "hhh",
    },
  }, */
  methods: {
    show(message='默认文本',duration=2000){
      this.isShow=true;
      this.message=message

      setTimeout(()=>{
        this.isShow=false;
        this.message=''
      },duration)
    }
  },
};
</script>

<style scpoed>
.toast {
  position: fixed;
  right: 30%;
  bottom: 60%;
  width: 140px;
  height: 25px;
  line-height: 25px;
  background-color: black;
  opacity: 0.8;
  border-radius: 5px;
  text-align: center;
  color: white;
  z-index: 9999;
}
</style>