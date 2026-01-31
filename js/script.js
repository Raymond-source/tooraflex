// js/script.js

// Function to set favicon with fallback
function setFavicon() {
  // Remove any existing favicon first
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.parentNode.removeChild(existingFavicon);
  }

  const existingAppleIcon = document.querySelector(
    'link[rel="apple-touch-icon"]'
  );
  if (existingAppleIcon) {
    existingAppleIcon.parentNode.removeChild(existingAppleIcon);
  }

  // Create new favicon element
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/x-icon";
  favicon.href = getLogoPath("logo.ico"); // Use centralized function

  // Add to head
  document.head.appendChild(favicon);

  // Also create Apple Touch Icon for mobile devices
  const appleTouchIcon = document.createElement("link");
  appleTouchIcon.rel = "apple-touch-icon";
  appleTouchIcon.href = getLogoPath("logo.ico"); // Use centralized function
  document.head.appendChild(appleTouchIcon);
}

// Function to get logo path (centralized) - UPDATED for logo subfolder
function getLogoPath(filename) {
  return `images/logo/${filename}`;
}

// Format phone number for display
function formatPhoneNumber(phone) {
  if (!phone) return "";

  // Remove any non-digit characters
  const digits = phone.replace(/\D/g, "");

  // South African number format: +27 81 219 4023
  if (digits.length === 11 && digits.startsWith("27")) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
      5,
      8
    )} ${digits.slice(8)}`;
  }

  // International format: +27812194023
  if (digits.length >= 10) {
    return `+${digits}`;
  }

  return phone;
}

// Helper function to animate stats values
function animateValue(element, start, end, duration, suffix = "") {
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    const currentValue = Math.floor(easeOutQuart * (end - start) + start);
    element.textContent = currentValue + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Animate stats numbers
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  if (statNumbers.length === 0) return;

  // Create Intersection Observer to trigger animation when stats are visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute("data-target"));
          const suffix = statNumber.textContent.replace(/[0-9]/g, ""); // Get + or % suffix

          // Animate the number
          animateValue(statNumber, 0, target, 1500, suffix);

          // Stop observing after animation starts
          observer.unobserve(statNumber);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of element is visible
      rootMargin: "0px 0px -100px 0px", // Trigger a bit before it's fully visible
    }
  );

  // Start observing each stat number
  statNumbers.forEach((statNumber) => {
    observer.observe(statNumber);
  });
}

// Initialize client logo marquee
function initClientMarquee() {
  const marqueeTrack = document.querySelector(".client-marquee-track");
  if (!marqueeTrack) return;

  // Clone the logos for seamless loop
  const logos = marqueeTrack.querySelectorAll(".client-logo");
  const totalLogos = logos.length;

  // Only clone if we haven't already
  if (totalLogos <= 12) {
    // 6 originals + 6 duplicates = 12
    // We already have duplicates in HTML, so just initialize
    setupMarqueeAnimation();
  } else {
    setupMarqueeAnimation();
  }

  function setupMarqueeAnimation() {
    const marqueeContainer = document.querySelector(
      ".client-marquee-container"
    );
    if (!marqueeContainer) return;

    let animationId;
    let position = 0;
    const speed = 1; // pixels per frame

    function animate() {
      position -= speed;

      // Get total width of all logos
      const firstLogo = marqueeTrack.querySelector(".client-logo");
      if (!firstLogo) return;

      const logoWidth = firstLogo.offsetWidth;
      const gap = 40; // Match CSS gap
      const totalWidth = (logoWidth + gap) * (marqueeTrack.children.length / 2);

      // Reset position when half the content has scrolled
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }

      marqueeTrack.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Pause on hover
    marqueeContainer.addEventListener("mouseenter", () => {
      cancelAnimationFrame(animationId);
    });

    marqueeContainer.addEventListener("mouseleave", () => {
      animate();
    });

    // Pause when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  }
}

// Initialize dynamic contact forms
function initDynamicForms() {
  // Auto-populate service dropdown if it exists
  const serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    // Clear existing options except the first one
    while (serviceSelect.options.length > 1) {
      serviceSelect.remove(1);
    }

    // Add services from config (if available)
    if (window.siteConfig && siteConfig.services) {
      siteConfig.services.forEach((service) => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = service.name;
        serviceSelect.appendChild(option);
      });
    }
  }
}

// Main initialization function
function inittooraflex() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("active");
        if (mobileMenuBtn) {
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  }

  // Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const service = document.getElementById("service").value;
      const message = document.getElementById("message").value;

      // In a real implementation, you would send this data to a server
      // For this demo, we'll just show an alert
      alert(
        `Thank you ${name}! Your message has been received. We'll contact you at ${email} regarding ${service} services soon.`
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Don't intercept links to other pages or empty anchors
      if (targetId === "#" || targetId.includes(".html")) return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Product Category Filter
  const categoryBtns = document.querySelectorAll(".category-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  if (categoryBtns.length > 0 && serviceCards.length > 0) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        categoryBtns.forEach((b) => b.classList.remove("active"));

        // Add active class to clicked button
        btn.classList.add("active");

        const category = btn.dataset.category;

        // Show/hide service cards based on category
        serviceCards.forEach((card) => {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
            // Add fade-in animation
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.transition = "opacity 0.3s ease";
              card.style.opacity = "1";
            }, 10);
          } else {
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Initialize any dynamic contact forms with config data
  initDynamicForms();

  // Initialize stats animation
  animateStats();

  // Initialize client marquee
  initClientMarquee();
}

// Enhanced Components object with all functionality
const Components = {
  // Load header navigation
  loadHeader: function () {
    const header = document.getElementById("main-header");
    if (!header) return;

    header.innerHTML = `
      <div class="container header-container">
        <a href="index.html" class="logo">
          <img
            src="${getLogoPath("logo-mark.png")}"
            alt="tooraflex Logo"
            class="logo-img"
          />
          <div class="logo-text">Toora<span>flex</span></div>
        </a>

        <button class="mobile-menu-btn" aria-label="Toggle navigation menu">
          <i class="fas fa-bars"></i>
        </button>

        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="services.html">Services & Products</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="contact.html" class="btn">Get Quote</a></li>
        </ul>
      </div>
    `;
  },

  // Load footer
  loadFooter: function () {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container">
        <div class="footer-content">
          <div class="footer-col">
            <h3>Toora Flex</h3>
            <p>
              Comprehensive digital solutions for modern businesses. We design,
              develop, and deploy solutions that help your business grow.
            </p>
            <div class="social-links">
              <a href="${
                siteConfig.socialLinks?.facebook || "#"
              }" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="${
                siteConfig.socialLinks?.twitter || "#"
              }" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
              <a href="${
                siteConfig.socialLinks?.linkedin || "#"
              }" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
              <a href="${
                siteConfig.socialLinks?.instagram || "#"
              }" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="services.html">Services & Products</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Our Services</h3>
            <ul class="footer-links">
              <li><a href="services.html">Website Design</a></li>
              <li><a href="services.html">Web Applications</a></li>
              <li><a href="services.html">Hosting Solutions</a></li>
              <li><a href="services.html">Graphic Design</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h3>Contact Info</h3>
            <ul class="footer-links">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                <span class="contact-address">${siteConfig.address}</span>
              </li>
              <li>
                <i class="fas fa-phone-alt"></i>
                <a href="${getPhoneLink()}" class="contact-phone">${formatPhoneNumber(
      siteConfig.phoneNumber
    )}</a>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <a href="mailto:${siteConfig.email}" class="contact-email">${
      siteConfig.email
    }</a>
              </li>
              ${
                siteConfig.emergencyNumber
                  ? `
              <li>
                <i class="fas fa-exclamation-circle"></i>
                <a href="${getEmergencyPhoneLink()}" class="contact-emergency">Emergency: ${formatPhoneNumber(
                      siteConfig.emergencyNumber
                    )}</a>
              </li>
              `
                  : ""
              }
            </ul>
          </div>
        </div>

        <div class="copyright">
          <p>
            &copy; <span class="current-year"></span> Tooraflex. All rights
            reserved. Site by
            <a
              href="https://www.Tooraflex.co.za"
              target="_blank"
              rel="noopener noreferrer"
              class="tooraflex-name"
              aria-label="Visit tooraflex website"
            >
              <span class="toora-part">Toora</span
              ><span class="flex-part">flex</span>
              <img
                src="${getLogoPath("logo.ico")}"
                alt="tooraflex Logo"
                class="tooraflex-icon"
              />
            </a>
            .
          </p>
        </div>
      </div>
    `;
  },

  // Load WhatsApp floating button
  loadWhatsAppButton: function () {
    const whatsappFloat = document.getElementById("whatsapp-float");
    if (!whatsappFloat) return;

    whatsappFloat.innerHTML = `
      <a href="${getWhatsAppUrl()}" 
         target="_blank" 
         class="whatsapp-float-link"
         aria-label="Chat with us on WhatsApp">
          <i class="fab fa-whatsapp"></i>
      </a>
      <div class="whatsapp-float-text">Chat with us</div>
    `;
  },

  // Update contact info dynamically (for any elements with contact classes)
  updateContactInfo: function () {
    // Update all address elements
    document.querySelectorAll(".contact-address").forEach((el) => {
      el.textContent = siteConfig.address;
    });

    // Update all phone links
    document.querySelectorAll(".contact-phone").forEach((el) => {
      if (el.tagName === "A") {
        el.href = getPhoneLink();
      }
      el.textContent = formatPhoneNumber(siteConfig.phoneNumber);
    });

    // Update all email links
    document.querySelectorAll(".contact-email").forEach((el) => {
      if (el.tagName === "A") {
        el.href = `mailto:${siteConfig.email}`;
      }
      el.textContent = siteConfig.email;
    });

    // Update all emergency phone links
    document.querySelectorAll(".contact-emergency").forEach((el) => {
      if (el.tagName === "A") {
        el.href = getEmergencyPhoneLink();
      }
      el.textContent = `Emergency: ${formatPhoneNumber(
        siteConfig.emergencyNumber
      )}`;
    });
  },

  // Update current year in footer
  updateCurrentYear: function () {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = currentYear;
    });
  },

  // Initialize all components
  initAll: function () {
    // Set favicon FIRST - before anything else
    setFavicon();

    this.loadHeader();
    this.loadFooter();
    this.loadWhatsAppButton();
    this.updateContactInfo();
    this.updateCurrentYear();

    // Initialize main functionality after components are loaded
    setTimeout(() => {
      inittooraflex();
    }, 100);
  },
};

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check if config is loaded
  if (typeof siteConfig === "undefined") {
    console.error(
      "Config.js not loaded! Make sure config.js is loaded before script.js"
    );
    return;
  }

  // Check if WhatsApp functions are available
  if (
    typeof getWhatsAppUrl === "undefined" ||
    typeof getPhoneLink === "undefined" ||
    typeof getEmergencyPhoneLink === "undefined"
  ) {
    console.error(
      "Config.js functions not loaded! Make sure config.js has getWhatsAppUrl(), getPhoneLink(), and getEmergencyPhoneLink() functions"
    );
    return;
  }

  // Initialize all components and functionality
  Components.initAll();
});

// Make Components available globally
window.Components = Components;
window.inittooraflex = inittooraflex;
