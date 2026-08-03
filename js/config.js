// js/config.js
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
  },
  
  // Services
  services: [
    { id: "website-design", name: "Website Design" },
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

function getWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

function getPhoneLink() {
  return `tel:${siteConfig.phoneNumber}`;
}

function getEmergencyPhoneLink() {
  return `tel:${siteConfig.emergencyNumber}`;
}

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
