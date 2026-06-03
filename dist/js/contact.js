(function () {
  var PLACEHOLDER = "YOUR_FORM_ID";

  function getEndpoint(form) {
    var config = window.UDAAN_SITE_CONFIG || {};
    if (config.formspreeEndpoint && config.formspreeEndpoint.indexOf(PLACEHOLDER) === -1) {
      return config.formspreeEndpoint;
    }
    var action = form.getAttribute("action") || "";
    if (action && action.indexOf(PLACEHOLDER) === -1) {
      return action;
    }
    return "";
  }

  function setStatus(statusEl, type, message) {
    statusEl.hidden = false;
    statusEl.textContent = message;
    statusEl.className =
      "mb-6 rounded-xl px-5 py-4 text-sm font-medium " +
      (type === "success"
        ? "bg-green-50 text-green-800 border border-green-200"
        : type === "error"
          ? "bg-red-50 text-red-800 border border-red-200"
          : "bg-surface-container text-on-surface-variant border border-outline-variant");
  }

  function initContactForm() {
    var form = document.getElementById("udaan-contact-form");
    if (!form) return;

    var statusEl = document.getElementById("contact-form-status");
    var submitBtn = form.querySelector('[type="submit"]");
    var endpoint = getEndpoint(form);

    if (!endpoint && statusEl) {
      setStatus(
        statusEl,
        "info",
        "Online form delivery is not configured yet. Email us directly at info@udaan.org.np or call 01-4536-9808."
      );
    }

    form.addEventListener("submit", function (event) {
      if (!endpoint) {
        event.preventDefault();
        if (statusEl) {
          setStatus(
            statusEl,
            "error",
            "Form not configured. Please email info@udaan.org.np with your inquiry."
          );
        }
        return;
      }

      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var originalLabel = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="material-symbols-outlined text-xl animate-spin">progress_activity</span> Sending…';

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (data) {
              throw new Error(data.error || "Unable to send message. Please try again.");
            });
          }
          form.reset();
          if (statusEl) {
            setStatus(
              statusEl,
              "success",
              "Thank you! Your inquiry has been sent. We will respond within 2–3 business days."
            );
          }
          statusEl && statusEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        })
        .catch(function (error) {
          if (statusEl) {
            setStatus(
              statusEl,
              "error",
              error.message || "Something went wrong. Please email info@udaan.org.np instead."
            );
          }
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        });
    });
  }

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
