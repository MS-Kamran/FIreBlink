import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

const CircularGallery = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Memoize images array to prevent unnecessary re-renders
  const images = useMemo(() => [
    '/src/assets/image/Cake.jpg',
    '/src/assets/image/Mobile and all.jpg',
    '/src/assets/image/mobile.jpg',
    '/src/assets/image/pitha.jpg',
    '/src/assets/image/supply map.jpg',
    '/src/assets/image/Supply.jpg'
  ], []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Debounced resize handler
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Adjust size based on screen size
      let optimalSize;
      if (width < 640) { // Mobile
        optimalSize = Math.min(width * 0.95, height * 0.6);
      } else if (width < 768) { // Small tablets
        optimalSize = Math.min(width * 0.85, height * 0.7);
      } else if (width < 1024) { // Tablets
        optimalSize = Math.min(width * 0.8, height * 0.8);
      } else { // Desktop
        optimalSize = Math.min(width * 0.7, height * 0.8, 520);
      }
      
      setContainerSize({ width: optimalSize, height: optimalSize });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoize rotation transform
  const rotationProgress = useMemo(() => 
    useTransform(scrollYProgress, [0, 1], [0, 360]), 
    [scrollYProgress]
  );

  // Memoize position calculation
  const calculatePosition = useMemo(() => (index, total, progress) => {
    const radius = containerSize.width * 0.33;
    const baseAngle = (index * (360 / total));
    const rotationAngle = baseAngle + progress;
    const angleInRadians = rotationAngle * (Math.PI / 180);
    
    return {
      x: Math.cos(angleInRadians) * radius,
      y: Math.sin(angleInRadians) * radius,
      rotate: 0
    };
  }, [containerSize.width]);

  // Adjust image sizes based on screen size
  const getImageSizes = () => {
    const width = window.innerWidth;
    if (width < 640) {
      return {
        center: { width: containerSize.width * 0.35, height: containerSize.width * 0.35 },
        orbital: { width: containerSize.width * 0.2, height: containerSize.width * 0.2 }
      };
    }
    return {
      center: { width: containerSize.width * 0.3, height: containerSize.width * 0.3 },
      orbital: { width: containerSize.width * 0.17, height: containerSize.width * 0.17 }
    };
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: containerSize.width,
          height: containerSize.height,
          willChange: 'transform' // Optimize for animations
        }}
      >
        {/* Decorative Circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-dashed border-[#5b1900]/10"
          style={{
            width: containerSize.width * 0.72,
            height: containerSize.width * 0.72,
            x: '-50%',
            y: '-50%',
            rotate: rotationProgress,
            willChange: 'transform'
          }}
        />

        {/* Center Business Image */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: getImageSizes().center.width,
            height: getImageSizes().center.height,
            x: '-50%',
            y: '-50%',
            boxShadow: '0 0 40px rgba(91,25,0,0.15)',
            border: '4px solid #5b1900',
            willChange: 'transform'
          }}
        >
          <img
            src="/src/assets/image/Business.jpg"
            alt="Business Center"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Orbital Images */}
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              width: getImageSizes().orbital.width,
              height: getImageSizes().orbital.height,
              zIndex: hoveredIndex === index ? 20 : 10,
              willChange: 'transform'
            }}
            animate={() => {
              const position = calculatePosition(index, images.length, rotationProgress.get());
              return {
                x: position.x - (getImageSizes().orbital.width / 2),
                y: position.y - (getImageSizes().orbital.height / 2),
                scale: hoveredIndex === index ? 1.15 : 1,
                rotate: 0
              };
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 0.5
            }}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden bg-white"
              style={{
                border: '3px solid #ff4c00',
                boxShadow: hoveredIndex === index 
                  ? '0 12px 24px rgba(255,76,0,0.25)'
                  : '0 4px 12px rgba(0,0,0,0.1)'
              }}
              whileHover={{ scale: 1.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CircularGallery; 