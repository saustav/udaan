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
          '"><span class="material-symbols-outlined text-xl">' +
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
