const elements = [
  { name: "Hidrogênio", symbol: "H", family: "Não metal", desc: "O mais leve dos elementos." },
  { name: "Oxigênio", symbol: "O", family: "Não metal", desc: "Essencial à respiração." },
  { name: "Carbono", symbol: "C", family: "Não metal", desc: "Base da vida orgânica." },
  { name: "Sódio", symbol: "Na", family: "Metal alcalino", desc: "Presente no sal de cozinha." },
  { name: "Cloro", symbol: "Cl", family: "Halogênio", desc: "Usado para purificar água." },
  { name: "Ferro", symbol: "Fe", family: "Metal", desc: "Usado em ligas metálicas." },
  { name: "Cobre", symbol: "Cu", family: "Metal", desc: "Condutor de eletricidade." },
  { name: "Zinco", symbol: "Zn", family: "Metal", desc: "Usado em galvanização." },
  { name: "Ouro", symbol: "Au", family: "Metal nobre", desc: "Muito valorizado." }
];

const compounds = {
  "H,O": { name: "Água", type: "Óxido", color: "#40E0D0" },
  "Na,Cl": { name: "Cloreto de Sódio", type: "Sal", color: "#87CEEB" },
  "Fe,C": { name: "Aço", type: "Liga Metálica", color: "#808080" },
  "Cu,Zn": { name: "Latão", type: "Liga Metálica", color: "#DAA520" },
  "Cu,Sn": { name: "Bronze", type: "Liga Metálica", color: "#CD853F" }
};

const familyColors = {
  "Metal": "#ffa500",
  "Metal alcalino": "#ff4500",
  "Metal nobre": "#ffd700",
  "Não metal": "#32cd32",
  "Halogênio": "#1e90ff"
};

const sidebar = document.getElementById('elementList');
const workspace = document.getElementById('workspace');
const modal = document.getElementById('modal');
const search = document.getElementById('search');

elements.forEach(el => {
  const div = document.createElement('div');
  div.className = 'element';
  div.textContent = `${el.symbol} - ${el.name}`;
  div.draggable = true;
  div.addEventListener('dragstart', e => e.dataTransfer.setData('text', JSON.stringify(el)));
  sidebar.appendChild(div);
});

workspace.addEventListener('dragover', e => e.preventDefault());
workspace.addEventListener('drop', e => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData('text'));
  const atom = createAtom(data, e.pageX, e.pageY);
  workspace.appendChild(atom);
});

function createAtom(data, x, y) {
  const atom = document.createElement('div');
  atom.className = 'atom';
  atom.textContent = data.symbol;
  atom.style.background = familyColors[data.family] || '#888';
  atom.style.left = x - 40 + 'px';
  atom.style.top = y - 40 + 'px';
  atom.dataset.symbol = data.symbol;
  atom.addEventListener('click', () => openModal(data));
  makeAtomInteractive(atom);
  return atom;
}

function makeAtomInteractive(atom) {
  atom.addEventListener('mousedown', e => {
    const move = ev => {
      atom.style.left = ev.pageX - 40 + 'px';
      atom.style.top = ev.pageY - 40 + 'px';
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', ev => {
      document.removeEventListener('mousemove', move);
      checkCombination(atom, ev.pageX, ev.pageY);
    }, { once: true });
  });
}

function checkCombination(atom, x, y) {
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

function combineAtoms(a1, a2) {
  const key1 = [a1.dataset.symbol, a2.dataset.symbol].sort().join(',');
  const result = compounds[key1] || { name: "Lixo", type: "Pó", color: "#aaa" };

  a1.remove();
  a2.remove();

  const compound = document.createElement('div');
  compound.className = 'atom';
  compound.textContent = result.name;
  compound.style.background = result.color;
  compound.style.left = (parseInt(a1.style.left) + 20) + 'px';
  compound.style.top = (parseInt(a1.style.top) + 20) + 'px';
  workspace.appendChild(compound);

  // Efeito de brilho ao formar composto
  compound.animate([{ transform: 'scale(1.2)', opacity: 0.8 }, { transform: 'scale(1)', opacity: 1 }], { duration: 600 });
}

function openModal(data) {
  modal.style.display = 'block';
  document.getElementById('modalTitle').textContent = data.name;
  document.getElementById('modalInfo').textContent = `${data.desc}\nFamília: ${data.family}`;
}

document.getElementById('closeModal').onclick = () => modal.style.display = 'none';

search.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  Array.from(sidebar.children).forEach(div => {
    div.style.display = div.textContent.toLowerCase().includes(term) ? 'block' : 'none';
  });
});