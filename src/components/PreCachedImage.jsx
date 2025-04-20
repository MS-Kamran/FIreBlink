import { useState, useEffect } from 'react';

const PreCachedImage = ({ src, alt, className, onLoad: parentOnLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setLoadingProgress(0);

    const img = new Image();
    
    // Show progressive loading if browser supports
    if (window.fetch) {
      fetch(src)
        .then(response => {
          const contentLength = response.headers.get('content-length');
          if (!contentLength) {
            return response.blob();
          }
          
          const total = parseInt(contentLength, 10);
          let loaded = 0;
          
          const reader = response.body.getReader();
          
          return new Promise((resolve, reject) => {
            function read() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  resolve(null);
                  return;
                }
                
                loaded += value.length;
                setLoadingProgress(Math.min(100, Math.round((loaded / total) * 100)));
                read();
              }).catch(reject);
            }
            
            read();
          });
        })
        .catch(() => {
          // Fallback if fetch fails
          img.src = src;
        });
    }
    
    img.src = src;
    img.onload = () => {
      requestAnimationFrame(() => {
        setLoadingProgress(100);
        setIsLoaded(true);
        if (parentOnLoad) parentOnLoad();
      });
    };
    
    return () => {
      img.onload = null;
    };
  }, [src, parentOnLoad]);

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Loading indicator */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ 
            backgroundColor: '#f7f7f7',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)'
          }}
        >
          <div className="w-full max-w-[80%] bg-[#eaeaea] overflow-hidden rounded-full h-2">
            <div 
              className="h-full bg-gradient-to-r from-[#5b1900] to-[#ff4c00]" 
              style={{ 
                width: `${loadingProgress}%`,
                transition: 'width 0.3s ease-out',
                boxShadow: '0 0 8px rgba(255, 76, 0, 0.3)'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: `scale(${isLoaded ? 1 : 1.05})`,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: 'brightness(1.02)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        {...props}
      />
      
      {/* Image effects */}
      {isLoaded && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)',
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
};

export default PreCachedImage; 