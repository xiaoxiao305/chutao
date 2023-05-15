<template>
  <view class="back">
    <view
      class="back"
      :style="'padding-top:' + (titletop + 4) + 'px'"
      @click="back_page"
    >
      <uni-icons color="#000" size='24' type="back" />
    </view>
  </view>
  <view class="bg">
    <view class="msg">
      <view class="top">
        <view class="img">
          <image
            style="width: 100rpx; height: 100rpx; border-radius: 50rpx"
            mode="aspectFill" 
			src="../../static/img/touxiang.jpg"
          />
        </view>
        <view class="personmsg">
          <view class="person"> 
            <span class="name">{{curProfile.name}}</span>
            <span class="icon iconfont  sex" :class="curProfile.gender==1?'icon-nan':'icon-icon-nv'"></span>
          </view>
          <view class="descript">
            <view class="descript-item">中年 | </view>
            <view class="descript-item">{{curProfile.age}}岁 | </view>
            <view class="descript-item">{{curProfile.weight}}kg</view>
          </view>
        </view>
      </view>
      <view class="fenxi">
        <view class="fenxiitem">
          <view class="fontGroup">
            <view class="font1">3180</view>
            <view class="font2">建议日所需能量(kcl)</view>
          </view>
        </view>
        <view class="fenxiitem">
          <view class="fontGroup">
            <view class="font1">58</view>
            <view class="font2">体型标准(kg)</view>
          </view>
        </view>
        <view class="fenxiitem">
          <view class="fontGroup">
            <view class="font1">800</view>
            <view class="font2">每日饮食(g)</view>
          </view>
        </view>
        <view class="fenxiitem">
          <view class="fontGroup">
            <view class="font1">{{healthScore}}</view>
            <view class="font2">健康指数(分)</view>
          </view>
          <!-- <view class="progress1">
            <tui-circular-progress
                percentage="60"
                diam="55"
                lineWidth="4"
                progressColor="#CDD3E6"
                defaultColor="#F9D5E6"
                percentText="60"
                fontSize="20"
                fontColor="#333"
                >健康指数(分)
                </tui-circular-progress>
          </view> -->
        </view>
      </view>
      <view class="recommendGroup-item">
        <view class="recommendGroup-item-icon">
          <view class="icon iconfont icon-shujufenxi-liuliangfenxi"></view>
        </view>
        <view class="recommendGroup-item-font">
          <view class="recommendGroup-item-font1">健康分析</view>
          <view class="recommendGroup-item-font2">{{ analysis.answer }}</view>
        </view>
      </view>
      <view class="recommendGroup-item">
        <view class="recommendGroup-item-icon">
          <view class="icon iconfont icon-yinshibaike"></view>
        </view>
        <view class="recommendGroup-item-font">
          <view class="recommendGroup-item-font1">饮食及运动建议</view>
          <view class="recommendGroup-item-font2">{{ analysis.suggest }}</view>
        </view>
      </view>
      <view class="recommendGroup-item">
        <view class="recommendGroup-item-erweima">
          <image
            style="
              width: 90rpx;
              height: 90rpx;
              border-radius: 10rpx;
              border: 5px solid #ccd3e6;
            "
            mode="aspectFill"
            src="../../static/img/erweima.png"
          />
        </view>
        <view class="recommendGroup-item-font">
          <view class="recommendGroup-item-font2"
            >您也可以添加我们的私人教练，对您进行指</view
          >
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { reactive } from "vue";
import common from "../../utils/common"; 
export default {
  name: reactive,
  setup() {
    // const state = reactive({ fenxi: null, tuijian: null });
    // uni.getStorage({
    //   key: "fenxi",
    //   success: function (res) {
    //     state.fenxi = res.data;
    //   },
    // });
    // uni.getStorage({
    //   key: "tuijian",
    //   success: function (res) {
    //     state.tuijian = res.data;
    //   },
    // });
    // return {
    //   state,
    // };
  },
  data() {
    return {
      titleheight: 0,
      titletop: 0,
	  curProfile:{},
	  healthScore:0,
	  analysis:{answer:"",suggest:""}
    };
  },
  //这里原来使用的onLoad一直有bug（不重新进入页面就会错位），
  // 后来使用onShow  更改于2022/09/30  以后再修改
  onShow() {
    //加载时调用 getHeight
    this.getHeight();
	this.initCurProfile()
  },
  methods: {
    //利用胶囊按钮定位宽高
    getHeight() {
      let res = uni.getMenuButtonBoundingClientRect();
      this.titletop = res.top;
      this.titleheight = res.height;
    },
	initCurProfile(){
		this.curProfile=uni.getStorageSync("cur_profile")||{}
		console.log("initCurProfile:",this.curProfile)
		this.healthScore=common.GetHealthScore(this.curProfile)
		this.analysis=common.GetAnswer(this.curProfile)
	},

    //直接返回上一级
    back_page() {
      uni.redirectTo({
        url:'/pages/index/index'
      });
    },
  },
};
</script>
<style>
.back {
  background: #f5f5f5;
}
.recommendGroup-item {
  display: flex !important;
  align-items: flex-start;
  display: inline-block;
  vertical-align: top;
  background: #fff;
  border-radius: 20rpx;
  width: 95%;
  margin-bottom: 30rpx;
}
.recommendGroup-item-icon {
  width: 100rpx;
  height: 150rpx;
  background: #f5f5f5;
  border-radius: 20rpx;
  margin: 30rpx 30rpx 0rpx 30rpx;
  position: relative;
}
.recommendGroup-item-erweima {
  border-radius: 20rpx;
  margin: 30rpx 30rpx 0rpx 30rpx;
  position: relative;
}

.recommendGroup-item-font {
  margin: 30rpx 0rpx;
  width: 70%;
}

.recommendGroup-item-font1 {
  font-size: 28rpx;
  margin-bottom: 25rpx;
}
.recommendGroup-item-font2 {
  font-size: 24rpx;
  line-height: 48rpx;
}
.bg {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.msg {
  padding: 30rpx;
}

.top {
  display: table;
}
.progress1 {
  font-size: 18rpx;
  text-align: center;
  position: relative;
  top: -15rpx;
}

.personmsg {
  display: inline-block;
}
.name {
  padding: 0 20rpx;
  font-size: 34rpx;
}
.sex {
  font-size: 34rpx;
}

.img {
  display: inline-block;
}

.descript {
  display: inline-block;
  width: 350rpx;
  word-wrap: break-word;
}

.descript-item {
  display: inline-block;
  margin-right: 20rpx;
  font-size: 24rpx;
  margin: 20rpx 0rpx 0rpx 20rpx;
}

.fenxi {
  display: flex;
  vertical-align: top;
}
.fenxiitem {
  display: flex;
  flex-direction: column;
  /* co1umn 从上到下*/
  align-items: center;
  /* center代表水平方向 */
  justify-content: center;
  width: 20vw;
  height: 20vw;
  background: #fff;
  border-radius: 20rpx;
  margin: 10rpx 10px 10px 0;
  text-align: center;
  margin-top: 40rpx;
}

.fontGroup {
}

.font1 {
  font-size: 34rpx;
  font-weight: 600;
}
.font2 {
  font-size: 18rpx;
}
</style>
