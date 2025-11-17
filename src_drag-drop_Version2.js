// src/drag-drop.js - drag/drop and combiner using the procedural sprites
import { SYMBOLS, RECIPES, getSpriteDataURL } from './elements-meta.js';

const palette = document.getElementById('palette');
const main = document.getElementById('main');

let dropped = []; // {id, symbol, x, y, el, w, h}

function uid(prefix='id') { return prefix + '_' + Math.random().toString(36).slice(2,9); }

// Build palette (all elements)
function buildPalette() {
  for (const sym of SYMBOLS) {
    const tile = document.createElement('div');
    tile.className = 'elem-tile';
    tile.dataset.symbol = sym;
    const img = document.createElement('img');
    img.src = getSpriteDataURL(sym);
    img.width = 64; img.height = 64;
    img.alt = sym;
    img.draggable = false;
    tile.appendChild(img);
    tile.setAttribute('draggable','true');
    tile.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', sym);
      // set drag image for UX
      const crt = tile.cloneNode(true);
      crt.style.position = 'absolute';
      crt.style.top = '-1000px';
      document.body.appendChild(crt);
      e.dataTransfer.setDragImage(crt, 32, 32);
      setTimeout(()=> document.body.removeChild(crt), 0);
    });
    palette.appendChild(tile);
  }
}

// allow drop
main.addEventListener('dragover', e => { e.preventDefault(); });

// drop handler
main.addEventListener('drop', e => {
  e.preventDefault();
  const sym = e.dataTransfer.getData('text/plain');
  if (!sym) return;
  const rect = main.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  spawnSprite(sym, x, y);
  checkCombinesAround({x, y});
});

// create dropped sprite element (image) and add pointer drag
function spawnSprite(symbol, x, y) {
  const id = uid('drop');
  const container = document.createElement('div');
  container.className = 'dropped';
  container.dataset.id = id;
  container.dataset.symbol = symbol;
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  const img = document.createElement('img');
  img.src = getSpriteDataURL(symbol);
  img.width = 64; img.height = 64;
  img.alt = symbol;
  container.appendChild(img);
  main.appendChild(container);

  const item = { id, symbol, x, y, el: container, w: 64, h: 64 };
  dropped.push(item);
  enablePointerDrag(container, item);
  return id;
}

// pointer drag support within main
function enablePointerDrag(node, item) {
  let dragging = false;
  let lastX = 0, lastY = 0;
  node.addEventListener('pointerdown', e => {
    e.preventDefault();
    node.setPointerCapture(e.pointerId);
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    node.style.zIndex = 100;
  });
  window.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    item.x += dx; item.y += dy;
    node.style.left = `${item.x}px`;
    node.style.top = `${item.y}px`;
  });
  window.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    try { node.releasePointerCapture && node.releasePointerCapture(e.pointerId); } catch (_) {}
    node.style.zIndex = 10;
    checkCombinesAround(item);
  });
}

// combine check: find nearby items and attempt recipes
function checkCombinesAround(pointLike) {
  const x = pointLike.x, y = pointLike.y;
  for (const recipe of RECIPES) {
    const radius = recipe.combineRadius || 80;
    // cluster within radius
    const cluster = dropped.filter(it => {
      const dx = it.x - x, dy = it.y - y;
      return Math.hypot(dx,dy) <= radius;
    });

    // count symbols in cluster
    const counts = {};
    for (const it of cluster) counts[it.symbol] = (counts[it.symbol]||0) + 1;

    // verify requirements
    let ok = true;
    for (const [sym, need] of Object.entries(recipe.requires)) {
      if ((counts[sym] || 0) < need) { ok = false; break; }
    }
    if (!ok) continue;

    // pick the nearest items for each required symbol
    const toConsume = [];
    for (const [sym, need] of Object.entries(recipe.requires)) {
      const avail = cluster.filter(it => it.symbol === sym)
        .sort((a,b) => Math.hypot(a.x-x,a.y-y) - Math.hypot(b.x-x,b.y-y));
      for (let i=0;i<need;i++) toConsume.push(avail[i]);
    }

    // unique items
    const unique = Array.from(new Set(toConsume.map(t=>t.id))).map(id => toConsume.find(t=>t.id===id));

    // centroid
    const centroid = unique.reduce((acc,it,idx,arr)=> {
      acc.x += it.x; acc.y += it.y;
      if (idx === arr.length -1) { acc.x /= arr.length; acc.y /= arr.length; }
      return acc;
    }, {x:0,y:0});

    // remove consumed items DOM & data
    for (const it of unique) {
      if (it.el && it.el.parentNode) it.el.parentNode.removeChild(it.el);
      dropped = dropped.filter(d => d.id !== it.id);
    }

    // spawn result
    spawnSprite(recipe.result, centroid.x || x, centroid.y || y);

    // animate a little (scale)
    const res = dropped[dropped.length-1];
    if (res && res.el) {
      res.el.style.transition = 'transform 160ms ease';
      res.el.style.transform = 'translate(-50%,-50%) scale(0.6)';
      requestAnimationFrame(()=> res.el.style.transform = 'translate(-50%,-50%) scale(1)');
    }

    // leave after one recipe fires
    break;
  }
}

// initialize
buildPalette();

// helper: allow adding recipes at runtime
window.__TABELAQUIMICA = {
  spawn: (s,x,y) => spawnSprite(s, x || 200, y || 200),
  addRecipe: r => RECIPES.push(r)
};