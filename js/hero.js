(function () {
  var DEFAULT_SLIDES = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD88TpI4Ow06uxdF0FRygcsEA-KllzZduYWvFnTeF-eoKpNeyezJql3rp3pZr4HzjU50D1rmiOC0ZOh5t53WPtNe2Fd4X2wTHFzdLumtjpR0z2H92gLhsABn-D0PZqvpjAbXu9OaIGEZonNVUT63TjD8Qovaj23h0O3fRHJ_xCCQow9cEWMqK81zMSKzSOmOi33fFGtna-qyhDkNNror4NCOJq_N7mduzXlvSVowYbXuSCK9blUjop2ahehGIQvhiea2ISXqyg0El0",
      alt: "Professional drone flying over snow-capped Himalayan peaks at sunrise",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-4fQPzteKvCzHrjYiTPxCNTPj_2hEULYY5Xei6Mm5j935PXifQCQd1quau5G-KSAM8rkSEDDclnAa40ljS6EfS4XjBoR6YxdiwY1QHX5TGvpoXFEyDi5ttznoUZ2NJ1dUqXboFUjEjwyMM6CdlzB58RIyUTl7UndBADgVEErierHRwiE6YVLeV9hEhhXP1Qe9AP_Dmbt34ruH_mTEn1pbun70X46H5sYckde9NJCfl8loO6E-5ya7UurXrjctv3nLAr535P2Nzww",
      alt: "Snow-capped Nepalese Himalayas at dawn with a professional drone in the foreground",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbJcrwVtjiLqw1B3JvfpdNsT4EZsLeXTO2npwHoMdpKQg4bHl3WnezrB-W0x7EgmdJvy-SdK4wpiFZTpW2Z69L5jhF5VjDdmrPP1PwgkF9VajOlRxJXb2keHKvz9xKM_CcBLqZWB4AE0nwybRZogJd23W_LVsIcJIkx7siF9wLXEvU6-o8O9kr67eUI1yVnV5u9WQdyNsjCcmIpKhfQ_GounFdVlxRYmFaVes1qlQmFBikRK0KVw6F9rlqHjoDXclAQwjnB1MYYus",
      alt: "Himalayan peaks with a drone hovering in the foreground",
    },
    {
      src: "assets/events/fdb-drone-training-2026.jpg",
      alt: "FDB drone training session at Film Development Board, Kathmandu",
    },
    {
      src: "assets/events/nepal-drone-seminar-2026.jpg",
      alt: "National panel discussion on Nepal's drone ecosystem",
    },
  ];

  var HERO_CONFIG = {
    home: {
      size: "full",
      align: "center",
      interval: 7000,
      slides: "default",
    },
    about: {
      size: "page",
      align: "center",
      interval: 6500,
      slides: [
        DEFAULT_SLIDES[1],
        DEFAULT_SLIDES[0],
        DEFAULT_SLIDES[4],
        { src: "assets/events/fpv-drone-training-2025.jpg", alt: "FPV drone training workshop in Kathmandu" },
      ],
    },
    contact: {
      size: "page",
      align: "center",
      interval: 6500,
      slides: [DEFAULT_SLIDES[0], DEFAULT_SLIDES[2], DEFAULT_SLIDES[3]],
    },
    events: {
      size: "page",
      align: "center",
      interval: 6000,
      slides: [
        { src: "assets/events/fdb-drone-training-2026.jpg", alt: "FDB 10-day drone training 2026" },
        { src: "assets/events/nepal-drone-seminar-2026.jpg", alt: "Nepal drone seminar panel discussion" },
        { src: "assets/events/fpv-drone-training-2025.jpg", alt: "FPV drone basic training workshop" },
        DEFAULT_SLIDES[2],
      ],
    },
    programs: {
      size: "page",
      align: "center",
      interval: 6500,
      slides: [
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr65G0-DMA5db8Pt2iOmnoH8Zv18YEUZomF8BAGXl3ukVxc2lmjOKQSRqgfekhLPDGfNkb8STGGEtv4bSlhx-bve3NzYy4de3aJ-egAiW8O-RcBZylv6j2hCc2eZlyFNMqEDErVNkXhbKrWnnPzblH3EQYthdjeVb9fS6eTA5Genc4myZCSBznOFEYPJO1XClX2dtC-NGlZ8ekUm7LGzAn4PLTB0htBg9Jahvt5tjBeqN7DkIyDv3EAAo3WvIf5YLkaZDrmj2Y_ac",
          alt: "Drone supporting disaster response and emergency operations in mountainous Nepal",
        },
        { src: "assets/news/udaan-ndrrma-mou.jpg", alt: "UDAAN and NDRRMA disaster management partnership signing" },
        DEFAULT_SLIDES[3],
        DEFAULT_SLIDES[0],
      ],
    },
    dmd: {
      size: "compact",
      align: "bottom",
      interval: 6500,
      slides: [
        { src: "assets/news/udaan-ndrrma-mou.jpg", alt: "UDAAN disaster management partnership with NDRRMA" },
        {
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr65G0-DMA5db8Pt2iOmnoH8Zv18YEUZomF8BAGXl3ukVxc2lmjOKQSRqgfekhLPDGfNkb8STGGEtv4bSlhx-bve3NzYy4de3aJ-egAiW8O-RcBZylv6j2hCc2eZlyFNMqEDErVNkXhbKrWnnPzblH3EQYthdjeVb9fS6eTA5Genc4myZCSBznOFEYPJO1XClX2dtC-NGlZ8ekUm7LGzAn4PLTB0htBg9Jahvt5tjBeqN7DkIyDv3EAAo3WvIf5YLkaZDrmj2Y_ac",
          alt: "Disaster response drone operations in Nepal",
        },
        DEFAULT_SLIDES[0],
      ],
    },
    detail: {
      size: "compact",
      align: "bottom",
      interval: 8000,
      slides: "default",
    },
  };

  var SIZE_CLASSES = {
    full: "udaan-hero--size-full",
    page: "udaan-hero--size-page",
    compact: "udaan-hero--size-compact",
  };

  var ALIGN_CLASSES = {
    center: "udaan-hero--center",
    bottom: "udaan-hero--bottom",
  };

  function resolveSlides(slides, basePath) {
    var list = slides === "default" ? DEFAULT_SLIDES : slides;
    return list.map(function (slide) {
      var src = slide.src;
      if (basePath && src.indexOf("http") !== 0 && src.indexOf("//") !== 0 && src.charAt(0) !== "/") {
        src = basePath + src;
      }
      return { src: src, alt: slide.alt };
    });
  }

  function resolveBasePath() {
    if (document.querySelector("base[href]")) {
      return "";
    }
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute("src") || "";
      if (src.indexOf("hero.js") !== -1) {
        return src.replace(/js\/hero\.js.*$/, "");
      }
    }
    return "";
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function buildMedia(slides) {
    var media = document.createElement("div");
    media.className = "udaan-hero__media";

    slides.forEach(function (slide, index) {
      var item = document.createElement("div");
      item.className = "udaan-hero__slide" + (index === 0 ? " is-active" : "");
      item.setAttribute("data-slide-index", String(index));

      var img = document.createElement("img");
      img.src = slide.src;
      img.alt = slide.alt;
      img.loading = index === 0 ? "eager" : "lazy";
      if (index === 0) img.fetchPriority = "high";
      img.decoding = "async";

      item.appendChild(img);
      media.appendChild(item);
    });

    var overlay = document.createElement("div");
    overlay.className = "udaan-hero__overlay hero-overlay";
    overlay.setAttribute("aria-hidden", "true");
    media.appendChild(overlay);

    return media;
  }

  function buildControls(slideCount) {
    if (slideCount <= 1) return null;

    var controls = document.createElement("div");
    controls.className = "udaan-hero__controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Hero image slider");

    var prev = document.createElement("button");
    prev.type = "button";
    prev.className = "udaan-hero__nav-btn";
    prev.setAttribute("aria-label", "Previous slide");
    prev.innerHTML = '<span class="material-symbols-outlined">chevron_left</span>';

    var dots = document.createElement("div");
    dots.className = "udaan-hero__dots";
    dots.setAttribute("role", "tablist");

    for (var i = 0; i < slideCount; i++) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "udaan-hero__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Slide " + (i + 1) + " of " + slideCount);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.setAttribute("data-slide-to", String(i));
      dots.appendChild(dot);
    }

    var next = document.createElement("button");
    next.type = "button";
    next.className = "udaan-hero__nav-btn";
    next.setAttribute("aria-label", "Next slide");
    next.innerHTML = '<span class="material-symbols-outlined">chevron_right</span>';

    controls.appendChild(prev);
    controls.appendChild(dots);
    controls.appendChild(next);

    return { controls: controls, prev: prev, next: next, dots: dots };
  }

  function initSlider(section, slides, interval) {
    if (slides.length <= 1) return;

    var media = section.querySelector(".udaan-hero__media");
    if (!media) return;

    var slideEls = media.querySelectorAll(".udaan-hero__slide");
    var ui = buildControls(slides.length);
    if (!ui) return;

    section.appendChild(ui.controls);

    var index = 0;
    var timer = null;
    var reducedMotion = prefersReducedMotion();

    function setSlide(nextIndex) {
      index = (nextIndex + slideEls.length) % slideEls.length;

      slideEls.forEach(function (el, i) {
        el.classList.toggle("is-active", i === index);
      });

      ui.dots.querySelectorAll(".udaan-hero__dot").forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }

    function nextSlide() {
      setSlide(index + 1);
    }

    function prevSlide() {
      setSlide(index - 1);
    }

    function startAutoplay() {
      if (reducedMotion || slideEls.length <= 1) return;
      stopAutoplay();
      timer = window.setInterval(nextSlide, interval);
    }

    function stopAutoplay() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    ui.next.addEventListener("click", function () {
      nextSlide();
      startAutoplay();
    });

    ui.prev.addEventListener("click", function () {
      prevSlide();
      startAutoplay();
    });

    ui.dots.addEventListener("click", function (event) {
      var dot = event.target.closest("[data-slide-to]");
      if (!dot) return;
      setSlide(parseInt(dot.getAttribute("data-slide-to"), 10));
      startAutoplay();
    });

    section.addEventListener("mouseenter", stopAutoplay);
    section.addEventListener("mouseleave", startAutoplay);
    section.addEventListener("focusin", stopAutoplay);
    section.addEventListener("focusout", function (event) {
      if (!section.contains(event.relatedTarget)) startAutoplay();
    });

    startAutoplay();
  }

  function slidesFromSection(section, config, basePath) {
    var custom = section.getAttribute("data-udaan-slides");
    if (custom) {
      try {
        return resolveSlides(JSON.parse(custom), basePath);
      } catch (error) {
        /* fall through to preset */
      }
    }
    return resolveSlides(config.slides, basePath);
  }

  function upgradeSection(section) {
    var key = section.getAttribute("data-udaan-hero");
    if (!key || !HERO_CONFIG[key]) return;

    var config = HERO_CONFIG[key];
    var basePath = resolveBasePath();
    var slides = slidesFromSection(section, config, basePath);

    section.classList.add("udaan-hero");
    Object.keys(SIZE_CLASSES).forEach(function (k) {
      section.classList.remove(SIZE_CLASSES[k]);
    });
    Object.keys(ALIGN_CLASSES).forEach(function (k) {
      section.classList.remove(ALIGN_CLASSES[k]);
    });
    section.classList.add(SIZE_CLASSES[config.size] || SIZE_CLASSES.page);
    section.classList.add(ALIGN_CLASSES[config.align] || ALIGN_CLASSES.center);

    var bg = section.querySelector(":scope > .absolute.inset-0.z-0");
    if (bg) {
      bg.replaceWith(buildMedia(slides));
    } else if (!section.querySelector(".udaan-hero__media")) {
      section.insertBefore(buildMedia(slides), section.firstChild);
    }

    var content = section.querySelector(":scope > .relative.z-10");
    if (content) {
      content.classList.add("udaan-hero__content");
    }

    initSlider(section, slides, config.interval || 6500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-udaan-hero]").forEach(upgradeSection);
  });
})();
