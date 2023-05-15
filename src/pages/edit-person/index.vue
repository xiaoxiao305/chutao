
<template>
  <view class="bg">
    <view class="msg">
      <view class="top">
        <view class="img">
          <uni-file-picker
            limit="1"
            :del-icon="false"
            disable-preview
            :imageStyles="imageStyles"
            file-mediatype="image"
          >
            <uni-icons type="camera" size="45" color="#CDD3E6"></uni-icons>
          </uni-file-picker>
        </view>
        <view class="personmsg">
          <view class="person">
            <span class="name1">张珊</span>
            <span class="icon iconfont icon-nv sex"></span>
          </view>
          <view class="descript">
            <view class="descript-item">中年 | </view>
            <view class="descript-item">32岁 | </view>
            <view class="descript-item">555kg</view>
          </view>
        </view>
        <view class="tab-group">
          <view
            :class="state.tabSelect == item.id ? 'tab-select' : 'tab'"
            v-for="(item, index) in tabs"
            :key="index"
            @click="setTab(item)"
            >{{ item.name }}</view
          >
        </view>
        <uni-section
          class="mb-10 weight"
          v-if="state.tabSelect == 0"
          title="怎么称呼您"
          type="line"
        >
          <input type="text" placeholder="请输入姓名" class="name" />
        </uni-section>
        <uni-section
          class="mb-10"
          v-if="state.tabSelect == 0"
          title="您的性别"
          type="line"
        >
          <uni-data-checkbox mode="tag" :localdata="sex"></uni-data-checkbox>
        </uni-section>
        <uni-section
          v-if="state.tabSelect == 0"
          class="mb-10 weight"
          title="您的年龄（岁）"
          type="line"
        >
          <picker
            mode="date"
            :value="state.age"
            :start="startDate"
            :end="endDate"
            @change="setage"
          >
            <input
              type="number"
              placeholder="请选择年龄"
              class="name"
              disabled
              :value="state.age"
            />
          </picker>
        </uni-section>
        <uni-section
          v-if="state.tabSelect == 0"
          class="mb-10 weight"
          title="您的身高（cm）"
          type="line"
        >
          <picker @change="settop" :value="state.top" :range="num">
            <input
              type="number"
              placeholder="请选择身高"
              class="name"
              :value="state.top"
              disabled
            />
          </picker>
        </uni-section>

        <uni-section
          class="mb-10"
          v-if="state.tabSelect == 1"
          title="您每周的运动次数"
          type="line"
        >
          <uni-data-checkbox
            mode="tag"
            :localdata="sportNum"
          ></uni-data-checkbox>
        </uni-section>
        <uni-section
          class="mb-10"
          v-if="state.tabSelect == 1"
          title="每次运动的有氧时间"
          type="line"
        >
          <uni-data-checkbox
            mode="tag"
            :localdata="sportTime"
          ></uni-data-checkbox>
        </uni-section>
        <uni-section
          class="mb-10 weight"
          v-if="state.tabSelect == 1"
          title="您近期的体重（kg）"
          type="line"
        >
          <picker @change="setweight" :value="state.weight" :range="num">
            <input
              type="number"
              placeholder="请选择体重"
              class="name"
              :value="state.weight"
              disabled
            />
          </picker>
        </uni-section>
        <uni-section
          class="mb-10 weight"
          v-if="state.tabSelect == 1"
          title="近期的体态"
          type="line"
        >
          <view class="titai">
            <view
              :class="
                state.titaiSelect == item.id
                  ? 'titai-item-select'
                  : 'titai-item'
              "
              v-for="(item, index) in imgList"
              :key="index"
              @click="setTitai(item)"
            >
              <image :src="item.url" style="width: 12vw; height: 110px" />
              <!-- {{ titaiSelect }} -->
            </view>
          </view>
          <view class="content">{{ state.content }}</view>
        </uni-section>
        <uni-section
          class="mb-10"
          v-if="state.tabSelect == 1"
          title="您最近的皮肤状态"
          type="line"
        >
          <uni-data-checkbox
            mode="tag"
            :localdata="pifu"
            multiple
          ></uni-data-checkbox>
        </uni-section>
      </view>
      <view> <button class="btn">保存编辑</button> </view>
    </view>
  </view>
</template>
<style>
.bg {
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
}
.btn {
  position: fixed;
  left: 8vw;
  bottom: 20px;
  width: 84vw;
  font-size: 26rpx;
  background: #8e9bcc;
  color: #fff;
  border: none;
  border-radius: 30rpx;
}
.top {
  width: 100vw;
  min-height: 100vh;
  background: #fff;
  padding: 30rpx 30rpx 130rpx 30rpx;
}
.progress1 {
  font-size: 18rpx;
  text-align: center;
  position: relative;
  top: -15rpx;
}

.personmsg {
  display: inline-block;
  padding-bottom: 100rpx;
}
.name1 {
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
.tab-group {
  display: table;
  width: 90vw;
}

.tab {
  display: table-cell;
  width: 45vw;
  text-align: center;
}
.tab-select {
  display: table-cell;
  width: 45vw;
  text-align: center;
  font-size: 28rpx;
  font-weight: 600;
  padding-bottom: 20rpx;
  border-bottom: 3px solid #ccd3e6;
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
<script>
import { reactive } from "vue";
export default {
  name: reactive,
  setup() {
    const state = reactive({
      tabSelect: 0,
      titaiSelect: 3,
      content: null,
      age: null,
      top: 160,
      weight: 55,
    });
    function setTab(prop) {
      state.tabSelect = prop.id;
      console.log(prop);
    }
    const imgList = [
      {
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
    function setage(e) {
      console.log(e);
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
      console.log(e);
      state.top = e.detail.value;
    }
    function setweight(e) {
      state.weight = e.detail.value;
      console.log(e);
    }
    function setTitai(props) {
      state.titaiSelect = props.id;
      state.content = props.content;
    }

    return {
      state,
      setTab,
      setTitai,
      imgList,
      setage,
      settop,
      setweight,
    };
  },
  data() {
    const sex = [
      {
        text: "男",
        value: 1,
      },
      {
        text: "女",
        value: 2,
      },
    ];
    const sportNum = [
      {
        text: "两次以上",
        value: 1,
      },
      {
        text: "不足两次",
        value: 2,
      },
    ];
    const sportTime = [
      {
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
    const pifu = [
      {
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
      pifu,
      sportTime,
      sportNum,
      sex,
      imageStyles: {
        width: 60,
        height: 60,
        border: {
          radius: "50%",
          color: "#CDD3E6",
        },
      },
      tabs: [
        { name: "基础信息", id: 0 },
        { name: "体征档案", id: 1 },
      ],
      currentTab: 0,
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
      uni.navigateTo({
        url: "/pages/analysis/index",
      });
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