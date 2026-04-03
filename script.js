const bookingForm = document.querySelector("#booking-form");
const formMessage = document.querySelector("#form-message");
const schedulerButton = document.querySelector(".scheduler-btn");
const yearNode = document.querySelector("#year");
const specToggles = document.querySelectorAll(".spec-toggle");

const schedulerUrl = "https://example.com/your-scheduler-link";

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (schedulerButton) {
  schedulerButton.href = schedulerUrl;
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
      "input[required], select[required]"
    );
    const firstInvalid = Array.from(requiredFields).find((field) => {
      return !(field instanceof HTMLInputElement || field instanceof HTMLSelectElement)
        ? false
        : !field.value.trim();
    });

    formMessage.classList.remove("success", "error");

    if (firstInvalid) {
      formMessage.textContent = "Please complete all required fields before submitting.";
      formMessage.classList.add("error");
      firstInvalid.focus();
      return;
    }

    const phone = bookingForm.querySelector("#phone");
    if (phone instanceof HTMLInputElement) {
      const digits = phone.value.replace(/\D/g, "");
      if (digits.length < 10) {
        formMessage.textContent = "Enter a valid phone number so we can confirm booking.";
        formMessage.classList.add("error");
        phone.focus();
        return;
      }
    }

    formMessage.textContent =
      "Booking request sent. We will text or call you shortly to confirm your appointment.";
    formMessage.classList.add("success");
    bookingForm.reset();
  });
}
