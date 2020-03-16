const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.timeline.play();
    } else {
      //entry.target.timeline.pause(0);
    }
  });
};

const options = {
  root: null,
  rootMargin: "10% 0% -10% 0%",
  threshold: 0.2
};

const observer = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll(".anim");

targets.forEach(target => {
  const maskTop = target.querySelectorAll(".mask-container-top");
  const maskLeft = target.querySelectorAll(".mask-container-left");
  const maskBtn = target.querySelectorAll(".mask-container");
  const maskRight = target.querySelectorAll(".mask-container-right");
  const fadeDown = target.querySelectorAll(".fade-down");
  // const text = target.querySelectorAll(".text-animate");
  // const t = new SplitText(target, { type: "chars, lines" });

  const action = gsap
    .timeline({ paused: true })
    .from(
      maskRight,
      {
        clipPath: "inset(0 100% 0 0)",
        ease: Expo.easeInOut,
        duration: 0.8
      },
      0
    )

    .from(
      maskLeft,
      {
        clipPath: "inset(0 0 0 100%)",
        ease: Expo.easeInOut,
        stagger: 0.2,
        duration: 0.9
      },
      0
    )

    // .from(t.chars, { y: -150, duration: 0.5 })
    .from(
      maskBtn,
      {
        clipPath: "inset(0 0 0 100%)",
        ease: Expo.easeInOut,
        duration: 0.8
      },
      0
    )
    .from(
      maskTop,
      {
        clipPath: "inset(0 0 100% 0)",
        ease: Expo.easeInOut,
        stagger: 0.2,
        duration: 0.9
      },
      0
    )
    .from(
      fadeDown,
      {
        y: -80,
        opacity: 0,
        duration: 0.9
      },
      0
    );

  target.timeline = action;
});

Array.prototype.forEach.call(targets, el => {
  observer.observe(el);
});

var searchBtn = document.querySelector(".search-prompt");
var closeBtn = document.querySelector(".close-search");
var scrim = document.querySelector(".scrim");
var searchBg = document.querySelector(".search__bg");

searchBtn.addEventListener("click", function() {
  scrim.classList.add("scrim-active");
  searchBg.classList.add("search__bg-active");
});

closeBtn.addEventListener("click", function() {
  searchBg.classList.remove("search__bg-active");
  scrim.classList.remove("scrim-active");
});

// search.addEventListener("click", function() {
//   search.classList.remove("search-active");
//   searchBg.classList.remove("search__bg-active");
// });

const mySiema = new Siema();

Siema.prototype.addPagination = function() {
  const wrapper = document.createElement("siema-wrap");
  for (let i = 0; i < this.innerElements.length; i++) {
    const btn = document.createElement("button");
    btn.setAttribute("id", `sliderButton-${i}`);

    btn.textContent = "";
    btn.addEventListener("click", () => this.goTo(i));
    this.selector.appendChild(btn);

    // // element that will be wrapped
    const slideBtn = document.querySelector(`#sliderButton-${i}`);
    console.info(slideBtn);

    // // create wrapper container

    // // insert wrapper before el in the DOM tree
    slideBtn.parentNode.insertBefore(wrapper, slideBtn);

    // // move el into wrapper
    wrapper.appendChild(slideBtn);
  }
};

mySiema.addPagination();
