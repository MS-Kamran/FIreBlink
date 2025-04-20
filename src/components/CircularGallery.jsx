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
  const [scrollY, setScrollY] = useState(0);
  const [isImagesPreloaded, setIsImagesPreloaded] = useState(false);

  // Preload all images before showing
  useEffect(() => {
    const imagesToLoad = [...images, centerImage];
    let loadedCount = 0;

    const preloadImages = async () => {
      const promises = imagesToLoad.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              loadedCount++;
              if (loadedCount === imagesToLoad.length) {
                setIsImagesPreloaded(true);
                setIsInitialLoadComplete(true);
              }
              resolve();
            };
            img.onerror = () => {
              resolve(); // Continue even if an image fails to load
            };
            img.src = src;
          })
      );

      await Promise.all(promises);
    };

    preloadImages();
  }, [images, centerImage]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Update scroll values
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update rotation smoothly with additional transforms based on scroll
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
    // Calculate base position
    const radius = containerSize.width * 0.33;
    const baseAngle = (index * (360 / total));
    const rotationAngle = baseAngle + progress;
    const angleInRadians = rotationAngle * (Math.PI / 180);
    
    // Add subtle parallax effect based on scroll position
    const parallaxAmount = Math.sin(scrollY * 0.002) * 5;
    const breathingEffect = Math.sin(Date.now() * 0.001) * 3;
    
    return {
      x: Math.cos(angleInRadians) * radius + (index % 2 === 0 ? parallaxAmount : -parallaxAmount),
      y: Math.sin(angleInRadians) * radius + breathingEffect,
      z: Math.sin(angleInRadians * 2) * 20 // Z-axis movement for depth
    };
  };

  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };

  if (!isInitialLoadComplete) {
    // Show circle placeholders while loading
    return (
      <div className="w-full flex justify-center py-12">
        <div 
          className="relative" 
          style={{ 
            width: 520, 
            height: 520 
          }}
        >
          {/* Center circle placeholder */}
          <div 
            className="absolute rounded-full bg-neutral-50" 
            style={{ 
              width: 520 * 0.3, 
              height: 520 * 0.3, 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(91,25,0,0.1)',
              border: '4px solid #5b1900'
            }}
          />
          
          {/* Orbital placeholders */}
          {[...Array(Math.min(images.length, 5))].map((_, index) => {
            const angle = (index * (360 / images.length)) * (Math.PI / 180);
            const radius = 520 * 0.33;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div 
                key={index}
                className="absolute rounded-full bg-white" 
                style={{ 
                  width: 520 * 0.17, 
                  height: 520 * 0.17, 
                  left: '50%', 
                  top: '50%', 
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  border: '3px solid #ff4c00',
                  opacity: 0.5
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Calculate center image subtle movement based on scroll
  const centerMovement = {
    x: Math.sin(scrollY * 0.001) * 3,
    y: Math.cos(scrollY * 0.001) * 3,
    scale: 1 + Math.sin(scrollY * 0.002) * 0.03
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          width: containerSize.width,
          height: containerSize.height,
          perspective: '1200px',
          opacity: isImagesPreloaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {/* Decorative orbit rings */}
        <div 
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-dashed border-[#5b1900]/10"
          style={{
            width: containerSize.width * 0.7,
            height: containerSize.width * 0.7,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            transition: 'transform 0.1s linear',
            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.2), 0 0 30px rgba(91,25,0,0.05)'
          }}
        />

        {/* Center Image with enhanced 3D effect */}
        <div
          className="absolute left-1/2 top-1/2 rounded-full overflow-hidden z-30"
          style={{
            width: imageSizes.center.width,
            height: imageSizes.center.height,
            transform: `translate3d(
              calc(-50% + ${centerMovement.x}px), 
              calc(-50% + ${centerMovement.y}px), 
              20px
            ) scale(${centerMovement.scale})`,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '4px solid #5b1900',
            boxShadow: '0 10px 30px rgba(91,25,0,0.2), 0 0 0 2px rgba(255,255,255,0.1)',
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
            forceRoundedCorners={true}
          />
        </div>

        {/* Orbital Images with enhanced 3D effects */}
        {images.map((src, index) => {
          const position = calculatePosition(index, images.length, rotation);
          const scale = hoveredIndex === index ? 1.15 : 1;
          const depth = Math.sin((rotation + index * 30) * Math.PI / 180) * 50;
          
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
                  ${position.z + depth}px
                ) scale(${scale})`,
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
                    ? '0 15px 35px rgba(255,76,0,0.25), 0 0 0 2px rgba(255,76,0,0.3), inset 0 0 10px rgba(255,255,255,0.5)'
                    : '0 10px 20px rgba(91,25,0,0.15), 0 0 0 1px rgba(255,76,0,0.1), inset 0 0 8px rgba(255,255,255,0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  filter: `brightness(${1 + (position.z / 200)})`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <PreCachedImage
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                  forceRoundedCorners={true}
                />
              </div>
            </div>
          );
        })}
        
        {/* Decorative floating dots */}
        {[...Array(15)].map((_, i) => {
          const dotSize = 2 + (i % 3);
          const orbitRadius = containerSize.width * (0.3 + (i % 5) * 0.02);
          const dotAngle = ((i * 24) + rotation) * (Math.PI / 180);
          const dotX = Math.cos(dotAngle) * orbitRadius;
          const dotY = Math.sin(dotAngle) * orbitRadius;
          const opacity = 0.1 + (i % 10) * 0.02;
          
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full bg-[#5b1900]"
              style={{
                width: dotSize,
                height: dotSize,
                transform: `translate(-50%, -50%) translate(${dotX}px, ${dotY}px)`,
                opacity,
                transition: 'transform 0.3s ease-out'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CircularGallery; 