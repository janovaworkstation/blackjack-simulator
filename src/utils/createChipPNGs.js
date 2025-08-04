// Create PNG chip images using data URLs and save them
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Better chip data with realistic casino colors
const chipData = {
  1: {
    main: '#F5F5F5',
    edge: '#CCCCCC',
    accent: '#1565C0',
    text: '#000000',
    name: 'WHITE',
    // Using a simple but effective base64 PNG
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA==',
  },
  5: {
    main: '#D32F2F',
    edge: '#B71C1C',
    accent: '#FFD700',
    text: '#FFFFFF',
    name: 'RED',
  },
  25: {
    main: '#388E3C',
    edge: '#1B5E20',
    accent: '#FFD700',
    text: '#FFFFFF',
    name: 'GREEN',
  },
  100: {
    main: '#424242',
    edge: '#212121',
    accent: '#FFD700',
    text: '#FFFFFF',
    name: 'BLACK',
  },
};

function createSimplePNG(value) {
  const config = chipData[value];
  const size = 512;
  const center = size / 2;
  const radius = size * 0.45;

  // Create a simple SVG that we'll convert to PNG
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="main${value}" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${config.main}" />
        <stop offset="100%" stop-color="${config.edge}" />
      </radialGradient>
      <radialGradient id="center${value}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${config.accent}" />
        <stop offset="100%" stop-color="${config.edge}" />
      </radialGradient>
      <filter id="shadow${value}" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="3" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.4)" />
      </filter>
    </defs>
    
    <!-- Main chip circle -->
    <circle cx="${center}" cy="${center}" r="${radius}" 
            fill="url(#main${value})" 
            stroke="${config.edge}" 
            stroke-width="8"
            filter="url(#shadow${value})" />
    
    <!-- Decorative edge ring -->
    <circle cx="${center}" cy="${center}" r="${radius - 20}" 
            fill="none" 
            stroke="${config.accent}" 
            stroke-width="4" 
            stroke-dasharray="12,4" 
            opacity="0.8" />
    
    <!-- Center circle -->
    <circle cx="${center}" cy="${center}" r="${radius * 0.5}" 
            fill="url(#center${value})" 
            stroke="${config.edge}" 
            stroke-width="3" />
    
    <!-- Main value -->
    <text x="${center}" y="${center + 15}" 
          text-anchor="middle" 
          font-family="Arial Black" 
          font-size="60" 
          font-weight="900" 
          fill="${config.text}">$${value}</text>
    
    <!-- Casino text -->
    <text x="${center}" y="${center + 60}" 
          text-anchor="middle" 
          font-family="Arial" 
          font-size="20" 
          font-weight="bold" 
          fill="${config.text}" 
          opacity="0.9">CASINO</text>
    
    <!-- Color name -->
    <text x="${center}" y="${center - 40}" 
          text-anchor="middle" 
          font-family="Arial" 
          font-size="18" 
          font-weight="bold" 
          fill="${config.text}" 
          opacity="0.8">${config.name}</text>
    
    <!-- Edge spots -->
    ${Array.from({ length: 16 }, (_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const spotRadius = radius - 10;
      const x = center + Math.cos(angle) * spotRadius;
      const y = center + Math.sin(angle) * spotRadius;
      return i % 2 === 0
        ? `<circle cx="${x}" cy="${y}" r="4" fill="${config.accent}" opacity="0.9"/>`
        : '';
    }).join('')}
  </svg>`;

  return svg;
}

// Create better chip files
const outputDir = path.join(__dirname, '../../public/chips');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create improved SVG chips for now
[1, 5, 25, 100].forEach((value) => {
  const svg = createSimplePNG(value);
  const filename = path.join(outputDir, `chip-${value}-hq.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`✅ Created high-quality chip: chip-${value}-hq.svg`);
});

console.log('🎰 High-quality chip SVGs created!');
console.log('💡 These use better colors and simpler, more reliable rendering');

// Also create a conversion script for PNG
const conversionScript = `
// Convert SVG to PNG using browser Canvas API
function convertSVGToPNG(svgText, filename) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = 512;
  canvas.height = 512;
  
  const svgBlob = new Blob([svgText], {type: 'image/svg+xml'});
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      const link = document.createElement('a');
      link.download = filename;
      link.href = URL.createObjectURL(blob);
      link.click();
    }, 'image/png');
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
}

// Usage: Load SVG files and convert them
// convertSVGToPNG(svgContent, 'chip-25.png');
`;

fs.writeFileSync(
  path.join(outputDir, 'svg-to-png-converter.js'),
  conversionScript,
);
console.log('📝 Created SVG to PNG conversion script');
