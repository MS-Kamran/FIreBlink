import { useState, useEffect } from 'react';

// Placeholder data
const PLACEHOLDER = 'data:image/webp;base64,UklGRloCAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSCUAAAABF0CQbrRtI+g+GP9BiP8a0CgRMQFknmGmE2ZmZrYTEf8JfABWUDggmgEAABAIAJ0BKhAAEAABQCYlpAAC7DBkKgAA/vOSINz/3vpe9zcw/GnAw+/qImDL+3X0Y1gTbpNRbWRJp5UG80zSnhO3o9MQdlrUPp1ByO9P0g2r0/2GgdKxYb5EdqWXnNw9WT0hwDXXyy/RUDvTQAD++9L51N3Q8lZBYjjB5XPclbTMmzAXtmr5FVxMqe9GQKgGKtOW6gZY1S8D4gIcRdN1JWiVs8hhVaI67gB/bUppDBbwcAZSF/6UrmcHK1XdKhL0mw+I1H1fGsw7Bfbxc2tTAHQd0rB5mLNTXPNK5G54UQNQ36CyS2AHoGY+Qlb+SzZvUNtx3YBrhKpFcl+GWM8gwPTUh/MWobI5g+VCRnzpV1Bc8NKfV9yEqM/8PZiWnNbEQGK9nh0NNjnYn57YjOjFuIiYyg68CPlHswZe0z51lgJdHqYF0CfSBN4sUFrTPkv4Oz3C8uCcB7sDpMsC1m1Z9JGq8dTFZiNS81l3cxFgbYtWlIUUwHZn5BbYU8l/eO1iDC7NuRpcUyOPEBZvpAiI4u2Ru/ZWtfSRWtYXvJCpElOyixCTDSIKyZoX9IJF4HF5b6vGvZlr0+fkDMJGrVaZtvWF4SvPcJpnUdj2hQbNWMkFgq1ZRKoCAKbGwR9kYwxQ/C16pG/IA2YRsNf9dRIQzlGFmpTUZJ+vDQAAAA==';

const OptimizedBusinessImage = ({
  className = '',
  alt = 'Business center image',
  sizes = '(max-width: 640px) 320px, (max-width: 1024px) 640px, (max-width: 1280px) 960px, 1280px',
  priority = false,
  loading = 'lazy',
  onLoad = () => {}
}) => {
  const [loaded, setLoaded] = useState(false);
  const [placeholderSrc, setPlaceholderSrc] = useState(PLACEHOLDER);

  // Fetch placeholder from JSON if needed - cached in state above to avoid re-rendering
  useEffect(() => {
    // If we don't have placeholders.json yet, we'll use the hardcoded placeholder
    const loadPlaceholder = async () => {
      try {
        const response = await fetch('/images/optimized/placeholders.json');
        if (response.ok) {
          const data = await response.json();
          if (data.business) {
            setPlaceholderSrc(data.business);
          }
        }
      } catch (error) {
        console.log('Using default placeholder');
      }
    };
    
    if (!priority) {
      loadPlaceholder();
    }
  }, [priority]);

  const handleImageLoad = () => {
    setLoaded(true);
    onLoad();
  };

  const imageStyle = {
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out, transform 0.5s ease-out',
    transform: `scale(${loaded ? 1 : 1.05})`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden'
  };

  return (
    <div className={`${className} relative overflow-hidden`} style={{ backgroundColor: '#f7f7f7' }}>
      {/* Blur-up placeholder */}
      {!loaded && (
        <div 
          className="absolute inset-0 transform-gpu" 
          style={{ 
            backgroundImage: `url(${placeholderSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
            opacity: 0.8
          }}
        />
      )}

      {/* Modern image formats with fallback */}
      <picture>
        {/* AVIF format */}
        <source
          type="image/avif"
          srcSet="/images/optimized/business-320.avif 320w, /images/optimized/business-640.avif 640w, /images/optimized/business-960.avif 960w, /images/optimized/business-1280.avif 1280w"
          sizes={sizes}
        />
        
        {/* WebP format */}
        <source
          type="image/webp"
          srcSet="/images/optimized/business-320.webp 320w, /images/optimized/business-640.webp 640w, /images/optimized/business-960.webp 960w, /images/optimized/business-1280.webp 1280w"
          sizes={sizes}
        />
        
        {/* JPEG fallback */}
        <source
          type="image/jpeg"
          srcSet="/images/optimized/business-320.jpg 320w, /images/optimized/business-640.jpg 640w, /images/optimized/business-960.jpg 960w, /images/optimized/business-1280.jpg 1280w"
          sizes={sizes}
        />
        
        {/* Fallback image */}
        <img
          src="/images/optimized/business-640.jpg"
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleImageLoad}
          style={imageStyle}
          width="640"
          height="640"
        />
      </picture>
    </div>
  );
};

export default OptimizedBusinessImage; 