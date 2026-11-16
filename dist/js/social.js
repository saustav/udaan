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

  // Brand icons (Simple Icons, CC0) and UI icons (Material, Apache-2.0)
  var ICONS = {"facebook": "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", "whatsapp": "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z", "viber": "M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z", "linkedin": "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", "x": "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z", "mail": "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z", "link": "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z", "share": "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"};

  function iconSvg(id, cls) {
    if (!ICONS[id]) return "";
    return '<svg class="' + (cls || "w-5 h-5") + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="' + ICONS[id] + '"/></svg>';
  }

  window.UDAAN_SOCIAL = {
    icon: iconSvg,
    profiles: getProfiles,
    shareLinks: getShareLinks,
    profileList: function () {
      var p = getProfiles();
      return [
        { id: "facebook", label: "Facebook", href: p.facebook, icon: "facebook" },
        { id: "linkedin", label: "LinkedIn", href: p.linkedin, icon: "linkedin" },
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
        var lbl = copyBtn.querySelector("[data-label]") || copyBtn;
        var old = lbl.textContent;
        lbl.textContent = "Link copied ✓";
        shareStatus(copyBtn, "Link copied to clipboard");
        setTimeout(function () { lbl.textContent = old; }, 2000);
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
