import { useState, useEffect, useRef } from 'react';
import { generateSrcSet, generateSizes, lazyLoadConfig } from '../utils/imageOptimization';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = 'medium',
  priority = false,
  blur = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      }, lazyLoadConfig);

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => {
        observer.disconnect();
      };
    } else {
      setIsInView(true);
    }
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imageRef}>
      {(isInView || priority) && (
        <>
          {blur && !isLoaded && (
            <div 
              className="absolute inset-0 bg-neutral-200 animate-pulse"
              style={{ backdropFilter: 'blur(10px)' }}
            />
          )}
          <img
            src={src}
            alt={alt}
            srcSet={generateSrcSet(src)}
            sizes={generateSizes(sizes)}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
        </>
      )}
    </div>
  );
};

export default OptimizedImage; 