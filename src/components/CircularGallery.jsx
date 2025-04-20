import { useRef, useState, useEffect, useMemo } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import PreCachedImage from './PreCachedImage';

const CircularGallery = ({ images, centerImage }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Simple image preloading
  useEffect(() => {
    const imagesToLoad = [...images, centerImage];
    let loadedCount = 0;

    imagesToLoad.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setIsInitialLoadComplete(true);
        }
      };
    });
  }, [images, centerImage]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Update rotation smoothly
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", latest => {
      setRotation(latest * 360);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

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

  if (!isInitialLoadComplete) {
    return (
      <div className="w-full flex justify-center py-12">
        <div className="rounded-full bg-neutral-50" style={{ width: 520, height: 520 }} />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-12">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: containerSize.width,
          height: containerSize.height,
          perspective: '1000px'
        }}
      >
        {/* Center Image */}
        <div
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-30"
          style={{
            width: imageSizes.center.width,
            height: imageSizes.center.height,
            transform: 'translate(-50%, -50%)',
            border: '4px solid #5b1900',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          <PreCachedImage
            src={centerImage}
            alt="Center Image"
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
        </div>

        {/* Orbital Images */}
        {images.map((src, index) => {
          const position = calculatePosition(index, images.length, rotation);
          const scale = hoveredIndex === index ? 1.1 : 1;
          
          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2"
              style={{
                width: imageSizes.orbital.width,
                height: imageSizes.orbital.height,
                transform: `translate3d(
                  calc(-50% + ${position.x}px), 
                  calc(-50% + ${position.y}px),
                  0
                ) scale(${scale})`,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: hoveredIndex === index ? 20 : 10,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="w-full h-full rounded-full overflow-hidden bg-white"
                style={{
                  border: '3px solid #ff4c00',
                  boxShadow: hoveredIndex === index 
                    ? '0 8px 16px rgba(255,76,0,0.2)'
                    : '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PreCachedImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularGallery; 