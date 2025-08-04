// Utility to create realistic poker chip images
export function createChipImage(value: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 140;

  // Chip colors based on standard casino denominations
  const getChipColors = (value: number) => {
    switch (value) {
      case 1: return { 
        main: '#F8F8FF', 
        edge: '#E0E0E0', 
        accent: '#4169E1',
        text: '#000000'
      }; // White - $1
      case 5: return { 
        main: '#DC143C', 
        edge: '#8B0000', 
        accent: '#FFD700',
        text: '#FFFFFF'
      }; // Red - $5
      case 25: return { 
        main: '#228B22', 
        edge: '#006400', 
        accent: '#FFD700',
        text: '#FFFFFF'
      }; // Green - $25
      case 100: return { 
        main: '#2F2F2F', 
        edge: '#000000', 
        accent: '#FFD700',
        text: '#FFFFFF'
      }; // Black - $100
      case 500: return { 
        main: '#800080', 
        edge: '#4B0082', 
        accent: '#FFD700',
        text: '#FFFFFF'
      }; // Purple - $500
      default: return { 
        main: '#FFD700', 
        edge: '#DAA520', 
        accent: '#8B4513',
        text: '#000000'
      }; // Gold - other
    }
  };

  const colors = getChipColors(value);

  // Main chip circle
  const gradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 0, centerX, centerY, radius);
  gradient.addColorStop(0, colors.main);
  gradient.addColorStop(0.7, colors.main);
  gradient.addColorStop(1, colors.edge);
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Outer edge ring
  ctx.strokeStyle = colors.edge;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 4, 0, 2 * Math.PI);
  ctx.stroke();

  // Inner decorative rings
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 20 - (i * 15), 0, 2 * Math.PI);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  // Center circle for denomination
  ctx.fillStyle = colors.accent;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
  ctx.fill();

  ctx.strokeStyle = colors.edge;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
  ctx.stroke();

  // Value text in center
  ctx.fillStyle = colors.text;
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('$' + value, centerX, centerY);

  // Smaller denomination text around the edge
  ctx.fillStyle = colors.accent;
  ctx.font = 'bold 16px Arial';
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const x = centerX + Math.cos(angle) * (radius - 30);
    const y = centerY + Math.sin(angle) * (radius - 30);
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText('$' + value, 0, 0);
    ctx.restore();
  }

  // Casino-style edge spots (alternating pattern)
  ctx.fillStyle = colors.accent;
  for (let i = 0; i < 32; i++) {
    if (i % 2 === 0) {
      const angle = (i * Math.PI * 2) / 32;
      const x = centerX + Math.cos(angle) * (radius - 8);
      const y = centerY + Math.sin(angle) * (radius - 8);
      
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Add subtle shadow/depth effect
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;

  return canvas.toDataURL('image/png');
}

// Create and save all chip images
export function generateAllChipImages(): { [key: number]: string } {
  const chipValues = [1, 5, 25, 100, 500];
  const chipImages: { [key: number]: string } = {};
  
  chipValues.forEach(value => {
    chipImages[value] = createChipImage(value);
  });
  
  return chipImages;
}

// Function to download chip images (for development use)
export function downloadChipImages() {
  const chipValues = [1, 5, 25, 100, 500];
  
  chipValues.forEach(value => {
    const dataUrl = createChipImage(value);
    const link = document.createElement('a');
    link.download = `chip-${value}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}