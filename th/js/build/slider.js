// const slides = document.querySelectorAll("#slideWrap");
// const container = document.querySelector("#panelWrap");
// let dur = 0.5;
// let offsets = [];
// let oldSlide = 0;
// let activeSlide = 0;
// let dots = document.querySelector(".dots");
// let navDots = [];
// let iw = window.innerWidth;

// // create the nav dots
// for (let i = 0; i < slides.length; i++) {
//   let newDot = document.createElement("div");
//   newDot.className = "dot";
//   newDot.index = i;
//   navDots.push(newDot);
//   newDot.addEventListener("click", slideAnim);
//   dots.appendChild(newDot);
// }

// // get elements positioned
// gsap.set(".dots", { xPercent: -50 });
// gsap.set(slides, { autoAlpha: 0.15 });

// const dotAnim = gsap.timeline({ paused: true });
// dotAnim.to(
//   ".dot",
//   {
//     stagger: { each: 1, yoyo: true, repeat: 1 },
//     scale: 1.5,
//     rotation: 0.1,
//     ease: "none"
//   },
//   "+=.5"
// );
// dotAnim.time(1);

// const slideOpacity = gsap.timeline({
//   paused: true
// });
// slideOpacity.fromTo(
//   slides,
//   { autoAlpha: 0.1 },
//   {
//     autoAlpha: 1,
//     // scale: 1.1,
//     ease: "circ.in",
//     stagger: {
//       each: 1,
//       yoyo: true,
//       repeat: 1
//     }
//   },
//   "+=.5"
// );
// slideOpacity.time(1);

// // make the whole thing draggable
// let dragMe = Draggable.create(container, {
//   type: "x",
//   edgeResistance: 1.5,
//   snap: offsets,
//   inertia: true,
//   bounds: "#masterWrap",
//   onDrag: tweenDot,
//   onThrowUpdate: tweenDot,
//   // onDragEndParams: ["slideAnim", "opacity"],
//   onDragEnd: slideAnim,
//   onDragEnd: opacity,
//   allowNativeTouchScrolling: false,
//   zIndexBoost: false,
//   cursor: "default",
//   allowEventDefault: true
// });

// dragMe[0].id = "dragger";
// sizeIt();

// function enableSelect() {
//   container.onselectstart = null;
//   gsap.set(container, { userSelect: "text" });
// }

// function disableSelect() {
//   gsap.set(container, { userSelect: "none" });
// }

// function isSelecting() {
//   return !!window.getSelection().toString().length;
// }

// function isTouch(event) {
//   return event.type.indexOf("touch") > -1;
// }

// function isOpen() {
//   return container._gsTransform.x < 0;
// }

// function slideAnim(e) {
//   // temp variable to see if we're at the beginning or end
//   oldSlide = activeSlide;
//   // dragging the panels
//   if (this.id === "dragger") {
//     activeSlide = offsets.indexOf(this.endX);
//   } else {
//     if (gsap.isTweening(container)) {
//       return;
//     }
//     // opacity
//     if (this.id === "slideWrap") {
//       activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);

//       // click on a dot
//     } else if (this.className === "dot") {
//       activeSlide = this.index;
//       // scrollwheel
//     } else {
//       // which way did we scroll the mousewheel
//       activeSlide = e.deltaY > 0 ? (activeSlide -= 1) : (activeSlide += 1);
//     }
//   }
//   // are we at the beginning of the slides?
//   activeSlide = activeSlide < 0 ? 0 : activeSlide;
//   // are we at the end of the slides?
//   activeSlide =
//     activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
//   if (oldSlide === activeSlide) {
//     return;
//   }
//   // if we're dragging we don't animate the container
//   if (this.id != "dragger") {
//     gsap.to(container, dur, {
//       x: offsets[activeSlide],
//       onUpdate: tweenDot,
//       onComplete: opacity,
//       onReverseComplete: opacity
//     });
//   }
// }

// // update the draggable element snap points
// function sizeIt() {
//   offsets = [];
//   iw = window.innerWidth;
//   gsap.set("#panelWrap", { width: slides.length * iw });
//   gsap.set(slides, { width: iw });
//   for (let i = 0; i < slides.length; i++) {
//     offsets.push(-slides[i].offsetLeft);
//   }
//   gsap.set(container, { x: offsets[activeSlide] });
//   dragMe[0].vars.snap = offsets;
// }

// slides.forEach(slide => {
//   slide.addEventListener(
//     "wheel",
//     _.throttle(slideAnim, 1000, { leading: true, trailing: false })
//   );
// });
// window.addEventListener("resize", sizeIt);
// container.addEventListener("mousewheel", opacity);
// dots.addEventListener("click", opacity);

// // update dot animation when dragger moves
// function tweenDot() {
//   gsap.set(dotAnim, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }
// function opacity() {
//   gsap.set(slideOpacity, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }
// function opacity(index) {
//   console.log(slides[index]);
//   for (i = 0; i < slides.length; i++)
//     if (i === index) {
//       slides[i].classList.remove("opacity");
//     } else {
//       slides[i].classList.add("opacity");
//     }
// }

//

// function preventParentScroll(evt) {
//   delta = evt.deltaY || -evt.wheelDelta || (evt && evt.detail);
//   if (delta) {
//     evt.preventDefault();
//     if (evt.type == "DOMMouseScroll") {
//       delta = delta * 40;
//     }
//     fakeTable.scrollTop = delta + fakeTable.scrollTop;
//   }
// }

// container.addEventListener("mousewheel", preventParentScroll);
// container.addEventListener("DOMMouseScroll", preventParentScroll);

////////////////

// const slide = document.querySelector("#slideWrap");

// const slideOptions = {
//   rootMargin: "200% -30% 200% -30%"
// };

// const slideObserver = new IntersectionObserver(function(
//   entries,
//   slideObserver
// ) {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       slide.classList.add("opacity");
//     } else {
//       slide.classList.remove("opacity");
//     }
//   });
// },
// slideOptions);

// slideObserver.observe(slide);

///////////////////
// const slides = document.querySelectorAll("#slideWrap");
// const container = document.querySelector("#panelWrap");
// let dur = 0.6;
// let offsets = [];
// let oldSlide = 0;
// let activeSlide = 0;
// let dots = document.querySelector(".dots");
// let navDots = [];
// let iw = window.innerWidth;

// // create the nav dots
// for (let i = 0; i < slides.length; i++) {
//   let newDot = document.createElement("div");
//   newDot.className = "dot";
//   newDot.index = i;
//   navDots.push(newDot);
//   newDot.addEventListener("click", slideAnim);
//   dots.appendChild(newDot);
// }

// // get elements positioned
// gsap.set(".dots", { xPercent: -50 });

// const dotAnim = gsap.timeline({ paused: true });
// dotAnim.to(
//   ".dot",
//   {
//     stagger: { each: 1, yoyo: true, repeat: 1 },
//     scale: 1.5,
//     rotation: 0.1,
//     ease: "none"
//   },
//   0.5
// );
// dotAnim.time(1);

// // const slideOpacity = gsap.timeline({ paused: true, reapeat: true, yoyo: true });
// // slideOpacity.fromTo(slides, { opacity: 0.4 }, { opacity: 1 });

// // make the whole thing draggable
// let dragMe = Draggable.create(container, {
//   type: "x",
//   edgeResistance: 1.5,
//   snap: offsets,
//   inertia: true,
//   bounds: "#masterWrap",
//   onDrag: tweenDot,
//   onThrowUpdate: tweenDot,
//   // onDragEndParams: ["slideAnim", "opacity"],
//   onDragEnd: slideAnim,
//   onDragEnd: opacity,
//   allowNativeTouchScrolling: false,
//   zIndexBoost: false
// });

// dragMe[0].id = "dragger";
// sizeIt();

// function slideAnim(e) {
//   // temp variable to see if we're at the beginning or end
//   oldSlide = activeSlide;
//   // dragging the panels
//   if (this.id === "dragger") {
//     activeSlide = offsets.indexOf(this.endX);
//   } else {
//     if (gsap.isTweening(container)) {
//       return;
//     }
//     // arrow clicks
//     if (this.id === "leftArrow" || this.id === "rightArrow") {
//       activeSlide =
//         this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
//       // click on a dot
//     } else if (this.className === "dot") {
//       activeSlide = this.index;
//       // scrollwheel
//     } else {
//       // which way did we scroll the mousewheel
//       activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
//     }
//   }
//   // are we at the beginning of the slides?
//   activeSlide = activeSlide < 0 ? 0 : activeSlide;
//   // are we at the end of the slides?
//   activeSlide =
//     activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
//   if (oldSlide === activeSlide) {
//     return;
//   }
//   // if we're dragging we don't animate the container
//   if (this.id != "dragger") {
//     gsap.to(container, dur, {
//       x: offsets[activeSlide],
//       onUpdate: tweenDot,
//       opacity,
//       onComplete: opacity,
//       onCompleteParams: [1],
//       onReverseComplete: opacity,
//       onReverseCompleteParams: [0]
//     });
//   }
// }

// // update the draggable element snap points
// function sizeIt() {
//   offsets = [];
//   iw = window.innerWidth;
//   gsap.set("#panelWrap", { width: slides.length * iw });
//   gsap.set(slides, { width: iw });
//   for (let i = 0; i < slides.length; i++) {
//     offsets.push(-slides[i].offsetLeft);
//   }
//   gsap.set(container, { x: offsets[activeSlide] });
//   dragMe[0].vars.snap = offsets;
// }

// // gsap.set("#slideWrap", { opacity: 0.75 });
// slides.forEach(slide => {
//   slide.addEventListener(
//     "wheel",
//     _.throttle(slideAnim, 750, { leading: true, trailing: false })
//   );
// });
// window.addEventListener("resize", sizeIt);

// // update dot animation when dragger moves
// function tweenDot() {
//   gsap.set(dotAnim, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }

// function opacity(index) {
//   console.log(slides[index]);
//   for (i = 0; i < slides.length; i++)
//     if (i === index) {
//       slides[i].classList.remove("opacity");
//     } else {
//       slides[i].classList.add("opacity");
//     }
// }

// const slides = document.querySelectorAll("#slideWrap");
// const container = document.querySelector("#masterWrap");
// let dur = 0.6;
// let offsets = [];
// let oldSlide = 0;
// let activeSlide = 0;
// let dots = document.querySelector(".dots");
// let navDots = [];
// let iw = window.innerWidth;

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

// const dotAnim = gsap.timeline({ paused: true });
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

// // main action
// function slideAnim(e) {
//   oldSlide = activeSlide;

//   if (this.className === "dot") {
//     activeSlide = this.index;
//   } else {
//     activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
//   }

//   // make sure we're not past the end or beginning slide
//   activeSlide = activeSlide < 0 ? 0 : activeSlide;
//   activeSlide =
//     activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
//   if (oldSlide === activeSlide) {
//     return;
//   }
//   tl = new gsap.timeline();
//   tl.to("#slideWrap", 0.6, {
//     xPercent: -100 * activeSlide,
//     onUpdate: tweenDot
//   });
//   // .to(
//   //   ".dot",
//   //   {
//   //     stagger: { each: 1, yoyo: true, repeat: 1 },
//   //     scale: 2.1,
//   //     rotation: 0.1,
//   //     ease: "none"
//   //   },
//   //   0.5
//   // );
// }

// slides.forEach(slide => {
//   slide.addEventListener(
//     "wheel",
//     _.throttle(slideAnim, 1000, { leading: true, trailing: false })
//   );
// });

// function tweenDot() {
//   offsets = [];
//   iw = window.innerWidth;
//   gsap.set("#masterWrap", { width: slides.length * iw });
//   gsap.set(slides, { width: iw });
//   for (let i = 0; i < slides.length; i++) {
//     offsets.push(-slides[i].offsetLeft);
//   }
//   gsap.set(container, { x: offsets[activeSlide] });
//   gsap.set(dotAnim, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }

// const slides = document.querySelectorAll("#slideWrap");
// const container = document.querySelector("#masterWrap");
// let dur = 0.6;
// let offsets = [];
// let oldSlide = 0;
// let activeSlide = 0;
// let dots = document.querySelector(".dots");
// let navDots = [];
// let iw = window.innerWidth;

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

// const dotAnim = gsap.timeline({ paused: true });
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

// // main action
// function slideAnim(e) {
//   console.log(this.className);
//   oldSlide = activeSlide;

//   if (this.className === "dot") {
//     console.info(this.index);
//     activeSlide = this.index;
//     sizeIt();
//   } else {
//     activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
//   }

//   // make sure we're not past the end or beginning slide
//   activeSlide = activeSlide < 0 ? 0 : activeSlide;
//   activeSlide =
//     activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
//   if (oldSlide === activeSlide) {
//     return;
//   }
//   //   tl = new gsap.timeline();
//   //   tl.to("#slideWrap", 0.6, {
//   //     xPercent: -100 * activeSlide,
//   //     onUpdate: tweenDot
//   //   });
//   // .to(
//   //   ".dot",
//   //   {
//   //     stagger: { each: 1, yoyo: true, repeat: 1 },
//   //     scale: 2.1,
//   //     rotation: 0.1,
//   //     ease: "none"
//   //   },
//   //   0.5
//   // );
// }

// function sizeIt() {
//   offsets = [];
//   iw = window.innerWidth;
//   gsap.set("#masterWrap", { width: slides.length * iw });
//   gsap.set(slides, { width: iw });
//   for (let i = 0; i < slides.length; i++) {
//     offsets.push(-slides[i].offsetLeft);
//   }
//   gsap.set(container, { x: offsets[activeSlide] });
//   // dragMe[0].vars.snap = offsets;
// }

// slides.forEach(slide => {
//   slide.addEventListener(
//     "wheel",
//     _.throttle(slideAnim, 1000, { leading: true, trailing: false })
//   );
// });

// function tweenDot() {
//   console.info(gsap.getProperty(container, "x"));
//   console.info(iw);
//   gsap.set(dotAnim, {
//     time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
//   });
// }

console.clear();
const slides = document.querySelectorAll("#slideWrap");
const container = document.querySelector("#panelWrap");
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;

// set slides background colors and create the nav dots
for (let i = 0; i < slides.length; i++) {
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}

// icon animations for slide 1

// get elements positioned
gsap.set(".dots", { xPercent: -50 });

// lower screen animation with nav dots and rotating titles
const dotAnim = gsap.timeline({ paused: true });
dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none"
  },
  0.5
);
dotAnim.time(1);

// make the whole thing draggable
// let dragMe = Draggable.create(container, {
//   type: "x",
//   edgeResistance: 1,
//   snap: offsets,
//   inertia: true,
//   bounds: "#masterWrap",
//   onDrag: tweenDot,
//   onThrowUpdate: tweenDot,
//   onDragEnd: slideAnim,
//   allowNativeTouchScrolling: false,
//   zIndexBoost: false
// });

// dragMe[0].id = "dragger";
sizeIt();

// main action check which of the 4 types of interaction called the function
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (gsap.isTweening(container)) {
    return;
  }
  if (this.className === "dot") {
    activeSlide = this.index;
    // scrollwheel
  } else {
    activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
  }

  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
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
  gsap.set(container, { x: offsets[activeSlide] });
  // dragMe[0].vars.snap = offsets;
}

gsap.set(".hideMe", { opacity: 1 });
container.addEventListener("wheel", slideAnim);
window.addEventListener("resize", sizeIt);

// update dot animation when dragger moves
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
  });
}
