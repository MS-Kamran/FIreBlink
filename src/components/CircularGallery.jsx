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
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Update rotation smoothly and detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    const unsubscribe = scrollYProgress.on("change", latest => {
      setRotation(latest * 360);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [scrollYProgress, lastScrollY]);

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
    
    // Add subtle movement based on scroll direction
    const scrollOffset = scrollDirection === 'down' ? 5 : scrollDirection === 'up' ? -5 : 0;
    const radiusOffset = radius + scrollOffset;
    
    return {
      x: Math.cos(angleInRadians) * radiusOffset,
      y: Math.sin(angleInRadians) * radiusOffset,
      z: Math.sin(angleInRadians * 2) * 10 // Add slight z-axis movement
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
        {/* Premium Background Elements */}
        <div 
          className="absolute w-full h-full rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
            filter: 'blur(20px)',
            opacity: 0.7,
            transform: 'translateZ(0)'
          }}
        />
        
        <div 
          className="absolute w-11/12 h-11/12 left-1/2 top-1/2 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            border: '1px solid rgba(255, 76, 0, 0.1)',
            boxShadow: '0 0 40px rgba(91, 25, 0, 0.05)'
          }}
        />
        
        {/* Animated ring */}
        <div 
          className="absolute w-3/4 h-3/4 left-1/2 top-1/2 rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            border: '1px dashed rgba(91, 25, 0, 0.1)',
            borderRadius: '50%',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

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
            transformStyle: 'preserve-3d',
            boxShadow: '0 10px 30px rgba(91, 25, 0, 0.2)'
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
                  ${position.z}px
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
                    ? '0 10px 25px rgba(255, 76, 0, 0.25), 0 0 15px rgba(255, 76, 0, 0.15)'
                    : '0 8px 20px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  filter: hoveredIndex === index ? 'brightness(1.05)' : 'none'
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
        
        {/* Decorative dots */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = containerSize.width * 0.38;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full bg-[#5b1900]/10"
              style={{
                width: 3,
                height: 3,
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                opacity: 0.6
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularGallery; 