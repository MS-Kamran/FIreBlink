import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Images from '../utils/images';

const CircularGallery = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1000], [0, 360]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const galleryImages = [
    Images.gallery.cake,
    Images.gallery.mobileAll,
    Images.gallery.mobile,
    Images.gallery.pitha,
    Images.gallery.supplyMap,
    Images.gallery.supply
  ];

  const calculatePosition = (index, progress = 0) => {
    const radius = Math.min(dimensions.width, dimensions.height) * 0.45;
    const angle = (index * (360 / galleryImages.length) + progress) * (Math.PI / 180);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100"
    >
      {/* Decorative circle */}
      <div className="absolute w-[90%] h-[90%] border-4 border-orange-200 rounded-full opacity-50" style={{ zIndex: 10 }} />
      
      {/* Center business image */}
      <motion.div
        className="absolute"
        style={{
          width: '35%',
          aspectRatio: '1',
          zIndex: 20
        }}
      >
        <img
          src={Images.gallery.business}
          alt="Business"
          className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl p-2 bg-white"
        />
      </motion.div>

      {/* Orbital images */}
      {galleryImages.map((image, index) => {
        const position = calculatePosition(index);
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              width: '22%',
              aspectRatio: '1',
              x: position.x,
              y: position.y,
              rotate,
              zIndex: hoveredIndex === index ? 25 : 15,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg p-2 bg-white"
              style={{
                transform: `rotate(${-rotate.get()}deg)`,
              }}
            />
          </motion.div>
        );
      })}

      {/* Decorative dots */}
      {[...Array(12)].map((_, index) => {
        const angle = (index * 30) * (Math.PI / 180);
        const radius = Math.min(dimensions.width, dimensions.height) * 0.48;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <div
            key={`dot-${index}`}
            className="absolute w-3 h-3 bg-orange-300 rounded-full"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              zIndex: 5
            }}
          />
        );
      })}
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <CircularGallery />
    </div>
  );
};

export default Home;