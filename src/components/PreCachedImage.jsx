import { useState, useEffect, useRef } from 'react';

const PreCachedImage = ({ 
  src, 
  alt, 
  className, 
  onLoad: parentOnLoad, 
  forceRoundedCorners = false, 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  // Image loading
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      requestAnimationFrame(() => {
        setIsLoaded(true);
        if (parentOnLoad) parentOnLoad();
      });
    };
  }, [src, parentOnLoad]);

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Calculate randomized gradient angles for shimmer effect
  const gradientAngle = Math.floor(Math.random() * 180);

  const roundedStyle = forceRoundedCorners ? {
    borderRadius: '50%',
    overflow: 'hidden'
  } : {};

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        ...roundedStyle
      }}
    >
      {/* Shimmer loading effect - always rounded when needed */}
      {!isLoaded && (
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(${gradientAngle}deg, #f3f3f3 8%, #fafafa 18%, #f3f3f3 33%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            borderRadius: forceRoundedCorners ? '50%' : undefined
          }}
        />
      )}
      
      {/* Actual image with scale effect - always rounded when needed */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: `scale(${isLoaded && isVisible ? 1 : 1.05})`,
          transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          filter: `contrast(${isLoaded ? 1 : 0.9}) brightness(${isLoaded ? 1 : 0.9})`,
          borderRadius: forceRoundedCorners ? '50%' : undefined
        }}
        {...props}
      />

      {/* Premium overlay effects - always rounded when needed */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.05) 100%)',
          borderRadius: forceRoundedCorners ? '50%' : undefined
        }}
      />
    </div>
  );
};

export default PreCachedImage; 