#!/usr/bin/env node

// Generate PNG chip files directly using sharp (if available) or canvas
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Professional casino chip configurations
const chipConfigs = {
  1: { main: '#F8F8F8', edge: '#DDDDDD', accent: '#1976D2', text: '#000000', name: 'WHITE' },
  5: { main: '#E53935', edge: '#B71C1C', accent: '#FFD700', text: '#FFFFFF', name: 'RED' },
  25: { main: '#43A047', edge: '#1B5E20', accent: '#FFD700', text: '#FFFFFF', name: 'GREEN' },
  100: { main: '#424242', edge: '#212121', accent: '#FFD700', text: '#FFFFFF', name: 'BLACK' }
};

function createChipSVG(value, size = 512) {
  const config = chipConfigs[value];
  const center = size / 2;
  const radius = size * 0.46;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="main${value}" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${config.main}" />
      <stop offset="60%" stop-color="${config.main}" />
      <stop offset="100%" stop-color="${config.edge}" />
    </radialGradient>
    <radialGradient id="center${value}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${config.accent}" />
      <stop offset="80%" stop-color="${config.accent}" />
      <stop offset="100%" stop-color="${config.edge}" />
    </radialGradient>
    <filter id="shadow${value}" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="6" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.5)" />
    </filter>
    <filter id="textShadow${value}">
      <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.7)" />
    </filter>
  </defs>
  
  <!-- Main chip circle with shadow -->
  <circle cx="${center}" cy="${center}" r="${radius}" 
          fill="url(#main${value})" 
          stroke="${config.edge}" 
          stroke-width="8"
          filter="url(#shadow${value})" />
  
  <!-- Outer decorative ring -->
  <circle cx="${center}" cy="${center}" r="${radius - 25}" 
          fill="none" 
          stroke="${config.accent}" 
          stroke-width="4" 
          stroke-dasharray="16,6" 
          opacity="0.9" />
  
  <!-- Inner decorative ring -->
  <circle cx="${center}" cy="${center}" r="${radius - 45}" 
          fill="none" 
          stroke="${config.accent}" 
          stroke-width="2" 
          stroke-dasharray="8,4" 
          opacity="0.7" />
  
  <!-- Center medallion -->
  <circle cx="${center}" cy="${center}" r="${radius * 0.4}" 
          fill="url(#center${value})" 
          stroke="${config.edge}" 
          stroke-width="3" />
  
  <!-- Main denomination text -->
  <text x="${center}" y="${center + radius * 0.02}" 
        text-anchor="middle" 
        font-family="Arial Black, Arial, sans-serif" 
        font-size="${radius * 0.35}" 
        font-weight="900" 
        fill="${config.text}"
        filter="url(#textShadow${value})">$${value}</text>
  
  <!-- Casino text -->
  <text x="${center}" y="${center + radius * 0.25}" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="${radius * 0.1}" 
        font-weight="bold" 
        fill="${config.text}" 
        opacity="0.9">CASINO</text>
  
  <!-- Chip color name -->
  <text x="${center}" y="${center - radius * 0.22}" 
        text-anchor="middle" 
        font-family="Arial, sans-serif" 
        font-size="${radius * 0.08}" 
        font-weight="bold" 
        fill="${config.text}" 
        opacity="0.8">${config.name}</text>
  
  <!-- Edge spots for authenticity -->
  ${Array.from({length: 24}, (_, i) => {
    if (i % 2 === 0) {
      const angle = (i * 15) * Math.PI / 180;
      const spotRadius = radius - 12;
      const x = center + Math.cos(angle) * spotRadius;
      const y = center + Math.sin(angle) * spotRadius;
      return `<circle cx="${x}" cy="${y}" r="4" fill="${config.accent}" />`;
    }
    return '';
  }).join('')}
  
  <!-- Highlight for 3D effect -->
  <ellipse cx="${center - radius * 0.15}" cy="${center - radius * 0.15}" 
           rx="${radius * 0.25}" ry="${radius * 0.35}" 
           fill="rgba(255, 255, 255, 0.3)" 
           opacity="0.6" />
</svg>`;
}

// Create output directory
const outputDir = path.join(__dirname, '../public/chips');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate high-quality SVG chips
const values = [1, 5, 25, 100];
values.forEach(value => {
  const svg = createChipSVG(value, 512);
  const filename = path.join(outputDir, `chip-${value}-hq.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created high-quality SVG: chip-${value}-hq.svg`);
});

// Create a simple PNG generation script that can run in browser console
const browserScript = `
// Paste this in browser console at localhost:5174 to generate PNGs
const chipValues = [1, 5, 25, 100];

async function createPNGFromSVG(value) {
  try {
    const response = await fetch('/chips/chip-' + value + '-hq.svg');
    const svgText = await response.text();
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 512;
    canvas.height = 512;
    
    return new Promise((resolve) => {
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(function(blob) {
          const link = document.createElement('a');
          link.download = 'chip-' + value + '.png';
          link.href = URL.createObjectURL(blob);
          link.click();
          resolve();
        }, 'image/png');
      };
      
      const svgBlob = new Blob([svgText], {type: 'image/svg+xml'});
      img.src = URL.createObjectURL(svgBlob);
    });
  } catch (error) {
    console.error('Failed to create PNG for chip', value, error);
  }
}

async function createAllPNGs() {
  for (const value of chipValues) {
    await createPNGFromSVG(value);
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait between downloads
  }
  console.log('✅ All PNG chips created and downloaded!');
}

createAllPNGs();
`;

fs.writeFileSync(path.join(outputDir, 'browser-png-generator.js'), browserScript);

console.log('🎰 High-quality SVG chips created!');
console.log('💡 To create PNG files:');
console.log('1. Open browser to localhost:5174');
console.log('2. Open developer console (F12)');
console.log('3. Copy and paste the script from public/chips/browser-png-generator.js');
console.log('4. Or use the existing create-png-chips.html page');
console.log('');
console.log('✅ For now, the app will use the improved SVG files as fallback');