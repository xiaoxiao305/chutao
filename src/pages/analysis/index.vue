<template>
  <view class="bg">
    <view class="content-logo">
      <image @click="increase" src="https://report-beijing-dev.oss-cn-beijing.aliyuncs.com/6/10/1/093ab9b1-e44d-44ac-8652-2b110fcfd338.gif"></image>
    </view>

    <view>正在努力计算{{ state.num }}%</view>
  </view>
  <progress
    :percent="state.num"
    stroke-width="5"
    activeColor="#DF67A4"
    backgroundColor="#d0dafc"
  />
</template>
<style>
.bg {
  text-align: center;
  width: 100vw;
  height: calc(100vh - 5px);
  background: -webkit-radial-gradient(circle, #fff 50%, #8e9bcc);
}
.content-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;
}
</style>
<script>
import { reactive } from "vue";
export default {
  setup() {
    name: reactive;
    const state = reactive({ num: 0 });
	let rand = Math.floor(Math.random() * (80 - 33)) + 1;
	for (let i = 0; i < rand; i++) {
	  setTimeout(function () {
	    state.num++;
	  },10 * i);
	}
	setTimeout(() => {
	  for (let i = state.num; i < 100; i++) {
	    setTimeout(function () {
	      if (state.num < 100) {
	        state.num++;
	      }
	    }, 30 * i);
	  }
	}, 1000);
	setTimeout(function () {
	    uni.navigateTo({
	      url: "/pages/result/index",
	    });
	}, 1000);
    // let rand = Math.floor(Math.random() * (80 - 33)) + 1;
    // for (let i = 0; i < rand; i++) {
    //   setTimeout(function () {
    //     state.num++;
    //   }, 50 * i);
    // }
    // setTimeout(() => {
    //   for (let i = state.num; i < 100; i++) {
    //     setTimeout(function () {
    //       if (state.num < 100) {
    //         state.num++;
    //       }
    //     }, 30 * i);
    //   }
    // }, 2000);
    // setTimeout(function () {
    //     uni.navigateTo({
    //       url: "/pages/result/index",
    //     });
    // }, 6000);

    return {
      state,
    };
  },
  onShow: function () {},
};
</script>