document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(MotionPathPlugin);
  var imageCoords = {
    0: [-655, -345],
    1: [725, -55],
    2: [770, -310],
    3: [-380, 40],
    4: [-780, -70],
    5: [-470, -170],
    6: [-840, -230],
    7: [300, 80],
    8: [220, 420],
    9: [510, 20],
    10: [-190, -250],
    18: [-530, 310],
    12: [700, 310],
    13: [540, -250],
    14: [-300, 220],
    15: [430, 210],
    16: [370, -270],
    17: [210, -290],
    11: [-850, 400],
    19: [-600, -40],
    20: [-240, 380],
    21: [-145, 260],
    22: [220, 280],
    23: [410, 360],
    24: [80, 430],
    25: [-120, -430],
    26: [460, -430],
    27: [-280, -350],
    28: [-410, -330],
  };

  var initTL = gsap.timeline({ delay: 1 });
  initTL.fromTo(
    "#emlogo",
    { y: -800 },
    {
      y: -500,
      scale: 0.8,
      transformOrigin: "center",
      duration: 1,
      ease: "bounce.out",
    }
  );
  initTL.fromTo(
    "#introHero",
    { y: -100, opacity: 0 },
    { y: -50, opacity: 1, duration: 1 },
    "<"
  );
  initTL.fromTo(
    "#introHero text",
    { opacity: 0 },
    { opacity: 1, stagger: 0.1, duration: 0.25 },
    "<"
  );
  initTL.to(
    "#introHero",
    { y: 100, opacity: 0, duration: 1, ease: "expo.in" },
    "+=1"
  );
  initTL.to(
    "#emlogo",
    {
      y: -200,
      scale: 1,
      transformOrigin: "center",
      duration: 1,
      ease: "expo.in",
    },
    "<"
  );
  initTL.set("#images", { opacity: 1 });
  initTL.set("#folders", { opacity: 1 });

  var images = document.querySelectorAll("#images image");

  gsap.set("#images image", { scale: 0 });
  var imgTl = gsap.timeline({ ease: "none", delay: 3.5 });
  images.forEach((image, i) => {
    var coords = imageCoords[i];
    imgTl.to(
      image,
      {
        duration: 1,
        x: coords[0],
        y: coords[1],
        scale: 1,
        ease: "back.out(1.2)",
      },
      "-=0.85"
    );
  });
  images.forEach((image, i) => {
    var coords = imageCoords[i];
    imgTl.to(
      image,
      {
        duration: 5,
        motionPath: {
          path: [
            {
              x: coords[0] + 16,
              y: coords[1],
            },
            {
              x: coords[0] + 16,
              y: coords[1] + 16,
            },
            {
              x: coords[0],
              y: coords[1] + 16,
            },
            {
              x: coords[0],
              y: coords[1],
            },
          ],
        },
        repeat: -1,
        yoyo: true,
        ease: "none",
      },
      "-=4.75"
    );
  });

  // gsap.to("#backdrop", { opacity: 0, duration: 3, delay: 6.5 });

  var tl = gsap.timeline({
    ease: "none",
    delay: 6.5,
    onReverseComplete: function () {
      var endTL = gsap.timeline();
      endTL.to("#folders", { opacity: 0, duration: 0 });
      endTL.to("#emlogo", {
        y: -500,
        scale: 0.8,
        transformOrigin: "center",
        duration: 1,
        ease: "expo.in",
      });
      endTL.to("#introHero", { y: -50, opacity: 1, duration: 1 }, "<");
      endTL.to(
        "#introHero text",
        { opacity: 1, stagger: 0.1, duration: 0.25 },
        "<"
      );
    },
  });
  var folders = [
    "#anEvents",
    "#anLocations",
    "#anPeople",
    "#anProducts",
    "#anProjects",
  ];
  for (let i = 0; i < folders.length; i++) {
    tl.to(
      folders[i],
      {
        duration: 5,
        motionPath: {
          path: "#f" + i,
          align: "#f" + i,
          autoRotate: false,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      },
      "<"
    );
  }

  var collapseCoords = {
    ".location_img": {
      x: 360,
      y: -145,
      target: "#anLocations",
      delay: 6,
    },
    ".event_img": {
      x: 0,
      y: -375,
      target: "#anEvents",
      delay: 4,
    },
    ".project_img": {
      x: -372,
      y: -70,
      target: "#anProjects",
      delay: 4,
    },
    ".product_img": {
      x: -160,
      y: 380,
      target: "#anProducts",
      delay: 5,
    },
    ".people_img": {
      x: 290,
      y: 290,
      target: "#anPeople",
      delay: 2,
    },
  };

  var delay = 12.5;

  Object.keys(collapseCoords).forEach((key) => {
    var cc = collapseCoords[key];
    var images = document.querySelectorAll(key);

    var imTL = gsap.timeline({
      delay: delay,
      onStart: function () {
        images.forEach((img) => {
          img.classList.add("glow");
        });
      },
      onComplete: function () {
        if (key === ".people_img") tl.reverse();
      },
    });

    images.forEach((img, idx) => {
      imTL.to(
        img,
        {
          duration: 1,
          x: cc.x,
          y: cc.y,
          scale: 0.2,
          transformOrigin: "center",
          onComplete: function () {
            img.remove();
          },
        },
        "-=0.75"
      );
      imTL.fromTo(
        cc.target,
        { scale: 1.1 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.2)" },
        "-=0.2"
      );
    });
    delay += images.length * 0.25 + 2;
  });
});
