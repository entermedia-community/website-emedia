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
  var collapseCoords = {
    "#event_1": {
      x: -190,
      y: -60,
      d: "",
    },
    "#people_1": {
      x: 500,
      y: 150,
      d: "-=1.5",
    },
    "#location_1": {
      x: 150,
      y: -300,
      d: "-=0.5",
    },
    "#location_3": {
      x: 150,
      y: -300,
      d: "-=0.5",
    },
    "#product_1": {
      x: 80,
      y: 450,
      d: "-=2",
    },
    "#product_2": {
      x: 100,
      y: 450,
      d: "-=2",
    },
    "#product_3": {
      x: 400,
      y: 50,
      d: "+=2",
    },
    "#product_6": {
      x: 320,
      y: -250,
      d: "+=3.5",
    },
    "#project_1": {
      x: -180,
      y: 350,
      d: "-=0.5",
    },
    "#project_5": {
      x: -180,
      y: 320,
      d: "-=0.5",
    },
    "#product_4": {
      x: -50,
      y: 400,
      d: "-=2.5",
    },
    "#product_5": {
      x: 50,
      y: 400,
      d: "-=1.5",
    },
    "#event_2": {
      x: -50,
      y: -300,
      d: "-=2",
    },
    "#location_6": {
      x: 200,
      y: -320,
      d: "-=1",
    },
    "#event_4": {
      x: 80,
      y: -380,
      d: "-=3",
    },
    "#event_3": {
      x: -230,
      y: 200,
      d: "+=2",
    },
    "#project_2": {
      x: 220,
      y: 380,
      d: "+=2",
    },
    "#people_2": {
      x: 0,
      y: -380,
      d: "+=3",
    },
    "#people_3": {
      x: 0,
      y: -280,
      d: "+=3.5",
    },
    "#people_4": {
      x: 420,
      y: 50,
      d: "-=1",
    },
    "#people_6": {
      x: 0,
      y: -350,
      d: "+=2.5",
    },
    "#people_7": {
      x: 100,
      y: -350,
      d: "+=2",
    },
    "#people_5": {
      x: 250,
      y: 350,
      d: "-=3.5",
    },
    "#location_4": {
      x: 400,
      y: -50,
      d: "-=3.5",
    },
    "#location_2": {
      x: 400,
      y: -50,
      d: "-=3.5",
    },
    "#location_5": {
      x: 400,
      y: 0,
      d: "-=4",
    },
    "#project_3": {
      x: -300,
      y: -100,
      d: "-=3.5",
    },
    "#project_4": {
      x: -300,
      y: -100,
      d: "-=3.5",
    },
    "#project_6": {
      x: -300,
      y: 50,
      d: "-=2",
    },
  };
  var images = document.querySelectorAll("#images image");
  gsap.set("#animation-container", {
    display: "block",
  });

  var imgTl = gsap.timeline({ ease: "none", delay: 1 });
  imgTl.set("#images image", { scale: 0 });
  // imgTl.set("#images", { opacity: 1 });
  images.forEach((image, i) => {
    image.classList.add("idx-" + i);
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
  // gsap.to("#images", { duration: 1, opacity: 1, ease: "none" });

  // gsap.to("#backdrop", { opacity: 0, duration: 3, delay: 4.5 });
  imgTl.addLabel("collapse", "-=0.5");
  Object.keys(collapseCoords).forEach((key) => {
    var img = document.querySelector(key);
    imgTl.to(
      img,
      {
        duration: 1,
        x: collapseCoords[key].x,
        y: collapseCoords[key].y,
        scale: 0.1,
        onComplete: function () {
          img.remove();
        },
      },
      "collapse" + collapseCoords[key].d
    );
  });
  var tl = gsap.timeline({
    ease: "none",
    delay: 5,
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
  tl.to("#folders", {
    duration: 15,
    rotate: -360,
    repeat: -1,
    transformOrigin: "center",
    ease: "none",
  });
  tl.to(
    "#folders image",
    {
      duration: 15,
      rotate: 360,
      repeat: -1,
      transformOrigin: "center",
      ease: "none",
    },
    "<"
  );
  var endDelay = 17;
  // gsap.to("#backdrop", { opacity: 0.85, duration: 2, delay: endDelay });
  var introTl = gsap.timeline({ delay: endDelay });
  introTl.to("#folders image", {
    duration: 3,
    scale: 0.1,
    x: -40,
    y: -140,
    ease: "none",
    onComplete: function () {
      imgTl.kill();
      tl.kill();
      document.querySelector("#folders").remove();
    },
  });
  gsap.set("#introDiv", { css: { opacity: 0 } });
  introTl.to("#emlogo", {
    scale: 0.65,
    y: -500,
    duration: 1,
    transformOrigin: "center",
    ease: "expo.in",
    onComplete: function () {},
  });
  var offset = document.querySelector("#emlogo").getBoundingClientRect();
  introTl.to(
    "#introDiv",
    {
      duration: 1,
      css: { opacity: 1, top: offset.bottom - 400 },
      ease: "expo.in",
    },
    "<"
  );
  gsap.to("#bg1", { opacity: 0.05, duration: 3, delay: endDelay + 1 });
  gsap.to("#bg2", { opacity: 0.05, duration: 3, delay: endDelay + 1 });
  var bgTl = gsap.timeline({ delay: endDelay + 1, repeat: -1 });
  bgTl.fromTo(
    "#bg1",
    {
      xPercent: 0,
    },
    {
      duration: 30,
      xPercent: -100,
      ease: "none",
    }
  );
  bgTl.fromTo(
    "#bg2",
    {
      xPercent: 100,
    },
    {
      duration: 30,
      xPercent: 0,
      ease: "none",
    },
    "<"
  );
});
