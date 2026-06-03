(function () {
  var NEWS_DATA = {
    items: [
      {
        id: "drone-competency-certificates-2082",
        date: "2026-04-07",
        dateDisplay: "2082 BS · Film Development Board",
        category: "Training & Education",
        title: "Drone Competency Certificate & Scholarship Distribution 2082",
        description:
          "25 talented participants received drone competency certificates at a ceremony organized at the Film Development Board — empowering Nepal's next generation of drone professionals.",
        href: "news/drone-competency-certificates-2082.html",
        linkLabel: "Read More",
        image:
          "assets/events/fdb-drone-training-2026.webp",
        imageAlt:
          "Drone competency certificate and scholarship distribution ceremony at Film Development Board organized by UDAAN",
        hashtags: "#UDAAN #DroneTraining #YouthEmpowerment",
      },
      {
        id: "fdb-drone-training-2026-news",
        date: "2026-04-06",
        dateDisplay: "April 6, 2026",
        category: "Technical Supervision",
        title: "FDB 10-Day Drone Training 2026",
        description:
          "UDAAN technically supervised the Film Development Board's 10-day drone training for 25 trainees — ensuring professional standards and safety protocols for Nepal's film industry.",
        href: "events/fdb-drone-training-2026.html",
        linkLabel: "Read More",
        image:
          "assets/events/fdb-drone-training-2026.webp",
        imageAlt: "FDB 10-day drone training session with instructor presenting to trainees at Film Development Board",
        hashtags: "#UDAAN #TechnicalSupervision #FilmDevelopmentBoard #DroneStandards #NepalCinema #AviationSafety",
      },
      {
        id: "udaan-1st-anniversary-2026",
        date: "2026-04-05",
        dateDisplay: "April 5, 2026",
        category: "1st Anniversary",
        title: "Celebrating 1 Year of UDAAN with the Team!",
        description:
          "Great energy at today's meeting as we reflected on our journey — from advanced drone training plans to decentralizing programs across Nepal. Membership forms are now out!",
        href: "news/udaan-1st-anniversary-2026.html",
        linkLabel: "Read More",
        image:
          "assets/images/udaan-community-gathering.webp",
        imageAlt: "UDAAN team celebrating first anniversary at members meetup in Kathmandu",
        hashtags: "#UDAAN #1stAnniversary #DroneCommunity #Nepal #FlightPath #MembersMeetup #DroneInnovation",
      },
      {
        id: "udaan-ndrrma-mou",
        date: "2026-03-15",
        dateDisplay: "March 2026",
        category: "Official MoU Signed",
        title: "UDAAN × NDRRMA — Disaster Management Partnership",
        description:
          "UDAAN officially signed a Memorandum of Understanding with the National Disaster Risk Reduction & Management Authority (NDRRMA) for disaster management and emergency rescue operations.",
        href: "news/udaan-ndrrma-mou.html",
        linkLabel: "Read More",
        image:
          "assets/news/udaan-ndrrma-mou.webp",
        imageAlt: "UDAAN and NDRRMA officials at MoU signing ceremony for emergency rescue and disaster management partnership",
        hashtags: "#UDAAN #NDRRMA #MoU #DisasterManagement",
      },
      {
        id: "udaan-meets-minister-gupta",
        date: "2026-02-10",
        dateDisplay: "February 2026",
        category: "Government Engagement",
        title: "UDAAN Meets Minister Gupta",
        description:
          "UDAAN delegation held a key meeting with Youth & Sports Minister Bablu Gupta, raising concerns on unregulated drone and pilotless sports activities in Nepal.",
        href: "news/udaan-meets-minister-gupta.html",
        linkLabel: "Read Full Story",
        image:
          "assets/images/government-industry-meeting.webp",
        imageAlt: "UDAAN delegation meeting with government officials to discuss drone sports regulation in Nepal",
        hashtags: "",
      },
      {
        id: "fpv-drone-training-2025",
        date: "2025-07-24",
        dateDisplay: "July 24, 2025",
        category: "FPV Training",
        title: "FPV Drone Training by UDAAN – Successfully Completed!",
        description:
          "The FPV Drone Basic Training Workshop on July 19, 2025 was a resounding success — from FPV systems to hands-on simulator practice with GarudX expert trainers.",
        href: "events/fpv-drone-training-2025.html",
        linkLabel: "Read More",
        image:
          "assets/events/fpv-drone-training-2025.webp",
        imageAlt: "FPV drone frame being assembled with motors, flight controller, and tools during UDAAN hands-on training workshop",
        hashtags:
          "#UDAAN #FPVTraining #DroneNepal #FPVWorkshop #GarudXTeam #DroneCommunity #NepalDrone #TechForChange #LearningWithDrones",
      },
      {
        id: "south-asia-drone-forum-2025",
        date: "2025-04-10",
        dateDisplay: "April 2025",
        category: "Regional Recognition",
        title: "UDAAN at South Asia Drone Forum 2025",
        description:
          "Team UDAAN actively participated in the South Asia Drone Forum 2025 (9–11 April, Kathmandu) — co-organized by Government of Nepal, World Bank & KWPF — representing Nepal's drone innovation community.",
        href: "news/south-asia-drone-forum-2025.html",
        linkLabel: "Read More",
        image:
          "assets/images/udaan-community-gathering.webp",
        imageAlt: "UDAAN team at South Asia Drone Forum 2025 in Kathmandu with regional aviation delegates",
        hashtags: "#UDAAN #SouthAsiaDroneForum #DroneNepal",
      },
    ],
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function sortByLatest(items) {
    return items.slice().sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  function renderNewsCard(item) {
    if (item.compact) {
      var compactInner =
        '<h4 class="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-200">' +
        escapeHtml(item.title) +
        "</h4>" +
        '<p class="text-on-surface-variant text-sm mt-2 line-clamp-2">' +
        escapeHtml(item.description) +
        "</p>" +
        '<p class="text-xs text-on-surface-variant mt-2">' +
        escapeHtml(item.dateDisplay) +
        "</p>";

      if (item.href) {
        return (
          '<a class="group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl" href="' +
          escapeHtml(item.href) +
          '">' +
          compactInner +
          "</a>"
        );
      }

      return '<article class="group">' + compactInner + "</article>";
    }

    var hashtagsHtml = item.hashtags
      ? '<p class="text-on-surface-variant text-xs mt-2 leading-relaxed line-clamp-2">' +
        escapeHtml(item.hashtags) +
        "</p>"
      : "";

    var categoryHtml = item.category
      ? '<span class="text-primary font-label uppercase text-[10px] font-black tracking-widest">' +
        escapeHtml(item.category) +
        "</span>"
      : "";

    var cardInner =
      '<div class="h-48 rounded-t-2xl overflow-hidden border-b border-outline-variant">' +
      '<img class="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300 motion-reduce:transition-none" alt="' +
      escapeHtml(item.imageAlt) +
      '" src="' +
      escapeHtml(item.image) +
      '" loading="lazy"/></div>' +
      '<div class="p-6">' +
      categoryHtml +
      '<h4 class="text-lg font-bold mt-2 leading-tight group-hover:text-primary transition-colors duration-200">' +
      escapeHtml(item.title) +
      "</h4>" +
      '<p class="text-on-surface-variant text-sm mt-2 line-clamp-3">' +
      escapeHtml(item.description) +
      "</p>" +
      (item.href
        ? '<span class="inline-flex items-center gap-1 text-primary font-bold text-sm mt-3 group-hover:underline">' +
          escapeHtml(item.linkLabel || "Read More") +
          ' <span class="material-symbols-outlined text-sm">arrow_forward</span></span>'
        : "") +
      hashtagsHtml +
      '<p class="text-xs text-on-surface-variant mt-2">' +
      escapeHtml(item.dateDisplay) +
      "</p></div>";

    if (item.href) {
      return (
        '<a class="group block bg-surface-bright rounded-2xl border border-outline-variant shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary card-interactive" href="' +
        escapeHtml(item.href) +
        '">' +
        cardInner +
        "</a>"
      );
    }

    return '<article class="group">' + cardInner + "</article>";
  }

  function renderHomeNews(container, items) {
    var sorted = sortByLatest(items);
    container.innerHTML = sorted.map(renderNewsCard).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("home-news-list");
    if (!container) return;

    try {
      if (!NEWS_DATA.items || !NEWS_DATA.items.length) {
        throw new Error("No news items found");
      }
      renderHomeNews(container, NEWS_DATA.items);
    } catch (error) {
      container.innerHTML =
        '<p class="text-sm text-on-surface-variant">Unable to load news. Please try again later.</p>';
    }
  });
})();
