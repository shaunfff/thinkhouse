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
  rootMargin: "10% 0% 0% 0%",
  threshold: 0.6
};

const observer = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll(".anim");

targets.forEach(target => {
  const maskTop = target.querySelectorAll(".mask-container-top");
  const maskLeft = target.querySelectorAll(".mask-container-left");
  const maskBtn = target.querySelectorAll(".mask-container");
  // const text = target.querySelectorAll(".text-animate");
  // const t = new SplitText(target, { type: "chars, lines" });

  const action = gsap
    .timeline({ paused: true })
    .from(
      maskTop,
      {
        clipPath: "inset(0 0 100% 0)",
        ease: Expo.easeInOut,
        stagger: 0.2,
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
        duration: 0.8
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
      "-=.5"
    );

  target.timeline = action;
});

Array.prototype.forEach.call(targets, el => {
  observer.observe(el);
});
