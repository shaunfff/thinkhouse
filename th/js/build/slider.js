const slides = document.querySelectorAll("#slideWrap");
const container = document.querySelector("#panelWrap");
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = container.clientWidth;

//create the nav dots
for (let i = 0; i < slides.length; i++) {
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}

gsap.set(".dots", { xPercent: -50 });

const dotAnim = gsap.timeline({ paused: true });
dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none",
  },
  0.5
);
dotAnim.time(1);

let dragMe = Draggable.create(container, {
  type: "x",
  edgeResistance: 1,
  snap: offsets,
  inertia: true,
  bounds: "#masterWrap",
  onDrag: tweenDot,
  onThrowUpdate: tweenDot,
  onDragEnd: slideAnim,
  allowNativeTouchScrolling: false,
  zIndexBoost: false,
});

dragMe[0].id = "dragger";
sizeIt();

// main action
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endX);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // arrow clicks
    if (this.id === "leftArrow" || this.id === "rightArrow") {
      activeSlide =
        this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
      // click on a dot
    } else if (this.className === "dot") {
      activeSlide = this.index;
      // scrollwheel
    } else {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    }
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
  // iw = window.innerWidth;
  gsap.set("#panelWrap", { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, { x: offsets[activeSlide] });
  dragMe[0].vars.snap = offsets;
}

container.addEventListener("wheel", slideAnim);
console.log(container);
window.addEventListener("resize", sizeIt);

// update dot animation
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1,
  });
}
