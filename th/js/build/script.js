////ANIMATION/////

gsap.config({
  nullTargetWarn: false,
  units: { left: "%", top: "%", rotation: "rad" },
});

const callback = (entries) => {
  entries.forEach((entry) => {
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
  threshold: 0.2,
};

const observer = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll(".anim");

targets.forEach((target) => {
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
        duration: 0.8,
      },
      0
    )

    .from(
      maskLeft,
      {
        clipPath: "inset(0 0 0 100%)",
        ease: Expo.easeInOut,
        stagger: 0.2,
        duration: 0.9,
      },
      0
    )

    // .from(t.chars, { y: -150, duration: 0.5 })
    .from(
      maskBtn,
      {
        clipPath: "inset(0 0 0 100%)",
        ease: Expo.easeInOut,
        duration: 0.8,
      },
      0
    )
    .from(
      maskTop,
      {
        clipPath: "inset(0 0 100% 0)",
        ease: Expo.easeInOut,
        stagger: 0.2,
        duration: 0.9,
      },
      0
    )
    .from(
      fadeDown,
      {
        y: -80,
        opacity: 0,
        duration: 0.9,
      },
      0
    );

  target.timeline = action;
});

Array.prototype.forEach.call(targets, (el) => {
  observer.observe(el);
});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  var tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });

  tl.to(".loading-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%" });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from(".animate-this", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.4,
    delay: 0.2,
  });
}

$(function () {
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          const done = this.async();

          pageTransition();
          await delay(1000);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});

////////LAZY LOAD////////

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});

var doc = $(document);

doc.scroll(function () {
  // make sure to wrap yours entire footer in some css selector
  var footer = $("footer");
  var p = $(".header__logo");
  var s = $("header");

  var top = doc.scrollTop() + s.offset().top * 2 + p.height();
  var footerTop = footer.offset().top;

  var offset = footerTop - top;

  if (offset < 0) {
    p.css({ "margin-top": "" + offset + "px" });
  } else {
    p.css({ "margin-top": 0 });
  }
});

// Video

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

////////SEARCH////////

var searchBtn = document.querySelector(".search-prompt");
var closeBtn = document.querySelector(".close-search");
var scrim = document.querySelector(".scrim");
var searchBg = document.querySelector(".search__bg");

searchBtn.addEventListener("click", function () {
  scrim.classList.add("scrim-active");
  searchBg.classList.add("search__bg-active");
});

closeBtn.addEventListener("click", function () {
  searchBg.classList.remove("search__bg-active");
  scrim.classList.remove("scrim-active");
});

// console.clear();

// window.addEventListener("scroll", function() {
//   var windowScroll = window.pageYOffset;
//   var $horizontalWrapper = document.querySelector("#horizontal-wrapper");
//   // $horizontalWrapper.querySelectorAll('.inner')[0].style.transform = 'translate(-99%)';
//   $horizontalWrapper.className = "";
//   switch (true) {
//     case windowScroll >=
//       $horizontalWrapper.offsetTop +
//         $horizontalWrapper.offsetHeight -
//         window.innerHeight:
//       $horizontalWrapper.classList.add("post-sticky");
//       console.log("after");
//       break;
//     case windowScroll >= $horizontalWrapper.offsetTop:
//       $horizontalWrapper.classList.add("sticky");

//       var _start = windowScroll - $horizontalWrapper.offsetTop;
//       var _end =
//         $horizontalWrapper.offsetTop +
//         $horizontalWrapper.offsetHeight -
//         window.innerHeight;
//       var pct = (_start / _end) * 100;
//       $horizontalWrapper.querySelectorAll(".inner")[0].style.transform =
//         "translate(-" + pct + "%)";

//       break;
//     default:
//       $horizontalWrapper.classList.add("pre-sticky");
//       $horizontalWrapper.querySelectorAll(".inner")[0].style.transform =
//         "translate(0)";
//       break;
//   }
// });
