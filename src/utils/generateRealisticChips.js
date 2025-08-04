// Generate realistic casino chip images using Canvas API
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced chip generation with realistic casino styling
function createRealisticChipDataURL(value, size = 512) {
    // This will be used in the browser environment
    // For now, create optimized SVG with much better styling
    
    const getChipConfig = (value) => {
        switch (value) {
            case 1: return {
                main: '#FEFEFE',
                edge: '#E0E0E0', 
                accent: '#1976D2',
                text: '#000000',
                secondary: '#F5F5F5',
                name: 'WHITE'
            };
            case 5: return {
                main: '#D32F2F',
                edge: '#B71C1C',
                accent: '#FFD700',
                text: '#FFFFFF', 
                secondary: '#F44336',
                name: 'RED'
            };
            case 25: return {
                main: '#388E3C',
                edge: '#1B5E20',
                accent: '#FFD700',
                text: '#FFFFFF',
                secondary: '#4CAF50', 
                name: 'GREEN'
            };
            case 100: return {
                main: '#424242',
                edge: '#212121',
                accent: '#FFD700',
                text: '#FFFFFF',
                secondary: '#616161',
                name: 'BLACK'
            };
            default: return {
                main: '#FF8F00',
                edge: '#E65100',
                accent: '#1976D2',
                text: '#000000',
                secondary: '#FFA726',
                name: 'GOLD'
            };
        }
    };

    const config = getChipConfig(value);
    const radius = size * 0.45;
    const center = size / 2;

    return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <!-- Main chip gradient -->
            <radialGradient id="chipGradient${value}" cx="35%" cy="35%" r="65%">
                <stop offset="0%" style="stop-color:${config.secondary};stop-opacity:1" />
                <stop offset="40%" style="stop-color:${config.main};stop-opacity:1" />
                <stop offset="80%" style="stop-color:${config.main};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${config.edge};stop-opacity:1" />
            </radialGradient>
            
            <!-- Center medallion gradient -->
            <radialGradient id="centerGradient${value}" cx="30%" cy="30%" r="70%">
                <stop offset="0%" style="stop-color:${config.accent};stop-opacity:1" />
                <stop offset="70%" style="stop-color:${config.accent};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${config.edge};stop-opacity:1" />
            </radialGradient>
            
            <!-- Drop shadow filter -->
            <filter id="dropShadow${value}" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="3" dy="3" stdDeviation="8" flood-color="rgba(0,0,0,0.4)" />
            </filter>
            
            <!-- Inner highlight -->
            <radialGradient id="highlight${value}" cx="25%" cy="25%" r="50%">
                <stop offset="0%" style="stop-color:rgba(255,255,255,0.4);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:0" />
            </radialGradient>
        </defs>
        
        <!-- Main chip body with shadow -->
        <circle cx="${center}" cy="${center}" r="${radius}" 
                fill="url(#chipGradient${value})" 
                filter="url(#dropShadow${value})"
                stroke="${config.edge}" 
                stroke-width="${radius * 0.08}" />
        
        <!-- Outer decorative ring -->
        <circle cx="${center}" cy="${center}" r="${radius * 0.85}" 
                fill="none" 
                stroke="${config.accent}" 
                stroke-width="${radius * 0.03}" 
                stroke-dasharray="${radius * 0.1},${radius * 0.05}" 
                opacity="0.8" />
        
        <!-- Inner pattern ring -->
        <circle cx="${center}" cy="${center}" r="${radius * 0.7}" 
                fill="none" 
                stroke="${config.accent}" 
                stroke-width="2" 
                stroke-dasharray="8,4" 
                opacity="0.6" />
        
        <!-- Center medallion -->
        <circle cx="${center}" cy="${center}" r="${radius * 0.4}" 
                fill="url(#centerGradient${value})" 
                stroke="${config.edge}" 
                stroke-width="3" />
        
        <!-- Main denomination text -->
        <text x="${center}" y="${center + radius * 0.08}" 
              text-anchor="middle" 
              font-family="Times New Roman, serif" 
              font-size="${radius * 0.25}" 
              font-weight="bold" 
              fill="${config.text}"
              stroke="${config.text === '#FFFFFF' ? config.edge : 'none'}"
              stroke-width="1">$${value}</text>
        
        <!-- Casino text -->
        <text x="${center}" y="${center + radius * 0.25}" 
              text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="${radius * 0.08}" 
              font-weight="normal" 
              fill="${config.text}"
              opacity="0.8">CASINO</text>
        
        <!-- Edge denomination markings -->
        ${Array.from({length: 8}, (_, i) => {
            const angle = (i * 45) - 90; // Start from top
            const textRadius = radius * 0.75;
            const x = center + Math.cos(angle * Math.PI / 180) * textRadius;
            const y = center + Math.sin(angle * Math.PI / 180) * textRadius;
            return `<text x="${x}" y="${y + radius * 0.03}" 
                         text-anchor="middle" 
                         font-family="Arial, sans-serif" 
                         font-size="${radius * 0.06}" 
                         font-weight="bold" 
                         fill="${config.accent}"
                         transform="rotate(${angle} ${x} ${y})">$${value}</text>`;
        }).join('')}
        
        <!-- Edge spots for authenticity -->
        ${Array.from({length: 32}, (_, i) => {
            if (i % 2 === 0) {
                const angle = (i * 11.25) * Math.PI / 180;
                const spotRadius = radius * 0.92;
                const x = center + Math.cos(angle) * spotRadius;
                const y = center + Math.sin(angle) * spotRadius;
                return `<circle cx="${x}" cy="${y}" r="2.5" fill="${config.accent}" opacity="0.8"/>`;
            }
            return '';
        }).join('')}
        
        <!-- Inner highlight for 3D effect -->
        <ellipse cx="${center - radius * 0.2}" cy="${center - radius * 0.2}" 
                 rx="${radius * 0.6}" ry="${radius * 0.4}" 
                 fill="url(#highlight${value})" 
                 opacity="0.3" />
        
        <!-- Color name on chip -->
        <text x="${center}" y="${center - radius * 0.25}" 
              text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="${radius * 0.06}" 
              font-weight="bold" 
              fill="${config.text}"
              opacity="0.7">${config.name}</text>
    </svg>`;
}

// Generate all chip SVGs with enhanced quality
const chipValues = [1, 5, 25, 100]; // Only the denominations used in the game
const outputDir = path.join(__dirname, '../../public/chips');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

chipValues.forEach(value => {
    const svg = createRealisticChipDataURL(value, 512);
    const filename = path.join(outputDir, `chip-${value}.svg`);
    fs.writeFileSync(filename, svg);
    console.log(`✅ Created realistic chip: ${filename}`);
});

console.log('🎰 All realistic casino chip SVGs created with professional styling!');