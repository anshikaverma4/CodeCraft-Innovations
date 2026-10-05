/**
 * CodeCraft Innovations - Interactive Core Engine
 * Lead Architect: Anshika Verma
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  initHeaderScrollEffect();
  initContactFormValidation();
});

// Mobile Drawer & ARIA Accessibility State
function initMobileNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isExpanded;
    navLinks.classList.toggle("open", nextState);
    menuToggle.setAttribute("aria-expanded", String(nextState));
    menuToggle.setAttribute(
      "aria-label",
      nextState ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close nav on navigation click
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Dismiss on Escape Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });
}

// Sticky Header Box-Shadow & Border Elevation
function initHeaderScrollEffect() {
  const header = document.getElementById("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.55)";
      header.style.borderColor = "rgba(56, 189, 248, 0.3)";
    } else {
      header.style.boxShadow = "none";
      header.style.borderColor = "rgba(56, 189, 248, 0.18)";
    }
  });
}

// Client-Side Contact Form Validation
function initContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("formStatus");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const setError = (element, message) => {
    if (element) element.textContent = message;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    setError(nameError, "");
    setError(emailError, "");
    setError(messageError, "");
    if (formStatus) formStatus.textContent = "";

    let isValid = true;

    if (!nameInput || nameInput.value.trim().length < 2) {
      setError(nameError, "Please enter your full name (minimum 2 characters).");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
      setError(emailError, "Please enter a valid business email address.");
      isValid = false;
    }

    if (!messageInput || messageInput.value.trim().length < 10) {
      setError(messageError, "Message must contain at least 10 characters.");
      isValid = false;
    }

    if (isValid && formStatus) {
      formStatus.textContent = `✓ Message sent successfully! Thank you, ${nameInput.value.trim()}. CodeCraft Innovations will respond shortly.`;
      formStatus.style.color = "#34d399";
      form.reset();
    } else if (formStatus) {
      formStatus.textContent = "Please correct the highlighted fields before submitting.";
      formStatus.style.color = "#f87171";
    }
  });
}