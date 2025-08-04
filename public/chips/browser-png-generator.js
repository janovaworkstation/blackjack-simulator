
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
