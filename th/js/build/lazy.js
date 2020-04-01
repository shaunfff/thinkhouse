// const targets = document.querySelectorAll("img");

// const lazyLoad = target => {
//   const io = new IntersectionObserver((entries, observer) => {
//     console.log(entries);
//     entries.forEach(entry => {
//       console.log("😍");

//       if (entry.isIntersecting) {
//         const img = entry.target;
//         const src = img.getAttribute("data-lazy");

//         img.setAttribute("src", src);

//         observer.disconnect();
//       }
//     });
//   });

//   io.observe(target);
// };

// targets.forEach(lazyLoad);

// const options = { threshold: 0.5 };

// const observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       let classNames = entry.target.classList;
//       if (classNames.contains("fade")) {
//         console.log("Fade detected");
//         const tl = gsap.timeline();
//         const targets = entry.target.querySelectorAll("span");
//         tl.fromTo(
//           targets,
//           0.5,
//           { y: -200 },
//           { delay: 0.4, y: 0, opacity: 1, stagger: 0.2 }
//         );
//       } else if (classNames.contains("zoom")) {
//         console.log("Zoom detected");
//         const tl = gsap.timeline();
//         const targets = entry.target.querySelectorAll("span");
//         tl.to(targets, 0.5, { delay: 0.4, scale: 2, opacity: 1, stagger: 0.2 });
//       } else if (classNames.contains("swipe")) {
//         console.log("Swipe detected");
//         const tl = gsap.timeline();
//         const targets = entry.target.querySelectorAll("span");
//         tl.fromTo(
//           targets,
//           0.5,
//           { x: -200 },
//           { delay: 0.4, x: 0, opacity: 1, stagger: 0.2 }
//         );
//       }
//       observer.unobserve(entry.target);
//     }
//   });
// }, options);

// const elements = document.querySelectorAll(".content");
// elements.forEach(elm => observer.observe(elm));

const slides = document.querySelectorAll("#slideWrap");
const container = document.querySelector("#panelWrap");
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;

// create the nav dots
for (let i = 0; i < slides.length; i++) {
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}

// get elements positioned
gsap.set(".dots", { xPercent: -50 });
gsap.set(slides, { autoAlpha: 0.15 });

const dotAnim = gsap.timeline({ paused: true });
dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 1.5,
    rotation: 0.1,
    ease: "none"
  },
  "+=.5"
);
dotAnim.time(1);

const slideOpacity = gsap.timeline({
  paused: true
});
slideOpacity.fromTo(
  slides,
  { autoAlpha: 0.1 },
  {
    autoAlpha: 1,
    // scale: 1.1,
    ease: "circ.in",
    stagger: {
      each: 1,
      yoyo: true,
      repeat: 1
    }
  },
  "+=.5"
);
slideOpacity.time(1);

// make the whole thing draggable
let dragMe = Draggable.create(container, {
  type: "x",
  edgeResistance: 1.5,
  snap: offsets,
  inertia: true,
  bounds: "#masterWrap",
  onDrag: tweenDot,
  onThrowUpdate: tweenDot,
  // onDragEndParams: ["slideAnim", "opacity"],
  onDragEnd: slideAnim,
  onDragEnd: opacity,
  allowNativeTouchScrolling: false,
  zIndexBoost: false,
  cursor: "default",
  allowEventDefault: true
});

dragMe[0].id = "dragger";
sizeIt();

function enableSelect() {
  container.onselectstart = null;
  gsap.set(container, { userSelect: "text" });
}

function disableSelect() {
  gsap.set(container, { userSelect: "none" });
}

function isSelecting() {
  return !!window.getSelection().toString().length;
}

function isTouch(event) {
  return event.type.indexOf("touch") > -1;
}

function isOpen() {
  return container._gsTransform.x < 0;
}

function slideAnim(e) {
  // temp variable to see if we're at the beginning or end
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endX);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // opacity
    if (this.id === "slideWrap") {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);

      // click on a dot
    } else if (this.className === "dot") {
      activeSlide = this.index;
      // scrollwheel
    } else {
      // which way did we scroll the mousewheel
      activeSlide = e.deltaY > 0 ? (activeSlide -= 1) : (activeSlide += 1);
    }
  }
  // are we at the beginning of the slides?
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  // are we at the end of the slides?
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, {
      x: offsets[activeSlide],
      onUpdate: tweenDot,
      onComplete: opacity,
      onReverseComplete: opacity
    });
  }
}

// update the draggable element snap points
function sizeIt() {
  offsets = [];
  iw = window.innerWidth;
  gsap.set("#panelWrap", { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, {
    x: offsets[activeSlide]
  });
  dragMe[0].vars.snap = offsets;
}

slides.forEach(slide => {
  slide.addEventListener(
    "wheel",
    _.throttle(slideAnim, 1000, { leading: true, trailing: false })
  );
});
window.addEventListener("resize", sizeIt);
container.addEventListener("mousewheel", opacity);
dots.addEventListener("click", opacity);

// update dot animation when dragger moves
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
  });
}
function opacity() {
  gsap.set(slideOpacity, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
  });
}

//////////////////
//////////////
////////////

/////////

let slides = document.querySelectorAll(".slide"),
  tl = new gsap.timeline({ paused: true });

for (let i = 0, l = slides.length; i < l; i++) {
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.id = "dot" + i;
  newDot.addEventListener("click", function() {
    tl.seek(this.id).pause();
  });

  document.getElementById("dots").appendChild(newDot);

  gsap.set(slides[i], { zIndex: l - i });
  if (i < slides.length - 1) {
    if (i != 0) {
      tl.addPause();
    }
    tl.to(slides[i], 0.7, { scale: 0.9, ease: Back.easeOut })
      .to(slides[i], 0.7, { xPercent: -100 }, "L" + i)
      .from(slides[i + 1], 0.7, { xPercent: 100 }, "L" + i)
      .to(
        "#dot" + i,
        0.7,
        { backgroundColor: "rgba(255,255,255,0.2)" },
        "L" + i
      )
      .set(slides[i], { zIndex: i })
      .set(slides[i + 1], { zIndex: i + l })
      .from(slides[i + 1], 0.7, { scale: 0.9, ease: Back.easeIn });
  }
}
function GO(e) {
  let SD = isNaN(e) ? e.wheelDelta || -e.detail : e;
  if (SD < 0) {
    tl.play();
  } else {
    tl.reverse();
  }
}

document.addEventListener("mousewheel", GO);
document.addEventListener("DOMMouseScroll", GO);

// let slides = document.querySelectorAll("#slideWrap");
// let container = document.querySelector("#masterWrap");
// let dur = 0.6;
// let offsets = [];
// let oldSlide = 0;
// let activeSlide = 0;
// let dots = document.querySelector(".dots");
// let navDots = [];
// let iw = container.innerWidth;

// // create the nav dots
// for (let i = 0; i < slides.length; i++) {
//   let newDot = document.createElement("div");
//   newDot.className = "dot";
//   newDot.index = i;
//   navDots.push(newDot);
//   newDot.addEventListener("click", slideAnim);
//   newDot.addEventListener("click", tweenDot);
//   dots.appendChild(newDot);
// }

// // get elements positioned
// gsap.set(".dots", { xPercent: -50 });

// let dotAnim = gsap.timeline({ paused: true });
// dotAnim.to(
//   ".dot",
//   {
//     stagger: { each: 1, yoyo: true, repeat: 1 },
//     scale: 2.1,
//     rotation: 0.1,
//     ease: "none"
//   },
//   0.5
// );

// dotAnim.time(1);

// let slider = gsap.timeline();
// slider.to("#slideWrap", 0.6, {
//   xPercent: -100 * activeSlide,
//   onUpdate: dotAnim
// });

// slider[0].id = "sliding";
// slideAnim();

// // main action
// function slideAnim(e) {
//   oldSlide = activeSlide;

//   if (this.id === "sliding") {
//     activeSlide = offsets.indexOf(this.endX);
//   } else {
//     if (gsap.isTweening(container)) {
//       return;
//     }

//   else if (this.className === "dot") {
//     activeSlide = this.index;
//   } else {
//     activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
//   }
//   }
//   // make sure we're not past the end or beginning slide
//   activeSlide = activeSlide < 0 ? 0 : activeSlide;
//   activeSlide =
//     activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
//   if (oldSlide === activeSlide) {
//     return;
//   }
//   if (this.id != "sliding") {
//     gsap.to(container, {
//       x: offsets[activeSlide]
//     });
//   }
// }

// slides.forEach(slide => {
//   slide.addEventListener(
//     "wheel",
//     _.throttle(slideAnim, 1000, { leading: true, trailing: false })
//   );
// });

// function tweenDot() {
//   gsap.set(dotAnim, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }
