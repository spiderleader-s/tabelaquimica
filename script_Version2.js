// script.js
// Improved integration: full periodic table, drag/drop, 3D 64-bit viewer (three.js), pixel-art generator,
// rule-based compound creation (many combinations) and "garbage" fallback.

// ---------- Data: periodic table (118 elements) ----------
const elements = [
  { name: "Hidrogênio", symbol: "H", family: "Não metal", desc: "O mais leve dos elementos." },
  { name: "Hélio", symbol: "He", family: "Gás nobre", desc: "Gás inerte utilizado em balões." },
  { name: "Lítio", symbol: "Li", family: "Metal alcalino", desc: "Metal leve usado em baterias." },
  { name: "Berílio", symbol: "Be", family: "Alcalino-terroso", desc: "Metal usado em ligas especiais." },
  { name: "Boro", symbol: "B", family: "Metaloide", desc: "Usado em vidros e semicondutores." },
  { name: "Carbono", symbol: "C", family: "Não metal", desc: "Base da química orgânica." },
  { name: "Nitrogênio", symbol: "N", family: "Não metal", desc: "Componente principal do ar." },
  { name: "Oxigênio", symbol: "O", family: "Não metal", desc: "Essencial à respiração." },
  { name: "Flúor", symbol: "F", family: "Halogênio", desc: "Muito reativo, presente em compostos." },
  { name: "Neônio", symbol: "Ne", family: "Gás nobre", desc: "Gás de sinalização luminosa." },
  { name: "Sódio", symbol: "Na", family: "Metal alcalino", desc: "Componente do sal de cozinha." },
  { name: "Magnésio", symbol: "Mg", family: "Alcalino-terroso", desc: "Leve e resistente." },
  { name: "Alumínio", symbol: "Al", family: "Pós-transição", desc: "Metal leve e abundante." },
  { name: "Silício", symbol: "Si", family: "Metaloide", desc: "Base da indústria de semicondutores." },
  { name: "Fósforo", symbol: "P", family: "Não metal", desc: "Importante em fertilizantes." },
  { name: "Enxofre", symbol: "S", family: "Não metal", desc: "Usado em vulcanização e fertilizantes." },
  { name: "Cloro", symbol: "Cl", family: "Halogênio", desc: "Usado para desinfecção de água." },
  { name: "Argônio", symbol: "Ar", family: "Gás nobre", desc: "Utilizado em lâmpadas e atmosferas inertes." },
  { name: "Potássio", symbol: "K", family: "Metal alcalino", desc: "Essencial em processos biológicos." },
  { name: "Cálcio", symbol: "Ca", family: "Alcalino-terroso", desc: "Importante para ossos e ligas." },
  { name: "Escândio", symbol: "Sc", family: "Metais de transição", desc: "Usado em ligas de alta performance." },
  { name: "Titânio", symbol: "Ti", family: "Metais de transição", desc: "Leve, resistente à corrosão." },
  { name: "Vanádio", symbol: "V", family: "Metais de transição", desc: "Usado em aços especiais." },
  { name: "Cromo", symbol: "Cr", family: "Metais de transição", desc: "Usado em cromagem." },
  { name: "Manganês", symbol: "Mn", family: "Metais de transição", desc: "Usado em ligas de aço." },
  { name: "Ferro", symbol: "Fe", family: "Metais de transição", desc: "Base do aço e da indústria." },
  { name: "Cobalto", symbol: "Co", family: "Metais de transição", desc: "Usado em ímãs e ligas." },
  { name: "Níquel", symbol: "Ni", family: "Metais de transição", desc: "Resistente à corrosão." },
  { name: "Cobre", symbol: "Cu", family: "Metais de transição", desc: "Condutor elétrico." },
  { name: "Zinco", symbol: "Zn", family: "Pós-transição", desc: "Usado em galvanização." },
  { name: "Gálio", symbol: "Ga", family: "Pós-transição", desc: "Usado em semicondutores." },
  { name: "Germânio", symbol: "Ge", family: "Metaloide", desc: "Semicondutor histórico." },
  { name: "Arsênio", symbol: "As", family: "Metaloide", desc: "Tóxico; aparece em minerais." },
  { name: "Selênio", symbol: "Se", family: "Não metal", desc: "Usado em eletrônica e pigmentos." },
  { name: "Bromo", symbol: "Br", family: "Halogênio", desc: "Líquido volátil, reativo." },
  { name: "Criptônio", symbol: "Kr", family: "Gás nobre", desc: "Usado em iluminação." },
  { name: "Rubídio", symbol: "Rb", family: "Metal alcalino", desc: "Muito reativo." },
  { name: "Estrôncio", symbol: "Sr", family: "Alcalino-terroso", desc: "Usado em fogos de artifício." },
  { name: "Ítrio", symbol: "Y", family: "Metais de transição", desc: "Usado em LEDs e cerâmicas." },
  { name: "Zircônio", symbol: "Zr", family: "Metais de transição", desc: "Resistente à corrosão." },
  { name: "Nióbio", symbol: "Nb", family: "Metais de transição", desc: "Usado em supercondutores." },
  { name: "Molibdênio", symbol: "Mo", family: "Metais de transição", desc: "Melhora resist. de ligas." },
  { name: "Tecnécio", symbol: "Tc", family: "Metais de transição", desc: "Radioativo; usado em medicina." },
  { name: "Rutênio", symbol: "Ru", family: "Metais de transição", desc: "Usado em catalisadores." },
  { name: "Ródio", symbol: "Rh", family: "Metais de transição", desc: "Muito refletivo, usado em catalisadores." },
  { name: "Paládio", symbol: "Pd", family: "Metais de transição", desc: "Catalisador importante." },
  { name: "Prata", symbol: "Ag", family: "Metal nobre", desc: "Excelente condutor e valioso." },
  { name: "Cádmio", symbol: "Cd", family: "Pós-transição", desc: "Tóxico; usado em baterias antigas." },
  { name: "Índio", symbol: "In", family: "Pós-transição", desc: "Usado em telas sensíveis." },
  { name: "Estanho", symbol: "Sn", family: "Pós-transição", desc: "Usado em ligas e soldas." },
  { name: "Antimônio", symbol: "Sb", family: "Pós-transição", desc: "Usado em ligas e retardantes de chama." },
  { name: "Telúrio", symbol: "Te", family: "Metaloide", desc: "Relacionado ao selênio." },
  { name: "Iodo", symbol: "I", family: "Halogênio", desc: "Essencial em pequenas quantidades para a tireoide." },
  { name: "Xenônio", symbol: "Xe", family: "Gás nobre", desc: "Usado em lâmpadas e anestesia." },
  { name: "Césio", symbol: "Cs", family: "Metal alcalino", desc: "Muito reativo, usado em relógios atômicos." },
  { name: "Bário", symbol: "Ba", family: "Alcalino-terroso", desc: "Usado em raios-X de diagnóstico." },
  { name: "Lantânio", symbol: "La", family: "Lantanídeos", desc: "Parte das terras raras." },
  { name: "Cério", symbol: "Ce", family: "Lantanídeos", desc: "Usado em catalisadores e polidores." },
  { name: "Praseodímio", symbol: "Pr", family: "Lantanídeos", desc: "Usado em ímãs e ligas." },
  { name: "Neodímio", symbol: "Nd", family: "Lantanídeos", desc: "Usado em ímãs fortes." },
  { name: "Promécio", symbol: "Pm", family: "Lantanídeos", desc: "Radioativo; raro na natureza." },
  { name: "Samário", symbol: "Sm", family: "Lantanídeos", desc: "Usado em ímãs e lasers." },
  { name: "Európio", symbol: "Eu", family: "Lantanídeos", desc: "Usado em fósforos." },
  { name: "Gadolínio", symbol: "Gd", family: "Lantanídeos", desc: "Usado em imagiologia (contraste)." },
  { name: "Térbio", symbol: "Tb", family: "Lantanídeos", desc: "Usado em fósforos." },
  { name: "Disprósio", symbol: "Dy", family: "Lantanídeos", desc: "Usado em ímãs e lasers." },
  { name: "Hólmio", symbol: "Ho", family: "Lantanídeos", desc: "Usado em ligas e lasers." },
  { name: "Érbio", symbol: "Er", family: "Lantanídeos", desc: "Usado em fibras ópticas." },
  { name: "Túlio", symbol: "Tm", family: "Lantanídeos", desc: "Raro; usa em lasers." },
  { name: "Itérbio", symbol: "Yb", family: "Lantanídeos", desc: "Usado em ligas e tecnologia." },
  { name: "Lutécio", symbol: "Lu", family: "Lantanídeos", desc: "Metal pesado, raro." },
  { name: "Háfnio", symbol: "Hf", family: "Metais de transição", desc: "Usado em ligas e reatores." },
  { name: "Tântalo", symbol: "Ta", family: "Metais de transição", desc: "Usado em eletrônicos." },
  { name: "Wolfram (Tungstênio)", symbol: "W", family: "Metais de transição", desc: "Muito resistente ao calor." },
  { name: "Rênio", symbol: "Re", family: "Metais de transição", desc: "Usado em ligas e turbinas." },
  { name: "Ósmio", symbol: "Os", family: "Metais de transição", desc: "Muito denso e duro." },
  { name: "Irídio", symbol: "Ir", family: "Metais de transição", desc: "Raro e resistente." },
  { name: "Platina", symbol: "Pt", family: "Metal nobre", desc: "Catalisador e metal valioso." },
  { name: "Ouro", symbol: "Au", family: "Metal nobre", desc: "Muito valorizado e estável." },
  { name: "Mercúrio", symbol: "Hg", family: "Pós-transição", desc: "Único metal líquido em condições ambiente." },
  { name: "Tálio", symbol: "Tl", family: "Pós-transição", desc: "Tóxico, usado em eletrônica." },
  { name: "Chumbo", symbol: "Pb", family: "Pós-transição", desc: "Denso; uso reduzido por toxicidade." },
  { name: "Bismuto", symbol: "Bi", family: "Pós-transição", desc: "Baixa toxicidade relativa; usos farmacêuticos." },
  { name: "Polônio", symbol: "Po", family: "Metaloide", desc: "Radioativo e raro." },
  { name: "Astato", symbol: "At", family: "Halogênio", desc: "Extremamente raro e radioativo." },
  { name: "Radônio", symbol: "Rn", family: "Gás nobre", desc: "Radioativo; perigoso em espaços fechados." },
  { name: "Frâncio", symbol: "Fr", family: "Metal alcalino", desc: "Extremamente raro e radioativo." },
  { name: "Rádio", symbol: "Ra", family: "Alcalino-terroso", desc: "Radioativo, uso histórico em pinturas." },
  { name: "Actínio", symbol: "Ac", family: "Actinídeos", desc: "Radioativo; início da série actinídea." },
  { name: "Tório", symbol: "Th", family: "Actinídeos", desc: "Radioativo; potencial energético." },
  { name: "Protactínio", symbol: "Pa", family: "Actinídeos", desc: "Radioativo e raro." },
  { name: "Urânio", symbol: "U", family: "Actinídeos", desc: "Usado em energia nuclear." },
  { name: "Netúnio", symbol: "Np", family: "Actinídeos", desc: "Radioativo, sintético." },
  { name: "Plutônio", symbol: "Pu", family: "Actinídeos", desc: "Usado em energia nuclear e armas." },
  { name: "Amerício", symbol: "Am", family: "Actinídeos", desc: "Usado em detectores e fontes." },
  { name: "Cúrio", symbol: "Cm", family: "Actinídeos", desc: "Radioativo, pouco uso comercial." },
  { name: "Berquélio", symbol: "Bk", family: "Actinídeos", desc: "Sintético e radioativo." },
  { name: "Califórnio", symbol: "Cf", family: "Actinídeos", desc: "Usado como fonte de nêutrons." },
  { name: "Einstênio", symbol: "Es", family: "Actinídeos", desc: "Sintético e radioativo." },
  { name: "Férmio", symbol: "Fm", family: "Actinídeos", desc: "Sintético e altamente radioativo." },
  { name: "Mendelévio", symbol: "Md", family: "Actinídeos", desc: "Sintético." },
  { name: "Nobélio", symbol: "No", family: "Actinídeos", desc: "Sintético, pouco conhecido." },
  { name: "Laurêncio", symbol: "Lr", family: "Actinídeos", desc: "Sintético." },
  { name: "Rutherfórdio", symbol: "Rf", family: "Metais de transição", desc: "Sintético." },
  { name: "Dúbnio", symbol: "Db", family: "Metais de transição", desc: "Sintético." },
  { name: "Seabórgio", symbol: "Sg", family: "Metais de transição", desc: "Sintético." },
  { name: "Bóhrio", symbol: "Bh", family: "Metais de transição", desc: "Sintético." },
  { name: "Hássio", symbol: "Hs", family: "Metais de transição", desc: "Sintético." },
  { name: "Meitnério", symbol: "Mt", family: "Metais de transição", desc: "Sintético." },
  { name: "Darmstádio", symbol: "Ds", family: "Metais de transição", desc: "Sintético." },
  { name: "Roentgênio", symbol: "Rg", family: "Metais de transição", desc: "Sintético." },
  { name: "Copernício", symbol: "Cn", family: "Metais de transição", desc: "Sintético." },
  { name: "Nihônio", symbol: "Nh", family: "Pós-transição", desc: "Sintético." },
  { name: "Fleróvio", symbol: "Fl", family: "Pós-transição", desc: "Sintético." },
  { name: "Moscóvio", symbol: "Mc", family: "Pós-transição", desc: "Sintético." },
  { name: "Livermório", symbol: "Lv", family: "Pós-transição", desc: "Sintético." },
  { name: "Tenessino", symbol: "Ts", family: "Halogênio", desc: "Sintético e radioativo." },
  { name: "Oganessônio", symbol: "Og", family: "Gás nobre", desc: "Elemento superpesado, sintético." }
];

// Map for family colors
const familyColors = {
  "Metais de transição": "#f59e0b",
  "Metal alcalino": "#ff6b6b",
  "Alcalino-terroso": "#fbbf24",
  "Pós-transição": "#a78bfa",
  "Metal nobre": "#ffd700",
  "Não metal": "#34d399",
  "Halogênio": "#60a5fa",
  "Gás nobre": "#7c3aed",
  "Metaloide": "#06b6d4",
  "Lantanídeos": "#f472b6",
  "Actinídeos": "#fb7185",
  "Unknown": "#94a3b8"
};

// ---------- Utilities ----------
function hashString(s) {
  // simple deterministic hash for patterns
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function pickColorForKey(key) {
  const h = hashString(key);
  // create pastel-ish color
  const r = 120 + (h & 0xFF) % 136;
  const g = 80 + ((h >>> 8) & 0xFF) % 136;
  const b = 100 + ((h >>> 16) & 0xFF) % 136;
  return `rgb(${r},${g},${b})`;
}

// ---------- Pixel-art generator (creates 64x64 canvas) ----------
function makePixelArtCanvas(key, options = {}) {
  // We build a small grid (8x8) and scale it up to 64x64 for the 64-bit look.
  const gridSize = options.gridSize || 8;
  const pixelSize = 64 / gridSize;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  // Background
  const bg = options.bgColor || '#0b1220';
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 64, 64);

  const h = hashString(key + (options.seed || 'v1'));
  // Choose a palette
  const main = options.mainColor || pickColorForKey(key);
  const accent = options.accentColor || pickColorForKey(key + '-a');

  // Draw symmetrical pattern for aesthetics
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
      const bitIndex = (x + y * gridSize) % 32;
      const on = ((h >>> bitIndex) & 1) === 1;
      if (on) {
        ctx.fillStyle = (bitIndex % 3 === 0) ? accent : main;
      } else {
        ctx.fillStyle = '#000000';
      }
      // draw pixel and its mirror
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      ctx.fillRect((gridSize - 1 - x) * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }

  // overlay a bold symbol or short text for identification (optional)
  if (options.label) {
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.font = `${pixelSize * 3}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(options.label, 32, 36);
  }

  return canvas;
}

// ---------- Compound generator and rules ----------
const explicitCompounds = {
  // some hand-crafted known compounds
  "H,O": { name: "Água", type: "Óxido", color: "#40E0D0" },
  "Na,Cl": { name: "Cloreto de Sódio", type: "Sal", color: "#87CEEB" },
  "Fe,C": { name: "Aço (Fe-C)", type: "Liga", color: "#808080" },
  "Cu,Zn": { name: "Latão", type: "Liga", color: "#DAA520" },
  "Cu,Sn": { name: "Bronze", type: "Liga", color: "#CD853F" },
  "C,O": { name: "Dióxido de Carbono", type: "Óxido", color: "#a0aec0" },
  "H,Cl": { name: "Ácido Clorídrico (HCl)", type: "Ácido", color: "#f97316" },
  "C,H": { name: "Hidrocarboneto", type: "Orgânico", color: "#f59e0b" },
  "Si,O": { name: "Sílica", type: "Óxido", color: "#cbd5e1" },
  "Ca,C": { name: "Carbonato de Cálcio", type: "Sal", color: "#fef08a" }
};

// helper to normalize key (sorted symbols)
function keyOf(a, b) {
  return [a, b].sort().join(',');
}

function generateCompoundFromRules(symA, symB, familyA, familyB) {
  const key = keyOf(symA, symB);

  // explicit mapping first
  if (explicitCompounds[key]) return explicitCompounds[key];

  // quick family-based heuristics to produce many plausible compounds:
  // metal + nonmetal => "Sal de X" or "[Metal] [nonmetal]eto"
  const metals = ["Metal alcalino", "Alcalino-terroso", "Metais de transição", "Pós-transição", "Metal nobre"];
  const halogen = "Halogênio";
  const nongas = "Não metal";

  // If one is a metal and other is oxygen -> oxide
  if ((familyA.includes('Metal') || metals.includes(familyA)) && symB === 'O' ||
      (familyB.includes('Metal') || metals.includes(familyB)) && symA === 'O') {
    const metal = metals.some(f => familyA.includes(f) || f === familyA) ? symA : symB;
    return { name: `Óxido de ${metal}`, type: "Óxido", color: "#9ca3af" };
  }

  // metal + halogen -> haleto
  if ((metals.some(f => familyA.includes(f) || f === familyA) && familyB === halogen) ||
      (metals.some(f => familyB.includes(f) || f === familyB) && familyA === halogen)) {
    const m = metals.some(f => familyA.includes(f) || f === familyA) ? symA : symB;
    const h = m === symA ? symB : symA;
    return { name: `${m}${h} (Haleto)`, type: "Sal", color: "#bae6fd" };
  }

  // nonmetal + nonmetal -> covalent compound e.g., dioxide, gas, etc
  if ((familyA === "Não metal" || familyA === "Metaloide") && (familyB === "Não metal" || familyB === "Metaloide")) {
    // example: C + O -> CO2 was explicit; otherwise generic
    return { name: `${symA}${symB} (Composto covalente)`, type: "Covalente", color: "#60a5fa" };
  }

  // gas noble combinations -> usually inert
  if (familyA === "Gás nobre" || familyB === "Gás nobre") {
    return { name: "Inerte (não forma composto simples)", type: "Inerte", color: "#c7bfe7" };
  }

  // Fallback: try to generate simple salt for remaining combos
  if (metals.some(f => familyA.includes(f) || f === familyA) || metals.some(f => familyB.includes(f) || f === familyB)) {
    return { name: `Sal ${symA}${symB}`, type: "Sal", color: "#93c5fd" };
  }

  // As last attempt, return generic compound
  return { name: `${symA}-${symB} (Composto)`, type: "Composto", color: "#94a3b8" };
}

// ---------- DOM references ----------
const sidebar = document.getElementById('elementList');
const workspace = document.getElementById('grid');
const modal = document.getElementById('modal');
const search = document.getElementById('search');
const modalTitle = document.getElementById('modalTitle');
const modalInfo = document.getElementById('modalInfo');
const viewer = document.getElementById('viewer');
const show3DBtn = document.getElementById('show3D');
const closeModalBtn = document.getElementById('closeModal');

let threeState = { renderer: null, scene: null, camera: null, animationId: null, mesh: null };

// ---------- Populate sidebar with full table ----------
function populateSidebar() {
  sidebar.innerHTML = '';
  elements.forEach(el => {
    const div = document.createElement('div');
    div.className = 'element';
    div.draggable = true;

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.style.background = familyColors[el.family] || familyColors['Unknown'];
    badge.textContent = el.symbol;

    const meta = document.createElement('div');
    meta.className = 'el-meta';
    meta.innerHTML = `<div class="el-name">${el.name}</div><div class="el-sub">${el.symbol} • ${el.family}</div>`;

    div.appendChild(badge);
    div.appendChild(meta);

    // drag data
    div.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', JSON.stringify(el));
      // small drag ghost
      const ghost = document.createElement('canvas');
      ghost.width = 100; ghost.height = 40;
      const gctx = ghost.getContext('2d');
      gctx.fillStyle = familyColors[el.family] || '#888';
      gctx.fillRect(0, 0, 100, 40);
      gctx.fillStyle = '#fff';
      gctx.font = '16px sans-serif';
      gctx.fillText(el.symbol + ' - ' + el.name, 8, 24);
      e.dataTransfer.setDragImage(ghost, 10, 10);
    });

    // click to open modal / quick preview
    div.addEventListener('click', () => {
      openModal(el);
    });

    sidebar.appendChild(div);
  });
}

populateSidebar();

// ---------- Search ----------
search.addEventListener('input', e => {
  const term = e.target.value.toLowerCase().trim();
  Array.from(sidebar.children).forEach(div => {
    const text = div.textContent.toLowerCase();
    div.style.display = text.includes(term) ? 'flex' : 'none';
  });
});

// ---------- Drag & drop onto workspace ----------
workspace.addEventListener('dragover', e => e.preventDefault());
workspace.addEventListener('drop', e => {
  e.preventDefault();
  try {
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const rect = workspace.getBoundingClientRect();
    // position relative to workspace
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    const atom = createAtom(data, x, y);
    workspace.appendChild(atom);
  } catch (err) {
    console.error('drop parse failed', err);
  }
});

// ---------- Create atom element on stage ----------
function createAtom(data, x, y) {
  const atom = document.createElement('div');
  atom.className = 'atom';
  atom.style.left = (x - 40) + 'px';
  atom.style.top = (y - 40) + 'px';
  atom.dataset.symbol = data.symbol;
  atom.dataset.name = data.name;
  atom.dataset.family = data.family;
  atom.dataset.desc = data.desc;

  const label = document.createElement('div');
  label.className = 'label';
  label.innerHTML = `<div style="font-size:18px;font-weight:900">${data.symbol}</div><div style="font-size:12px">${data.name}</div>`;
  atom.appendChild(label);

  const bg = familyColors[data.family] || '#888';
  atom.style.background = bg;
  atom.addEventListener('mousedown', startDragAtom);
  atom.addEventListener('click', (ev) => {
    // single click opens modal
    ev.stopPropagation();
    openModal(data);
  });
  return atom;
}

// ---------- Dragging atoms on stage ----------
function startDragAtom(e) {
  e.preventDefault();
  const atom = e.currentTarget;
  atom.classList.add('dragging');
  const rect = atom.getBoundingClientRect();
  const workspaceRect = workspace.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  function onMove(ev) {
    const x = ev.clientX - workspaceRect.left - offsetX;
    const y = ev.clientY - workspaceRect.top - offsetY;
    atom.style.left = x + 'px';
    atom.style.top = y + 'px';
  }

  function onUp(ev) {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    atom.classList.remove('dragging');
    // after drop, check overlap with others
    checkCombination(atom);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp, { once: true });
}

// ---------- Check overlapping atoms to combine ----------
function checkCombination(atom) {
  const others = Array.from(document.querySelectorAll('.atom')).filter(a => a !== atom);
  for (let other of others) {
    const rect1 = atom.getBoundingClientRect();
    const rect2 = other.getBoundingClientRect();
    const overlap = !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    if (overlap) {
      combineAtoms(atom, other);
      return;
    }
  }
}

// ---------- Combine atoms ----------
function combineAtoms(a1, a2) {
  const s1 = a1.dataset.symbol;
  const s2 = a2.dataset.symbol;
  const fam1 = a1.dataset.family;
  const fam2 = a2.dataset.family;
  const key = keyOf(s1, s2);

  // First try explicit mapping then rules
  let result = explicitCompounds[key];
  if (!result) result = generateCompoundFromRules(s1, s2, fam1, fam2);

  // If the result is unknown or clearly not valid, treat as garbage
  const garbage = { name: "Lixo", type: "Pilha de Lixo", color: "#6b7280" };
  // Some heuristics: everything is allowed by rules; but if the generated name contains 'não' or 'inerte' etc we still show it.
  const final = result || garbage;

  // remove originals
  a1.remove();
  a2.remove();

  // create compound atom on stage
  const compound = document.createElement('div');
  compound.className = 'atom';
  compound.textContent = final.name;
  compound.dataset.name = final.name;
  compound.dataset.symbol = final.name;
  compound.dataset.family = final.type;
  compound.style.background = final.color || '#aaa';

  // position in approx middle of previous two positions
  const x1 = parseInt(a1.style.left || 0);
  const y1 = parseInt(a1.style.top || 0);
  const x2 = parseInt(a2.style.left || 0);
  const y2 = parseInt(a2.style.top || 0);

  compound.style.left = ((x1 + x2) / 2) + 'px';
  compound.style.top = ((y1 + y2) / 2) + 'px';

  // attach click to open modal with compound description and 3D texture
  compound.addEventListener('click', () => {
    openModal({ name: final.name, desc: `Tipo: ${final.type}\nFormado por: ${s1} + ${s2}\nNome gerado: ${final.name}`, family: final.type, symbol: final.name });
  });

  // pixel-art texture for the compound (shows in modal 3D)
  workspace.appendChild(compound);

  // small pop animation
  compound.animate([{ transform: 'scale(1.2)', opacity: 0.9 }, { transform: 'scale(1)', opacity: 1 }], { duration: 500 });
}

// ---------- Modal logic & 3D viewer ----------
function openModal(data) {
  modal.style.display = 'flex';
  modalTitle.textContent = `${data.name} (${data.symbol || ''})`;
  modalInfo.textContent = `${data.desc || ''}\nFamília/tipo: ${data.family || ''}`;

  // generate pixel art canvas for this element/compound
  const key = data.symbol || data.name;
  const canvas = makePixelArtCanvas(key, {
    bgColor: '#081026',
    mainColor: pickColorForKey(key),
    accentColor: pickColorForKey(key + '-acc'),
    label: (data.symbol && data.symbol.length <= 2) ? data.symbol : ''
  });

  // by default show the pixel art as texture in the 3D viewer
  mount3DViewer(canvas);
}

closeModalBtn.onclick = () => {
  modal.style.display = 'none';
  unmount3DViewer();
};

// optional button to re-render / enlarge 3D
show3DBtn.addEventListener('click', () => {
  // re-generate texture from modalTitle text
  const key = modalTitle.textContent || "item";
  const canvas = makePixelArtCanvas(key, { bgColor: '#081026', mainColor: pickColorForKey(key) });
  mount3DViewer(canvas);
});

// ---------- three.js viewer mount/unmount ----------
function mount3DViewer(textureCanvas) {
  unmount3DViewer(); // clear previous

  const width = viewer.clientWidth || 260;
  const height = viewer.clientHeight || 260;

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio ? Math.min(2, window.devicePixelRatio) : 1);
  renderer.setSize(width, height);
  viewer.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 3;

  // texture from canvas
  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  // create a cube with pixel-art texture on all faces
  const geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const materials = [
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture }),
    new THREE.MeshBasicMaterial({ map: texture })
  ];
  const mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  // soft directional-like lighting (not needed for BasicMaterial but left for future)
  // animation: rotate cube slowly
  function animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    threeState.animationId = requestAnimationFrame(animate);
  }
  threeState = { renderer, scene, camera, animationId: null, mesh };
  animate();
}

function unmount3DViewer() {
  if (threeState.animationId) cancelAnimationFrame(threeState.animationId);
  if (threeState.renderer) {
    threeState.renderer.dispose();
    // remove canvas element
    if (viewer.firstChild) viewer.removeChild(viewer.firstChild);
  }
  threeState = { renderer: null, scene: null, camera: null, animationId: null, mesh: null };
}

// ---------- Init: small instructions and event handlers ----------
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});

document.getElementById('soundToggle').addEventListener('click', () => {
  // placeholder for toggle sound; could be integrated with Howler
  alert('Controle de som: futuramente será integrado.');
});

document.getElementById('exportBtn').addEventListener('click', () => {
  // small export: serialize positions and items on stage
  const items = Array.from(document.querySelectorAll('.atom')).map(a => ({
    name: a.dataset.name || a.textContent,
    symbol: a.dataset.symbol,
    family: a.dataset.family,
    left: a.style.left,
    top: a.style.top
  }));
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'stage-export.json';
  a.click();
  URL.revokeObjectURL(url);
});

// click on empty stage to close modal
workspace.addEventListener('click', () => {
  modal.style.display = 'none';
  unmount3DViewer();
});

// Informational: generate a few starting atoms on the stage for demonstration (optional)
(function seedDemo() {
  // place Hydrogen and Oxygen to encourage making water
  const start = [
    { symbol: 'H', x: 60, y: 80 },
    { symbol: 'O', x: 160, y: 120 }
  ];
  start.forEach(s => {
    const el = elements.find(e => e.symbol === s.symbol);
    if (!el) return;
    const atom = createAtom(el, s.x, s.y);
    workspace.appendChild(atom);
  });
})();
