// Utility to create sample card images for testing
export function createCardImage(rank: string, suit: string, faceUp: boolean = true): string {
  const canvas = document.createElement('canvas');
  canvas.width = 250;
  canvas.height = 350;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  if (!faceUp) {
    // Card back
    ctx.fillStyle = '#1a472a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
    
    // Pattern
    ctx.fillStyle = '#2d5a2d';
    for (let x = 20; x < canvas.width - 20; x += 30) {
      for (let y = 20; y < canvas.height - 20; y += 30) {
        ctx.fillRect(x, y, 15, 15);
      }
    }
  } else {
    // Card face
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);
    
    const isRed = suit === 'Hearts' || suit === 'Diamonds';
    const color = isRed ? '#DC143C' : '#000000';
    ctx.fillStyle = color;
    
    const suitSymbols: { [key: string]: string } = {
      'Hearts': '♥',
      'Diamonds': '♦', 
      'Clubs': '♣',
      'Spades': '♠'
    };
    
    const symbol = suitSymbols[suit] || '♠';
    
    // Much larger top-left rank
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(rank, 15, 55);
    
    // Top-left suit symbol (larger)
    ctx.font = 'bold 36px Arial';
    ctx.fillText(symbol, 15, 95);
    
    // Create card-specific layouts based on rank
    if (rank === 'A') {
      // Ace: One large center symbol
      ctx.font = 'bold 120px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(symbol, canvas.width / 2, canvas.height / 2 + 30);
    } else if (['J', 'Q', 'K'].includes(rank)) {
      // Face cards: Large rank letter in center
      ctx.font = 'bold 100px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(rank, canvas.width / 2, canvas.height / 2 + 25);
      
      // Smaller suit symbols around
      ctx.font = 'bold 40px Arial';
      ctx.fillText(symbol, canvas.width / 2, 120);
      ctx.fillText(symbol, canvas.width / 2, canvas.height - 40);
    } else {
      // Number cards: Multiple suit symbols arranged by value
      const num = parseInt(rank);
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'center';
      
      if (num <= 3) {
        // Simple vertical line
        for (let i = 0; i < num; i++) {
          ctx.fillText(symbol, canvas.width / 2, 120 + i * 60);
        }
      } else if (num <= 6) {
        // Two columns
        for (let i = 0; i < Math.ceil(num / 2); i++) {
          ctx.fillText(symbol, canvas.width / 2 - 40, 120 + i * 50);
          if (i < Math.floor(num / 2)) {
            ctx.fillText(symbol, canvas.width / 2 + 40, 120 + i * 50);
          }
        }
      } else if (num <= 10) {
        // More complex arrangements for 7-10
        const positions = [
          [canvas.width / 2 - 40, 110],
          [canvas.width / 2 + 40, 110],
          [canvas.width / 2 - 40, 160],
          [canvas.width / 2 + 40, 160],
          [canvas.width / 2, 135],
          [canvas.width / 2 - 40, 210],
          [canvas.width / 2 + 40, 210],
          [canvas.width / 2, 185],
          [canvas.width / 2 - 40, 260],
          [canvas.width / 2 + 40, 260]
        ];
        
        for (let i = 0; i < Math.min(num, 10); i++) {
          ctx.fillText(symbol, positions[i][0], positions[i][1]);
        }
      }
    }
    
    // Much larger bottom-right (rotated)
    ctx.save();
    ctx.translate(canvas.width - 15, canvas.height - 15);
    ctx.rotate(Math.PI);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(rank, 0, 55);
    ctx.font = 'bold 36px Arial';
    ctx.fillText(symbol, 0, 95);
    ctx.restore();
  }
  
  return canvas.toDataURL('image/png');
}