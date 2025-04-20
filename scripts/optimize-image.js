import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceImage = path.join(__dirname, '../src/assets/image/Business.jpg');
const outputDir = path.join(__dirname, '../public/images/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sizes for responsive images
const sizes = [320, 640, 960, 1280];
const formats = ['webp', 'avif', 'jpg'];

async function optimizeImage() {
  try {
    console.log(`Optimizing image: ${sourceImage}`);
    
    // Original image metadata
    const metadata = await sharp(sourceImage).metadata();
    console.log(`Original size: ${metadata.width}x${metadata.height}, ${metadata.size} bytes`);
    
    // Create optimized versions
    for (const format of formats) {
      // Full size optimized version
      await sharp(sourceImage)
        .toFormat(format, { 
          quality: format === 'jpg' ? 80 : 75,
          progressive: format === 'jpg',
          effort: format === 'avif' ? 4 : 6,
        })
        .toFile(path.join(outputDir, `business-full.${format}`));
      
      // Responsive sizes
      for (const size of sizes) {
        const filename = `business-${size}.${format}`;
        await sharp(sourceImage)
          .resize(size)
          .toFormat(format, { 
            quality: format === 'jpg' ? 80 : 75,
            progressive: format === 'jpg',
            effort: format === 'avif' ? 4 : 6,
          })
          .toFile(path.join(outputDir, filename));
        
        console.log(`Created: ${filename}`);
      }
    }

    // Create a special low-quality placeholder
    await sharp(sourceImage)
      .resize(20)
      .blur(5)
      .toFormat('webp', { quality: 20 })
      .toBuffer()
      .then(buffer => {
        // Convert to base64
        const base64 = buffer.toString('base64');
        const dataUrl = `data:image/webp;base64,${base64}`;
        
        // Save placeholder data to a JSON file
        fs.writeFileSync(
          path.join(outputDir, 'placeholders.json'),
          JSON.stringify({ business: dataUrl }),
          'utf8'
        );
      });

    console.log('Optimization complete!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

optimizeImage(); 