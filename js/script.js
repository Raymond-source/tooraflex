// js/config.js
const siteConfig = {
  whatsappNumber: "27664575904",
  phoneNumber: "+27664575904",
  emergencyNumber: "+27812194023",
  email: "info@tooraflex.co.za",
  address: "012 Central, 367 Helen Joseph Street, Pretoria CBD, Pretoria, 0002",
  whatsappMessage:
    "Hello Toora Flex, I'd like more information about your packages",
  socialLinks: {
    facebook: "https://www.facebook.com/profile.php?id=61586508505155",
    twitter: "#",
    linkedin: "https://www.linkedin.com/company/toora-flex/?viewAsMember=true",
    instagram: "#",
  },
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
};

// Generate WhatsApp URL
function getWhatsAppUrl() {
  const encodedMessage = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
}

// Generate phone link
function getPhoneLink() {
  return `tel:${siteConfig.phoneNumber}`;
}

// Generate emergency phone link
function getEmergencyPhoneLink() {
  return `tel:${siteConfig.emergencyNumber}`;
}

// Format phone number for display
function formatPhoneNumber(phone) {
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "+$1 $2 $3 $4");
  }
  return phone;
}
