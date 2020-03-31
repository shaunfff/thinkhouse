const targets = document.querySelectorAll("img");

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    console.log(entries);
    entries.forEach(entry => {
      console.log("😍");

      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-lazy");

        img.setAttribute("src", src);

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

targets.forEach(lazyLoad);

const options = { threshold: 0.5 };

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let classNames = entry.target.classList;
      if (classNames.contains("fade")) {
        console.log("Fade detected");
        const tl = gsap.timeline();
        const targets = entry.target.querySelectorAll("span");
        tl.fromTo(
          targets,
          0.5,
          { y: -200 },
          { delay: 0.4, y: 0, opacity: 1, stagger: 0.2 }
        );
      } else if (classNames.contains("zoom")) {
        console.log("Zoom detected");
        const tl = gsap.timeline();
        const targets = entry.target.querySelectorAll("span");
        tl.to(targets, 0.5, { delay: 0.4, scale: 2, opacity: 1, stagger: 0.2 });
      } else if (classNames.contains("swipe")) {
        console.log("Swipe detected");
        const tl = gsap.timeline();
        const targets = entry.target.querySelectorAll("span");
        tl.fromTo(
          targets,
          0.5,
          { x: -200 },
          { delay: 0.4, x: 0, opacity: 1, stagger: 0.2 }
        );
      }
      observer.unobserve(entry.target);
    }
  });
}, options);

const elements = document.querySelectorAll(".content");
elements.forEach(elm => observer.observe(elm));
