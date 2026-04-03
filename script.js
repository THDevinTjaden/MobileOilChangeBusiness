const bookingForm = document.querySelector("#booking-form");
const formMessage = document.querySelector("#form-message");
const schedulerButton = document.querySelector(".scheduler-btn");
const schedulerNote = document.querySelector("#scheduler-note");
const yearNode = document.querySelector("#year");
const specToggles = document.querySelectorAll(".spec-toggle");

const schedulerUrl = "https://example.com/your-scheduler-link";
const isSchedulerPlaceholder = schedulerUrl.includes("example.com");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (schedulerButton) {
  if (isSchedulerPlaceholder) {
    schedulerButton.href = "#";
    schedulerButton.setAttribute("aria-disabled", "true");
    schedulerButton.title = "Add your real scheduler URL in script.js to enable this button.";
  } else {
    schedulerButton.href = schedulerUrl;
    schedulerButton.removeAttribute("aria-disabled");
  }
}

if (schedulerNote) {
  schedulerNote.textContent = isSchedulerPlaceholder
    ? "Scheduler not connected yet. Add your live booking link in script.js."
    : "Opens your live booking calendar in a new tab.";
}

if (schedulerButton && isSchedulerPlaceholder) {
  schedulerButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!formMessage) {
      return;
    }

    formMessage.classList.remove("success");
    formMessage.classList.add("error");
    formMessage.textContent =
      "Online scheduler is not connected yet. Use the request form below or call/text us.";

    const firstInput = bookingForm?.querySelector("input, select, textarea");
    if (firstInput instanceof HTMLElement) {
      firstInput.focus();
    }
  });
}

if (specToggles.length > 0) {
  specToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("aria-controls");
      if (!targetId) {
        return;
      }

      const details = document.getElementById(targetId);
      if (!details) {
        return;
      }

      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isExpanded));
      toggle.textContent = isExpanded ? "View Full Specs" : "Hide Full Specs";
      details.hidden = isExpanded;
    });
  });
}

if (bookingForm && formMessage) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const requiredFields = bookingForm.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    const firstInvalid = Array.from(requiredFields).find((field) => {
      return !(
        field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement
      )
        ? false
        : !field.value.trim();
    });

    formMessage.classList.remove("success", "error");

    if (firstInvalid) {
      formMessage.textContent =
        "Please complete all required fields so we can confirm your appointment.";
      formMessage.classList.add("error");
      firstInvalid.focus();
      return;
    }

    const phone = bookingForm.querySelector("#phone");
    if (phone instanceof HTMLInputElement) {
      const digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) {
        formMessage.textContent =
          "Please enter a valid phone number (10+ digits) so we can confirm.";
        formMessage.classList.add("error");
        phone.focus();
        return;
      }
    }

    formMessage.textContent =
      "Request received. We will text or call shortly to confirm your mobile service window.";
    formMessage.classList.add("success");
    bookingForm.reset();
  });
}
