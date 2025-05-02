// Save this file as resize-icons.js in the root folder of your extension
// This script resizes your existing logo.png to required sizes
// Install required package: npm install sharp

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Define paths - this assumes the script is in the root of your extension
const iconsDir = path.join(__dirname, 'icons');
const inputImagePath = path.join(iconsDir, 'logo.jpg'); // Your existing logo.png
const outputSizes = [16, 48, 128];

// Function to resize image to different sizes
async function resizeImages() {
  try {
    // Check if input file exists
    if (!fs.existsSync(inputImagePath)) {
      console.error(`Input file not found: ${inputImagePath}`);
      return;
    }

    console.log(`Resizing ${inputImagePath} to different sizes...`);

    // Create different sizes of the PNG image
    for (const size of outputSizes) {
      // Skip the resize if the input file is already named icon[size].png
      if (inputImagePath.includes(`icon${size}.png`)) {
        console.log(`Skipping ${inputImagePath} as it's already the correct name.`);
        continue;
      }
      
      const outputPath = path.join(iconsDir, `icon${size}.jpg`);
      
      await sharp(inputImagePath)
        .resize(size, size)
        .jpg({ quality: 100 })
        .toFile(outputPath);
      
      console.log(`Created ${outputPath}`);
    }

    console.log('All icons created successfully!');
  } catch (error) {
    console.error('Error resizing images:', error);
  }
}

// Run the resize function
resizeImages();