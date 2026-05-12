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
