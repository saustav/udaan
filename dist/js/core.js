/**
 * Site-wide configuration.
 * Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
 * (create a form pointed at info@udaan.org.np, then paste the ID here).
 */
window.UDAAN_SITE_CONFIG = {
  siteUrl: "https://udaan.org.np",
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  social: {
    facebook:
      "https://www.facebook.com/p/UDAAN-Unmanned-Aircraft-Association-of-Nepal-61573936520305/",
    linkedin: "https://www.linkedin.com/company/udaannepal",
  },
};
(function () {
  var DEFAULT_SOCIAL = {
    facebook:
      "https://www.facebook.com/p/UDAAN-Unmanned-Aircraft-Association-of-Nepal-61573936520305/",
    linkedin: "https://www.linkedin.com/company/udaannepal",
  };

  function getProfiles() {
    var cfg = window.UDAAN_SITE_CONFIG || {};
    return Object.assign({}, DEFAULT_SOCIAL, cfg.social || {});
  }

  function getPageUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && canonical.href) {
      return canonical.href;
    }
    return (window.UDAAN_SITE_CONFIG && window.UDAAN_SITE_CONFIG.siteUrl) || window.location.href;
  }

  function getPageTitle() {
    return document.title || "UDAAN — Unmanned Aircraft Association of Nepal";
  }

  function enc(value) {
    return encodeURIComponent(value);
  }

  function getShareLinks() {
    var url = getPageUrl();
    var title = getPageTitle();
    return {
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + enc(url),
      linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + enc(url),
      twitter:
        "https://twitter.com/intent/tweet?url=" + enc(url) + "&text=" + enc(title),
      whatsapp: "https://wa.me/?text=" + enc(title + " " + url),
    };
  }

  window.UDAAN_SOCIAL = {
    profiles: getProfiles,
    shareLinks: getShareLinks,
    profileList: function () {
      var p = getProfiles();
      return [
        { id: "facebook", label: "Facebook", href: p.facebook, icon: "groups" },
        { id: "linkedin", label: "LinkedIn", href: p.linkedin, icon: "work" },
      ].filter(function (item) {
        return item.href;
      });
    },
    shareList: function () {
      var links = getShareLinks();
      return [
        { id: "facebook", label: "Share on Facebook", href: links.facebook, icon: "share" },
        { id: "linkedin", label: "Share on LinkedIn", href: links.linkedin, icon: "share" },
        { id: "twitter", label: "Share on X", href: links.twitter, icon: "share" },
        { id: "whatsapp", label: "Share on WhatsApp", href: links.whatsapp, icon: "chat" },
      ];
    },
  };

  function renderInlineShareLinks(container, buttonClass) {
    if (!container) return;
    container.innerHTML = window.UDAAN_SOCIAL.shareList()
      .map(function (item) {
        return (
          '<a class="' +
          buttonClass +
          '" href="' +
          item.href +
          '" rel="noopener noreferrer" target="_blank" aria-label="' +
          item.label +
          '"><span class="material-symbols-outlined text-xl" aria-hidden="true">' +
          item.icon +
          "</span></a>"
        );
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderInlineShareLinks(
      document.getElementById("contact-share-links"),
      "w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    );
  });
})();
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
      ' flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 py-1" href="' +
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
        ? " mobile-nav-link py-3 px-4 rounded-xl hover:bg-surface-container "
        : " ";

      var dropdownChildren = "";
      if (link.children && forMobile) {
        dropdownChildren = link.children
          .map(function (child) {
            return (
              '<a class="mobile-nav-sublink py-2 pl-8 pr-4 text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer" href="' +
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
      '<nav class="fixed z-50 inset-x-0 site-gutter" aria-label="Main navigation">' +
      '<div class="site-nav-bar flex justify-between items-center bg-surface-bright/90 backdrop-blur-md shadow-nav rounded-2xl border border-outline-variant/60 px-4 sm:px-6 w-full max-w-7xl">' +
      '<a class="flex items-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg" href="' +
      base +
      'index.html" aria-label="UDAAN home">' +
      '<img class="h-11 sm:h-16 w-auto object-contain" width="487" height="512" src="' +
      base +
      'assets/udaan-logo.svg" alt="Nepal Unmanned Aircraft (Drone) Association — UDAAN official logo"/>' +
      "</a>" +
      '<div class="hidden lg:flex items-center gap-8">' +
      desktopLinks +
      "</div>" +
      '<div class="flex items-center gap-3">' +
      '<button type="button" id="mobile-menu-btn" class="lg:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-expanded="false" aria-controls="mobile-menu">' +
      '<span class="sr-only">Toggle menu</span>' +
      '<span class="material-symbols-outlined text-2xl" id="menu-icon-open">menu</span>' +
      "</button></div></div>" +
      '<div id="mobile-menu" class="hidden lg:hidden mt-2 bg-surface-bright/95 backdrop-blur-md rounded-2xl border border-outline-variant/60 shadow-nav overflow-hidden">' +
      '<div class="flex flex-col p-4">' +
      mobileLinks +
      '<a class="mt-4 text-center bg-cta hover:bg-primary-container text-on-primary px-5 py-3 rounded-full font-semibold transition-colors duration-200 cursor-pointer" href="' +
      base +
      'contact.html#contact-form">Become a Member</a>' +
      "</div></div></nav>";
  }

  function setMobileMenuOpen(container, open) {
    var btn = container.querySelector("#mobile-menu-btn");
    var menu = container.querySelector("#mobile-menu");

    if (!btn || !menu) return;

    menu.classList.toggle("hidden", !open);
    btn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("mobile-menu-open", open);

    var memberBar = document.getElementById("mobile-member-bar");
    if (memberBar) {
      memberBar.classList.toggle("mobile-member-bar--hidden", open);
    }
  }

  function renderMobileMemberBar(base, activePage) {
    if (activePage === "contact") return;

    var existing = document.getElementById("mobile-member-bar");
    if (existing) existing.remove();

    var bar = document.createElement("div");
    bar.id = "mobile-member-bar";
    bar.className = "mobile-member-bar lg:hidden";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Membership call to action");
    bar.innerHTML =
      '<a class="mobile-member-bar__link" href="' +
      base +
      'contact.html#contact-form">' +
      '<span class="mobile-member-bar__label">Become a Member</span>' +
      '<span class="material-symbols-outlined mobile-member-bar__icon" aria-hidden="true">arrow_forward</span>' +
      "</a>";

    document.body.appendChild(bar);
  }

  function setupMobileMenu(container) {
    var btn = container.querySelector("#mobile-menu-btn");
    var menu = container.querySelector("#mobile-menu");

    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      setMobileMenuOpen(container, menu.classList.contains("hidden"));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMobileMenuOpen(container, false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !menu.classList.contains("hidden")) {
        setMobileMenuOpen(container, false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setMobileMenuOpen(container, false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("site-nav");
    if (!container) return;

    var base = getBasePath();
    var activePage = container.dataset.page || resolveActivePage();

    renderNav(container);
    setupMobileMenu(container);
    renderMobileMemberBar(base, activePage);

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
(function () {
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

  function renderSocialIconLink(href, label, icon, className) {
    return (
      '<a class="' +
      className +
      '" href="' +
      href +
      '" rel="noopener noreferrer" target="_blank" aria-label="' +
      label +
      '"><span class="material-symbols-outlined text-xl" aria-hidden="true">' +
      icon +
      "</span></a>"
    );
  }

  function renderFooterSocialBlocks() {
    if (!window.UDAAN_SOCIAL) return { profiles: "", share: "" };

    var iconClass =
      "w-10 h-10 rounded-full bg-white text-primary hover:bg-primary-container hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
    var shareIconClass =
      "w-9 h-9 rounded-full bg-white text-primary hover:bg-primary-container hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

    var profiles = window.UDAAN_SOCIAL.profileList()
      .map(function (item) {
        return renderSocialIconLink(item.href, "Follow UDAAN on " + item.label, item.icon, iconClass);
      })
      .join("");

    profiles +=
      renderSocialIconLink(
        "mailto:info@udaan.org.np",
        "Email UDAAN",
        "mail",
        iconClass
      );

    var share = window.UDAAN_SOCIAL.shareList()
      .map(function (item) {
        return renderSocialIconLink(item.href, item.label, item.icon, shareIconClass);
      })
      .join("");

    return { profiles: profiles, share: share };
  }

  function renderFooter(container) {
    var base = getBasePath();
    var social = renderFooterSocialBlocks();

    container.innerHTML =
      '<footer class="bg-primary text-white w-full mt-16" id="contact">' +
      '<div class="site-container">' +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-8 py-14 w-full">' +
      '<div class="md:col-span-1">' +
      '<a class="inline-block mb-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg" href="' +
      base +
      'index.html" aria-label="UDAAN home">' +
      '<img class="h-20 w-auto object-contain brightness-0 invert" width="487" height="512" src="' +
      base +
      'assets/udaan-logo.svg" alt="UDAAN logo" loading="lazy"/>' +
      "</a>" +
      '<p class="font-semibold text-sm leading-snug mb-1">Nepal Unmanned Aircraft (Drone) Association</p>' +
      '<p class="text-white/70 text-sm leading-relaxed mb-1" lang="ne">नेपाल मानव रहित विमान (ड्रोन) संघ</p>' +
      '<p class="text-white/60 text-sm leading-relaxed mb-3">Promoting safe, responsible, and sustainable unmanned aircraft operations across Nepal.</p>' +
      '<p class="text-white/50 text-xs leading-relaxed">Reg. No. 207 · 2081/12/22<br/>Sanstha Darta Ain, 2034, Dafa 4</p>' +
      '<p class="text-white/60 text-xs font-semibold uppercase tracking-widest mt-6 mb-3">Follow UDAAN</p>' +
      '<div class="flex flex-wrap gap-3">' +
      social.profiles +
      "</div>" +
      '<p class="text-white/60 text-xs font-semibold uppercase tracking-widest mt-5 mb-3">Share this page</p>' +
      '<div class="flex flex-wrap gap-2">' +
      social.share +
      "</div></div>" +
      "<div>" +
      '<p class="font-semibold text-white mb-5 font-headline">Quick Links</p>' +
      '<ul class="space-y-3 text-sm">' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'index.html">Home</a></li>' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'about.html">About Us</a></li>' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'programs.html">Programs &amp; Initiatives</a></li>' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'events.html">Events</a></li>' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'index.html#membership">Membership Tiers</a></li>' +
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      base +
      'contact.html#contact-form">Membership Inquiries</a></li>' +
      "</ul></div>" +
      "<div>" +
      '<p class="font-semibold text-white mb-5 font-headline">Office</p>' +
      '<ul class="space-y-4 text-sm text-white/70">' +
      '<li class="flex items-start gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">location_on</span><span>Kathmandu Metropolitan City<br/>Ward No. 29, Nepal</span></li>' +
      '<li class="flex items-start gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">account_balance</span><span>Registered with:<br/>District Administration Office<br/>Babarmahal, Kathmandu</span></li>' +
      '<li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">call</span><a class="hover:text-white transition-colors duration-200 cursor-pointer" href="tel:+977145369808">01-4536-9808</a></li>' +
      '<li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">alternate_email</span><a class="hover:text-white transition-colors duration-200 cursor-pointer" href="mailto:info@udaan.org.np">info@udaan.org.np</a></li>' +
      "</ul></div>" +
      "<div>" +
      '<p class="font-semibold text-white mb-5 font-headline">Subscribe</p>' +
      '<p class="text-white/60 text-xs mb-4">Get regulatory updates and event announcements.</p>' +
      '<div class="flex gap-2">' +
      '<label class="sr-only" for="footer-email">Email address</label>' +
      '<input class="bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-3 text-sm rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none w-full" id="footer-email" placeholder="Email address" type="email"/>' +
      '<button class="bg-accent hover:bg-accent-light text-white px-4 py-3 rounded-xl font-semibold text-xs shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" type="button">Join</button>' +
      "</div></div></div></div>" +
      '<div class="site-container">' +
      '<div class="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 w-full">' +
      '<p class="text-white/50 text-sm text-center md:text-left">© Nepal Unmanned Aircraft (Drone) Association — UDAAN. Regulated by Civil Aviation Authority of Nepal.</p>' +
      '<div class="flex gap-6">' +
      '<a class="text-white/50 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="#">Privacy Policy</a>' +
      '<a class="text-white/50 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="#">Terms of Service</a>' +
      "</div></div></div></footer>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("site-footer");
    if (container) renderFooter(container);
  });
})();
