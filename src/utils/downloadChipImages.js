// Download realistic casino chip PNG images
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality casino chip image URLs (we'll use placeholder URLs for now and create local images)
const chipImageData = {
  1: {
    color: '#FFFFFF',
    edgeColor: '#E0E0E0',
    accentColor: '#0066CC',
    textColor: '#000000',
    name: 'WHITE',
  },
  5: {
    color: '#DC143C',
    edgeColor: '#8B0000',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
    name: 'RED',
  },
  25: {
    color: '#228B22',
    edgeColor: '#006400',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
    name: 'GREEN',
  },
  100: {
    color: '#1C1C1C',
    edgeColor: '#000000',
    accentColor: '#FFD700',
    textColor: '#FFFFFF',
    name: 'BLACK',
  },
};

// Create high-quality PNG data URLs for casino chips
function _createChipPNG(value, size = 512) {
  const config = chipImageData[value];
  if (!config) return null;

  // Create a data URL for a realistic chip design
  // This generates a base64 PNG that can be used directly
  const canvas = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="chipGradient${value}" cx="30%" cy="30%" r="70%">
        <stop offset="0%" style="stop-color:${config.color};stop-opacity:1" />
        <stop offset="70%" style="stop-color:${config.color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${config.edgeColor};stop-opacity:1" />
      </radialGradient>
      <radialGradient id="centerGradient${value}" cx="40%" cy="40%" r="60%">
        <stop offset="0%" style="stop-color:${config.accentColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${config.edgeColor};stop-opacity:1" />
      </radialGradient>
      <filter id="shadow${value}" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="4" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.5)" />
      </filter>
    </defs>
    
    <!-- Main chip body -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.45}" 
            fill="url(#chipGradient${value})" 
            stroke="${config.edgeColor}" 
            stroke-width="${size * 0.02}"
            filter="url(#shadow${value})" />
    
    <!-- Edge pattern -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.42}" 
            fill="none" 
            stroke="${config.accentColor}" 
            stroke-width="3" 
            stroke-dasharray="15,5" 
            opacity="0.8" />
    
    <!-- Center medallion -->
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.25}" 
            fill="url(#centerGradient${value})" 
            stroke="${config.edgeColor}" 
            stroke-width="2" />
    
    <!-- Value text -->
    <text x="${size / 2}" y="${size / 2 + size * 0.05}" 
          text-anchor="middle" 
          font-family="Arial Black, sans-serif" 
          font-size="${size * 0.12}" 
          font-weight="900" 
          fill="${config.textColor}">$${value}</text>
    
    <!-- Casino text -->
    <text x="${size / 2}" y="${size / 2 + size * 0.15}" 
          text-anchor="middle" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.04}" 
          font-weight="bold" 
          fill="${config.textColor}"
          opacity="0.9">CASINO</text>
    
    <!-- Chip name -->
    <text x="${size / 2}" y="${size / 2 - size * 0.12}" 
          text-anchor="middle" 
          font-family="Arial, sans-serif" 
          font-size="${size * 0.035}" 
          font-weight="bold" 
          fill="${config.textColor}"
          opacity="0.8">${config.name}</text>
    
    <!-- Edge spots -->
    ${Array.from({ length: 24 }, (_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const spotRadius = size * 0.4;
      const x = size / 2 + Math.cos(angle) * spotRadius;
      const y = size / 2 + Math.sin(angle) * spotRadius;
      return i % 2 === 0
        ? `<circle cx="${x}" cy="${y}" r="3" fill="${config.accentColor}" opacity="0.9"/>`
        : '';
    }).join('')}
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(canvas)}`;
}

// Function to create actual PNG files using the HTML Canvas API
function generateChipPNGFiles() {
  const outputDir = path.join(__dirname, '../../public/chips');

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Generate Casino Chip PNGs</title>
</head>
<body>
    <h1>Generating Casino Chip PNG Files...</h1>
    <div id="chips"></div>
    
    <script>
        const chipConfigs = ${JSON.stringify(chipImageData)};
        const outputDir = '${outputDir}';
        
        function createRealisticChip(value, size = 512) {
            const config = chipConfigs[value];
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            
            const centerX = size / 2;
            const centerY = size / 2;
            const radius = size * 0.45;
            
            // Create main chip gradient
            const gradient = ctx.createRadialGradient(
                centerX - radius * 0.3, centerY - radius * 0.3, 0,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, config.color);
            gradient.addColorStop(0.7, config.color);
            gradient.addColorStop(1, config.edgeColor);
            
            // Draw main chip body with shadow
            ctx.save();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
            
            // Edge ring
            ctx.strokeStyle = config.edgeColor;
            ctx.lineWidth = size * 0.02;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - size * 0.01, 0, 2 * Math.PI);
            ctx.stroke();
            
            // Decorative pattern ring
            ctx.strokeStyle = config.accentColor;
            ctx.lineWidth = 3;
            ctx.setLineDash([15, 5]);
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius - size * 0.03, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            
            // Center medallion
            const centerRadius = size * 0.25;
            const centerGradient = ctx.createRadialGradient(
                centerX - centerRadius * 0.3, centerY - centerRadius * 0.3, 0,
                centerX, centerY, centerRadius
            );
            centerGradient.addColorStop(0, config.accentColor);
            centerGradient.addColorStop(1, config.edgeColor);
            
            ctx.fillStyle = centerGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.strokeStyle = config.edgeColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
            ctx.stroke();
            
            // Main value text
            ctx.fillStyle = config.textColor;
            ctx.font = \`900 \${size * 0.12}px Arial Black\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$' + value, centerX, centerY + size * 0.02);
            
            // Casino text
            ctx.font = \`bold \${size * 0.04}px Arial\`;
            ctx.globalAlpha = 0.9;
            ctx.fillText('CASINO', centerX, centerY + size * 0.15);
            ctx.globalAlpha = 1;
            
            // Chip name
            ctx.font = \`bold \${size * 0.035}px Arial\`;
            ctx.globalAlpha = 0.8;
            ctx.fillText(config.name, centerX, centerY - size * 0.12);
            ctx.globalAlpha = 1;
            
            // Edge spots
            ctx.fillStyle = config.accentColor;
            ctx.globalAlpha = 0.9;
            for (let i = 0; i < 24; i++) {
                if (i % 2 === 0) {
                    const angle = (i * 15) * Math.PI / 180;
                    const spotRadius = size * 0.4;
                    const x = centerX + Math.cos(angle) * spotRadius;
                    const y = centerY + Math.sin(angle) * spotRadius;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
            ctx.globalAlpha = 1;
            
            return canvas.toDataURL('image/png');
        }
        
        // Generate and download all chips
        [1, 5, 25, 100].forEach(value => {
            const dataUrl = createRealisticChip(value, 512);
            const link = document.createElement('a');
            link.download = \`chip-\${value}.png\`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Also display preview
            const img = document.createElement('img');
            img.src = dataUrl;
            img.width = 150;
            img.style.margin = '10px';
            img.title = \`$\${value} Chip\`;
            document.getElementById('chips').appendChild(img);
        });
        
        document.body.innerHTML += '<h2>✅ All chip PNG files generated and downloaded!</h2>';
    </script>
</body>
</html>`;

  const htmlFile = path.join(outputDir, 'generate-png-chips.html');
  fs.writeFileSync(htmlFile, htmlContent);
  console.log(`📁 Created chip PNG generator: ${htmlFile}`);
  console.log(`🔗 Open this file in a browser to download PNG chips`);
}

// Generate the HTML file that will create PNG chips
generateChipPNGFiles();

console.log('🎰 Chip PNG generator created!');
console.log(
  '📂 Open public/chips/generate-png-chips.html in a browser to download PNG files',
);
