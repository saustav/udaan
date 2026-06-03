(function () {
  var LINKS = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "about", label: "About Us", href: "about.html" },
    {
      id: "programs",
      label: "Programs",
      href: "programs.html",
      children: [
        {
          label: "DMD — Disaster Mitigating Drone",
          href: "programs/dmd.html",
        },
      ],
    },
    { id: "events", label: "Events", href: "events.html" },
  ];

  function getBasePath() {
    if (document.querySelector("base[href]")) {
      return "";
    }
    var path = window.location.pathname;
    if (
      path.indexOf("/events/") !== -1 ||
      path.indexOf("/news/") !== -1 ||
      path.indexOf("/programs/") !== -1
    ) {
      return "../";
    }
    return "";
  }

  function resolveActivePage() {
    var path = window.location.pathname;
    var file = path.split("/").pop() || "index.html";

    if (file === "about.html") return "about";
    if (file === "contact.html") return "contact";
    if (file === "events.html" || path.indexOf("/events/") !== -1) return "events";
    if (file === "programs.html" || path.indexOf("/programs/") !== -1) return "programs";
    return "home";
  }

  function renderDropdown(link, isActive, base) {
    var triggerClass = isActive
      ? "text-primary font-semibold"
      : "text-on-surface-variant hover:text-primary transition-colors duration-200";
    var childLinks = link.children
      .map(function (child) {
        return (
          '<a class="block px-4 py-3 text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg mx-1" href="' +
          base +
          child.href +
          '">' +
          child.label +
          "</a>"
        );
      })
      .join("");

    return (
      '<div class="relative group">' +
      '<a class="' +
      triggerClass +
      ' flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 py-0.5" href="' +
      base +
      link.href +
      '"' +
      (isActive ? ' aria-current="page"' : "") +
      ">" +
      link.label +
      '<span class="material-symbols-outlined text-base leading-none transition-transform duration-200 motion-reduce:transition-none group-hover:rotate-180">expand_more</span>' +
      "</a>" +
      '<div class="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-50 motion-reduce:transition-none">' +
      '<div class="bg-surface-bright rounded-xl shadow-card-hover border border-outline-variant py-2 min-w-[260px] overflow-hidden">' +
      childLinks +
      "</div></div></div>"
    );
  }

  function renderNavLinks(base, activePage, forMobile) {
    return LINKS.map(function (link) {
      var isActive = link.id === activePage;

      if (link.children && !forMobile) {
        return renderDropdown(link, isActive, base);
      }

      var className = isActive
        ? "text-primary font-semibold"
        : "text-on-surface-variant hover:text-primary transition-colors duration-200";

      var mobileClass = forMobile
        ? " block py-3 px-4 rounded-xl hover:bg-surface-container "
        : " ";

      var dropdownChildren = "";
      if (link.children && forMobile) {
        dropdownChildren = link.children
          .map(function (child) {
            return (
              '<a class="block py-2 pl-8 pr-4 text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="' +
              base +
              child.href +
              '">' +
              child.label +
              "</a>"
            );
          })
          .join("");
      }

      return (
        '<a class="' +
        className +
        mobileClass +
        'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" href="' +
        base +
        link.href +
        '"' +
        (isActive ? ' aria-current="page"' : "") +
        ">" +
        link.label +
        "</a>" +
        dropdownChildren
      );
    }).join(forMobile ? "" : "");
  }

  function renderNav(container) {
    var base = getBasePath();
    var activePage = container.dataset.page || resolveActivePage();
    var desktopLinks = renderNavLinks(base, activePage, false);
    var mobileLinks = renderNavLinks(base, activePage, true);

    container.innerHTML =
      '<nav class="fixed top-4 left-4 right-4 z-50 max-w-7xl mx-auto" aria-label="Main navigation">' +
      '<div class="flex justify-between items-center bg-surface-bright/90 backdrop-blur-md shadow-nav rounded-2xl border border-outline-variant/60 px-4 sm:px-6 h-20">' +
      '<a class="flex items-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" href="' +
      base +
      'index.html" aria-label="UDAAN home">' +
      '<img class="h-16 w-auto object-contain" src="' +
      base +
      'assets/udaan-logo.svg" alt="Nepal Unmanned Aircraft (Drone) Association — UDAAN official logo"/>' +
      "</a>" +
      '<div class="hidden lg:flex items-center gap-8">' +
      desktopLinks +
      "</div>" +
      '<div class="flex items-center gap-3">' +
      '<a class="hidden sm:inline-flex bg-cta hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-full font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-sm" href="' +
      base +
      'contact.html#contact-form">Become a Member</a>' +
      '<button type="button" id="mobile-menu-btn" class="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-expanded="false" aria-controls="mobile-menu">' +
      '<span class="sr-only">Open menu</span>' +
      '<span class="material-symbols-outlined text-2xl" id="menu-icon-open">menu</span>' +
      '<span class="material-symbols-outlined text-2xl hidden" id="menu-icon-close">close</span>' +
      "</button></div></div>" +
      '<div id="mobile-menu" class="hidden lg:hidden mt-2 bg-surface-bright/95 backdrop-blur-md rounded-2xl border border-outline-variant/60 shadow-nav overflow-hidden">' +
      '<div class="flex flex-col p-4">' +
      mobileLinks +
      '<a class="mt-4 text-center bg-cta hover:bg-primary-container text-on-primary px-5 py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer" href="' +
      base +
      'contact.html#contact-form">Become a Member</a>' +
      "</div></div></nav>";
  }

  function setupMobileMenu(container) {
    var btn = container.querySelector("#mobile-menu-btn");
    var menu = container.querySelector("#mobile-menu");
    var iconOpen = container.querySelector("#menu-icon-open");
    var iconClose = container.querySelector("#menu-icon-close");

    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      var isOpen = !menu.classList.contains("hidden");
      menu.classList.toggle("hidden", isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
      iconOpen.classList.toggle("hidden", !isOpen);
      iconClose.classList.toggle("hidden", isOpen);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("site-nav");
    if (!container) return;

    renderNav(container);
    setupMobileMenu(container);

    container.addEventListener("click", function (e) {
      var link = e.target.closest('a[href$="index.html"]');
      if (!link) return;
      var path = window.location.pathname.split("/").pop() || "index.html";
      if (path === "index.html" || path === "") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
})();
