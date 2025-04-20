import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreCachedImage = ({ src, alt, className, onLoad: parentOnLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cachedSrc, setCachedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCachedSrc(src);
      setIsLoaded(true);
      if (parentOnLoad) parentOnLoad();
    };
  }, [src, parentOnLoad]);

  if (!cachedSrc) {
    return (
      <div className={`${className} bg-neutral-100 animate-pulse`} />
    );
  }

  return (
    <motion.img
      src={cachedSrc}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  );
};

export default PreCachedImage; 