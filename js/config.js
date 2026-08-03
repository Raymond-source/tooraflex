// js/config.js

// ============================================
// SITE CONFIGURATION
// ============================================

const siteConfig = {
  // Business Info
  businessName: "Toora Flex",
  businessAlternateName: "TooraFlex",
  whatsappNumber: "27664575904",
  phoneNumber: "+27664575904",
  emergencyNumber: "+27812194023",
  email: "info@tooraflex.co.za",
  address: "012 Central, 367 Helen Joseph Street, Pretoria CBD, Pretoria, 0002",
  whatsappMessage: "Hello Toora Flex, I'd like more information about your packages",
  
  // Social Links
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61586508505155",
    twitter: "https://twitter.com/TooraFlex",
    linkedin: "https://www.linkedin.com/company/toora-flex",
    instagram: "#",
    youtube: "#",
    tiktok: "#",
  },
  
  // Services
  services: [
    { id: "website-design", name: "Website Design & Development" },
    { id: "web-apps", name: "Web Applications" },
    { id: "hosting", name: "Hosting Solutions" },
    { id: "surveys", name: "Surveys & Analytics" },
    { id: "graphic-design", name: "Graphic Design" },
    { id: "power-bi", name: "Power BI & Data Management" },
    { id: "starter-package", name: "Starter Package" },
    { id: "business-package", name: "Business Package" },
    { id: "enterprise-package", name: "Enterprise Package" },
    { id: "multiple", name: "Multiple Services" },
    { id: "custom", name: "Custom Solution" },
  ],
  
  // Platform Plans
  platformPlans: [
    {
      id: "basic",
      name: "Basic",
      price: "R199",
      period: "/ month",
      badge: "Essential",
      icon: "fa-seedling",
      color: "basic",
      features: [
        "Up to 50 Products",
        "Hosting Included",
        "Mobile-Friendly Store",
        "Your Logo & Brand Colours"
      ]
    },
    {
      id: "starter",
      name: "Starter",
      price: "R499",
      period: "/ month",
      badge: "Popular",
      icon: "fa-rocket",
      color: "starter",
      features: [
        "100–200 Products",
        "1 Professional Email",
        "FREE Domain",
        "Hosting Included",
        "Your Logo & Brand Colours"
      ]
    },
    {
      id: "growth",
      name: "Growth",
      price: "R799",
      period: "/ month",
      badge: "Advanced",
      icon: "fa-chart-simple",
      color: "growth",
      features: [
        "Up to 500 Products",
        "3 Professional Emails",
        "FREE Domain",
        "Advanced Analytics & Promotions",
        "Hosting Included",
        "Your Logo & Brand Colours"
      ]
    }
  ],
  
  // Client Stores (for platform page marquee)
  clientStores: [
    {
      name: "Lebaba-inware",
      url: "https://www.lebaba-inware.co.za",
      logo: "/images/clients/lebaba.png",
      badge: "Growth"
    },
    {
      name: "Green Market",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%230c8c6e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EGM%3C/text%3E%3C/svg%3E",
      badge: "Starter"
    },
    {
      name: "Tech Hive",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%236b3fa0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3ETH%3C/text%3E%3C/svg%3E",
      badge: "Growth"
    },
    {
      name: "Home Essentials",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%232a5bd7'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EHE%3C/text%3E%3C/svg%3E",
      badge: "Basic"
    },
    {
      name: "Fit Life SA",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23d45d2a'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EFL%3C/text%3E%3C/svg%3E",
      badge: "Starter"
    },
    {
      name: "Pet Paradise",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%232d8f6f'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EPP%3C/text%3E%3C/svg%3E",
      badge: "Growth"
    },
    {
      name: "Urban Threads",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23c0392b'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EUT%3C/text%3E%3C/svg%3E",
      badge: "Starter"
    },
    {
      name: "Fresh Bites",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23e67e22'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EFB%3C/text%3E%3C/svg%3E",
      badge: "Basic"
    },
    {
      name: "Afro Chic",
      url: "#",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%231a4a6e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='60' font-family='Arial' font-weight='bold'%3EAC%3C/text%3E%3C/svg%3E",
      badge: "Growth"
    }
  ],
  
  // SEO Settings
  seo: {
    siteName: "Toora Flex",
    siteDescription: "Smart digital solutions for South African businesses. Website design, web applications, hosting, and analytics.",
    siteUrl: "https://www.tooraflex.co.za",
    logoUrl: "/images/logo/logo.png",
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@TooraFlex",
    locale: "en_ZA",
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get WhatsApp URL with pre-filled message
 * @returns {string} WhatsApp chat URL
 */
function getWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Get phone link for tel: href
 * @returns {string} Phone link
 */
function getPhoneLink() {
  return `tel:${siteConfig.phoneNumber}`;
}

/**
 * Get emergency phone link
 * @returns {string} Emergency phone link
 */
function getEmergencyPhoneLink() {
  return `tel:${siteConfig.emergencyNumber}`;
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
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

/**
 * Get logo path
 * @param {string} filename - Logo filename
 * @returns {string} Full logo path
 */
function getLogoPath(filename) {
  return `images/logo/${filename}`;
}

/**
 * Get service name by ID
 * @param {string} id - Service ID
 * @returns {string} Service name or null
 */
function getServiceName(id) {
  const service = siteConfig.services.find(s => s.id === id);
  return service ? service.name : null;
}

/**
 * Get platform plan by ID
 * @param {string} id - Plan ID
 * @returns {object} Plan object or null
 */
function getPlatformPlan(id) {
  const plan = siteConfig.platformPlans.find(p => p.id === id);
  return plan || null;
}

/**
 * Get all platform plans
 * @returns {array} Array of plan objects
 */
function getPlatformPlans() {
  return siteConfig.platformPlans || [];
}

/**
 * Get client stores for marquee
 * @returns {array} Array of client store objects
 */
function getClientStores() {
  return siteConfig.clientStores || [];
}

/**
 * Format currency for display
 * @param {number|string} amount - Amount to format
 * @param {string} currency - Currency code (default: ZAR)
 * @returns {string} Formatted currency
 */
function formatCurrency(amount, currency = "ZAR") {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : amount;
  if (isNaN(numericAmount)) return amount;
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

/**
 * Generate schema.org JSON-LD for Organization
 * @returns {object} Organization schema
 */
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.businessAlternateName,
    "description": siteConfig.seo.siteDescription,
    "url": siteConfig.seo.siteUrl,
    "logo": siteConfig.seo.siteUrl + siteConfig.seo.logoUrl,
    "image": siteConfig.seo.siteUrl + siteConfig.seo.ogImage,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.split(',')[0].trim(),
      "addressLocality": "Pretoria",
      "addressRegion": "Gauteng",
      "postalCode": "0002",
      "addressCountry": "ZA"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": siteConfig.phoneNumber,
        "contactType": "sales",
        "availableLanguage": ["English", "Afrikaans"]
      }
    ],
    "sameAs": Object.values(siteConfig.socialLinks).filter(link => link && link !== "#")
  };
}

/**
 * Generate schema.org JSON-LD for WebSite
 * @returns {object} WebSite schema
 */
function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.businessAlternateName,
    "url": siteConfig.seo.siteUrl,
    "description": siteConfig.seo.siteDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": siteConfig.seo.siteUrl + "/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate schema.org JSON-LD for BreadcrumbList
 * @param {array} items - Array of {name, url} objects
 * @returns {object} BreadcrumbList schema
 */
function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Generate schema.org JSON-LD for LocalBusiness
 * @returns {object} LocalBusiness schema
 */
function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.businessAlternateName,
    "description": siteConfig.seo.siteDescription,
    "image": siteConfig.seo.siteUrl + siteConfig.seo.logoUrl,
    "url": siteConfig.seo.siteUrl,
    "telephone": siteConfig.phoneNumber,
    "email": siteConfig.email,
    "openingHours": "Mo-Fr 08:00-17:00",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.split(',')[0].trim(),
      "addressLocality": "Pretoria",
      "addressRegion": "Gauteng",
      "postalCode": "0002",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-25.7479",
      "longitude": "28.2293"
    }
  };
}

// ============================================
// EXPOSE TO GLOBAL SCOPE
// ============================================

window.siteConfig = siteConfig;
window.getWhatsAppUrl = getWhatsAppUrl;
window.getPhoneLink = getPhoneLink;
window.getEmergencyPhoneLink = getEmergencyPhoneLink;
window.formatPhoneNumber = formatPhoneNumber;
window.getLogoPath = getLogoPath;
window.getServiceName = getServiceName;
window.getPlatformPlan = getPlatformPlan;
window.getPlatformPlans = getPlatformPlans;
window.getClientStores = getClientStores;
window.formatCurrency = formatCurrency;
window.getOrganizationSchema = getOrganizationSchema;
window.getWebsiteSchema = getWebsiteSchema;
window.getBreadcrumbSchema = getBreadcrumbSchema;
window.getLocalBusinessSchema = getLocalBusinessSchema;

// Log that config is loaded
console.log("✅ config.js loaded successfully");
console.log(`📦 ${siteConfig.services.length} services configured`);
console.log(`📦 ${siteConfig.platformPlans.length} platform plans configured`);
console.log(`📦 ${siteConfig.clientStores.length} client stores configured`);
