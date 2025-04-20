import { useRef, useState, useEffect, useMemo } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import PreCachedImage from './PreCachedImage';

const CircularGallery = ({ images, centerImage }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [isCenterImageLoaded, setIsCenterImageLoaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Preload center image first with high priority
  useEffect(() => {
    const preloadCenterImage = () => {
      const img = new Image();
      img.src = centerImage;
      img.onload = () => {
        setIsCenterImageLoaded(true);
      };
    };
    preloadCenterImage();
  }, [centerImage]);

  // Preload orbital images afterward
  useEffect(() => {
    if (!isCenterImageLoaded) return; // Wait for center image to load first
    
    const imagesToLoad = [...images];
    let loadedCount = 0;

    const loadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadedImages(prev => prev + 1);
          if (loadedCount === imagesToLoad.length) {
            setIsInitialLoadComplete(true);
          }
          resolve();
        };
        img.onerror = resolve;
      });
    };

    // Load first 3 images immediately, then the rest
    const firstBatch = imagesToLoad.slice(0, 3);
    const restBatch = imagesToLoad.slice(3);
    
    Promise.all(firstBatch.map(loadImage)).then(() => {
      // Start showing gallery after first batch
      if (!isInitialLoadComplete) {
        setIsInitialLoadComplete(true);
      }
      
      // Load the rest of the images
      restBatch.forEach(loadImage);
    });
  }, [images, isCenterImageLoaded, isInitialLoadComplete]);

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

  const handleCenterImageLoad = () => {
    setIsCenterImageLoaded(true);
  };

  if (!isCenterImageLoaded) {
    return (
      <div className="w-full flex justify-center py-12">
        <div 
          className="rounded-full" 
          style={{ 
            width: 520, 
            height: 520,
            background: 'linear-gradient(135deg, #f3f3f3 8%, #fafafa 18%, #f3f3f3 33%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite'
          }} 
        />
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
          perspective: '1200px'
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

        {/* Center Image with enhanced 3D effect and eager loading */}
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
          <img
            src={centerImage}
            alt="Center Image"
            className="w-full h-full object-cover transform-gpu"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            onLoad={handleCenterImageLoad}
            loading="eager"
            fetchPriority="high"
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
                transformStyle: 'preserve-3d',
                opacity: isInitialLoadComplete ? 1 : 0,
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.4s, 0.4s',
                transitionTimingFunction: 'ease-in-out'
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
                  onLoad={() => setLoadedImages(prev => prev + 1)}
                  loading="lazy"
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