<template id='app'>
	<view class="all">
		<view class="title">Mr.HiMi</view>
		<view class="content">
		<!-- 	<image class="content-logo" @click="increase"
				src="https://report-beijing-dev.oss-cn-beijing.aliyuncs.com/6/10/1/511dbfb5-a2e9-48cd-86dc-d212e889435d.gif">
			</image> -->
			<image class="content-logo"
				src="https://report-beijing-dev.oss-cn-beijing.aliyuncs.com/6/10/1/511dbfb5-a2e9-48cd-86dc-d212e889435d.gif">
			</image>																		
		</view>
		<view class="font">
			<view class="font1">按照个人的运动状态</view>
			<view class="font1">智能制定您的出桃指南</view>
			<view class="font2">仅需30秒</view>
		</view>
		<view class="buttonGroup" v-if="state.status == false">
			<button class="btn fill" color="#333333" background="#ffffff" @click="goAdd">
				<tui-icon class="icon" name="time" :size="20" color="#CB8BB6"></tui-icon>
				开始制定
			</button>
			<button @click="goAdd" v-if="state.status == false" class="btn transparent" color="#333333"
				background="transparent" borderColor="#fff" borderWidth="5px">
				<tui-icon class="icon" name="order" :size="20" color="#fff"></tui-icon>
				健康指数测试
			</button>
		</view>
		<view v-else>
			<view class="buttonGroup">
				<button class="btn fill" @click="goAdd">
					<tui-icon class="icon" name="evaluate" :size="20" color="#CB8BB6"></tui-icon>
					创建个人档案
				</button>
			</view>
<!-- {{profileList}} -->
			<view v-for="(item, index) in profileList" :key="index">
				<view class="list" @click="goXiangqing">
					<view class="rank"> No.00{{index+1}} </view>
					<view class="line"></view>
					<view class="msg">
						<view class="top">
							<view class="progress1">
								<tui-circular-progress diam="55" lineWidth="4" progressColor="#CDD3E6"
									defaultColor="#F9D5E6" :percentText="GetHealthScore(item)" fontSize="20"
									fontColor="#333">健康指数(分)</tui-circular-progress>
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
						</view>

						<view class="buttonGroup2">
							<view class="del" @click.stop="delProfile(item)">
								<view class="icon iconfont icon-icon"></view>
							</view>
							<button class="btn2" @click.stop="goDetail(item)">智能推荐</button>
							<button class="btn2">健康指数</button>
						</view>
					</view>
					<view class="recommendGroup">
						<view class="recommendGroup-title"></view>
						<view class="recommendGroup-content">
							<view class="recommendGroup-content-top"></view>
							<view class="recommendGroup-item">
								<view class="recommendGroup-item-icon">
									<view class="icon iconfont icon-yinshibaike"></view>
								</view>
								<view class="recommendGroup-item-font">
									<view class="recommendGroup-item-font1">饮食建议</view>
									<view class="recommendGroup-item-font2">{{GetSuggest(item)}}</view>
								</view>
							</view>
							<view class="line2"></view>

							<view class="recommendGroup-item">
								<view class="recommendGroup-item-icon">
									<view class="icon iconfont icon-shujufenxi-liuliangfenxi"></view>
								</view>
								<view class="recommendGroup-item-font">
									<view class="recommendGroup-item-font1">健康分析</view>
									<view class="recommendGroup-item-font2">{{GetAnswer(item)}}</view>
								</view>
							</view>
							<!-- <view class="recommendGroup-item"></view> -->
						</view>
					</view>
				</view>
			</view>
 
		</view>
	</view>
		<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="info" cancelText="关闭" confirmText="立即登录" title="  " content="欢迎使用!"
			@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	import {
		createApp,
		reactive
	} from "vue";
	import dayjs from "dayjs";
	import login from "../../api/login";
	import profiles from "../../api/profiles";
	import common from "../../utils/common"; 
	import api from "../../utils/api"; 
	import {
		objGet
	} from "../../uni_modules/uni-forms/components/uni-forms/utils";
	export default {
		name: "reactive",
		setup() {
			const state = reactive({
				status: false,
				wxOpenId: null
			});

			function increase() {
				state.status = !state.status;
			}
			return {
				state,
				increase
			};
		},

		data() {
			return {
				code: "122",
				profileList: []
			};
		},
		created() { 
			this.onLoad()
		},
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
			onLoad() {
				console.log("onLoad")
 // uni.removeStorageSync("token");
				console.log(uni.getStorageSync("token"));
				if (!uni.getStorageSync("token")) {
					console.log("getStorageSync token is empty")
					wx.login({
						success: (code) => {
							if (code.code) {
								// this.code = code.code;
								this.code="testcode"
								console.log("code:",this.code);
							} else {
								uni.showToast({
									icon: "none",
									title: "获取用户登录信息失败:" + code.msg,
								});
							}
						},
					});
				} else {
					console.log("have login go profiles")
					this.state.status=true 
				    this.profileList =   uni.getStorageSync("profilesList")||[];
					if(this.profileList.length<1){
						this.profiles({data:JSON.stringify({status:1}),
							token: uni.getStorageSync("token")
						});
					}
				}
			},
			dialogConfirm() {
				console.log("点击确认");
				wx.getUserProfile({
					desc: "Wexin", // 这个参数是必须的
					success: (res) => {
						let rawData = res.userInfo; //将数据处理为前端使用的json格式
						const data = Object.assign(rawData, {
							opr_time: dayjs().unix(),
							code: this.code,
						});
						// let m_AppId = "wx6f2bb1822b978c80"; // appid
						// let m_mi = "a3d26622fd38830cd67cc7adccfd1c98"; // 小程序密钥
						// let url =
						// 	"https://api.weixin.qq.com/sns/jscode2session?appid=" +
						// 	m_AppId +
						// 	"&secret=" +
						// 	m_mi +
						// 	"&js_code=" +
						// 	this.code +
						// 	"&grant_type=authorization_code";
						// wx.request({
						// 	url: url,
						// 	success: (res) => {
						// 		this.state.wxOpenId = res.data.openid
						// 		//获取到你的openid
						// 		uni.setStorageSync('wxopenid', res.data.openid)
						// 	},
						// });
						this.user(JSON.stringify(data));
					},
					fail: (err) => {
						uni.showToast({
							icon: "none",
							title: "您拒绝提供信息,将无法正常使用小程序",
						});
					},
				});
			},
			dialogClose() {
				console.log("点击关闭");
			},
			goAdd() {
				if (uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/add-person/index",
					});
				} else {
					this.$refs.alertDialog.open();
				}
			},

			async user(data) {
				try {
					const res = await login({
						data: data
					});
					if (res.Token) {
						uni.setStorageSync("token", res.Token);
						uni.navigateTo({
							url: "/pages/add-person/index",
						});
					}
				} catch (e) {
					console.log("catch", e);
					//TODO handle the exception
				}
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
	};
	// console.log(state.status)
</script>


<style>
	.all {
		background: #cdd3e6;
		min-height: 100vh;
		width: 100vw;
	}

	.title {
		padding-top: 50rpx;
		font-size: 38rpx;
		color: #fff;
		font-weight: 600;
		padding: 30px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 100rpx;
	}

	.content-logo {
		height: 300rpx;
		width: 300rpx;
		border-radius: 50%;
	}

	.font {
		width: 70vw;
		margin: 50rpx auto;
	}

	.font1 {
		font-size: 36rpx;
		color: #fff;
		line-height: 60rpx;
	}

	.font2 {
		font-size: 22rpx;
		color: #fff;
		line-height: 60rpx;
	}

	.buttonGroup {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn {
		width: 70vw;
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

	.transparent {
		background: transparent;
		color: #333;
		font-size: 28rpx;
		border: 5rpx solid #fff;
	}

	.icon {
		margin-right: 10rpx;
	}

	.list {
		margin-bottom: 40rpx;
	}

	.rank {
		width: 130px;
		height: 30px;
		/* 宽高 */
		background-color: rgba(248, 248, 248, 0.7);
		/* 颜色 */
		border-radius: 15px 15px 0 0;
		/* 设置圆角 */
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
		width: 500rpx;
		vertical-align: top;
	}

	.name {
		padding: 0 20rpx;
		font-size: 34rpx;
	}

	.sex {
		font-size: 34rpx;
	}

	.descript {
		display: inline-block;
		width: 450rpx;
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
		margin: 50rpx 20rpx 10rpx 20rpx;
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

	.recommendGroup-title {
		width: 84vw;
		height: 30rpx;
		background: #afbce5;
		margin-left: 70rpx;
		border-radius: 15rpx;
	}

	.recommendGroup-content {
		width: 80vw;
		margin-left: 85rpx;
		position: relative;
		top: -15rpx;
		background: #fff;
		border-radius: 0 0 30rpx 30rpx;
	}

	.recommendGroup-content-top {
		background-image: linear-gradient(to bottom, #afbce5, #fff);
		height: 30rpx;
		width: 100%;
	}

	.recommendGroup-item {
		display: flex;
		vertical-align: top;
	}

	.recommendGroup-item-icon {
		display: inline-block;
		width: 100rpx;
		height: 150rpx;
		background: #f5f5f5;
		border-radius: 20rpx;
		margin: 30rpx;
		position: relative;
	}

	.recommendGroup-item-font {
		margin: 30rpx 30rpx 30rpx 0;
		display: inline-block;
	}

	.recommendGroup-item-font1 {
		font-size: 28rpx;
		margin-bottom: 25rpx;
	}

	.recommendGroup-item-font2 {
		font-size: 24rpx;
		line-height: 48rpx;
	}

	.line2 {
		width: 100%;
		height: 1px;
		background: #e9e9e9;
	}
</style>

