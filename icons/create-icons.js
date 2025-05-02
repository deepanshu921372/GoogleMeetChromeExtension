// This script creates PNG icons for the extension
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the icons directory exists
const iconsDir = path.join(__dirname);
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to create a PNG icon
function createIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Draw background
  ctx.fillStyle = '#1a73e8';
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size/8);
  ctx.fill();

  // Draw text
  ctx.fillStyle = 'white';
  ctx.font = `bold ${size/2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('M', size/2, size/2);

  return canvas.toBuffer('image/png');
}

// Generate and save the icons
const iconSizes = [16, 48, 128];
iconSizes.forEach(size => {
  const pngBuffer = createIcon(size);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), pngBuffer);
  console.log(`Created icon${size}.png`);
});

console.log('\nNote: This script generated PNG icons.');
console.log('For a production extension, convert these to PNG files and update the references in the manifest file.');
console.log('You can use tools like svgexport, Inkscape, or online converters for this purpose.');