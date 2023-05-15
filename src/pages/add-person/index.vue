<template>
	<view class="step" v-if="state.step > 4">
		<uni-steps :options="list1" active-color="#CDD3E6" :active="state.active" class="step-step" />
		<view class="step-num"><span style="color: #8e9bcc">{{ state.step }}</span>/9</view>
	</view>
	<view class="msg">
		<view>
			<view class="img" v-if="state.step < 5">
				<uni-file-picker limit="1" :del-icon="false" disable-preview :imageStyles="imageStyles"
					file-mediatype="image">
					<uni-icons type="camera" size="45" color="#CDD3E6"></uni-icons>
				</uni-file-picker>
			</view>

			<uni-section class="mb-10 weight" v-if="state.step < 5" title="怎么称呼您" type="line">
				<input type="text" placeholder="请输入姓名" class="name" :value="state.name" @change="setname" />
			</uni-section>
			<uni-section class="mb-10" v-if="state.step > 1 && state.step < 5" title="您的性别" type="line">
				<uni-data-checkbox :value="state.sex" mode="tag" :localdata="sex" @change="setsex"></uni-data-checkbox>
			</uni-section>
			<uni-section class="mb-10" v-if="state.step > 2 && state.step < 5" title="您每周的运动次数" type="line">
				<uni-data-checkbox mode="tag" :localdata="sportNum" :value="state.sportnum"
					@change="setsportnum"></uni-data-checkbox>
			</uni-section>
			<uni-section class="mb-10" v-if="state.step > 3 && state.step < 5" title="每次运动的有氧时间" type="line">
				<uni-data-checkbox mode="tag" :localdata="sportTime" @change="setsporttime"
					:value="state.sportTime"></uni-data-checkbox>
			</uni-section>
			<uni-section class="mb-10 weight" v-if="state.step > 4 && state.step < 6" title="您的年龄（岁）" type="line">
				<picker mode="date" :value="state.age" :start="startDate" :end="endDate" @change="setage">
					<input type="number" placeholder="请选择年龄" class="name" disabled :value="state.age" />
				</picker>
			</uni-section>
			<uni-section class="mb-10 weight" v-if="state.step > 5 && state.step < 7" title="您的身高（cm）" type="line">
				<picker @change="settop" :value="state.top" :range="num">
					<input type="number" placeholder="请选择身高" class="name" :value="state.top" disabled />
				</picker>
			</uni-section>
			<uni-section class="mb-10 weight" v-if="state.step > 6 && state.step < 8" title="您近期的体重（kg）" type="line">
				<picker @change="setweight" :value="state.weight" :range="num">
					<input type="number" placeholder="请选择体重" class="name" :value="state.weight" disabled />
				</picker>
			</uni-section>
			<uni-section class="mb-10 weight" v-if="state.step > 7 && state.step < 9" title="近期的体态" type="line">
				<view class="titai">
					<view :class="
              state.titaiSelect == item.id ? 'titai-item-select' : 'titai-item'
            " v-for="(item, index) in imgList" :key="index" @click="setTitai(item)">
						<image :src="item.url" style="width: 12vw; height: 110px" />
						{{ titaiSelect }}
					</view>
				</view>
				<view class="content">{{ state.content }}</view>
			</uni-section>
			<uni-section class="mb-10" v-if="state.step == 9" title="您最近的皮肤状态" type="line">
				<uni-data-checkbox :value="state.pifu" mode="tag" :localdata="pifu"
					@change="setpifu"></uni-data-checkbox>
			</uni-section>
		</view>
	</view>
	<view class="buttonGroup2">
		<view class="group">
			<button v-if="state.step > 3 && state.sportTime > 1" class="btn2" @click="prev">
				上一步
			</button>
			<button v-if="state.step > 3 && state.step < 9 && state.sportTime > 1" class="btn2" @click="next">
				下一步
			</button>
			<button @click="goFenxi" v-if="state.step > 3 && state.sportTime == 1" class="btn">
				提交
			</button>
			<button @click="goFenxi" v-if="state.step == 9" class="btn2">提交</button>
		</view>
	</view>
</template>

<script>
	import {
		createApp,
		reactive
	} from "vue";
	import edit_profile from '@/api/edit_profile'
	import dayjs from 'dayjs';

	export default {
		name: "reactive",
		setup() {
			const state = reactive({
				titaiSelect: 1,
				content: '无脂肪覆盖,肋骨极易触及',
				sportTime: null,
				step: 1,
				active: -1,
				age: 18,
				sportnum: null,
				sex: null,
				name: null,
				top: 160,
				weight: 55,
				pifu: 1
			});
			const imgList = [{
					url: "../../static/img/shouruo.png",
					id: 1,
					content: "无脂肪覆盖,肋骨极易触及",
				},
				{
					url: "../../static/img/shou.png",
					id: 2,
					content: "轻薄脂肪覆盖,肋骨容易触及",
				},
				{
					url: "../../static/img/biaozhun.png",
					id: 3,
					content: "柔软脂肪覆盖,肋骨尚能触及",
				},
				{
					url: "../../static/img/pianpang.png",
					id: 4,
					content: "脂肪覆盖,肋骨需按压以触及",
				},
				{
					url: "../../static/img/pang.png",
					id: 5,
					content: "较厚脂肪覆盖,肋骨难以触及",
				},
			];

			function setTitai(props) {
				state.titaiSelect = props.id;
				state.content = props.content;
			}

			function setname(e) {
				console.log(e);
				if (e.detail.value) {
					state.name = e.detail.value;
					state.step = 2;
				}

			}

			function setsex(e) {
				if (e.detail.value) {
					state.sex = e.detail.value;
					state.step = 3
				}
			}

			function setsportnum(e) {
				if (e.detail.value) {
					state.sportnum = e.detail.value;
					state.step = 4
				}
			}

			function setsporttime(e) {
				state.sportTime = e.detail.value;
				uni.setStorage({
					key: "fenxi",
					data: "运动次数及时间都不足，建议先增加运动量。",
				});
				uni.setStorage({
					key: "tuijian",
					data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM, 配合新人左旋肉碱产品增加运动效果。",
				});
			}

			function setage(e) {
				var birthdays = new Date(e.detail.value.replace(/-/g, "/"));
				var d = new Date();
				var age =
					d.getFullYear() -
					birthdays.getFullYear() -
					(d.getMonth() < birthdays.getMonth() ||
						(d.getMonth() == birthdays.getMonth() &&
							d.getDate() < birthdays.getDate()));
				state.age = age;
			}

			function settop(e) {
				state.top = e.detail.value;
			}

			function setweight(e) {
				state.weight = parseInt(e.detail.value);
			}

			function setpifu(e) {
				state.pifu = e.detail.value;
				if (state.titaiSelect == 1 && e.detail.value == 1) {
					uni.setStorage({
						key: "fenxi",
						data: "您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。",
					});
				} else if (state.titaiSelect == 1 && e.detail.value == 2) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤暗淡，可能是缺乏维生素B族，例如动物肝脏，菠菜，新鲜牛奶等摄入量不足，及维生素C，L-抗坏血酸不足导致的。除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "推荐您这份VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM，相信会让人有惊喜的效果。",
					});
				} else if (state.titaiSelect == 1 && e.detail.value == 3) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。",
					});
				} else if (state.titaiSelect == 2 && e.detail.value == 1) {
					uni.setStorage({
						key: "fenxi",
						data: "恭喜您小达人，您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。除了加强全面的营养摄入，有针对性的运动时长及运动项目，可以帮助您增加肌肉含量的同时控制BIM。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果0代糖 0香精更健康。",
					});
				} else if (state.titaiSelect == 2 && e.detail.value == 2) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤暗淡，可能是缺乏维生素B例如动物肝脏，菠菜，新鲜牛奶等摄入量不族足，及维生素C，L-抗坏血酸不足导致的。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入推荐您这份VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM，相信会让人有惊喜的效果。",
					});
				} else if (state.titaiSelect == 2 && e.detail.value == 3) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。",
					});
				} else if (state.titaiSelect == 3 && e.detail.value == 1) {
					uni.setStorage({
						key: "fenxi",
						data: "首先恭喜您小达人，您已经超越了95%的人群您的气色很好，身材上也让很多人羡慕。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了保持目前全面的营养摄入外，有针对性的运动时长及运动项目，可以帮助您增加肌肉含量的同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。",
					});
				} else if (state.titaiSelect == 3 && e.detail.value == 2) {
					uni.setStorage({
						key: "fenxi",
						data: "首先恭喜您小达人，您已经超越了90%的人群同时以您的运动量，皮肤暗淡，可能是缺乏维生素B族，例如动物肝脏，菠菜，新鲜牛奶等摄入量不足，及维生素C ，L-抗坏血酸不足导致的。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入,推荐您:1.VC指南 焕亮肌肤茶每日补充2颗，搭配有针对性的运动时长及运动项目，可以帮助您恢复好气色。2.推荐您出桃指南-小达人运动套装运动补水的同时，增加您的运动效果0代糖 0香精更健康增加体重，同时控制BIM，相信会让人有惊喜的效果。",
					});
				} else if (state.titaiSelect == 3 && e.detail.value == 3) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。",
					});
				} else if (state.titaiSelect == 4 && e.detail.value == 1) {
					uni.setStorage({
						key: "fenxi",
						data: "以您的运动量，皮肤问题您很可能平时的肉类蛋白摄入量不足，建议您可以多摄入新鲜海鱼，瘦肉类，新鲜奶制品。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。推荐出桃指南-小达人运动套装运动补水的同时，增加您的运动效果.0代糖 0香精更健康。",
					});
				} else {
					uni.setStorage({
						key: "fenxi",
						data: "您的气色很好，身材上结合针对性的运动是可以变的让很多人羡慕的。",
					});
					uni.setStorage({
						key: "tuijian",
						data: "除了加强全面的营养摄入，找到营养吸收障碍等可能存在的问题，有针对性的运动时长及运动项目，可以帮助您增加体重，同时控制BIM。",
					});
				}
			}

			function prev() {
				state.step--;
				state.active--;
			}

			function next() {
				state.step++;
				state.active++;
			}
			return {
				imgList,
				setTitai,
				setname,
				setsex,
				setage,
				settop,
				setweight,
				setsportnum,
				setsporttime,
				setpifu,
				prev,
				next,
				state,
			};
		},
		data() {
			const radio = 0;
			const step = [{
					title: "",
				},
				{
					title: "",
				},
				{
					title: "",
				},
				{
					title: "",
				},
				{
					title: "",
				},
			];
			const imageStyles = {
				width: 80,
				height: 80,
				border: {
					radius: "50%",
					color: "#CDD3E6",
				},
			};
			const sex = [{
					text: "男",
					value: 1,
				},
				{
					text: "女",
					value: 2,
				},
			];
			const sportNum = [{
					text: "两次以上",
					value: 1,
				},
				{
					text: "不足两次",
					value: 2,
				},
			];
			const sportTime = [{
					text: "每次30分钟以下",
					value: 1,
				},
				{
					text: "每次30分钟以上60分钟以下",
					value: 2,
				},
				{
					text: "每次60分钟以上",
					value: 3,
				},
			];
			const pifu = [{
					text: "气色很好",
					value: 1,
				},
				{
					text: "皮肤暗淡",
					value: 2,
				},
				{
					text: "皮肤脆弱/有创口/皮下出血",
					value: 3,
				},
			];

			return {
				list1: step,
				imageStyles,
				sex,
				sportNum,
				sportTime,
				pifu,
			};
		},
		computed: {
			startDate() {
				return this.getDate("start");
			},
			endDate() {
				return this.getDate("end");
			},

			num() {
				return this.getNum();
			},
		},
		methods: {
			goFenxi() {
				console.log("goFenxi:",uni.getStorageSync('uid'))
				const data = {
					uid: uni.getStorageSync('uid')==""?0:parseInt(uni.getStorageSync('uid')),
					name: this.state.name,
					gender: this.state.sex,
					exercise_times_week: this.state.sportnum,
					oxy_time_week: this.state.sportTime,
					age: this.state.age,
					height: this.state.top,
					weight: this.state.weight,
					shape: this.state.titaiSelect,
					skin: this.state.pifu,
					status: 1,
				}
				this.edit_profile({
					data: JSON.stringify(data),
					token: uni.getStorageSync('token')
				})
				uni.navigateTo({
					url: "/pages/analysis/index",
				});
			},

			async edit_profile(data) {
				try {
					const res = await edit_profile(data);
					if(res.Code==1)
						uni.setStorageSync("cur_profile",res.Info)
					console.log("edit_profile res:",res)
				} catch (e) {
					console.log("catch", e);
					//TODO handle the exception
				}
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === "start") {
					year = year - 60;
				} else if (type === "end") {
					year = year + 2;
				}
				month = month > 9 ? month : "0" + month;
				day = day > 9 ? day : "0" + day;
				return `${year}-${month}-${day}`;
			},
			getNum() {
				let numList = [];
				for (var i = 0; i < 200; i++) {
					numList.push(i);
				}
				console.log(numList);
				return numList;
			},
		},
	};
</script>

<style>
	.step {
		display: table;
		width: 100vw;
	}

	.step-step {
		display: table-cell;
		width: 87vw;
	}

	.step-num {
		display: table-cell;
		width: 13vw;
	}

	.buttonGroup2 {
		display: inline-block;
		width: 100vw;
		vertical-align: top;
	}

	.group {
		position: absolute;
		bottom: 50rpx;
		left: 5vw;
	}

	.btn2 {
		display: inline-block;
		margin-left: 30rpx;
		width: 40vw;
		font-size: 26rpx;
		background: #8e9bcc;
		color: #fff;
		border: none;
		border-radius: 30rpx;
	}

	.btn {
		display: inline-block;
		margin-left: 30rpx;
		width: 85vw;
		font-size: 26rpx;
		background: #8e9bcc;
		color: #fff;
		border: none;
		border-radius: 30rpx;
	}

	.step {
		margin: 20px 0;
		display: flex;
		vertical-align: top;
	}

	.msg {
		width: 100vw;
		padding-left: 10px;
	}

	.img {
		width: 80px;
		margin: 40rpx auto;
	}

	.name {
		width: 90vw;
		height: 100rpx;
		background: #f5f5f5;
		border-radius: 5px;
		padding-left: 15px;
	}

	.titai {
		display: table;
		width: 90vw;
		margin: 0 auto;
		background: #f5f5f5;
		border-radius: 5px;
	}

	.titai-item-select {
		display: table-cell;
		padding: 10px 10px 10px 10px;
		background: #cdd3e6;
		border-radius: 10px;
	}

	.titai-item {
		display: table-cell;
		padding: 10px;
		border-radius: 10px;
	}

	.content {
		padding: 15px 25px;
	}

	.uni-section .uni-section-header__decoration {
		background-color: #cdd3e6 !important;
		margin-right: 10px !important;
	}

	.uni-section .uni-section-header__decoration.line {
		height: 18px !important;
	}

	.uni-section__content-title {
		font-weight: 600;
		font-size: 16px;
	}

	.uni-data-checklist .checklist-group .checklist-box.is--tag {
		width: 40vw;
		background: #f5f5f5;
		height: 70rpx;
		border-radius: 10px !important;
		text-align: center;
	}

	.uni-data-checklist .checklist-group .checklist-box.is--tag.is-checked {
		background: #cdd3e6 !important;
		border-color: #cdd3e6 !important;
	}

	.uni-data-checklist .checklist-group .checklist-box .checklist-content {
		display: inline-block !important;
	}
</style>
