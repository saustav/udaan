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

  // Share bar: "Copy link" and the phone's native share sheet ("More…")
  function shareStatus(el, text) {
    var bar = el.closest("[data-udaan-share]");
    var status = bar && bar.querySelector("[data-udaan-share-status]");
    if (status) status.textContent = text;
  }
  document.addEventListener("click", function (event) {
    var copyBtn = event.target.closest && event.target.closest("[data-udaan-copy]");
    if (copyBtn) {
      var url = copyBtn.getAttribute("data-udaan-copy");
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = "Link copied ✓";
        shareStatus(copyBtn, "Link copied to clipboard");
        setTimeout(function () { copyBtn.textContent = old; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { window.prompt("Copy this link:", url); });
      } else {
        window.prompt("Copy this link:", url);
      }
      return;
    }
    var nativeBtn = event.target.closest && event.target.closest("[data-udaan-native-share]");
    if (nativeBtn && navigator.share) {
      var bar = nativeBtn.closest("[data-udaan-share]");
      navigator.share({
        title: bar.getAttribute("data-title") || document.title,
        url: bar.getAttribute("data-url") || getPageUrl(),
      }).catch(function () {});
    }
  });

  // Email links: the address is assembled only on click, so it never appears
  // as text in the page (keeps it away from spam harvesters).
  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[data-u][data-d]");
    if (!link) return;
    event.preventDefault();
    window.location.href = "mailto:" + link.getAttribute("data-u") + "@" + link.getAttribute("data-d");
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-udaan-native-share]").forEach(function (b) { b.hidden = !navigator.share; });
    renderInlineShareLinks(
      document.getElementById("contact-share-links"),
      "w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    );
  });
})();
