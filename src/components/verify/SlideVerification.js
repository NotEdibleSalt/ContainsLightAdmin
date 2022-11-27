function slideVerify(params) {
  var obj = {
    w: params.w || 330, //canvas的宽度
    h: params.h || 155, //canvas的高度
    range: params.range || 3, //相差多少像素内触发成功
    imgArr: params.imgArr || [], //图片数组
    sliderW: 36, //slider的边长
    sliderIcon: params.sliderIcon || "",
    refresh: params.refresh, //刷新回调
    finish: params.finish, //完成回调
  };

  //创建canvas的父元素
  var container = document.querySelector("#canvas_wrap");
  if (container === undefined || container === null) {
    throw new Error("出现错误");
  }
  container.innerHTML = "";
  var canvas_wrap = document.createElement("div");
  canvas_wrap.className = "canvas_wrap";
  canvas_wrap.style.cssText =
    "position:relative;overflow:hidden;border-radius:2px;width:" +
    obj.w +
    "px;height:" +
    obj.h +
    "px;background:#fff";
  //创建大小canvas元素
  var bigCanvas = document.createElement("canvas");
  var smartCanvas = bigCanvas.cloneNode(true);
  bigCanvas.width = smartCanvas.width = obj.w;
  bigCanvas.height = smartCanvas.height = obj.h;
  bigCanvas.style.cssText = smartCanvas.style.cssText =
    "position:absolute;left:0;top:0";
  var bcxt = bigCanvas.getContext("2d"),
    scxt = smartCanvas.getContext("2d"),
    img = new Image();
  //刷新按钮
  var refreshDom = document.createElement("div");
  refreshDom.className = "slider_refresh";
  refreshDom.style.cssText =
    "position:absolute;top:6px;right:12px;font-size:14px;cursor: pointer";
  refreshDom.innerHTML = `<svg t="1621392393108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2700" width="20" height="20"><path d="M968.60387555 366.4651757L762.47495111 366.4651757c-26.29680545 0-47.56724243-21.30660315-47.56724243-47.56954832 0-26.26076065 21.27165061-47.56724243 47.56724243-47.56724243l82.74757404 0c-74.64295538-105.47230341-197.38593659-174.41678222-336.4460468-174.41678223-227.68541392 0-412.26027615 184.57607585-412.26027616 412.2578489 0 227.6842003 184.57607585 412.25906252 412.26027616 412.25906251 227.6842003 0 412.25906252-184.57607585 412.2590625-412.25906251 0-26.26076065 21.27055835-47.56724243 47.56615017-47.56724244 26.26294518 0 47.57076195 21.30660315 47.57076196 47.56724244 0 280.22586785-227.19146667 507.39670282-507.39670281 507.39670281-280.20887703 0-507.39791645-227.16962133-507.39791645-507.39670281 0-280.22465422 227.18903941-507.39548918 507.39791645-507.39548919 170.06227911 0 320.27079111 83.84554477 412.25906251 212.30629926l0-85.45688084c0-26.26294518 21.27055835-47.56845605 47.56615017-47.56845605 26.26294518 0 47.57076195 21.30551088 47.57076195 47.56845605l0 190.27285334C1016.17451615 345.15869392 994.86439348 366.4651757 968.60387555 366.4651757Z" fill="#e6e6e6" p-id="2701"></path></svg>`;
  //创建拖拽区域
  var slider_wrap = document.createElement("div"),
    slider = document.createElement("div"),
    sliderCover = document.createElement("div");
  slider_wrap.className = "slider_wrap";
  slider.className = "canvas_slider";
  sliderCover.className = "sliderCover";
  slider_wrap.innerText = "拖动左边滑块完成上方拼图";
  slider_wrap.style.cssText =
    "width:" +
    obj.w +
    "px;height:42px; border-radius:3px;line-height:42px; position:relative;margin-top:10px;text-align:center;box-shadow: inset 0 0 4px #ccc;font-size: 14px;color:#999;-moz-user-select: none; -khtml-user-select: none; user-select: none;";
  slider.style.cssText =
    "cursor: pointer;position: absolute;left: 0;top: 50%;z-index: 2;height: 39px;width: 40px;background-color:#fff; border: 1px solid #efefef; border-radius: 2px;line-height:40px;text-align:center;transform: translateY(-50%);";
  const slideIcon = `<svg style="padding-top:8px" t="1621393281685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5370" width="20" height="20"><path d="M288.635313 0.00002a35.69279 35.69279 0 0 0-25.305851 10.483938c-13.971918 13.971918-13.971918 36.629785 0 50.593703l420.965525 420.946525c7.996953 8.005953 12.406927 18.64989 12.406927 29.965824 0 11.324933-4.400974 21.959871-12.406927 29.956824L263.329462 962.912359c-13.971918 13.971918-13.971918 36.629785 0 50.602703 13.972918 13.971918 36.629785 13.971918 50.602702 0L734.89869 592.549536c21.512874-21.512874 33.364804-50.127705 33.364803-80.559526 0-30.422821-11.85293-59.046653-33.364803-80.559526L313.931164 10.474958C306.946205 3.488999 297.786259 0.00002 288.635313 0.00002z" fill="#e6e6e6" p-id="5371"></path></svg>`;
  const slideIcon_hover = `<svg style="padding-top:8px" t="1621393281685" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5370" width="20" height="20"><path d="M288.635313 0.00002a35.69279 35.69279 0 0 0-25.305851 10.483938c-13.971918 13.971918-13.971918 36.629785 0 50.593703l420.965525 420.946525c7.996953 8.005953 12.406927 18.64989 12.406927 29.965824 0 11.324933-4.400974 21.959871-12.406927 29.956824L263.329462 962.912359c-13.971918 13.971918-13.971918 36.629785 0 50.602703 13.972918 13.971918 36.629785 13.971918 50.602702 0L734.89869 592.549536c21.512874-21.512874 33.364804-50.127705 33.364803-80.559526 0-30.422821-11.85293-59.046653-33.364803-80.559526L313.931164 10.474958C306.946205 3.488999 297.786259 0.00002 288.635313 0.00002z" fill="#fff" p-id="5371"></path></svg>`;
  slider.innerHTML = slideIcon;
  sliderCover.style.cssText =
    "position: absolute;left: 0;top:0;width:0;height:100%;background:#f0fff0;";

  slider_wrap.appendChild(slider);
  slider_wrap.appendChild(sliderCover);
  canvas_wrap.appendChild(bigCanvas);
  canvas_wrap.appendChild(smartCanvas);
  canvas_wrap.appendChild(refreshDom);
  container.appendChild(canvas_wrap);
  container.appendChild(slider_wrap);

  /*
    canvasCoverL:随机生成占位块canvas的x轴位置
    startDownX://鼠标按下时x轴位置
    smartCanvasBL: 可移动canvas的left初始值
    sliderMaxRange：slider可移动的最大距离
    srcIndex: 显示图片的序号
    */
  var canvasCoverL = 0,
    startDownX = 0,
    smartCanvasBL = 0,
    sliderMaxRange = obj.w - obj.sliderW;
  var srcIndex = 0;

  //生成canvas图案
  function creatCanvas() {
    //重置初始值
    canvasCoverL = 0;
    startDownX = 0;
    smartCanvasBL = 0;
    slider.style.left = sliderCover.style.width = 0;

    refreshState();

    var l = 32, //滑块的正方形边长，不包括小圆点
      r = 6, //小圆点半径
      PI = Math.PI,
      sliderW = l + 2 * r, //滑块边长
      rand = canvasSize(sliderW, r), //获取随机生成的x,y,left值
      x = (canvasCoverL = rand.x), //占位块x轴
      y = rand.y; //占位块y轴

    smartCanvasBL = rand.left;
    //先清空画布
    bcxt.clearRect(0, 0, obj.w, obj.h);
    scxt.clearRect(0, 0, obj.w, obj.h);
    smartCanvas.width = obj.w;

    srcIndex = (srcIndex + 1) % obj.imgArr.length;
    img.src = obj.imgArr[srcIndex];
    img.crossOrigin = "Anonymous";
    draw(scxt, x, y, l, r, PI, "clip");
    draw(bcxt, x, y, l, r, PI, "fill");
    generateInterference(smartCanvasBL, x, y, l, r, PI);
    img.onload = function () {
      //一定要在onload里调用，否则canvas里不能放进图片
      bcxt.drawImage(img, 0, 0, obj.w, obj.h);
      scxt.drawImage(img, 0, 0, obj.w, obj.h);
      //裁剪滑块长度
      var ImageData = scxt.getImageData(x, y - 2 * r, sliderW, sliderW);
      smartCanvas.width = sliderW;
      smartCanvas.style.left = rand.left + "px";
      scxt.putImageData(ImageData, 0, y - 2 * r);
    };
    obj.refresh && obj.refresh();
  }

  // 随机生成2个干扰占位块
  function generateInterference(x1, x, y, l, r, PI) {
    let coordinates = [
      { x: x1, y, z: 1 },
      { x, y, z: 1 },
      { x: obj.w - 40, y: 40, z: 2 },
    ];
    for (let i = 0; i < 2; i++) {
      // debugger;
      let tempX = Math.random() * (obj.w - x1 - 200);
      let tempY = Math.random() * (obj.h - 160);
      tempX = tempX > x - x1 - 100 ? tempX + x1 + 170 : tempX + x1 + 70;
      tempY = tempY > y - 70 ? tempY + 130 : tempY + 30;
      for (let j = 0; j < coordinates.length; j++) {
        let item = coordinates[j];
        if (
          (item.z === 1 &&
            tempX < item.x + 70 &&
            tempX > item.x - 30 &&
            tempY < item.y + 60 &&
            tempY > item.y - 40) ||
          (item.z === 2 &&
            Math.abs(tempX - item.x) < 50 &&
            Math.abs(tempY - item.y) < 50)
        ) {
          tempX = Math.random() * (obj.w - x1 - 200);
          tempY = Math.random() * (obj.h - 160);
          tempX = tempX > x - x1 - 100 ? tempX + x1 + 170 : tempX + x1 + 70;
          tempY = tempY > y - 70 ? tempY + 130 : tempY + 30;
          j = 0;
        }
      }
      coordinates.push({ x: tempX, y: tempY, z: 2 });
      draw(bcxt, tempX, tempY, l, r, PI, "fill", Math.random() * 2 * PI);
    }
  }

  //随机生成canvas滑块和占位块，到左边的距离和到顶部的距离
  function canvasSize(cw, r) {
    // cw为占位块和的宽度，r为绘制圆点的半径
    var random = Math.random();
    var x = Math.floor(obj.w / 2 + random * (obj.w / 2 - cw)); //x为占位块x坐标位置，保证占位块始终在画布的右半区域
    var y = Math.floor(r * 2 + random * (obj.h - cw - r * 2)); //y为占位块y坐标位置,（值至少为小圆半径的2倍才能完全显示，因为绘制的原点是小正方形的左上角）
    var left = Math.floor((obj.w / 100) * (random + 1)); //canvas滑块的left值，这里的值范围保证它始终在画布的左半区域
    return { x: x, y: y, left: left };
  }

  //绘制canvas滑块和占位块
  function draw(ctx, x, y, l, r, PI, operation, angle = null) {
    ctx.beginPath();
    if (angle === null) {
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
    } else {
      x = x - 20;
      y = y - 10;
      let temp = coordinateRotation(x, y, x + 20, y + 10, angle);
      ctx.moveTo(temp.x, temp.y);
      temp = coordinateRotation(x + l / 2, y - r + 2, x + 20, y + 10, angle);
      ctx.arc(temp.x, temp.y, r, 0.72 * PI + angle, 2.26 * PI + angle);
      temp = coordinateRotation(x + l, y, x + 20, y + 10, angle);
      ctx.lineTo(temp.x, temp.y);
      temp = coordinateRotation(
        x + l + r - 2,
        y + l / 2,
        x + 20,
        y + 10,
        angle
      );
      ctx.arc(temp.x, temp.y, r, 1.21 * PI + angle, 2.78 * PI + angle);
      temp = coordinateRotation(x + l, y + l, x + 20, y + 10, angle);
      ctx.lineTo(temp.x, temp.y);
      temp = coordinateRotation(x, y + l, x + 20, y + 10, angle);
      ctx.lineTo(temp.x, temp.y);
      temp = coordinateRotation(x + r - 2, y + l / 2, x + 20, y + 10, angle);
      ctx.arc(
        temp.x,
        temp.y,
        r + 0.4,
        2.76 * PI + angle,
        1.24 * PI + angle,
        true
      );
      temp = coordinateRotation(x, y, x + 20, y + 10, angle);
      ctx.lineTo(temp.x, temp.y);
    }

    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(240, 240, 240, 0.9)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.stroke();
    ctx[operation]();
    ctx.globalCompositeOperation = "destination-over";
  }

  // 围绕某点逆时针旋转
  function coordinateRotation(x, y, x1, y1, angle) {
    return {
      x: (x - x1) * Math.cos(angle) - (y - y1) * Math.sin(angle) + x1,
      y: (y - y1) * Math.cos(angle) + (x - x1) * Math.sin(angle) + y1,
    };
  }

  // 刷新组件状态
  function refreshState() {
    sliderCover.innerText = "";
  }

  //滑块被按下
  function moveStart(e) {
    refreshState();
    document.getElementsByTagName("body")[0].style.userSelect = "none";
    document.getElementsByTagName("body")[0].onselectstart = "return false";
    var ev = e || window.event;
    startDownX = ev.touches != undefined ? ev.touches[0].clientX : ev.clientX;
    slider.style.backgroundColor = "#409eff";
    slider.innerHTML = slideIcon_hover;
  }
  //滑块移动
  function moveProcess(e) {
    var ev = e || window.event,
      downX =
        ev.touches != undefined
          ? ev.touches[0].clientX
          : startDownX != 0
          ? ev.clientX
          : 0,
      range = downX - startDownX;
    var sliderRange =
      range <= 0 ? 0 : range < sliderMaxRange ? range : sliderMaxRange;
    slider.style.left = sliderRange + "px";
    sliderCover.style.width = obj.sliderW / 2 + sliderRange + "px";
    smartCanvas.style.left = smartCanvasBL + sliderRange + "px";
  }

  //停止滑动
  function moveEnd(e) {
    e.touches
      ? ((document.ontouchend = null), (document.ontouchmove = null))
      : ((document.onmouseup = null), (document.onmousemove = null));
    var ev = e || window.event;
    ev.touches != undefined
      ? (slider.ontouchmove = null)
      : (slider.onmousemove = null);
    slider.style.backgroundColor = "#fff";
    slider.innerHTML = slideIcon;
    var smartCanvasL = parseInt(smartCanvas.style.left);
    if (Math.abs(canvasCoverL - smartCanvasL) < obj.range) {
      obj.finish && obj.finish(true);
      slider.style.left = sliderCover.style.width = sliderMaxRange + "px";
      sliderCover.innerText = "验证成功";
    } else {
      obj.finish && obj.finish(false);
      var timer = null,
        step = 10;
      var sliderL = parseInt(slider.style.left);
      timer = setInterval(function () {
        sliderL -= step;
        step += 5;
        if (sliderL <= 0) {
          clearInterval(timer);
          sliderL = 0;
          slider.style.left = sliderCover.style.width = 0;
          smartCanvas.style.left = smartCanvasBL + "px";
        }
        slider.style.left = sliderL + "px";
        sliderCover.style.width = sliderL + obj.sliderW / 2 + "px";
        smartCanvas.style.left = sliderL + smartCanvasBL + "px";
      }, 10);
    }
    document.getElementsByTagName("body")[0].style.userSelect = "text";
    document.getElementsByTagName("body")[0].onselectstart = null;
  }

  //事件调用
  creatCanvas();
  refreshDom.onclick = refreshDom.ontouchstart = creatCanvas;
  slider.ontouchstart = function () {
    moveStart();
    document.ontouchmove = moveProcess;
    this.ontouchend = moveEnd;
  };

  slider.onmousedown = function () {
    moveStart();
    document.onmousemove = moveProcess;
    document.onmouseup = moveEnd;
  };
}

export default {
  slideVerify,
};
