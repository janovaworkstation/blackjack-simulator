
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
