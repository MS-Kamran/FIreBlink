import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Images, galleryImages } from '../utils/images';
import Business from '../assets/image/Business.jpg';
import OptimizedImage from '../components/OptimizedImage';
import CircularGallery from '../components/CircularGallery';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-16 lg:pt-0 -mt-4 min-h-[80vh] md:min-h-[75vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'radial-gradient(#5b1900 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              opacity: 0.1
            }}
          />
          <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-[#ff4c00]/5 blur-3xl" />
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-[#5b1900]/5 blur-3xl" />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 mt-0 md:-mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-1 w-16 bg-[#ff4c00] mb-8"
                  />
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#5b1900] mb-6">
                    Trusted Corporate Supplier of
                    <span className="block text-[#ff4c00] mt-2">
                      Mobile Accessories & Event Food
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-neutral-600 max-w-lg">
                    With 5+ years of experience, Fire Blink delivers premium mobile accessories 
                    and exceptional catering services tailored for corporate needs.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center gap-2 px-6 py-3 
                             bg-[#5b1900] text-white rounded-lg overflow-hidden"
                  >
                    <span className="relative z-10">Explore Our Services</span>
                    <motion.div
                      className="absolute inset-0 bg-[#ff4c00]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-[#5b1900] 
                             hover:text-[#ff4c00] transition-colors duration-300"
                  >
                    📞 Contact Us Today
                  </Link>
                </div>
              </motion.div>

              {/* Right Column - Circular Gallery */}
              <div className="relative py-12">
                <CircularGallery 
                  images={galleryImages}
                  centerImage={Images.business}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-[#5b1900] mb-4">
              Our Services
            </h2>
            <div className="w-24 h-1 bg-[#ff4c00] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative p-6 bg-white rounded-xl shadow-sm 
                          hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 text-[#5b1900] group-hover:text-[#ff4c00] 
                                transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-[#5b1900] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Services data
const services = [
  {
    title: "Mobile Accessories",
    description: "Premium mobile accessories for corporate clients, including chargers, cases, and screen protectors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
      </svg>
    )
  },
  {
    title: "Corporate Event Catering",
    description: "Professional catering services for corporate events, meetings, and conferences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
      </svg>
    )
  }
];

export default Home;