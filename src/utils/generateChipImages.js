// Simple script to create chip images using Node.js ES modules
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create simple SVG chip images that can be converted to PNG
function createChipSVG(value) {
  const getChipColors = (value) => {
    switch (value) {
      case 1:
        return {
          main: '#F8F8FF',
          edge: '#E0E0E0',
          accent: '#4169E1',
          text: '#000000',
        };
      case 5:
        return {
          main: '#DC143C',
          edge: '#8B0000',
          accent: '#FFD700',
          text: '#FFFFFF',
        };
      case 25:
        return {
          main: '#228B22',
          edge: '#006400',
          accent: '#FFD700',
          text: '#FFFFFF',
        };
      case 100:
        return {
          main: '#2F2F2F',
          edge: '#000000',
          accent: '#FFD700',
          text: '#FFFFFF',
        };
      case 500:
        return {
          main: '#800080',
          edge: '#4B0082',
          accent: '#FFD700',
          text: '#FFFFFF',
        };
      default:
        return {
          main: '#FFD700',
          edge: '#DAA520',
          accent: '#8B4513',
          text: '#000000',
        };
    }
  };

  const colors = getChipColors(value);

  return `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="chipGradient${value}" cx="40%" cy="40%" r="60%">
                <stop offset="0%" style="stop-color:${colors.main};stop-opacity:1" />
                <stop offset="70%" style="stop-color:${colors.main};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${colors.edge};stop-opacity:1" />
            </radialGradient>
        </defs>
        
        <!-- Main chip circle -->
        <circle cx="150" cy="150" r="140" fill="url(#chipGradient${value})" stroke="${colors.edge}" stroke-width="8"/>
        
        <!-- Decorative rings -->
        <circle cx="150" cy="150" r="120" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="8,4" opacity="0.7"/>
        <circle cx="150" cy="150" r="105" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="8,4" opacity="0.5"/>
        <circle cx="150" cy="150" r="90" fill="none" stroke="${colors.accent}" stroke-width="2" stroke-dasharray="8,4" opacity="0.3"/>
        
        <!-- Center circle -->
        <circle cx="150" cy="150" r="50" fill="${colors.accent}" stroke="${colors.edge}" stroke-width="3"/>
        
        <!-- Value text -->
        <text x="150" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="${colors.text}">$${value}</text>
        
        <!-- Edge spots -->
        ${Array.from({ length: 16 }, (_, i) => {
          const angle = (i * Math.PI * 2) / 16;
          const x = 150 + Math.cos(angle) * 132;
          const y = 150 + Math.sin(angle) * 132;
          return `<circle cx="${x}" cy="${y}" r="3" fill="${colors.accent}"/>`;
        }).join('')}
    </svg>`;
}

// Generate all chip SVGs
const chipValues = [1, 5, 25, 100]; // Only the denominations used in the game
const outputDir = path.join(__dirname, '../../public/chips');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

chipValues.forEach((value) => {
  const svg = createChipSVG(value);
  const filename = path.join(outputDir, `chip-${value}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`Created ${filename}`);
});

console.log('All chip SVG files created!');
