<template>
  <div>
    <div v-show="showModel" class="sliderModel">
      <div class="cont">
        <div id="title">滑动图形验证码完成校验</div>
        <div id="close" @click="closeModel">
          <svg
            t="1621409794813"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6418"
            width="30"
            height="30"
          >
            <path
              d="M511.976 456.52L317.702 262.208l-55.54 55.54 194.276 194.314-194.275 194.321 55.54 55.393 194.273-194.321 194.291 194.321 55.538-55.393-194.29-194.321 194.29-194.313-55.538-55.54z"
              p-id="6419"
              fill="#2c2c2c"
            ></path>
          </svg>
        </div>
        <div id="divider"></div>
        <div id="canvas_wrap"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import slideVerify from "./SlideVerification.js";

export default {
  emits: ["finish"],

  setup(props, context) {
    let SliderUtils = reactive(slideVerify);
    const obj = {
      imgArr: [
        "https://pic2.zhimg.com/v2-65f745be8d779c371a2065d43be97625_r.jpg?source=1940ef5c",
      ],
      finish: function (res) {
        context.emit("finish", res);
      },
    };

    let showModel = ref(false);
    // 关闭弹窗
    function closeModel() {
      showModel.value = false;
    }
    // 展示弹窗
    function openModel() {
      showModel.value = true;
      new SliderUtils.slideVerify(obj);
    }

    return {
      showModel,
      closeModel,
      openModel,
    };
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.sliderModel {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
}
.sliderModel .cont {
  position: relative;
  width: 354px;
  background: #fff;
  border-radius: 6px;
  margin: 120px auto;
}
.sliderModel .cont #close {
  position: absolute;
  right: 12px;
  top: 12px;
  cursor: pointer;
}
.sliderModel .cont #title {
  text-align: left;
  height: 30px;
  padding: 12px;
  line-height: 30px;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}

.sliderModel .cont #divider {
  height: 1px;
  width: 354px;
  background-color: #e4e7eb;
}
#canvas_wrap {
  width: 330px;
  padding: 12px;
}
#canvas_wrap canvas {
  display: block;
}
</style>
