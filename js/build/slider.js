// gsap.registerPlugin(InertiaPlugin);
// gsap.registerPlugin(Draggable);

var $overflow = $("#overflow");
var $viewport = $(".viewport");
var $wrapper = $(".wrapper");
var $boxes = $(".boxes");
var $proxy = $("<div/>");

var numBoxes = 10;
var boxWidth = 350;
var boxHeight = 250;
var imgWidth = boxWidth - 6;
var imgHeight = boxHeight - 14;
var viewWidth = $viewport.width();
var wrapWidth = numBoxes * boxWidth;

TweenLite.set([$wrapper, $viewport], { height: boxHeight, xPercent: -50 });
TweenLite.set($boxes, { left: -boxWidth });

for (var i = 1; i <= numBoxes; i++) {
  var src =
    "https://unsplash.it/" + imgWidth + "/" + imgHeight + "?random=" + i;
  var num = $("<div class='num'/>").text(i);
  var img = $("<img />", { src: src, width: imgWidth, height: imgHeight });
  var box = $("<div class='box'/>")
    .append(img)
    .append(num)
    .appendTo($boxes);

  TweenLite.set(box, { x: i * boxWidth, width: boxWidth, height: boxHeight });
}

var animation = TweenMax.to(".box", 1, {
  x: "+=" + wrapWidth,
  ease: Linear.easeNone,
  paused: true,
  repeat: -1,
  modifiers: {
    x: function(x, target) {
      x %= wrapWidth;
      target.style.visibility = x - boxWidth > viewWidth ? "hidden" : "visible";
      return x;
    }
  }
});

Draggable.create($proxy, {
  type: "x",
  trigger: ".wrapper",
  throwProps: true,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {
    x: snapX
  }
});

$overflow.on("change", applyOverflow);
$(window).resize(resize);

function snapX(x) {
  return Math.round(x / boxWidth) * boxWidth;
}

function updateProgress() {
  animation.progress(this.x / wrapWidth);
}

function resize() {
  viewWidth = $viewport.width();
  animation.render(animation.time(), false, true);
}

function applyOverflow() {
  if ($overflow.prop("checked")) {
    TweenLite.set(".wrapper", { overflow: "visible" });
  } else {
    TweenLite.set(".wrapper", { overflow: "hidden" });
  }
}
