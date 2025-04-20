import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CircularGallery = () => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const images = [
    '/src/assets/image/Cake.jpg',
    '/src/assets/image/Mobile and all.jpg',
    '/src/assets/image/mobile.jpg',
    '/src/assets/image/pitha.jpg',
    '/src/assets/image/supply map.jpg',
    '/src/assets/image/Supply.jpg'
  ];

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const optimalSize = Math.min(
        width * 0.7,
        450
      );
      setContainerSize({ width: optimalSize, height: optimalSize });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const rotationProgress = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const calculatePosition = (index, total, progress) => {
    const radius = containerSize.width * 0.33;
    const baseAngle = (index * (360 / total));
    const rotationAngle = baseAngle + progress;
    const angleInRadians = rotationAngle * (Math.PI / 180);
    
    return {
      x: Math.cos(angleInRadians) * radius,
      y: Math.sin(angleInRadians) * radius,
      rotate: rotationAngle
    };
  };

  return (
    <div className="w-full flex justify-center">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: containerSize.width,
          height: containerSize.height
        }}
      >
        {/* Decorative Circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-dashed border-primary/20"
          style={{
            width: containerSize.width * 0.72,
            height: containerSize.width * 0.72,
            x: '-50%',
            y: '-50%',
            rotate: rotationProgress
          }}
        />

        {/* Center Image */}
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            width: containerSize.width * 0.3,
            height: containerSize.width * 0.3,
            x: '-50%',
            y: '-50%',
            boxShadow: '0 0 30px rgba(91,25,0,0.15)',
            border: '4px solid var(--primary-color)'
          }}
        >
          <img
            src="/src/assets/image/Business.jpg"
            alt="Business Center"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Orbital Images */}
        {images.map((src, index) => {
          const imageSize = containerSize.width * 0.17;
          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                width: imageSize,
                height: imageSize,
                zIndex: hoveredIndex === index ? 20 : 10
              }}
              animate={() => {
                const position = calculatePosition(index, images.length, rotationProgress.get());
                return {
                  x: position.x - imageSize / 2,
                  y: position.y - imageSize / 2,
                  rotate: -position.rotate // Keep images upright
                };
              }}
            >
              <motion.div
                className="w-full h-full rounded-full overflow-hidden bg-white"
                style={{
                  border: '3px solid var(--accent-color)',
                  boxShadow: hoveredIndex === index 
                    ? '0 10px 20px rgba(255,76,0,0.25)'
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
          );
        })}
      </div>
    </div>
  );
};

export default CircularGallery; 