// Image sizes for different viewports
export const imageSizes = {
  thumbnail: {
    width: 150,
    height: 150
  },
  small: {
    width: 300,
    height: 300
  },
  medium: {
    width: 600,
    height: 600
  },
  large: {
    width: 1200,
    height: 1200
  }
};

// Generate srcSet for responsive images
export const generateSrcSet = (image, sizes = ['thumbnail', 'small', 'medium', 'large']) => {
  return sizes
    .map(size => `${image} ${imageSizes[size].width}w`)
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (defaultSize = 'medium') => {
  return `(max-width: 768px) ${imageSizes.small.width}px,
          (max-width: 1200px) ${imageSizes.medium.width}px,
          ${imageSizes[defaultSize].width}px`;
};

// Lazy loading configuration
export const lazyLoadConfig = {
  root: null,
  rootMargin: '50px 0px',
  threshold: 0.1
}; 