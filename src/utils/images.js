import logo from '../assets/logo/logo.png';
import business from '../assets/image/Business.jpg';
import cake from '../assets/image/Cake.jpg';
import mobileAll from '../assets/image/Mobile and all.jpg';
import mobile from '../assets/image/mobile.jpg';
import pitha from '../assets/image/pitha.jpg';
import supplyMap from '../assets/image/supply map.jpg';
import supply from '../assets/image/Supply.jpg';

// Temporary placeholder data until real images are added
export const Images = {
  portfolio: {
    mobileAccessories: [
      {
        id: 1,
        title: "Premium Chargers",
        description: "High-speed charging solutions",
        // Add actual image path when available
        placeholder: "bg-gradient-to-br from-[#5b1900] to-[#ff4c00]"
      },
      {
        id: 2,
        title: "Phone Cases",
        description: "Protective cases and covers",
        placeholder: "bg-gradient-to-br from-[#ff4c00] to-[#5b1900]"
      },
      {
        id: 3,
        title: "Screen Protectors",
        description: "Premium screen protection",
        placeholder: "bg-gradient-to-br from-[#5b1900] to-[#ff4c00]"
      }
    ],
    events: [
      {
        id: 1,
        title: "Corporate Conference",
        description: "Full-service catering",
        placeholder: "bg-gradient-to-br from-[#ff4c00] to-[#5b1900]"
      },
      {
        id: 2,
        title: "Business Meeting",
        description: "Professional catering service",
        placeholder: "bg-gradient-to-br from-[#5b1900] to-[#ff4c00]"
      },
      {
        id: 3,
        title: "Training Events",
        description: "Customized catering solutions",
        placeholder: "bg-gradient-to-br from-[#ff4c00] to-[#5b1900]"
      }
    ]
  },
  logo,
  business,
  cake,
  mobileAll,
  mobile,
  pitha,
  supplyMap,
  supply
};

export const galleryImages = [
  cake,
  mobileAll,
  mobile,
  pitha,
  supplyMap,
  supply
];

export default Images; 