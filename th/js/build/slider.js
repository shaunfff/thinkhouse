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

sizeIt();

// main action
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

  // what slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }

  if (this.id != "dragger") {
    gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
  }
}

// update the draggable element snap points
function sizeIt() {
  gsap.set(container, { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, { x: offsets[activeSlide] });
  // dragMe[0].vars.snap = offsets;
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
