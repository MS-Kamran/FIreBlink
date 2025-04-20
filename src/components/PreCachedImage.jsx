import { useState, useEffect } from 'react';

const PreCachedImage = ({ src, alt, className, onLoad: parentOnLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <div className={className} style={{ position: 'relative' }}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-neutral-50" 
          style={{ 
            opacity: 0.5,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        {...props}
      />
    </div>
  );
};

export default PreCachedImage; 