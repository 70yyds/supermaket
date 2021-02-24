<template>
  <div class="item">
    <check-button
      class="checkbutton"
      :ischecked="product.checked"
      @click.native="checkclick"
    />
    <div class="left"><img :src="product.image" alt="" /></div>
    <div class="right">
      <span class="title">{{ product.title }}</span>
      <br />
      <div class="desc">
        <span>{{ product.desc }}</span>
      </div>
      <div class="price">{{ "¥" + product.price }}</div>
      <div class="count">{{ "×" + product.count }}</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkbutton/CheckButton";
export default {
  data() {
    return {
      counter: 0,
      imglength: 0,
    };
  },
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    checkclick() {
      this.product.checked = !this.product.checked;
      console.log(this.product);
    },
  },
};
</script>

<style scoped>
.item {
  padding: 10px;
  display: flex;
  border-bottom: 1px solid rgb(211, 211, 211);
}
.checkbutton {
  border-radius: 25px;
  margin-top: 30px;
  width: 20px;
  height: 20px;
}
.item .left {
  margin-left: 15px;
  width: 18%;
}
.left img {
  border: 1px;
  border-radius: 5px;
  width: 100%;
  height: auto;
}
.right,.right .desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.right {
  width: 78%;
  font-size: 15px;
  padding-left: 10px;
}
.right .desc {
  margin-top: 10px;
  color: gray;
  font-size: 13px;
}
.right .price {
  width: 85%;
  display: inline-block;
  color: red;
  padding-top: 30px;
}
.right .count {
  display: inline-block;
  color: gray;
}
</style>