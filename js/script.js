// js/script.js

// Function to set favicon with fallback
function setFavicon() {
  // Remove any existing favicon first
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.parentNode.removeChild(existingFavicon);
  }

  const existingAppleIcon = document.querySelector(
    'link[rel="apple-touch-icon"]',
  );
  if (existingAppleIcon) {
    existingAppleIcon.parentNode.removeChild(existingAppleIcon);
  }

  // Create new favicon element
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/x-icon";
  favicon.href = getLogoPath("logo.ico");

  // Add to head
  document.head.appendChild(favicon);

  // Also create Apple Touch Icon for mobile devices
  const appleTouchIcon = document.createElement("link");
  appleTouchIcon.rel = "apple-touch-icon";
  appleTouchIcon.href = getLogoPath("logo.ico");
  document.head.appendChild(appleTouchIcon);
}

// Function to get logo path
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
      8,
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
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  // Start observing each stat number
  statNumbers.forEach((statNumber) => {
    observer.observe(statNumber);
  });
}

// Initialize client logo marquee with sample data
function initClientMarquee() {
  const marqueeTrack = document.querySelector(".client-marquee-track");
  if (!marqueeTrack) return;

  // Sample client logos - replace with your actual clients
  const clients = [
    {
      name: "Client 1",
      logo: "https://via.placeholder.com/100x50?text=Client+1",
    },
    {
      name: "Client 2",
      logo: "https://via.placeholder.com/100x50?text=Client+2",
    },
    {
      name: "Client 3",
      logo: "https://via.placeholder.com/100x50?text=Client+3",
    },
    {
      name: "Client 4",
      logo: "https://via.placeholder.com/100x50?text=Client+4",
    },
    {
      name: "Client 5",
      logo: "https://via.placeholder.com/100x50?text=Client+5",
    },
    {
      name: "Client 6",
      logo: "https://via.placeholder.com/100x50?text=Client+6",
    },
  ];

  // Clear existing content
  marqueeTrack.innerHTML = "";

  // Add clients (duplicate for seamless loop)
  [...clients, ...clients].forEach((client) => {
    const logoDiv = document.createElement("div");
    logoDiv.className = "client-logo";
    logoDiv.innerHTML = `<img src="${client.logo}" alt="${client.name}" loading="lazy">`;
    marqueeTrack.appendChild(logoDiv);
  });

  // Initialize animation
  setupMarqueeAnimation();

  function setupMarqueeAnimation() {
    let animationId;
    let position = 0;
    const speed = 1;
    let isPaused = false;

    function animate() {
      if (!isPaused) {
        position -= speed;

        // Get total width of half the logos (since we duplicated them)
        const logos = marqueeTrack.querySelectorAll(".client-logo");
        if (logos.length > 0) {
          const firstLogo = logos[0];
          const logoWidth = firstLogo.offsetWidth;
          const gap = 40;
          const totalWidth = (logoWidth + gap) * (logos.length / 2);

          // Reset position when half the content has scrolled
          if (Math.abs(position) >= totalWidth) {
            position = 0;
          }

          marqueeTrack.style.transform = `translateX(${position}px)`;
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Pause on hover
    marqueeTrack.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    marqueeTrack.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    // Pause when tab is not visible
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isPaused = true;
      } else {
        isPaused = false;
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      position = 0;
      marqueeTrack.style.transform = `translateX(${position}px)`;
    });
  }
}

// Initialize reviews section
function initReviews() {
  const reviewsGrid = document.querySelector(".reviews-grid");
  if (!reviewsGrid) return;

  // Sample reviews - replace with your actual reviews
  const reviews = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      rating: 5,
      content:
        "TooraFlex transformed our online presence. Their team was professional, responsive, and delivered exceptional results.",
      date: "2 weeks ago",
      source: "Google",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      rating: 5,
      content:
        "Outstanding service! Our new website has increased conversions by 40%. Highly recommend TooraFlex for any digital project.",
      date: "1 month ago",
      source: "Google",
    },
    {
      name: "Michael Brown",
      role: "Business Owner",
      rating: 4,
      content:
        "Great experience working with TooraFlex. They understood our needs and delivered a solution that exceeded our expectations.",
      date: "3 weeks ago",
      source: "Google",
    },
  ];

  // Clear existing content
  reviewsGrid.innerHTML = "";

  // Add reviews
  reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars +=
        i < review.rating
          ? '<i class="fas fa-star"></i>'
          : '<i class="far fa-star"></i>';
    }

    reviewCard.innerHTML = `
      <div class="review-header">
        <div class="review-rating">
          ${stars}
          <span>${review.rating}.0</span>
        </div>
        <div class="review-source">
          <i class="fab fa-google"></i>
          <span>${review.source}</span>
        </div>
      </div>
      <div class="review-content">
        <p>${review.content}</p>
      </div>
      <div class="review-author">
        <div class="author-info">
          <h4>${review.name}</h4>
          <p>${review.role}</p>
        </div>
        <div class="review-date">
          <i class="far fa-clock"></i>
          <span>${review.date}</span>
        </div>
      </div>
    `;

    reviewsGrid.appendChild(reviewCard);
  });
}

// Initialize dynamic contact forms - UPDATED VERSION
function initDynamicForms() {
  console.log("initDynamicForms: Starting service dropdown population...");

  const serviceSelect = document.getElementById("service");
  if (!serviceSelect) {
    console.log("initDynamicForms: No service select found on this page");
    return;
  }

  if (!window.siteConfig) {
    console.error("initDynamicForms: siteConfig not available");
    return;
  }

  if (!siteConfig.services || !Array.isArray(siteConfig.services)) {
    console.error("initDynamicForms: services array not found in config");
    return;
  }

  console.log(
    `initDynamicForms: Found ${siteConfig.services.length} services in config`,
  );

  // Clear existing options except the first one
  while (serviceSelect.options.length > 1) {
    serviceSelect.remove(1);
  }

  // Add services from config
  siteConfig.services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  console.log(
    `initDynamicForms: Added ${siteConfig.services.length} services to dropdown`,
  );
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

  // Function to close mobile menu
  const closeMobileMenu = () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "auto";
  };

  // Function to open mobile menu
  const openMobileMenu = () => {
    navLinks.classList.add("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  // Toggle menu on button click
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (navLinks.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close menu when clicking links
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      // Don't close if it's a get quote button that might trigger a modal
      if (!link.classList.contains("btn")) {
        closeMobileMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !navLinks.contains(e.target) &&
      !mobileMenuBtn.contains(e.target) &&
      navLinks.classList.contains("active")
    ) {
      closeMobileMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  // Close menu on window resize (if resizing to desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if it's just a hash or links to another page
      if (
        targetId === "#" ||
        targetId.includes(".html") ||
        targetId.includes("://")
      ) {
        return;
      }

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Product category filter
function initProductFilter() {
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

        // Filter service cards
        serviceCards.forEach((card) => {
          if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }
}

// Form handling
function initForms() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Show success message
      alert(
        `Thank you ${name}! Your message has been received. We'll contact you at ${email} soon.`,
      );

      // Reset form
      contactForm.reset();
    });
  }
}

// Main initialization function
function inittooraflex() {
  console.log("inittooraflex: Initializing...");

  // Initialize mobile menu
  initMobileMenu();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize product filter
  initProductFilter();

  // Initialize forms
  initForms();

  // Initialize dynamic forms - THIS IS CRITICAL
  initDynamicForms();

  // Initialize stats animation
  animateStats();

  // Initialize client marquee
  initClientMarquee();

  // Initialize reviews
  initReviews();

  console.log("inittooraflex: Initialization complete");

  // Extra check for services after a delay
  setTimeout(() => {
    const serviceSelect = document.getElementById("service");
    if (serviceSelect && serviceSelect.options.length <= 1) {
      console.log("inittooraflex: Services not populated, retrying...");
      initDynamicForms();
    }
  }, 1000);
}

// Enhanced Components object with all functionality
const Components = {
  // Load header navigation
  loadHeader: function () {
    const header = document.getElementById("main-header");
    if (!header) return;

    header.innerHTML = `
      <div class="container header-container">
        <a href="index.html" class="logo" aria-label="TooraFlex Home">
          <img
            src="${getLogoPath("logo-mark.png")}"
            alt="TooraFlex Logo"
            class="logo-img"
            width="40"
            height="40"
          />
          <div class="logo-text">Toora<span>flex</span></div>
        </a>

        <button class="mobile-menu-btn" aria-label="Toggle navigation menu" aria-expanded="false">
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
              <a href="${siteConfig.socialLinks?.facebook || "#"}" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
              <a href="${siteConfig.socialLinks?.twitter || "#"}" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
              <a href="${siteConfig.socialLinks?.linkedin || "#"}" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
              <a href="${siteConfig.socialLinks?.instagram || "#"}" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
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
                <a href="${getPhoneLink()}" class="contact-phone">${formatPhoneNumber(siteConfig.phoneNumber)}</a>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <a href="mailto:${siteConfig.email}" class="contact-email">${siteConfig.email}</a>
              </li>
              ${
                siteConfig.emergencyNumber
                  ? `
              <li>
                <i class="fas fa-exclamation-circle"></i>
                <a href="${getEmergencyPhoneLink()}" class="contact-emergency">Emergency: ${formatPhoneNumber(siteConfig.emergencyNumber)}</a>
              </li>
              `
                  : ""
              }
            </ul>
          </div>
        </div>

        <div class="copyright">
          <p>
            &copy; <span class="current-year"></span> Tooraflex. All rights reserved. Site by
            <a
              href="https://www.Tooraflex.co.za"
              target="_blank"
              rel="noopener noreferrer"
              class="tooraflex-name"
              aria-label="Visit Tooraflex website"
            >
              <span class="terra-part">Toora</span><span class="flex-part">flex</span>
              <img
                src="${getLogoPath("logo.ico")}"
                alt="Tooraflex Logo"
                class="tooraflex-icon"
                width="16"
                height="16"
              />
            </a>
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

  // Update contact info dynamically
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
      el.textContent = `Emergency: ${formatPhoneNumber(siteConfig.emergencyNumber)}`;
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
    console.log("Components.initAll: Starting...");

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

    console.log("Components.initAll: Complete");
  },
};

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded: Starting initialization...");

  // Check if config is loaded
  if (typeof siteConfig === "undefined") {
    console.error(
      "DOMContentLoaded: Config.js not loaded! Make sure config.js is loaded before script.js",
    );

    // Try to load config manually
    const script = document.createElement("script");
    script.src = "js/config.js";
    script.onload = function () {
      console.log("DOMContentLoaded: Config loaded manually, initializing...");
      Components.initAll();
    };
    document.head.appendChild(script);
    return;
  }

  // Check if WhatsApp functions are available
  if (
    typeof getWhatsAppUrl === "undefined" ||
    typeof getPhoneLink === "undefined" ||
    typeof getEmergencyPhoneLink === "undefined"
  ) {
    console.error(
      "DOMContentLoaded: Config.js functions not loaded! Make sure config.js has required functions",
    );
    return;
  }

  console.log("DOMContentLoaded: Config loaded, initializing components...");

  // Initialize all components and functionality
  Components.initAll();
});

// Make Components available globally
window.Components = Components;
window.inittooraflex = inittooraflex;
