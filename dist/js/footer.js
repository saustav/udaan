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

  function renderFooter(container) {
    var base = getBasePath();

    container.innerHTML =
      '<footer class="bg-primary text-white w-full mt-16" id="contact">' +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 sm:px-6 md:px-8 py-14 max-w-7xl mx-auto">' +
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
      '<div class="flex gap-3 mt-6">' +
      '<a class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="#" aria-label="Website"><span class="material-symbols-outlined text-xl">public</span></a>' +
      '<a class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="#" aria-label="Share"><span class="material-symbols-outlined text-xl">share</span></a>' +
      '<a class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="mailto:info@udaan.org.np" aria-label="Email"><span class="material-symbols-outlined text-xl">mail</span></a>' +
      "</div></div>" +
      "<div>" +
      '<h4 class="font-semibold text-white mb-5 font-headline">Quick Links</h4>' +
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
      '<h4 class="font-semibold text-white mb-5 font-headline">Office</h4>' +
      '<ul class="space-y-4 text-sm text-white/70">' +
      '<li class="flex items-start gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">location_on</span><span>Kathmandu Metropolitan City<br/>Ward No. 29, Nepal</span></li>' +
      '<li class="flex items-start gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">account_balance</span><span>Registered with:<br/>District Administration Office<br/>Babarmahal, Kathmandu</span></li>' +
      '<li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">call</span><a class="hover:text-white transition-colors duration-200 cursor-pointer" href="tel:+977145369808">01-4536-9808</a></li>' +
      '<li class="flex items-center gap-3"><span class="material-symbols-outlined text-accent text-lg shrink-0">alternate_email</span><a class="hover:text-white transition-colors duration-200 cursor-pointer" href="mailto:info@udaan.org.np">info@udaan.org.np</a></li>' +
      "</ul></div>" +
      "<div>" +
      '<h4 class="font-semibold text-white mb-5 font-headline">Subscribe</h4>' +
      '<p class="text-white/60 text-xs mb-4">Get regulatory updates and event announcements.</p>' +
      '<div class="flex gap-2">' +
      '<label class="sr-only" for="footer-email">Email address</label>' +
      '<input class="bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-4 py-2.5 text-sm rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent outline-none w-full" id="footer-email" placeholder="Email address" type="email"/>' +
      '<button class="bg-accent hover:bg-accent-light text-white px-4 py-2.5 rounded-xl font-semibold text-xs shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" type="button">Join</button>' +
      "</div></div></div>" +
      '<div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">' +
      '<p class="text-white/50 text-sm text-center md:text-left">© Nepal Unmanned Aircraft (Drone) Association — UDAAN. Regulated by Civil Aviation Authority of Nepal.</p>' +
      '<div class="flex gap-6">' +
      '<a class="text-white/50 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="#">Privacy Policy</a>' +
      '<a class="text-white/50 text-sm hover:text-white transition-colors duration-200 cursor-pointer" href="#">Terms of Service</a>' +
      "</div></div></footer>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("site-footer");
    if (container) renderFooter(container);
  });
})();
