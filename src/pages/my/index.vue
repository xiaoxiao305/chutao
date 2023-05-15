<template>
  <view class="all">
	<view v-for="(item, index) in profileList" :key="index">
    <view class="list" @click="goXiangqing">
      <view class="rank">  No.00{{index+1}} </view>
      <view class="line"></view>
      <view class="msg">
        <view class="top">
          <view class="progress1">
            <tui-circular-progress
              diam="55"
              lineWidth="4"
              progressColor="#b9dfb8"
              defaultColor="#EDFAED"
            :percentText="GetHealthScore(item)"
              fontSize="20"
              fontColor="#333"
              >健康指数(分)</tui-circular-progress
            >
          </view>
          <view class="person">
            <span class="name">{{item.name}}</span>
            <span
            	:class="item.gender == 1 ? 'icon iconfont icon-nan sex' : 'icon iconfont icon-nv sex'"></span>
            <view class="descript">
            	<view class="descript-item">中年</view>
            	<view class="descript-item">{{item.age}}岁</view>
            	<view class="descript-item">{{item.height}}cm</view>
            	<view class="descript-item">{{item.weight}}kg</view> 
            </view>
          </view>
          <view class="img">
            <image
              style="width: 100rpx; height: 100rpx; border-radius: 50rpx"
              mode="aspectFill"
              src="../../static/img/touxiang.jpg"
            />
          </view>
        </view>
       <view class="buttonGroup2">
       	<view class="del" @click.stop="delProfile(item)">
       		<view class="icon iconfont icon-icon"></view>
       	</view>
       	<button class="btn2" @click.stop="goDetail(item)">智能推荐</button>
       	<button class="btn2">健康指数</button>
       </view>
      </view>
    </view>
  </view>
  <view class="buttonGroup">
  	<button class="btn fill">
  	<tui-icon
  	  class="icon"
  	  name="evaluate"
  	  :size="20"
  	  color="#CB8BB6"
  	></tui-icon>
  	创建个人档案
  	</button>
  </view>
  </view>
</template>

<script>
import profiles from "../../api/profiles";
import common from "../../utils/common"; 
import api from "../../utils/api"; 
export default {
  data() {
    return {
      title: "Hello",
	  profileList: []
    };
  },
  onLoad() {},
  methods: {
    goXiangqing () {
      uni.navigateTo({
        url:'/pages/edit-person/index'
      })
    },
	delProfile(u){
		var that=this;
		 uni.showModal({
			 title: '确认',
			 content: '确认要删除【'+u.name+'】的档案信息吗?',
			 success:res=>{
				if(res.confirm) {  
					u.status=2
					this.delProfile2({data:JSON.stringify(u),token:uni.getStorageSync("token")})
				 }
			 }})
	},
	async delProfile2(data){
		try {
			const res = await api.delProfile(data);
			if (res.Code == 1) {
				this.profileList = this.profileList.filter((item) => {
				  return item.id != JSON.parse(res.Info).id;
				}); 
			    uni.setStorageSync("profilesList",this.profileList);
			}
		} catch (e) {
			console.log("catch", e);
			//TODO handle the exception
		}
	},
	goDetail(u){ 
		uni.setStorageSync("cur_profile",u);
		uni.navigateTo({
			url: "/pages/analysis/index",
		});
	},
	GetHealthScore(u){
		return common.GetHealthScore(u)
	},
	GetAnswer(u){
		var res= common.GetAnswer(u)
		if(res !=null)return res.answer;
		return ""
	},
	GetSuggest(u){
		var res= common.GetAnswer(u)
		if(res !=null)return res.suggest;
		return ""
	},
	async profiles(data) {
		try {
			const res = await profiles(data);
			console.log("profiles", res);
			if (res.Code == 1) {
				this.profileList = JSON.parse(res.Info)||[]
				console.log("profileList", this.profileList);
				uni.setStorageSync("profilesList",this.profileList);
			}
		} catch (e) {
			console.log("catch", e);
			//TODO handle the exception
		}
	},
  },
  created() {
  	this.profileList =   uni.getStorageSync("profilesList")||[];
  	if(this.profileList.length<1){
  		this.profiles({
			data:JSON.stringify({status:1}),
  			token: uni.getStorageSync("token")
  		});
  	}
  }
};
</script>

<style>
.all {
  background: #cdd3e6;
  min-height: 100vh;
  width: 100vw;
  padding-top: 40rpx;
}
.list {
  margin-bottom: 40rpx;
}

.rank {
  width: 130px;
  height: 30px; /* 宽高 */
  background-color: rgba(248, 248, 248, 0.7); /* 颜色 */
  border-radius: 15px 15px 0 0; /* 设置圆角 */
  transform: perspective(15px) scale(1.1, 1.3) rotateX(5deg);
  transform-origin: bottom left;
  padding: 15rpx 25rpx;
  color: #737d9c;
  font-size: 26rpx;
  margin-left: 70rpx;
}

.msg {
  width: 75vw;
  position: relative;
  background-color: #fff;
  top: -28rpx;
  margin-left: 70rpx;
  border-radius: 30rpx;
  padding: 30rpx;
}
.msg:after {
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  background: #cdd3e6;
  border-radius: 100%;
  right: 0;
  top: 210rpx;
  transform: translate(50%, -50%);
}

.msg:before {
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  background: #cdd3e6;
  border-radius: 100%;
  left: 0;
  top: 210rpx;
  transform: translate(-50%, -50%);
}
.top {
  display: table;
}
.progress1 {
  display: table-cell;
  font-size: 18rpx;
  text-align: center;
  width: 80rpx;
}

.person {
  display: table-cell;
  /* width: 400rpx; */
  vertical-align: top;
}
.name {
  padding: 0 20rpx;
  font-size: 34rpx;
}
.sex {
  font-size: 34rpx;
}

.img {
  position: relative;
  top: -30rpx;
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
.line {
  display: block;
  width: 100%;
  height: 1px;
  background: #cdd3e6;
  position: relative;
  top: 185rpx;
  z-index: 3;
}

.buttonGroup2 {
  display: inline-block;
  width: 90%;
  margin: 70rpx 20rpx 0 20rpx;
  vertical-align: top;
}

.del {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  width: 60rpx;
  height: 60rpx;
  background: #f3f7f3;
  border-radius: 30rpx;
  text-align: center;
}

.btn2 {
  display: inline-block;
  float: right;
  margin-left: 30rpx;
  width: 180rpx;
  font-size: 26rpx;
  background: #8e9bcc;
  color: #fff;
  border: none;
  border-radius: 30rpx;
}

.buttonGroup {
  position: fixed;
  bottom: 0rpx;
  width: 70vw;
  margin: 5vw 15vw;
  /* flex-direction: column;
  align-items: center;
  justify-content: center; */
}

.btn {
  margin-bottom: 40rpx;
  border-radius: 20rpx;
}

.fill {
  background: #fff;
  color: #333;
  font-size: 28rpx;
  border: 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
