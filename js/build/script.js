window.addEventListener("load", () => {
  quicklink.listen();
});

////ANIMATION/////

gsap.config({
  nullTargetWarn: false,
  units: { left: "%", top: "%", rotation: "rad" }
});

const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.timeline.play();
      // console.log(entry);
      observer.unobserve(entry.target);
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

////////LAZY LOAD////////

document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});

////////SEARCH////////

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

// const mySiema = new Siema();

// Siema.prototype.addPagination = function() {
//   const wrapper = document.createElement("siema-wrap");
//   for (let i = 0; i < this.innerElements.length; i++) {
//     const btn = document.createElement("button");
//     btn.setAttribute("id", `sliderButton-${i}`);

//     btn.textContent = "";
//     btn.addEventListener("click", () => this.goTo(i));
//     this.selector.appendChild(btn);

//     // // element that will be wrapped
//     const slideBtn = document.querySelector(`#sliderButton-${i}`);
//     console.info(slideBtn);

//     // // create wrapper container

//     // // insert wrapper before el in the DOM tree
//     slideBtn.parentNode.insertBefore(wrapper, slideBtn);

//     // // move el into wrapper
//     wrapper.appendChild(slideBtn);
//   }
// };

class SiemaWithDots extends Siema {
  addDots() {
    this.dots = document.createElement("div");
    this.dots.classList.add("dots");

    for (let i = 0; i < this.innerElements.length; i++) {
      const dot = document.createElement("button");

      dot.classList.add("dots__item");

      dot.addEventListener("click", () => {
        this.goTo(i);
      });

      this.dots.appendChild(dot);
    }

    this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
  }

  updateDots() {
    for (let i = 0; i < this.dots.querySelectorAll("button").length; i++) {
      const addOrRemove = this.currentSlide === i ? "add" : "remove";
      this.dots
        .querySelectorAll("button")
        [i].classList[addOrRemove]("dots__item--active");
    }
  }
}

const mySiemaWithDots = new SiemaWithDots({
  onInit: function() {
    this.addDots();
    this.updateDots();
  },

  onChange: function() {
    this.updateDots();
  }
});

// onChange: () => {
//   const index = imageSlider.currentSlide

//   // captions
//   $(".work__block").removeClass('active')
//   $(".work__block")(index).addClass('active')
// }

// const fixedTarget = document.querySelector(".header__logo");
// const observeLogo = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//     const target = entry.target;
//     if (entry.isIntersecting) {
//       // fixedTarget.style.position = "fixed";
//     } else {
//       fixedTarget.style.position = "absolute";
//     }
//   });
// });

// observeLogo.observe(document.querySelector("footer"));

const logo = document.querySelector(".header__logo");
const footer = document.querySelector(".footer");

const footerOptions = {
  rootMargin: "0% 0% 75% 0%",
  threshold: 0.01
};

const footerObserver = new IntersectionObserver(function(
  entries,
  footerObserver
) {
  entries.forEach(entry => {
    console.log(entry.target);
    if (entry.isIntersecting) {
      logo.classList.add("logo-fixed");
    } else {
      logo.classList.remove("logo-fixed");
    }
  });
},
footerOptions);

footerObserver.observe(footer);

// var footerObserver = new IntersectionObserver(
//   function(entries) {
//     // no intersection with screen
//     if (entries[0].intersectionRatio === 0) logo.classList.add("logo-fixed");
//     // fully intersects with screen
//     else if (entries[0].intersectionRatio === 1)
//       logo.classList.remove("logo-fixed");
//   },
//   { threshold: [0, 1] }
// );

// observer.observe(document.querySelector(".footer"));
