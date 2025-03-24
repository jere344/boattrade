import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import logo from "@assets/images/logo.webp";

// Company information
export const companyInfo = {
  name: "BoatTrade Consulting",
  description: "Le meilleur marché pour l'achat et la vente de bateaux, connectant les passionnés de navigation avec leurs embarcations parfaites.",
  email: "Boat.tradeconsulting@gmail.com ",
  phone: "06 51 51 06 36",
  address: "Palavas-les-Flots, 34250, France",
  city: "Palavas-les-Flots",
  foundedYear: 2020
};

// Social media links
export const socialMedia = [
  { icon: <FacebookIcon />, color: "#3b5998", url: "https://facebook.com/boattrade" },
  { icon: <TwitterIcon />, color: "#1DA1F2", url: "https://twitter.com/boattrade" },
  { icon: <InstagramIcon />, color: "#C13584", url: "https://instagram.com/boattrade" },
  { icon: <LinkedInIcon />, color: "#0e76a8", url: "https://linkedin.com/company/boattrade" },
];

// Navigation links
export const navigationLinks = [
  { name: "Accueil", path: "/" },
  { name: "Les bateaux de nos partenaires", path: "/boats" },
  { name: "Nos services", path: "/sell-my-boat" },
];

// Contact information with icons
export const contactInfo = [
  { icon: <EmailIcon />, text: companyInfo.email },
  { icon: <PhoneIcon />, text: companyInfo.phone },
  { icon: <LocationOnIcon />, text: companyInfo.address },
];
