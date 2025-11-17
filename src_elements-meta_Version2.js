// src/elements-meta.js
// Exports SYMBOLS (118 element symbols), RECIPES, and a deterministic sprite generator.
// Sprites are 64x64 data URLs generated on the fly.

export const SYMBOLS = [
  "H","He","Li","Be","B","C","N","O","F","Ne",
  "Na","Mg","Al","Si","P","S","Cl","Ar","K","Ca",
  "Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn",
  "Ga","Ge","As","Se","Br","Kr","Rb","Sr","Y","Zr",
  "Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn",
  "Sb","Te","I","Xe","Cs","Ba","La","Ce","Pr","Nd",
  "Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb",
  "Lu","Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg",
  "Tl","Pb","Bi","Po","At","Rn","Fr","Ra","Ac","Th",
  "Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm",
  "Md","No","Lr","Rf","Db","Sg","Bh","Hs","Mt","Ds",
  "Rg","Cn","Nh","Fl","Mc","Lv","Ts","Og"
];

// Example recipes. You can extend this array.
// Each recipe: { id, requires: {SYM:count,...}, result: 'RESULT_SYMBOL', combineRadius }
export const RECIPES = [
  { id: 'water', requires: { H: 2, O: 1 }, result: 'H2O', combineRadius: 80 },
  { id: 'rust', requires: { Fe: 1, O: 1 }, result: 'FeO_rust', combineRadius: 80 }
];

// Deterministic hash helper from string -> number
function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

// Map a symbol to a color palette (HSL) deterministically
function paletteForSymbol(sym) {
  const h = (hashString(sym) % 360);
  const s = 55 + (hashString(sym + 's') % 30);
  const l = 40 + (hashString(sym + 'l') % 30);
  return `hsl(${h} ${s}% ${l}%)`;
}

// Draw a pixel-art style sprite into a canvas (64x64) and return dataURL
export function generateSpriteDataURL(symbol) {
  const canvas = document.createElement('canvas');
  const size = 64;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // background tile/base
  ctx.clearRect(0,0,size,size);

  // select base color
  const base = paletteForSymbol(symbol);
  // subtle background vignette
  const g = ctx.createLinearGradient(0,0,0,size);
  g.addColorStop(0, shadeColor(base, 12));
  g.addColorStop(1, shadeColor(base, -8));
  roundRect(ctx, 4, 4, size-8, size-8, 8, true, false);

  // draw a symbol-specific emblem or icon
  const sym = symbol.replace(/[0-9_]/g,''); // base letters to decide icon

  // special cases for visuals
  if (symbol === 'Au') {
    drawGoldBar(ctx, size);
  } else if (symbol === 'Ag') {
    drawMetalIngot(ctx, size, '#cfcfcf', '#9ea3a6');
  } else if (symbol === 'Fe') {
    drawMetalIngot(ctx, size, '#b0bcc6', '#6f7a82');
  } else if (symbol === 'H') {
    drawProtonSphere(ctx, size, '#dff4ff');
  } else if (symbol === 'O') {
    drawOxygenOrb(ctx, size);
  } else if (symbol === 'C') {
    drawCarbonCluster(ctx, size);
  } else if (symbol === 'H2O') {
    drawWaterDroplet(ctx, size);
  } else if (symbol === 'FeO_rust') {
    drawRustyIron(ctx, size);
  } else {
    // default: badge with symbol letters
    drawElementBadge(ctx, size, symbol);
  }

  return canvas.toDataURL('image/png');
}

// Helper: draw rounded rect
function roundRect(ctx, x, y, w, h, r, fill=true, stroke=true) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

// Shade color function (simple HSL adjustments)
function shadeColor(hsl, deltaL) {
  // hsl string like "hsl(H S% L%)"
  const m = hsl.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
  if (!m) return hsl;
  const h = +m[1], s = +m[2], l = Math.max(0, Math.min(100, +m[3] + deltaL));
  return `hsl(${h} ${s}% ${l}%)`;
}

// Draw an element badge with symbol text
function drawElementBadge(ctx, size, symbol) {
  // subtle border
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#000';
  roundRect(ctx, 6, 6, size-12, size-12, 8, true, false);
  ctx.globalAlpha = 1;

  // inner tile using palette color
  ctx.fillStyle = paletteForSymbol(symbol);
  roundRect(ctx, 8, 8, size-16, size-16, 6, true, false);

  // symbol letters
  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(symbol, size/2, size/2 - 4);

  // small atomic-style circle emblem
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.arc(size - 16, 16, 8, 0, Math.PI*2);
  ctx.fill();
}

// Gold bar icon
function drawGoldBar(ctx, size) {
  const cx = size/2, cy = size/2 + 6;
  // gold gradient
  const g = ctx.createLinearGradient(cx-30, cy-20, cx+30, cy+20);
  g.addColorStop(0, '#d9b300');
  g.addColorStop(0.5, '#ffd54d');
  g.addColorStop(1, '#c69200');
  ctx.fillStyle = g;
  ctx.save();
  ctx.translate(cx, cy);
  roundRect(ctx, -36, -16, 72, 32, 6, true, false);
  ctx.restore();

  // rim highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 2;
  ctx.strokeRect(cx-36, cy-16, 72, 32);
}

// simple metal ingot (used by Ag, Fe)
function drawMetalIngot(ctx, size, light, dark) {
  const cx = size/2, cy = size/2 + 8;
  const g = ctx.createLinearGradient(cx-28, cy-12, cx+28, cy+12);
  g.addColorStop(0, light);
  g.addColorStop(1, dark);
  ctx.fillStyle = g;
  roundRect(ctx, cx-34, cy-18, 68, 36, 6, true, false);

  // scratches
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx-20, cy-2);
  ctx.lineTo(cx+14, cy+6);
  ctx.stroke();
}

// proton sphere for H
function drawProtonSphere(ctx, size, color) {
  const cx = size/2, cy = size/2;
  const r = 20;
  const g = ctx.createRadialGradient(cx-6, cy-6, r*0.2, cx, cy, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.3, color);
  g.addColorStop(1, shadeColor(color, -18));
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.stroke();
}

// oxygen orb
function drawOxygenOrb(ctx, size) {
  const cx = size/2, cy = size/2;
  const r = 22;
  const g = ctx.createRadialGradient(cx-8, cy-8, 4, cx, cy, r);
  g.addColorStop(0, '#bfe9ff');
  g.addColorStop(0.6, '#66c7ff');
  g.addColorStop(1, '#1e7fbf');
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill();

  // inner glow
  ctx.fillStyle = 'rgba(255,255,255,0.12)';
  ctx.beginPath(); ctx.ellipse(cx-6, cy-8, 8, 5, 0, 0, Math.PI*2); ctx.fill();
}

// carbon cluster
function drawCarbonCluster(ctx, size) {
  const cx = size/2, cy = size/2;
  ctx.fillStyle = '#1b1b1b';
  // main cluster
  ctx.beginPath();
  ctx.ellipse(cx, cy, 18, 12, 0, 0, Math.PI*2);
  ctx.fill();
  // highlights
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath(); ctx.arc(cx-6, cy-4, 6, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx+6, cy+2, 4, 0, Math.PI*2); ctx.fill();
}

// water droplet for H2O
function drawWaterDroplet(ctx, size) {
  const cx = size/2, cy = size/2 + 2;
  ctx.fillStyle = '#2aa3ff';
  ctx.beginPath();
  ctx.moveTo(cx, cy-22);
  ctx.quadraticCurveTo(cx+20, cy-4, cx, cy+22);
  ctx.quadraticCurveTo(cx-20, cy-4, cx, cy-22);
  ctx.closePath();
  const g = ctx.createLinearGradient(cx, cy-22, cx, cy+22);
  g.addColorStop(0, '#86ddff');
  g.addColorStop(0.5, '#2aa3ff');
  g.addColorStop(1, '#0a6fb1');
  ctx.fillStyle = g;
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.22)';
  ctx.beginPath();
  ctx.ellipse(cx-6, cy-12, 8, 4, -0.6, 0, Math.PI*2);
  ctx.fill();
}

// rusty iron result
function drawRustyIron(ctx, size) {
  const cx = size/2, cy = size/2+6;
  // base metal
  ctx.fillStyle = '#7b8b92';
  roundRect(ctx, cx-30, cy-18, 60, 36, 6, true, false);

  // rust splotches
  const rustColors = ['#a64b1a','#d07a34','#8b3b10'];
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = rustColors[i % rustColors.length];
    const rx = cx - 22 + Math.random()*44;
    const ry = cy - 12 + Math.random()*24;
    const rw = 6 + Math.random()*16;
    const rh = 4 + Math.random()*12;
    ctx.beginPath(); ctx.ellipse(rx, ry, rw, rh, Math.random()*Math.PI, 0, Math.PI*2); ctx.fill();
  }

  // small scratches
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(cx-18, cy+6); ctx.lineTo(cx+18, cy-2); ctx.stroke();
}

// Public helper: get or generate sprite for a symbol
export function getSpriteDataURL(symbol) {
  // For well-known composite names (like H2O) we may want specific visuals
  if (symbol === 'H2O') return generateSpriteDataURL('H2O');
  if (symbol === 'FeO_rust') return generateSpriteDataURL('FeO_rust');
  // default: if symbol is a base element, create that sprite
  return generateSpriteDataURL(symbol);
}