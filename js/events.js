(function () {
  var EVENTS_DATA = {
    events: [
      {
        id: "fdb-drone-training-2026",
        title: "FDB 10-Day Drone Training",
        titleFull: "FDB 10-Day Drone Training 2026",
        date: "2026-04-06",
        dateLabel: "Sunday, 6 April 2026",
        dateShort: { day: "6", month: "Apr", year: "2026" },
        dateGrid: "APR 6, 2026",
        location: "Film Development Board, Kathmandu",
        description:
          "UDAAN technically supervised Film Development Board training for 25 trainees — professionalizing drone use in Nepal's film industry.",
        descriptionShort:
          "UDAAN technically supervised Film Development Board training for 25 trainees — professional standards for Nepal's film industry.",
        href: "events/fdb-drone-training-2026.html",
        image:
          "assets/events/fdb-drone-training-2026.jpg",
        badge: "Training · Completed",
        tag: "Completed",
        tagStyle: "green",
        status: "completed",
        cta: "View Recap",
        scheduleNote: "10-Day Program",
        accent: "primary",
        category: "workshop",
      },
      {
        id: "nepal-drone-seminar-2026",
        title: "Shaping the Sky: National Panel Discussion on Nepal's Drone Ecosystem",
        titleFull: "Shaping the Sky: National Panel Discussion on Nepal's Drone Ecosystem",
        date: "2026-01-20",
        dateLabel: "Tuesday, 20 January 2026",
        dateShort: { day: "20", month: "Jan", year: "2026" },
        dateGrid: "JAN 20, 2026",
        location: "Film Development Board of Nepal, Chabahil",
        description:
          "UDAAN hosts a high-level national dialogue bringing together government, regulators, law enforcement, aviation, and the private sector to build a safe, innovative, and sustainable drone ecosystem.",
        descriptionShort:
          "National dialogue on regulatory frameworks, airspace security, and the future of drones in commerce, cinema, and emergency services.",
        href: "events/nepal-drone-seminar-2026.html",
        image:
          "assets/events/nepal-drone-seminar-2026.jpg",
        badge: "Panel Discussion",
        tag: "Seminar",
        tagStyle: "secondary",
        status: "completed",
        registerUrl: "https://forms.gle/gA5v6WEN4GgPqzn78",
        registrationTime: "Registration from 10:00 AM",
        cta: "Event Details",
        accent: "secondary",
        category: "advocacy",
      },
      {
        id: "fpv-drone-training-2025",
        title: "FPV Drone Basic Training Workshop",
        titleFull: "FPV Drone Basic Training Workshop 2025",
        date: "2025-07-19",
        dateLabel: "Saturday, 19 July 2025",
        dateShort: { day: "19", month: "Jul", year: "2025" },
        dateGrid: "JUL 19, 2025",
        location: "Kathmandu, Nepal",
        description:
          "UDAAN's FPV Drone Basic Training Workshop was a resounding success — from FPV systems to hands-on simulator practice with expert trainers from the GarudX Team.",
        descriptionShort:
          "FPV basics, simulator practice, and hands-on learning with GarudX expert trainers — empowering Nepal's drone community.",
        href: "events/fpv-drone-training-2025.html",
        image:
          "assets/events/fpv-drone-training-2025.jpg",
        badge: "FPV Workshop · Completed",
        tag: "Completed",
        tagStyle: "green",
        status: "completed",
        cta: "View Recap",
        scheduleNote: "Full-Day Workshop",
        accent: "primary",
        category: "workshop",
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

  function sortByLatest(events) {
    return events.slice().sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  function tagClass(tagStyle) {
    if (tagStyle === "green") {
      return "bg-green-600 text-white";
    }
    if (tagStyle === "secondary") {
      return "bg-secondary text-white";
    }
    return "bg-on-surface-variant text-white";
  }

  function accentClass(accent) {
    return accent === "secondary" ? "bg-secondary text-on-secondary" : "bg-primary text-on-primary";
  }

  function renderHomeFeatured(event) {
    var accent = accentClass(event.accent);
    var scheduleHtml = event.registrationTime
      ? '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">schedule</span> ' +
        escapeHtml(event.registrationTime) +
        "</div>"
      : event.scheduleNote
        ? '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">schedule</span> ' +
          escapeHtml(event.scheduleNote) +
          "</div>"
        : "";

    var actionsHtml = "";
    if (event.registerUrl) {
      actionsHtml +=
        '<a class="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary-container transition-all" href="' +
        escapeHtml(event.registerUrl) +
        '" rel="noopener noreferrer" target="_blank">Register Now <span class="material-symbols-outlined text-sm">open_in_new</span></a>';
    }
    actionsHtml +=
      '<a class="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:underline" href="' +
      escapeHtml(event.href) +
      '">' +
      escapeHtml(event.cta || "Event Details") +
      ' <span class="material-symbols-outlined text-sm">arrow_forward</span></a>';

    return (
      '<div class="bg-surface-bright rounded-2xl overflow-hidden mb-6 flex flex-col md:flex-row shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-outline-variant">' +
      '<div class="md:w-1/3 ' +
      accent +
      ' p-8 flex flex-col justify-center">' +
      '<span class="text-5xl font-black mb-2">' +
      escapeHtml(event.dateShort.day) +
      "</span>" +
      '<span class="text-xl font-bold uppercase tracking-widest opacity-80">' +
      escapeHtml(event.dateShort.month + " " + event.dateShort.year) +
      '</span><div class="w-12 h-1 bg-white/30 mt-6"></div></div>' +
      '<div class="p-8 flex-1">' +
      '<span class="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-tighter rounded mb-4">' +
      escapeHtml(event.badge) +
      "</span>" +
      '<h3 class="text-2xl font-bold mb-2">' +
      escapeHtml(event.title) +
      "</h3>" +
      '<p class="text-on-surface-variant text-sm mb-4">' +
      escapeHtml(event.description) +
      '</p><div class="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant mb-4">' +
      '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">calendar_today</span> ' +
      escapeHtml(event.dateLabel) +
      "</div>" +
      scheduleHtml +
      '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-sm">location_on</span> ' +
      escapeHtml(event.location) +
      '</div></div><div class="flex flex-wrap gap-3">' +
      actionsHtml +
      "</div></div></div>"
    );
  }

  function renderHomeListItem(event) {
    return (
      '<a class="bg-surface-bright p-4 rounded-xl flex items-center justify-between border border-outline-variant hover:border-primary/30 hover:shadow-card transition-all duration-200 cursor-pointer" href="' +
      escapeHtml(event.href) +
      '"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-surface-container-highest rounded flex flex-col items-center justify-center text-primary font-bold leading-none">' +
      '<span class="text-lg">' +
      escapeHtml(event.dateShort.day) +
      '</span><span class="text-[10px] uppercase">' +
      escapeHtml(event.dateShort.month) +
      '</span></div><div><h4 class="font-bold text-sm">' +
      escapeHtml(event.title) +
      '</h4><p class="text-xs text-on-surface-variant">' +
      escapeHtml(event.location) +
      (event.status === "completed" ? " · Completed" : "") +
      '</p></div></div><span class="material-symbols-outlined text-on-surface-variant">chevron_right</span></a>'
    );
  }

  function renderEventsHero(event) {
    var scheduleHtml = event.registrationTime
      ? '<span class="badge-trust bg-white/10 border-white/25 text-white/90 backdrop-blur-sm"><span class="material-symbols-outlined text-sm">schedule</span> ' +
        escapeHtml(event.registrationTime) +
        "</span>"
      : event.scheduleNote
        ? '<span class="badge-trust bg-white/10 border-white/25 text-white/90 backdrop-blur-sm"><span class="material-symbols-outlined text-sm">schedule</span> ' +
          escapeHtml(event.scheduleNote) +
          "</span>"
        : "";

    return (
      '<div class="flex flex-wrap gap-3 mb-6">' +
      '<span class="badge-trust bg-white/10 border-white/25 text-white backdrop-blur-sm"><span class="material-symbols-outlined text-sm">event</span> Latest Event</span>' +
      '<span class="badge-trust bg-white/10 border-white/25 text-white/90 backdrop-blur-sm">' +
      escapeHtml(event.badge) +
      "</span>" +
      scheduleHtml +
      "</div>" +
      '<h1 class="text-white text-4xl sm:text-5xl md:text-6xl font-headline font-bold leading-[1.08] tracking-tight mb-5">' +
      escapeHtml(event.titleFull || event.title) +
      "</h1>" +
      '<p class="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">' +
      escapeHtml(event.description) +
      '</p><div class="flex flex-wrap gap-4 mb-10">' +
      '<div class="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white">' +
      '<span class="material-symbols-outlined text-primary-container">calendar_today</span><div>' +
      '<p class="text-xs uppercase opacity-60 tracking-widest font-label">Date</p>' +
      '<p class="font-semibold text-sm">' +
      escapeHtml(event.dateLabel) +
      "</p></div></div>" +
      '<div class="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-white">' +
      '<span class="material-symbols-outlined text-primary-container">location_on</span><div>' +
      '<p class="text-xs uppercase opacity-60 tracking-widest font-label">Location</p>' +
      '<p class="font-semibold text-sm">' +
      escapeHtml(event.location) +
      "</p></div></div></div>" +
      '<div class="flex flex-wrap gap-4">' +
      (event.registerUrl
        ? '<a class="btn-primary inline-flex items-center gap-2" href="' +
          escapeHtml(event.registerUrl) +
          '" rel="noopener noreferrer" target="_blank">Register Now <span class="material-symbols-outlined">open_in_new</span></a>'
        : "") +
      '<a class="btn-secondary inline-flex items-center gap-2" href="' +
      escapeHtml(event.href) +
      '">' +
      escapeHtml(event.cta || "Event Details") +
      "</a></div>"
    );
  }

  function renderEventsGridCard(event) {
    var ctaLabel = event.status === "completed" ? "View Recap" : event.cta || "Event Details";

    return (
      '<a class="group bg-surface-bright rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 border border-outline-variant flex flex-col card-interactive" href="' +
      escapeHtml(event.href) +
      '"><div class="h-48 overflow-hidden relative">' +
      '<img class="w-full h-full object-cover group-hover:opacity-95 transition-opacity duration-300 motion-reduce:transition-none" alt="' +
      escapeHtml(event.title) +
      '" src="' +
      escapeHtml(event.image) +
      '" loading="lazy"/><div class="absolute top-4 left-4 ' +
      tagClass(event.tagStyle) +
      ' px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full">' +
      escapeHtml(event.tag) +
      '</div></div><div class="p-6 md:p-8 flex-grow">' +
      '<div class="text-sm font-semibold text-primary mb-2">' +
      escapeHtml(event.dateGrid) +
      "</div>" +
      '<h3 class="text-xl md:text-2xl font-headline font-bold text-on-surface mb-3 leading-tight group-hover:text-primary transition-colors duration-200">' +
      escapeHtml(event.title) +
      "</h3>" +
      '<p class="text-on-surface-variant text-sm mb-5 line-clamp-3 leading-relaxed">' +
      escapeHtml(event.descriptionShort || event.description) +
      '</p><div class="flex items-center gap-2 text-on-surface-variant text-sm">' +
      '<span class="material-symbols-outlined text-sm">location_on</span> ' +
      escapeHtml(event.location) +
      '</div></div><div class="px-6 md:px-8 pb-6 md:pb-8 mt-auto">' +
      '<span class="block w-full py-3 rounded-full border-2 border-primary text-primary font-semibold text-center text-sm group-hover:bg-primary group-hover:text-white transition-colors duration-200 cursor-pointer">' +
      escapeHtml(ctaLabel) +
      "</span></div></a>"
    );
  }

  function renderHomeEvents(containerFeatured, containerList, events) {
    if (!events.length) return;

    var sorted = sortByLatest(events);
    containerFeatured.innerHTML = renderHomeFeatured(sorted[0]);

    if (containerList && sorted.length > 1) {
      containerList.innerHTML = sorted.slice(1).map(renderHomeListItem).join("");
    } else if (containerList) {
      containerList.innerHTML = "";
    }
  }

  function filterEventsByCategory(events, category) {
    if (!category || category === "all") return events;
    return events.filter(function (event) {
      return event.category === category;
    });
  }

  function renderEventsPage(heroContainer, gridContainer, events, category) {
    var sorted = sortByLatest(events);
    var filtered = filterEventsByCategory(sorted, category);

    if (heroContainer && sorted.length) {
      heroContainer.innerHTML = renderEventsHero(sorted[0]);
    }

    if (gridContainer) {
      if (!filtered.length) {
        gridContainer.innerHTML =
          '<p class="col-span-full text-center text-on-surface-variant py-12">No events in this category yet. Check back soon.</p>';
      } else {
        gridContainer.innerHTML = filtered.map(renderEventsGridCard).join("");
      }
    }
  }

  function initEventFilters(events, gridContainer) {
    var filterBar = document.getElementById("events-filter-bar");
    if (!filterBar || !gridContainer) return;

    var activeClass = "px-5 py-2 rounded-full bg-primary text-white font-semibold text-sm cursor-pointer transition-colors duration-200";
    var inactiveClass =
      "px-5 py-2 rounded-full text-on-surface-variant hover:bg-surface-container font-semibold text-sm cursor-pointer transition-colors duration-200";

    filterBar.addEventListener("click", function (event) {
      var button = event.target.closest("[data-filter]");
      if (!button) return;

      var category = button.getAttribute("data-filter");

      filterBar.querySelectorAll("[data-filter]").forEach(function (btn) {
        btn.className = btn === button ? activeClass : inactiveClass;
        btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
      });

      renderEventsPage(null, gridContainer, events, category);
    });
  }

  function loadEvents() {
    return Promise.resolve(EVENTS_DATA);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var homeFeatured = document.getElementById("home-events-featured");
    var homeList = document.getElementById("home-events-list");
    var eventsHero = document.getElementById("events-hero-content");
    var eventsGrid = document.getElementById("events-grid");

    if (!homeFeatured && !eventsHero && !eventsGrid) return;

    loadEvents()
      .then(function (data) {
        if (!data.events || !data.events.length) throw new Error("No events found");

        if (homeFeatured) {
          renderHomeEvents(homeFeatured, homeList, data.events);
        }

        if (eventsHero || eventsGrid) {
          renderEventsPage(eventsHero, eventsGrid, data.events, "all");
          initEventFilters(data.events, eventsGrid);
        }
      })
      .catch(function () {
        if (homeFeatured) {
          homeFeatured.innerHTML =
            '<p class="text-sm text-on-surface-variant">Unable to load events. Please try again later.</p>';
        }
        if (eventsGrid) {
          eventsGrid.innerHTML =
            '<p class="col-span-full text-center text-sm text-on-surface-variant">Unable to load events. Please try again later.</p>';
        }
      });
  });
})();
