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
      '"><span class="material-symbols-outlined text-xl leading-none" aria-hidden="true">' +
      icon +
      "</span></a>"
    );
  }

  function renderFooterSocialBlocks() {
    if (!window.UDAAN_SOCIAL) return { profiles: "", share: "" };

    var iconClass =
      "inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-white text-primary hover:bg-primary-container hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";
    var shareIconClass =
      "inline-flex items-center justify-center shrink-0 w-9 h-9 rounded-full bg-white text-primary hover:bg-primary-container hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

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
      '<p class="text-white/70 text-xs leading-relaxed">Reg. No. 207 · 2081/12/22<br/>Sanstha Darta Ain, 2034, Dafa 4</p>' +
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
      '<li><a class="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="https://member.udaan.org.np/" target="_blank" rel="noopener noreferrer">Become a Member</a></li>' +
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
      '<p class="font-semibold text-white mb-5 font-headline">Stay Updated</p>' +
      '<p class="text-white/70 text-sm leading-relaxed mb-4">Regulatory updates, events and news are posted on our social channels first.</p>' +
      '<ul class="space-y-3 text-sm">' +
      '<li><a class="inline-flex items-center gap-2 min-h-6 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      (window.UDAAN_SOCIAL ? window.UDAAN_SOCIAL.profiles().facebook : "https://www.facebook.com/") +
      '" target="_blank" rel="noopener noreferrer">Follow on Facebook <span class="material-symbols-outlined text-base leading-none" aria-hidden="true">north_east</span></a></li>' +
      '<li><a class="inline-flex items-center gap-2 min-h-6 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer" href="' +
      (window.UDAAN_SOCIAL ? window.UDAAN_SOCIAL.profiles().linkedin : "https://www.linkedin.com/") +
      '" target="_blank" rel="noopener noreferrer">Follow on LinkedIn <span class="material-symbols-outlined text-base leading-none" aria-hidden="true">north_east</span></a></li>' +
      "</ul>" +
      "</div></div></div></div>" +
      '<div class="site-container">' +
      '<div class="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 w-full">' +
      '<p class="text-white/70 text-sm text-center md:text-left">© Nepal Unmanned Aircraft (Drone) Association — UDAAN. Regulated by Civil Aviation Authority of Nepal.</p>' +
      '<div class="flex gap-6">' +
      '<a class="text-white/70 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="' + base + 'privacy.html">Privacy Policy</a>' +
      '<a class="text-white/70 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="' + base + 'terms.html">Terms of Use</a>' +
      "</div></div></div></footer>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("site-footer");
    if (container) renderFooter(container);
  });
})();
