import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import PreCachedImage from './PreCachedImage';

const CircularGallery = ({ images, centerImage }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the rotation animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const rotationProgress = useTransform(smoothProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const optimalSize = Math.min(width * 0.8, 520);
      setContainerSize({ width: optimalSize, height: optimalSize });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const imageSizes = useMemo(() => ({
    center: { width: containerSize.width * 0.3, height: containerSize.width * 0.3 },
    orbital: { width: containerSize.width * 0.17, height: containerSize.width * 0.17 }
  }), [containerSize.width]);

  const calculatePosition = (index, total, progress) => {
    const radius = containerSize.width * 0.33;
    const baseAngle = (index * (360 / total));
    const rotationAngle = baseAngle + progress;
    const angleInRadians = rotationAngle * (Math.PI / 180);
    
    return {
      x: Math.cos(angleInRadians) * radius,
      y: Math.sin(angleInRadians) * radius
    };
  };

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };

  const isLoading = loadedImages < images.length + 1; // +1 for center image

  return (
    <div className="w-full flex justify-center py-12">
      <motion.div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: containerSize.width,
          height: containerSize.height,
          opacity: isLoading ? 0.5 : 1
        }}
        animate={{ opacity: isLoading ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative Elements */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-dashed border-[#5b1900]/10"
          style={{
            width: containerSize.width * 0.72,
            height: containerSize.width * 0.72,
            x: '-50%',
            y: '-50%',
            rotate: rotationProgress
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border border-solid border-[#ff4c00]/5"
          style={{
            width: containerSize.width * 0.7,
            height: containerSize.width * 0.7,
            x: '-50%',
            y: '-50%',
          }}
        />

        {/* Center Image */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          style={{
            width: imageSizes.center.width,
            height: imageSizes.center.height,
            x: '-50%',
            y: '-50%',
            boxShadow: '0 0 40px rgba(91,25,0,0.15)',
            border: '4px solid #5b1900'
          }}
        >
          <PreCachedImage
            src={centerImage}
            alt="Center Image"
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
        </motion.div>

        {/* Orbital Images */}
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2"
            style={{
              width: imageSizes.orbital.width,
              height: imageSizes.orbital.height,
              zIndex: hoveredIndex === index ? 20 : 10
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={() => {
              const position = calculatePosition(index, images.length, rotationProgress.get());
              return {
                opacity: 1,
                x: position.x - (imageSizes.orbital.width / 2),
                y: position.y - (imageSizes.orbital.height / 2),
                scale: hoveredIndex === index ? 1.15 : 1
              };
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1
            }}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden bg-white"
              style={{
                border: '3px solid #ff4c00',
                boxShadow: hoveredIndex === index 
                  ? '0 12px 24px rgba(255,76,0,0.25)'
                  : '0 6px 12px rgba(0,0,0,0.1)'
              }}
              whileHover={{ 
                scale: 1.12,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <PreCachedImage
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
              />
            </motion.div>
          </motion.div>
        ))}

        {/* Decorative dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-[#5b1900]/10"
            style={{
              x: Math.cos((i * 30) * (Math.PI / 180)) * (containerSize.width * 0.36) - 3,
              y: Math.sin((i * 30) * (Math.PI / 180)) * (containerSize.width * 0.36) - 3,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CircularGallery; 