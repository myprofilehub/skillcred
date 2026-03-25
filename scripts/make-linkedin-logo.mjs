import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function drawFourPointStar(ctx, cx, cy, outerR, innerR) {
  // Draws a 4-pointed star centered at (cx, cy)
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI / 4) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawSmallStar(ctx, cx, cy, outerR, innerR) {
  drawFourPointStar(ctx, cx, cy, outerR, innerR);
}

async function createLinkedInLogo() {
  const size = 800; // High res for crisp output
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 370;

  // Circle gradient background
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
  gradient.addColorStop(0, '#312e81');
  gradient.addColorStop(1, '#1e1b4b');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Purple border
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 5;
  ctx.stroke();

  // --- Draw the SkillCred star icon using vector paths ---
  ctx.strokeStyle = '#7c7cf8';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Main 4-pointed star (center, slightly left and down from true center to match original layout)
  const starCX = centerX - 15;
  const starCY = centerY + 10;

  // Draw main 4-pointed star as smooth curves (like the original)
  // The SkillCred star is a 4-pointed star with curved sides
  const outerLen = 110;
  const innerLen = 30;

  ctx.beginPath();
  // Top point
  ctx.moveTo(starCX, starCY - outerLen);
  // Right curve to right point
  ctx.bezierCurveTo(
    starCX + innerLen, starCY - innerLen,
    starCX + innerLen, starCY - innerLen,
    starCX + outerLen, starCY
  );
  // Bottom curve to bottom point
  ctx.bezierCurveTo(
    starCX + innerLen, starCY + innerLen,
    starCX + innerLen, starCY + innerLen,
    starCX, starCY + outerLen
  );
  // Left curve to left point
  ctx.bezierCurveTo(
    starCX - innerLen, starCY + innerLen,
    starCX - innerLen, starCY + innerLen,
    starCX - outerLen, starCY
  );
  // Top curve back to top point
  ctx.bezierCurveTo(
    starCX - innerLen, starCY - innerLen,
    starCX - innerLen, starCY - innerLen,
    starCX, starCY - outerLen
  );

  ctx.stroke();

  // Small sparkle star (top-right of main star) — like a small + shape
  const sparkX = starCX + 100;
  const sparkY = starCY - 85;
  const sparkOuter = 28;
  const sparkInner = 6;

  ctx.beginPath();
  ctx.moveTo(sparkX, sparkY - sparkOuter);
  ctx.bezierCurveTo(sparkX + sparkInner, sparkY - sparkInner, sparkX + sparkInner, sparkY - sparkInner, sparkX + sparkOuter, sparkY);
  ctx.bezierCurveTo(sparkX + sparkInner, sparkY + sparkInner, sparkX + sparkInner, sparkY + sparkInner, sparkX, sparkY + sparkOuter);
  ctx.bezierCurveTo(sparkX - sparkInner, sparkY + sparkInner, sparkX - sparkInner, sparkY + sparkInner, sparkX - sparkOuter, sparkY);
  ctx.bezierCurveTo(sparkX - sparkInner, sparkY - sparkInner, sparkX - sparkInner, sparkY - sparkInner, sparkX, sparkY - sparkOuter);
  ctx.stroke();

  // Small circle (bottom-left of main star)
  const circX = starCX - 85;
  const circY = starCY + 75;
  const circR = 16;

  ctx.beginPath();
  ctx.arc(circX, circY, circR, 0, Math.PI * 2);
  ctx.stroke();

  // Tiny dot inside the circle
  ctx.beginPath();
  ctx.arc(circX, circY, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#7c7cf8';
  ctx.fill();

  // Save high-res PNG
  const outputPath = path.join(projectRoot, 'public', 'skillcred-linkedin-profile.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`LinkedIn profile picture saved to: ${outputPath} (${size}x${size}px)`);
}

createLinkedInLogo().catch(console.error);
