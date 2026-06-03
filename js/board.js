(function () {
  var BOARD_DATA = {
    directors: [
      { name: "Raj Bhai Mahajan (Suwal)", role: "President", roleNe: "अध्यक्ष", photo: "assets/board/raj-bhai-mahajan.webp" },
      { name: "Pradhumna Mishra", role: "Vice President", roleNe: "उपाध्यक्ष", photo: "assets/board/pradhumna-mishra.webp" },
      { name: "Shashwat Rijal", role: "Vice President", roleNe: "उपाध्यक्ष", photo: "assets/board/shashwat-rijal.webp" },
      { name: "Prabin Bhattarai", role: "General Secretary", roleNe: "महासचिव", photo: "assets/board/prabin-bhattarai.webp" },
      { name: "Saustav Bhattarai", role: "Secretary", roleNe: "सचिव", photo: "assets/board/saustav-bhattarai.webp" },
      { name: "Adarsha Bhusal", role: "Joint Secretary", roleNe: "सहसचिव", photo: "assets/board/adarsha-bhusal.webp" },
      { name: "Kuber Dangol", role: "Treasurer", roleNe: "कोषाध्यक्ष", photo: "assets/board/kuber-dangol.webp" },
      { name: "Prashant Dhakal", role: "Member", roleNe: "सदस्य", photo: "assets/board/prashant-dhakal.webp" },
      { name: "Sushil Sainju", role: "Member", roleNe: "सदस्य", photo: "assets/board/sushil-sainju.webp" },
      { name: "Pema Tashi Tamang", role: "Member", roleNe: "सदस्य" },
      { name: "Roshan Pokhrel", role: "Member", roleNe: "सदस्य" },
      { name: "Sujan Khatiwada", role: "Member", roleNe: "सदस्य", photo: "assets/board/sujan-khatiwada.webp" },
      { name: "Sushil Dangi", role: "Member", roleNe: "सदस्य" },
    ],
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function roleTextClass(role) {
    if (/vice president/i.test(role)) return "text-secondary";
    if (/president|secretary|treasurer/i.test(role)) return "text-primary";
    return "text-on-surface-variant";
  }

  function roleBorderClass(role) {
    if (/vice president/i.test(role)) return "group-hover:border-secondary";
    if (/president|secretary|treasurer/i.test(role)) return "group-hover:border-primary";
    return "group-hover:border-outline-variant";
  }

  function renderPhoto(director) {
    if (director.photo) {
      var alt = escapeHtml(director.name + ", " + director.role);
      return (
        '<img class="w-full h-full object-cover" src="' +
        escapeHtml(director.photo) +
        '" alt="' +
        alt +
        '" loading="lazy"/>'
      );
    }

    return '<span class="material-symbols-outlined text-5xl text-outline">person</span>';
  }

  function renderSocialLinks(director) {
    var social = director.social || {};
    var links = [];

    if (social.linkedin) {
      links.push(
        '<a class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="' +
          escapeHtml(social.linkedin) +
          '" aria-label="' +
          escapeHtml(director.name + " on LinkedIn") +
          '" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined text-lg">work</span></a>'
      );
    }
    if (social.facebook) {
      links.push(
        '<a class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="' +
          escapeHtml(social.facebook) +
          '" aria-label="' +
          escapeHtml(director.name + " on Facebook") +
          '" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined text-lg">groups</span></a>'
      );
    }
    if (social.email) {
      links.push(
        '<a class="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all" href="' +
          escapeHtml(social.email) +
          '" aria-label="Email ' +
          escapeHtml(director.name) +
          '"><span class="material-symbols-outlined text-lg">mail</span></a>'
      );
    }

    if (!links.length) return "";

    return '<div class="flex justify-center gap-2 mt-4">' + links.join("") + "</div>";
  }

  function renderCard(director) {
    var borderClass = roleBorderClass(director.role);
    var textClass = roleTextClass(director.role);

    return (
      '<div class="text-center group bg-surface-bright rounded-2xl p-6 border border-outline-variant shadow-card card-interactive">' +
      '<div class="aspect-square max-w-[160px] mx-auto rounded-full overflow-hidden mb-5 border-4 border-surface-container ' +
      borderClass +
      ' bg-surface-container flex items-center justify-center transition-colors duration-200">' +
      renderPhoto(director) +
      "</div>" +
      '<h5 class="text-lg font-headline font-semibold text-on-surface">' +
      escapeHtml(director.name) +
      "</h5>" +
      '<p class="' +
      textClass +
      ' text-sm font-semibold mt-1">' +
      escapeHtml(director.role) +
      "</p>" +
      (director.roleNe
        ? '<p class="text-xs text-on-surface-variant mt-0.5" lang="ne">' + escapeHtml(director.roleNe) + "</p>"
        : "") +
      renderSocialLinks(director) +
      "</div>"
    );
  }

  function renderBoard(container, directors) {
    container.innerHTML = directors.map(renderCard).join("");
  }

  function showError(container) {
    container.innerHTML =
      '<p class="col-span-full text-center text-sm text-on-surface-variant">Unable to load board members. Please try again later.</p>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("board-grid");
    if (!container) return;

    try {
      if (!BOARD_DATA.directors || !BOARD_DATA.directors.length) {
        throw new Error("No directors found");
      }
      renderBoard(container, BOARD_DATA.directors);
    } catch (error) {
      showError(container);
    }
  });
})();
