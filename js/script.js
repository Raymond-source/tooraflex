// js/script.js

// ============================================
// CONFIGURATION & HELPERS
// ============================================

// Function to get logo path
function getLogoPath(filename) {
  return `images/logo/${filename}`;
}

// Format phone number for display
function formatPhoneNumber(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("27")) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  if (digits.length >= 10) {
    return `+${digits}`;
  }
  return phone;
}

// ============================================
// FAVICON
// ============================================

function setFavicon() {
  const existingFavicon = document.querySelector('link[rel="icon"]');
  if (existingFavicon) {
    existingFavicon.parentNode.removeChild(existingFavicon);
  }
  const existingAppleIcon = document.querySelector('link[rel="apple-touch-icon"]');
  if (existingAppleIcon) {
    existingAppleIcon.parentNode.removeChild(existingAppleIcon);
  }

  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/x-icon";
  favicon.href = getLogoPath("logo.ico");
  document.head.appendChild(favicon);

  const appleTouchIcon = document.createElement("link");
  appleTouchIcon.rel = "apple-touch-icon";
  appleTouchIcon.href = getLogoPath("logo.ico");
  document.head.appendChild(appleTouchIcon);
}

// ============================================
// STATS ANIMATION
// ============================================

function animateValue(element, start, end, duration, suffix = "") {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(easeOutQuart * (end - start) + start);
    element.textContent = currentValue + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target;
          const target = parseInt(statNumber.getAttribute("data-target"));
          const suffix = statNumber.textContent.replace(/[0-9]/g, "");
          animateValue(statNumber, 0, target, 1500, suffix);
          observer.unobserve(statNumber);
        }
      });
    },
    { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
  );

  statNumbers.forEach((statNumber) => {
    observer.observe(statNumber);
  });
}

// ============================================
// CLIENT MARQUEE
// ============================================

function initClientMarquee() {
  const marqueeTrack = document.querySelector(".client-marquee-track");
  if (!marqueeTrack) return;

  const clients = [
    { name: "Lowveld Institute", logo: "images/logo/clients/lowveld-institute.png" },
    { name: "Tshwaranang Community Solutions", logo: "images/logo/clients/Tshwaranang-Community-Solutions.png" },
    { name: "Health Plus Medical", logo: "images/logo/clients/Health-Plus-Medical.png" },
    { name: "Retail Masters", logo: "images/logo/clients/Retail-Masters.png" },
    { name: "Tech Solutions", logo: "images/logo/clients/Tech-Solutions.png" },
    { name: "Toora Flex Med", logo: "images/logo/clients/Toora-Flex-Med.png" },
  ];

  marqueeTrack.innerHTML = "";

  [...clients, ...clients].forEach((client, index) => {
    const logoDiv = document.createElement("div");
    logoDiv.className = "client-logo";
    const logoImg = document.createElement("img");
    logoImg.src = client.logo;
    logoImg.alt = `${client.name} - Client of Tooraflex`;
    logoImg.loading = "lazy";
    logoImg.style.width = "100%";
    logoImg.style.height = "auto";
    logoImg.style.objectFit = "contain";
    logoDiv.title = client.name;
    logoDiv.setAttribute("aria-label", `Client: ${client.name}`);
    logoDiv.appendChild(logoImg);
    marqueeTrack.appendChild(logoDiv);
  });

  setTimeout(() => {
    setupMarqueeAnimation();
  }, 500);

  function setupMarqueeAnimation() {
    let animationId;
    let position = 0;
    const speed = 0.8;
    let isPaused = false;
    let isAnimating = false;

    function animate() {
      if (!isAnimating) {
        isAnimating = true;
        if (!isPaused) {
          position -= speed;
          const logos = marqueeTrack.querySelectorAll(".client-logo");
          if (logos.length > 0) {
            const firstLogo = logos[0];
            const logoWidth = firstLogo.offsetWidth || 180;
            const gap = 40;
            const totalWidth = (logoWidth + gap) * (logos.length / 2);
            if (Math.abs(position) >= totalWidth) {
              position = 0;
            }
            marqueeTrack.style.transform = `translateX(${position}px)`;
          }
        }
        isAnimating = false;
      }
      animationId = requestAnimationFrame(animate);
    }

    animate();

    marqueeTrack.addEventListener("mouseenter", () => {
      isPaused = true;
      marqueeTrack.style.cursor = "grab";
    });
    marqueeTrack.addEventListener("mouseleave", () => {
      isPaused = false;
      marqueeTrack.style.cursor = "default";
    });

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    marqueeTrack.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX - marqueeTrack.offsetLeft;
      scrollLeft = position;
      marqueeTrack.style.cursor = "grabbing";
      isPaused = true;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      marqueeTrack.style.cursor = "grab";
      isPaused = false;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - marqueeTrack.offsetLeft;
      const walk = (x - startX) * 2;
      position = scrollLeft - walk;
      marqueeTrack.style.transform = `translateX(${position}px)`;
    });

    marqueeTrack.addEventListener("touchstart", (e) => {
      isPaused = true;
      startX = e.touches[0].pageX - marqueeTrack.offsetLeft;
      scrollLeft = position;
    });

    marqueeTrack.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const x = e.touches[0].pageX - marqueeTrack.offsetLeft;
      const walk = (x - startX) * 2;
      position = scrollLeft - walk;
      marqueeTrack.style.transform = `translateX(${position}px)`;
    });

    marqueeTrack.addEventListener("touchend", () => {
      isPaused = false;
    });

    document.addEventListener("visibilitychange", () => {
      isPaused = document.hidden;
    });

    window.addEventListener("resize", () => {
      position = 0;
      marqueeTrack.style.transform = `translateX(${position}px)`;
    });
  }
}

// ============================================
// REVIEWS
// ============================================

function initReviews() {
  const reviewsGrid = document.querySelector(".reviews-grid");
  if (!reviewsGrid) return;

  const reviews = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      rating: 5,
      content: "TooraFlex transformed our online presence. Their team was professional, responsive, and delivered exceptional results.",
      date: "2 weeks ago",
      source: "Google",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      rating: 5,
      content: "Outstanding service! Our new website has increased conversions by 40%. Highly recommend TooraFlex for any digital project.",
      date: "1 month ago",
      source: "Google",
    },
    {
      name: "Michael Brown",
      role: "Business Owner",
      rating: 4,
      content: "Great experience working with TooraFlex. They understood our needs and delivered a solution that exceeded our expectations.",
      date: "3 weeks ago",
      source: "Google",
    },
    {
      name: "Lisa Williams",
      role: "Operations Manager",
      rating: 5,
      content: "The Power BI dashboards they created revolutionized our data analysis. Highly professional and skilled team!",
      date: "1 month ago",
      source: "Google",
    },
  ];

  reviewsGrid.innerHTML = "";

  reviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
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

// ============================================
// DYNAMIC FORMS
// ============================================

function initDynamicForms() {
  const serviceSelect = document.getElementById("service");
  if (!serviceSelect) return;

  if (typeof siteConfig === "undefined" || !siteConfig.services) {
    console.error("siteConfig not available for dynamic forms");
    return;
  }

  // Clear existing options except the first one
  while (serviceSelect.options.length > 1) {
    serviceSelect.remove(1);
  }

  siteConfig.services.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.id;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!mobileMenuBtn || !navLinks) return;

  const closeMobileMenu = () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "auto";
  };

  const openMobileMenu = () => {
    navLinks.classList.add("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.classList.contains("btn")) {
        closeMobileMenu();
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      closeMobileMenu();
    }
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.includes(".html") || targetId.includes("://")) {
        return;
      }
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
}

// ============================================
// PRODUCT FILTER
// ============================================

function initProductFilter() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  if (categoryBtns.length > 0 && serviceCards.length > 0) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
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

// ============================================
// FORM HANDLING
// ============================================

function initForms() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      alert(`Thank you ${name}! Your message has been received. We'll contact you at ${email} soon.`);
      contactForm.reset();
    });
  }
}

// ============================================
// SYSTEM CARDS
// ============================================

function initSystemCards() {
  const cards = document.querySelectorAll(".system-card");
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });

    card.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        card.classList.toggle("flipped");
      }
    });
  });
}

// ============================================
// MAIN INITIALIZATION
// ============================================

function initTooraFlex() {
  console.log("initTooraFlex: Initializing...");

  initMobileMenu();
  initSmoothScrolling();
  initProductFilter();
  initForms();
  initDynamicForms();
  animateStats();
  initClientMarquee();
  initReviews();
  initSystemCards();

  console.log("initTooraFlex: Initialization complete");
}

// ============================================
// COMPONENTS - HEADER, FOOTER, WHATSAPP
// ============================================

const Components = {
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
          <li><a href="ecommerce.html">E-Commerce</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="contact.html" class="btn">Get Quote</a></li>
        </ul>
      </div>
    `;
  },

  loadFooter: function () {
    const footer = document.getElementById("main-footer");
    if (!footer) return;

    const siteConfig = window.siteConfig || {};

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
                <span class="contact-address">${siteConfig.address || "012 Central, 367 Helen Joseph Street, Pretoria CBD, Pretoria, 0002"}</span>
              </li>
              <li>
                <i class="fas fa-phone-alt"></i>
                <a href="tel:+27664575904" class="contact-phone">+27 66 457 5904</a>
              </li>
              <li>
                <i class="fas fa-envelope"></i>
                <a href="mailto:${siteConfig.email || "info@tooraflex.co.za"}" class="contact-email">${siteConfig.email || "info@tooraflex.co.za"}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="copyright">
          <p>
            &copy; <span class="current-year"></span> Tooraflex. All rights reserved. Site by
            <a href="https://www.Tooraflex.co.za" target="_blank" rel="noopener noreferrer" class="tooraflex-name">
              <span class="terra-part">Toora</span><span class="flex-part">flex</span>
            </a>
          </p>
        </div>
      </div>
    `;
  },

  loadWhatsAppButton: function () {
    const whatsappFloat = document.getElementById("whatsapp-float");
    if (!whatsappFloat) return;

    let whatsappUrl = "https://wa.me/27664575904?text=Hello%20Toora%20Flex%2C%20I'd%20like%20more%20information";
    if (typeof getWhatsAppUrl !== "undefined") {
      whatsappUrl = getWhatsAppUrl();
    }

    whatsappFloat.innerHTML = `
      <a href="${whatsappUrl}" 
         target="_blank" 
         class="whatsapp-float-link"
         aria-label="Chat with us on WhatsApp">
          <i class="fab fa-whatsapp"></i>
      </a>
      <div class="whatsapp-float-text">Chat with us</div>
    `;
  },

  updateContactInfo: function () {
    const siteConfig = window.siteConfig || {};
    document.querySelectorAll(".contact-address").forEach((el) => {
      if (siteConfig.address) el.textContent = siteConfig.address;
    });
  },

  updateCurrentYear: function () {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll(".current-year").forEach((el) => {
      el.textContent = currentYear;
    });
  },

  initAll: function () {
    console.log("Components.initAll: Starting...");

    setFavicon();
    this.loadHeader();
    this.loadFooter();
    this.loadWhatsAppButton();
    this.updateContactInfo();
    this.updateCurrentYear();

    setTimeout(() => {
      initTooraFlex();
    }, 100);

    console.log("Components.initAll: Complete");
  }
};

// ============================================
// DOM READY - START EVERYTHING
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded: Starting...");

  // Check if config is loaded
  if (typeof siteConfig === "undefined") {
    console.warn("siteConfig not found, loading from config.js...");
    const script = document.createElement("script");
    script.src = "js/config.js";
    script.onload = function () {
      console.log("Config loaded, initializing Components...");
      Components.initAll();
    };
    document.head.appendChild(script);
    return;
  }

  // Check if WhatsApp functions exist
  if (typeof getWhatsAppUrl === "undefined") {
    console.warn("WhatsApp functions not found, defining fallbacks...");
    window.getWhatsAppUrl = function() {
      return "https://wa.me/27664575904?text=Hello%20Toora%20Flex%2C%20I'd%20like%20more%20information";
    };
    window.getPhoneLink = function() {
      return "tel:+27664575904";
    };
    window.getEmergencyPhoneLink = function() {
      return "tel:+27812194023";
    };
  }

  console.log("DOM ready, initializing Components...");
  Components.initAll();
});

// ============================================
// PAGE VISIBILITY - ENFORCE TAB TITLE
// ============================================

function enforceBrowserTabTitle() {
  const desiredTitle = "Toora Flex | Smart Digital Solutions for South African Businesses";
  if (document.title !== desiredTitle) {
    document.title = desiredTitle;
  }
}

document.addEventListener("DOMContentLoaded", enforceBrowserTabTitle);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    enforceBrowserTabTitle();
  }
});

// ============================================
// EXPOSE FOR DEBUGGING
// ============================================

window.Components = Components;
window.initTooraFlex = initTooraFlex;
window.debugClientLogos = function () {
  const logos = document.querySelectorAll(".client-logo img");
  console.log(`Found ${logos.length} client logos`);
  logos.forEach((logo, index) => {
    console.log(`Logo ${index + 1}:`, {
      src: logo.src,
      alt: logo.alt,
      loaded: logo.complete,
    });
  });
};
