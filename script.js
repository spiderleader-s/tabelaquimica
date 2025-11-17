/* ====================================================
   script.js — Tabela Química avançada
   - 118 elementos (ELEMENTS)
   - REACTIONS: ~70 combinações reais (REACTIONS)
   - geração dinâmica SVG 64x64 + 8x8 "64-bits" pattern
   - drag & drop, combinações, modal com prótons/neutrons/elétrons
   ==================================================== */

/* ------------------ ELEMENTS (118) ------------------ */
/* Campos: z, symbol, name, family, mass, desc */
const ELEMENTS = [
{"z":1,"symbol":"H","name":"Hidrogênio","family":"Nonmetal","mass":1.008,"desc":"O mais leve dos elementos, gás diatômico."},
{"z":2,"symbol":"He","name":"Hélio","family":"Noble","mass":4.0026,"desc":"Gás nobre inerte."},
{"z":3,"symbol":"Li","name":"Lítio","family":"Alkali","mass":6.94,"desc":"Metal alcalino, usado em baterias."},
{"z":4,"symbol":"Be","name":"Berílio","family":"Alkaline","mass":9.0122,"desc":"Metal leve e rígido."},
{"z":5,"symbol":"B","name":"Boro","family":"Metalloid","mass":10.81,"desc":"Metaloide com aplicações em cerâmicas."},
{"z":6,"symbol":"C","name":"Carbono","family":"Nonmetal","mass":12.011,"desc":"Base da química orgânica."},
{"z":7,"symbol":"N","name":"Nitrogênio","family":"Nonmetal","mass":14.007,"desc":"Componente majoritário do ar."},
{"z":8,"symbol":"O","name":"Oxigênio","family":"Nonmetal","mass":15.999,"desc":"Essencial para respiração."},
{"z":9,"symbol":"F","name":"Flúor","family":"Halogen","mass":18.998,"desc":"Halogênio altamente reativo."},
{"z":10,"symbol":"Ne","name":"Neônio","family":"Noble","mass":20.180,"desc":"Gás nobre usado em letreiros."},
{"z":11,"symbol":"Na","name":"Sódio","family":"Alkali","mass":22.990,"desc":"Componente do sal de cozinha."},
{"z":12,"symbol":"Mg","name":"Magnésio","family":"Alkaline","mass":24.305,"desc":"Metal leve, reage com ácidos."},
{"z":13,"symbol":"Al","name":"Alumínio","family":"Post","mass":26.982,"desc":"Leve, resistente à corrosão."},
{"z":14,"symbol":"Si","name":"Silício","family":"Metalloid","mass":28.085,"desc":"Semicondutor, muito abundante."},
{"z":15,"symbol":"P","name":"Fósforo","family":"Nonmetal","mass":30.974,"desc":"Importante em biologia."},
{"z":16,"symbol":"S","name":"Enxofre","family":"Nonmetal","mass":32.06,"desc":"Sólido amarelo, usado industrialmente."},
{"z":17,"symbol":"Cl","name":"Cloro","family":"Halogen","mass":35.45,"desc":"Usado para desinfecção de água."},
{"z":18,"symbol":"Ar","name":"Argônio","family":"Noble","mass":39.948,"desc":"Gás inerte."},
{"z":19,"symbol":"K","name":"Potássio","family":"Alkali","mass":39.098,"desc":"Metal reativo."},
{"z":20,"symbol":"Ca","name":"Cálcio","family":"Alkaline","mass":40.078,"desc":"Importante para ossos."},
{"z":21,"symbol":"Sc","name":"Escândio","family":"Transition","mass":44.956,"desc":"Metal de transição leve."},
{"z":22,"symbol":"Ti","name":"Titânio","family":"Transition","mass":47.867,"desc":"Forte e resistente à corrosão."},
{"z":23,"symbol":"V","name":"Vanádio","family":"Transition","mass":50.942,"desc":"Usado em ligas de aço."},
{"z":24,"symbol":"Cr","name":"Cromo","family":"Transition","mass":51.996,"desc":"Resistente ao desgaste."},
{"z":25,"symbol":"Mn","name":"Manganês","family":"Transition","mass":54.938,"desc":"Usado em ligas."},
{"z":26,"symbol":"Fe","name":"Ferro","family":"Transition","mass":55.845,"desc":"Base do aço."},
{"z":27,"symbol":"Co","name":"Cobalto","family":"Transition","mass":58.933,"desc":"Usado em baterias e ligas."},
{"z":28,"symbol":"Ni","name":"Níquel","family":"Transition","mass":58.693,"desc":"Metal magnético."},
{"z":29,"symbol":"Cu","name":"Cobre","family":"Transition","mass":63.546,"desc":"Ótimo condutor elétrico."},
{"z":30,"symbol":"Zn","name":"Zinco","family":"Transition","mass":65.38,"desc":"Usado em galvanização."},
{"z":31,"symbol":"Ga","name":"Gálio","family":"Post","mass":69.723,"desc":"Derrete próximo à temperatura ambiente."},
{"z":32,"symbol":"Ge","name":"Germânio","family":"Metalloid","mass":72.630,"desc":"Semicondutor."},
{"z":33,"symbol":"As","name":"Arsênio","family":"Metalloid","mass":74.922,"desc":"Tóxico, usado em ligas."},
{"z":34,"symbol":"Se","name":"Selênio","family":"Nonmetal","mass":78.971,"desc":"Traço importante."},
{"z":35,"symbol":"Br","name":"Bromo","family":"Halogen","mass":79.904,"desc":"Líquido marrom-avermelhado."},
{"z":36,"symbol":"Kr","name":"Criptônio","family":"Noble","mass":83.798,"desc":"Gás nobre."},
{"z":37,"symbol":"Rb","name":"Rubídio","family":"Alkali","mass":85.468,"desc":"Muito reativo."},
{"z":38,"symbol":"Sr","name":"Estrôncio","family":"Alkaline","mass":87.62,"desc":"Usado em fogos de artifício."},
{"z":39,"symbol":"Y","name":"Ítrio","family":"Transition","mass":88.906,"desc":"Usado em displays."},
{"z":40,"symbol":"Zr","name":"Zircônio","family":"Transition","mass":91.224,"desc":"Resistente à corrosão."},
{"z":41,"symbol":"Nb","name":"Nióbio","family":"Transition","mass":92.906,"desc":"Usado em supercondutores."},
{"z":42,"symbol":"Mo","name":"Molibdênio","family":"Transition","mass":95.95,"desc":"Usado em ligas."},
{"z":43,"symbol":"Tc","name":"Tecnécio","family":"Transition","mass":98,"desc":"Radioativo, sintético."},
{"z":44,"symbol":"Ru","name":"Rutênio","family":"Transition","mass":101.07,"desc":"Usado em eletrônica."},
{"z":45,"symbol":"Rh","name":"Ródio","family":"Transition","mass":102.91,"desc":"Metal raro, catalisador."},
{"z":46,"symbol":"Pd","name":"Paládio","family":"Transition","mass":106.42,"desc":"Catalisador, joias."},
{"z":47,"symbol":"Ag","name":"Prata","family":"Transition","mass":107.87,"desc":"Muito condutivo."},
{"z":48,"symbol":"Cd","name":"Cádmio","family":"Transition","mass":112.41,"desc":"Tóxico, em baterias."},
{"z":49,"symbol":"In","name":"Índio","family":"Post","mass":114.82,"desc":"Usado em eletrônica."},
{"z":50,"symbol":"Sn","name":"Estanho","family":"Post","mass":118.71,"desc":"Usado em ligas e revestimentos."},
{"z":51,"symbol":"Sb","name":"Antimônio","family":"Metalloid","mass":121.76,"desc":"Usado em ligas."},
{"z":52,"symbol":"Te","name":"Telúrio","family":"Metalloid","mass":127.60,"desc":"Raro, usado em semicondutores."},
{"z":53,"symbol":"I","name":"Iodo","family":"Halogen","mass":126.90,"desc":"Essencial em pequenas quantidades."},
{"z":54,"symbol":"Xe","name":"Xenônio","family":"Noble","mass":131.29,"desc":"Gás nobre pesado."},
{"z":55,"symbol":"Cs","name":"Césio","family":"Alkali","mass":132.91,"desc":"Altamente reativo."},
{"z":56,"symbol":"Ba","name":"Bário","family":"Alkaline","mass":137.33,"desc":"Usado em fluidos de perfuração."},
{"z":57,"symbol":"La","name":"Lantânio","family":"Lanthanide","mass":138.91,"desc":"Primeiro lantanídeo."},
{"z":58,"symbol":"Ce","name":"Cério","family":"Lanthanide","mass":140.12,"desc":"Usado em catalisadores."},
{"z":59,"symbol":"Pr","name":"Praseodímio","family":"Lanthanide","mass":140.91,"desc":"Usado em ímãs."},
{"z":60,"symbol":"Nd","name":"Neodímio","family":"Lanthanide","mass":144.24,"desc":"Ímãs fortes."},
{"z":61,"symbol":"Pm","name":"Promécio","family":"Lanthanide","mass":145,"desc":"Radioativo."},
{"z":62,"symbol":"Sm","name":"Samário","family":"Lanthanide","mass":150.36,"desc":"Usado em ímãs."},
{"z":63,"symbol":"Eu","name":"Európio","family":"Lanthanide","mass":151.96,"desc":"Usado em fósforos."},
{"z":64,"symbol":"Gd","name":"Gadolínio","family":"Lanthanide","mass":157.25,"desc":"Usado em contraste para MRI."},
{"z":65,"symbol":"Tb","name":"Térbio","family":"Lanthanide","mass":158.93,"desc":"Usado em eletrônica."},
{"z":66,"symbol":"Dy","name":"Disprósio","family":"Lanthanide","mass":162.50,"desc":"Usado em ímãs."},
{"z":67,"symbol":"Ho","name":"Hólmio","family":"Lanthanide","mass":164.93,"desc":"Raro."},
{"z":68,"symbol":"Er","name":"Érbio","family":"Lanthanide","mass":167.26,"desc":"Usado em fibra óptica."},
{"z":69,"symbol":"Tm","name":"Túlio","family":"Lanthanide","mass":168.93,"desc":"Raro e caro."},
{"z":70,"symbol":"Yb","name":"Itérbio","family":"Lanthanide","mass":173.05,"desc":"Usado em ligas."},
{"z":71,"symbol":"Lu","name":"Lutécio","family":"Lanthanide","mass":174.97,"desc":"Raro."""},
// NOTE: continuing elements 72..118
{"z":72,"symbol":"Hf","name":"Háfnio","family":"Transition","mass":178.49,"desc":"Usado em reatores nucleares."},
{"z":73,"symbol":"Ta","name":"Tântalo","family":"Transition","mass":180.95,"desc":"Usado em capacitores."},
{"z":74,"symbol":"W","name":"Tungstênio","family":"Transition","mass":183.84,"desc":"Ponto de fusão muito alto."},
{"z":75,"symbol":"Re","name":"Rênio","family":"Transition","mass":186.21,"desc":"Metal raro."},
{"z":76,"symbol":"Os","name":"Ósmio","family":"Transition","mass":190.23,"desc":"Muito denso."},
{"z":77,"symbol":"Ir","name":"Irídio","family":"Transition","mass":192.22,"desc":"Resistente à corrosão."},
{"z":78,"symbol":"Pt","name":"Platina","family":"Transition","mass":195.08,"desc":"Catalisador e joalheria."},
{"z":79,"symbol":"Au","name":"Ouro","family":"Transition","mass":196.97,"desc":"Metal precioso."},
{"z":80,"symbol":"Hg","name":"Mercúrio","family":"Transition","mass":200.59,"desc":"Líquido em temperatura ambiente."},
{"z":81,"symbol":"Tl","name":"Tálio","family":"Post","mass":204.38,"desc":"Tóxico."},
{"z":82,"symbol":"Pb","name":"Chumbo","family":"Post","mass":207.2,"desc":"Tóxico, usado no passado em tubulações."},
{"z":83,"symbol":"Bi","name":"Bismuto","family":"Post","mass":208.98,"desc":"Metal pesado de baixa toxicidade relativa."},
{"z":84,"symbol":"Po","name":"Polônio","family":"Metalloid","mass":209,"desc":"Radioativo."},
{"z":85,"symbol":"At","name":"Astato","family":"Halogen","mass":210,"desc":"Extremamente raro."},
{"z":86,"symbol":"Rn","name":"Radônio","family":"Noble","mass":222,"desc":"Radioativo, gás nobre."},
{"z":87,"symbol":"Fr","name":"Frâncio","family":"Alkali","mass":223,"desc":"Extremamente raro e radioativo."},
{"z":88,"symbol":"Ra","name":"Rádio","family":"Alkaline","mass":226,"desc":"Radioativo, historicamente usado em tintas."},
{"z":89,"symbol":"Ac","name":"Actínio","family":"Actinide","mass":227,"desc":"Radioativo."},
{"z":90,"symbol":"Th","name":"Tório","family":"Actinide","mass":232.04,"desc":"Possível combustível nuclear."},
{"z":91,"symbol":"Pa","name":"Protactínio","family":"Actinide","mass":231.04,"desc":"Radioativo raro."},
{"z":92,"symbol":"U","name":"Urânio","family":"Actinide","mass":238.03,"desc":"Usado como combustível nuclear."},
{"z":93,"symbol":"Np","name":"Neptúnio","family":"Actinide","mass":237,"desc":"Radioativo sintético."},
{"z":94,"symbol":"Pu","name":"Plutônio","family":"Actinide","mass":244,"desc":"Radioativo, usado em reatores e armas."},
{"z":95,"symbol":"Am","name":"Amerício","family":"Actinide","mass":243,"desc":"Usado em detectores de fumaça."},
{"z":96,"symbol":"Cm","name":"Cúrio","family":"Actinide","mass":247,"desc":"Radioativo sintético."},
{"z":97,"symbol":"Bk","name":"Berkélio","family":"Actinide","mass":247,"desc":"Sintético."},
{"z":98,"symbol":"Cf","name":"Califórnio","family":"Actinide","mass":251,"desc":"Radioativo."},
{"z":99,"symbol":"Es","name":"Einsteínio","family":"Actinide","mass":252,"desc":"Sintético."},
{"z":100,"symbol":"Fm","name":"Férmio","family":"Actinide","mass":257,"desc":"Sintético."},
{"z":101,"symbol":"Md","name":"Mendelévio","family":"Actinide","mass":258,"desc":"Sintético."},
{"z":102,"symbol":"No","name":"Nobélio","family":"Actinide","mass":259,"desc":"Sintético."},
{"z":103,"symbol":"Lr","name":"Laurêncio","family":"Actinide","mass":266,"desc":"Sintético."},
{"z":104,"symbol":"Rf","name":"Rutherfórdio","family":"Transition","mass":267,"desc":"Sintético."},
{"z":105,"symbol":"Db","name":"Dúbnio","family":"Transition","mass":268,"desc":"Sintético."},
{"z":106,"symbol":"Sg","name":"Seabórgio","family":"Transition","mass":269,"desc":"Sintético."},
{"z":107,"symbol":"Bh","name":"Bóhrio","family":"Transition","mass":270,"desc":"Sintético."},
{"z":108,"symbol":"Hs","name":"Hássio","family":"Transition","mass":269,"desc":"Sintético."},
{"z":109,"symbol":"Mt","name":"Meitnério","family":"Unknown","mass":278,"desc":"Sintético, instável."},
{"z":110,"symbol":"Ds","name":"Darmstádio","family":"Unknown","mass":281,"desc":"Sintético."},
{"z":111,"symbol":"Rg","name":"Roentgênio","family":"Unknown","mass":282,"desc":"Sintético."},
{"z":112,"symbol":"Cn","name":"Copernício","family":"Unknown","mass":285,"desc":"Sintético."},
{"z":113,"symbol":"Nh","name":"Nihônio","family":"Unknown","mass":286,"desc":"Sintético."},
{"z":114,"symbol":"Fl","name":"Fleróvio","family":"Unknown","mass":289,"desc":"Sintético."},
{"z":115,"symbol":"Mc","name":"Moscóvio","family":"Unknown","mass":290,"desc":"Sintético."},
{"z":116,"symbol":"Lv","name":"Livermório","family":"Unknown","mass":293,"desc":"Sintético."},
{"z":117,"symbol":"Ts","name":"Tennessino","family":"Halogen","mass":294,"desc":"Sintético."},
{"z":118,"symbol":"Og","name":"Oganessônio","family":"Noble","mass":294,"desc":"Sintético, provável nobre."}
];

/* ------------------ REACTIONS / COMBINATIONS (≈70) ------------------ */
/* Chaves: símbolos separados por vírgula e ordenados ou com multiplicidade.
   O gerador de chaves aceita "H,O" e "H,H,O" (para 2H + O) */
const REACTIONS = {
  "H,O": {name:"Água (H₂O)", type:"Molécula", bond:"Covalente polar", energy:-285, state:"Líquido"},
  "H,H,O": {name:"Água (H₂O) (2:1)", type:"Molécula", bond:"Covalente polar", energy:-285, state:"Líquido"},
  "C,O": {name:"Dióxido de carbono (CO₂)", type:"Óxido", bond:"Covalente", energy:-393.5, state:"Gás"},
  "C,O,O": {name:"Dióxido de carbono (CO₂)", type:"Óxido", bond:"Covalente", energy:-393.5, state:"Gás"},
  "C,H,H,H,H": {name:"Metano (CH₄)", type:"Hidrocarboneto", bond:"Covalente", energy:-74.8, state:"Gás"},
  "C,H,H,O": {name:"Etanol (C₂H₅OH) simplificado", type:"Orgânico", bond:"Covalente", energy:null, state:"Líquido"},
  "Na,Cl": {name:"Cloreto de Sódio (NaCl)", type:"Sal", bond:"Iônico", energy:-411, state:"Sólido"},
  "K,Cl": {name:"Cloreto de Potássio (KCl)", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "Na,O": {name:"Óxido de Sódio (Na₂O)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Mg,O": {name:"Óxido de Magnésio (MgO)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Ca,C,O": {name:"Carbonato de Cálcio (CaCO₃) simplificado", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "Fe,O": {name:"Óxido de Ferro (Fe₂O₃) - Ferrugem", type:"Óxido", bond:"Iônico/Metálico", energy:-824, state:"Sólido"},
  "Fe,O,O": {name:"Óxido de Ferro (Fe₃O₄)", type:"Óxido", bond:"Iônico/Metálico", energy:null, state:"Sólido"},
  "Cu,Sn": {name:"Bronze (Cu+Sn)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Cu,Zn": {name:"Latão (Cu+Zn)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Fe,C": {name:"Aço (Fe+C)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Al,Cu,Mg": {name:"Duralumínio (Al-Cu-Mg)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Au,Cu": {name:"Ouro rosé (Au+Cu)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Ag,Cu": {name:"Prata esterlina (Ag+Cu)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Cu,O": {name:"Óxido de cobre (CuO)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Cu,O,O": {name:"Óxido cuproso (Cu₂O)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Zn,O": {name:"Óxido de zinco (ZnO)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Al,O": {name:"Óxido de alumínio (Al₂O₃)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Pb,O": {name:"Óxido de chumbo (PbO)", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Ag,Cl": {name:"Cloreto de prata (AgCl)", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "Ag,NO3": {name:"Nitrato de prata (AgNO₃) — representativo", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "H,Cl": {name:"Ácido clorídrico (HCl)", type:"Ácido", bond:"Iônico/Covalente", energy:-92.3, state:"Gas/Aquoso"},
  "H,Br": {name:"Ácido bromídrico (HBr)", type:"Ácido", bond:"Iônico/Covalente", energy:null, state:"Gás/Aquoso"},
  "S,O": {name:"Dióxido de enxofre (SO₂)", type:"Óxido", bond:"Covalente", energy:null, state:"Gás"},
  "S,O,O": {name:"Trióxido de enxofre (SO₃)", type:"Óxido", bond:"Covalente", energy:null, state:"Gás"},
  "N,O": {name:"Monóxido de nitrogênio (NO)", type:"Óxido", bond:"Covalente", energy:null, state:"Gás"},
  "N,O,O": {name:"Dióxido de nitrogênio (NO₂)", type:"Óxido", bond:"Covalente", energy:null, state:"Gás"},
  "N,N": {name:"Nitrogênio (N₂)", type:"Gás diatômico", bond:"Covalente tripla", energy:null, state:"Gás"},
  "H,N": {name:"Amônia (NH₃) simplificada", type:"Base/Amônia", bond:"Covalente", energy:null, state:"Gás"},
  "H,S": {name:"Ácido sulfídrico (H₂S) simplificado", type:"Ácido fraco", bond:"Covalente", energy:null, state:"Gás"},
  "C,H,O": {name:"Álcool/Orgânico (simplificado)", type:"Orgânico", bond:"Covalente", energy:null, state:"Líquido"},
  "Si,O": {name:"Dióxido de silício (SiO₂) - Areia/Quartzo", type:"Óxido", bond:"Covalente", energy:null, state:"Sólido"},
  "Ca,O": {name:"Óxido de cálcio (CaO) - Cal", type:"Óxido", bond:"Iônico", energy:null, state:"Sólido"},
  "Na,H": {name:"Hidreto de sódio (NaH) — representativo", type:"Hidreto", bond:"Iônico", energy:null, state:"Sólido"},
  "K,OH": {name:"HidrÓxido de potássio (KOH) — representativo", type:"Base", bond:"Iônico", energy:null, state:"Sólido"},
  "Na,OH": {name:"Hidróxido de sódio (NaOH)", type:"Base", bond:"Iônico", energy:null, state:"Sólido"},
  "H,SO4": {name:"Ácido sulfúrico (H₂SO₄) — representativo", type:"Ácido", bond:"Iônico/Covalente", energy:null, state:"Líquido"},
  "H,NO3": {name:"Ácido nítrico (HNO₃) — representativo", type:"Ácido", bond:"Iônico/Covalente", energy:null, state:"Líquido"},
  "C,H": {name:"Hidrocarboneto simples", type:"Orgânico", bond:"Covalente", energy:null, state:"Gás/Líquido"},
  "O,H,H": {name:"Peróxido de hidrogênio (H₂O₂) simplificado", type:"Peróxido", bond:"Covalente", energy:null, state:"Líquido"},
  "Fe,S": {name:"Sulfeto de ferro (FeS) — representativo", type:"Sulfeto", bond:"Iônico", energy:null, state:"Sólido"},
  "Zn,S": {name:"Sulfeto de zinco (ZnS)", type:"Sulfeto", bond:"Iônico", energy:null, state:"Sólido"},
  "Al,Si,O": {name:"Silicato (representativo)", type:"Silicato", bond:"Covalente/ Iônico", energy:null, state:"Sólido"},
  "Cu,SO4": {name:"Sulfato de cobre (CuSO₄) — representativo", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "Pb,SO4": {name:"Sulfato de chumbo (PbSO₄) — representativo", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"},
  "Ag,NO3,Cl": {name:"Reação AgNO₃ + Cl- -> AgCl (precipitado) — representativo", type:"Precipitado", bond:"Iônico", energy:null, state:"Sólido"},
  // Ligas adicionais
  "Fe,Ni,Cr": {name:"Aço inox (Fe-Ni-Cr) simplificado", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Ti,Al,V": {name:"Liga Ti-Al-V (representativa)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Cu,Au": {name:"Ouro-cobre (liga)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  "Sn,Pb": {name:"Liga de estanho-chumbo (solder-like)", type:"Liga", bond:"Metálico", energy:null, state:"Sólido"},
  // gases e diatômicos
  "O,O": {name:"Oxigênio (O₂)", type:"Gás diatômico", bond:"Covalente dupla", energy:null, state:"Gás"},
  "Cl,Cl": {name:"Cloro (Cl₂)", type:"Gás diatômico", bond:"Covalente", energy:null, state:"Gás"},
  "Br,Br": {name:"Bromo (Br₂)", type:"Líquido diatômico", bond:"Covalente", energy:null, state:"Líquido"},
  "I,I": {name:"Iodo (I₂)", type:"Sólido diatômico", bond:"Covalente", energy:null, state:"Sólido"},
  // misc
  "C,C": {name:"Diamante/Carvão (forma de carbono)", type:"Alótropo", bond:"Covalente", energy:null, state:"Sólido"},
  "N,H,H,H": {name:"Amoníaco (NH₃) forma reduzida", type:"Base", bond:"Covalente", energy:null, state:"Gás"},
  "Na,CO3": {name:"Carbonato de sódio (Na₂CO₃) — representativo", type:"Sal", bond:"Iônico", energy:null, state:"Sólido"}
};

/* --------------- App state & roots --------------- */
const elementListRoot = document.getElementById('elementList');
const stage = document.getElementById('stage');
const grid = document.getElementById('grid');
const modalRoot = document.getElementById('modalRoot');
const fx = document.getElementById('fxCanvas');
const fxCtx = fx.getContext('2d');
const search = document.getElementById('search');
const exportBtn = document.getElementById('exportBtn');
const themeToggle = document.getElementById('themeToggle');
const collapseBtn = document.getElementById('collapseBtn');

let instances = []; // on-stage items
let history = [];

/* --------------- Helpers: UID & family class --------------- */
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function familyClass(f){
  if(!f) return 'f-Unknown'; if(f.includes('Noble')) return 'f-Noble';
  if(f.includes('Alkali')) return 'f-Alkali'; if(f.includes('Alkaline')) return 'f-Alkaline';
  if(f.includes('Metalloid')) return 'f-Metalloid'; if(f.includes('Transition')) return 'f-Transition';
  if(f.includes('Post')) return 'f-Post'; if(f.includes('Halogen')) return 'f-Halogen';
  if(f.includes('Lanthanide')) return 'f-Lanthanide'; if(f.includes('Actinide')) return 'f-Actinide';
  if(f.includes('Nonmetal')) return 'f-Nonmetal'; return 'f-Unknown';
}

/* --------------- Deterministic 8x8 pattern (64-bits) --------------- */
function patternFor(el){
  // simple xorshift seeded by atomic number + symbol
  let seed = (el.z * 1664525 + 1013904223) >>> 0;
  for(let i=0;i<el.symbol.length;i++) seed = (seed ^ el.symbol.charCodeAt(i) * 2654435761) >>> 0;
  let s='';
  for(let i=0;i<64;i++){
    seed ^= seed << 13; seed >>>= 0;
    seed ^= seed >>> 17; seed >>>= 0;
    seed ^= seed << 5;  seed >>>= 0;
    s += ((seed & 1) ? '1':'0');
    seed = ((seed >>> 1) | ((seed & 1) << 31)) >>> 0;
  }
  return s;
}

/* --------------- SVG pixel-icon generator (64x64) --------------- */
function svgIconFor(el, size=64){
  // color palette by family
  const palette = {
    'Nonmetal':'#ef4444','Noble':'#60a5fa','Alkali':'#fb923c','Alkaline':'#fde047','Metalloid':'#a78bfa',
    'Transition':'#06b6d4','Post':'#f97316','Halogen':'#34d399','Lanthanide':'#f472b6','Actinide':'#fb7185','Unknown':'#94a3b8'
  };
  const base = palette[el.family] || '#94a3b8';

  // special gold bar for Ouro
  if(el.symbol === 'Au'){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
      <rect x='6' y='18' rx='8' width='${size-12}' height='${size-36}' fill='#D4AF37' stroke='#b68f2b' stroke-width='2'/>
      <text x='50%' y='56%' font-size='12' text-anchor='middle' fill='#603d09' font-weight='700'>Au</text>
    </svg>`;
    return encodeURIComponent(svg);
  }

  const p = patternFor(el);
  // draw background rounded rectangle in base color
  const cell = Math.floor((size - 10) / 8); // cell size
  const gap = Math.max(1, Math.floor((size - 10 - 8*cell) / 7));
  let rects = '';
  const offset = 5;
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const i = r*8 + c;
      const on = p[i] === '1';
      const x = offset + c*(cell+gap);
      const y = offset + r*(cell+gap);
      rects += `<rect x='${x}' y='${y}' width='${cell}' height='${cell}' rx='1' fill='${on? '#083344': 'rgba(255,255,255,0.55)'}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <rect width='100%' height='100%' rx='12' fill='${base}'/>
    ${rects}
    <text x='50%' y='13' font-size='12' text-anchor='middle' fill='white' font-weight='800'>${el.symbol}</text>
  </svg>`;
  return encodeURIComponent(svg);
}

/* --------------- Compound SVG generator (simple) --------------- */
function compoundSVG(obj){
  // create a combined small icon using first two symbols or pattern
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'>
    <rect rx='10' width='100%' height='100%' fill='#f3f4f6'/>
    <circle cx='22' cy='32' r='12' fill='#c7d2fe'/>
    <circle cx='42' cy='32' r='12' fill='#fef08a'/>
    <text x='22' y='36' text-anchor='middle' font-size='10' font-weight='700' fill='#071124'>${(obj.symbols && obj.symbols[0])||'C'}</text>
    <text x='42' y='36' text-anchor='middle' font-size='10' font-weight='700' fill='#071124'>${(obj.symbols && obj.symbols[1])||'O'}</text>
  </svg>`;
  return encodeURIComponent(svg);
}

/* --------------- Render sidebar --------------- */
function renderSidebar(filter=''){
  elementListRoot.innerHTML = '';
  const q = (filter||'').trim().toLowerCase();
  for(const el of ELEMENTS){
    if(q && !(el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q))) continue;
    const row = document.createElement('div'); row.className='element'; row.draggable=true; row.dataset.symbol = el.symbol;
    row.ondragstart = ev => { ev.dataTransfer.setData('application/json', JSON.stringify({from:'sidebar', symbol:el.symbol})); ev.dataTransfer.effectAllowed='copy'; };
    const badge = document.createElement('div'); badge.className = 'badge ' + familyClass(el.family);
    badge.innerHTML = `<img src="data:image/svg+xml;utf8,${svgIconFor(el,56)}" width="56" height="56" alt="${el.symbol}">`;
    const meta = document.createElement('div'); meta.className = 'el-meta';
    const name = document.createElement('div'); name.className='el-name'; name.textContent = `${el.symbol} — ${el.name}`;
    const sub = document.createElement('div'); sub.className='el-sub'; sub.textContent = `#${el.z} • ${el.family}`;
    meta.appendChild(name); meta.appendChild(sub); row.appendChild(badge); row.appendChild(meta);
    elementListRoot.appendChild(row);
  }
}

/* --------------- Stage drop -> create instance --------------- */
stage.ondragover = ev => ev.preventDefault();
stage.ondrop = ev => {
  ev.preventDefault();
  const j = ev.dataTransfer.getData('application/json'); if(!j) return;
  const p = JSON.parse(j);
  if(p.from === 'sidebar'){
    const el = ELEMENTS.find(x => x.symbol === p.symbol);
    if(!el) return;
    const rect = stage.getBoundingClientRect();
    const x = Math.max(8, Math.min(rect.width - 180, ev.clientX - rect.left - 40));
    const y = Math.max(8, Math.min(rect.height - 100, ev.clientY - rect.top - 30));
    addInstance({type:'element', symbols:[el.symbol], el, x, y});
  }
};

/* --------------- Add instance & render --------------- */
function addInstance(obj){
  obj.id = uid();
  instances.push(obj);
  renderInstance(obj);
}

function renderInstance(obj){
  const elDiv = document.createElement('div'); elDiv.className='atom-card'; elDiv.dataset.id = obj.id; elDiv.style.left = (obj.x||40) + 'px'; elDiv.style.top = (obj.y||40) + 'px';
  if(obj.type === 'element'){
    const svg64 = svgIconFor(obj.el,64);
    elDiv.innerHTML = `<div class="icon-64"><img src="data:image/svg+xml;utf8,${svg64}" width="64" height="64" alt="${obj.el.symbol}"></div>
      <div class="card-body"><div class="symbol">${obj.el.symbol}</div><div class="meta">${obj.el.name} • #${obj.el.z}</div><div class="bitgrid">${renderBitGrid(obj.el)}</div></div>`;
  } else if(obj.type === 'compound'){
    const cs = compoundSVG(obj);
    elDiv.innerHTML = `<div class="icon-64"><img src="data:image/svg+xml;utf8,${cs}" width="64" height="64"></div>
      <div class="card-body"><div class="symbol">${obj.name}</div><div class="meta">${obj.kind} • ${obj.state||''}</div></div>`;
  } else {
    const wasteSvg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect x='6' y='10' width='52' height='44' rx='6' fill='#9ca3af'/><text x='32' y='40' font-size='12' text-anchor='middle' fill='#374151'>lixo</text></svg>`);
    elDiv.innerHTML = `<div class="icon-64"><img src="data:image/svg+xml;utf8,${wasteSvg}" width="64" height="64"></div>
      <div class="card-body"><div class="symbol" style="color:#6b7280">lixo</div><div class="meta">Pilha de pó</div></div>`;
  }
  grid.appendChild(elDiv);
  makeDraggable(elDiv, obj);
}

/* --------------- bitgrid small svg --------------- */
function renderBitGrid(el){
  const p = patternFor(el);
  let s = `<svg width="64" height="28" viewBox="0 0 64 28" xmlns="http://www.w3.org/2000/svg">`;
  const w=3; const gap=1; const cols=8; const rows=8;
  const startX=1; const startY=1;
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const i = r*8+c;
      const on = p[i] === '1';
      const x = startX + c*(w+gap);
      const y = startY + r*(w+gap);
      s += `<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="0.6" fill="${on? '#083344':'#e6f6fb'}"/>`;
    }
  }
  s += `</svg>`;
  return s;
}

/* --------------- make draggable (mouse + touch) --------------- */
function makeDraggable(dom, instance){
  let dragging=false, offsetX=0, offsetY=0;
  function down(e){
    e.preventDefault();
    dragging=true; dom.classList.add('dragging');
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const r = dom.getBoundingClientRect();
    offsetX = cx - r.left; offsetY = cy - r.top;
    window.addEventListener(e.touches ? 'touchmove' : 'mousemove', move);
    window.addEventListener(e.touches ? 'touchend' : 'mouseup', up, {once:true});
  }
  function move(e){
    if(!dragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = stage.getBoundingClientRect();
    let nx = cx - rect.left - offsetX;
    let ny = cy - rect.top - offsetY;
    nx = Math.max(8, Math.min(rect.width - dom.offsetWidth - 8, nx));
    ny = Math.max(8, Math.min(rect.height - dom.offsetHeight - 8, ny));
    dom.style.left = nx + 'px'; dom.style.top = ny + 'px';
    instance.x = nx; instance.y = ny;
  }
  function up(e){
    dragging=false; dom.classList.remove('dragging');
    checkCombine(instance);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('touchmove', move);
  }
  dom.addEventListener('mousedown', down);
  dom.addEventListener('touchstart', down, {passive:false});
  dom.addEventListener('dblclick', ()=> viewInstance(instance));
}

/* --------------- helper: get DOM rect relative to stage --------------- */
function getDomRectForId(id){
  const el = grid.querySelector(`[data-id="${id}"]`);
  if(!el) return null;
  const stageRect = stage.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {left: r.left - stageRect.left, top: r.top - stageRect.top, right: r.right - stageRect.left, bottom: r.bottom - stageRect.top};
}
function rectOverlap(a,b){ return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom); }

/* --------------- combination detection & perform --------------- */
function checkCombine(src){
  const rectSrc = getDomRectForId(src.id); if(!rectSrc) return;
  for(const other of instances){
    if(other.id === src.id) continue;
    const rectOther = getDomRectForId(other.id); if(!rectOther) continue;
    if(rectOverlap(rectSrc, rectOther)){ performCombination(src, other); return; }
  }
}
function performCombination(a,b){
  const combined = [...a.symbols, ...b.symbols];
  const keys = generateKeys(combined);
  let matched = null;
  for(const k of keys){ if(REACTIONS[k]){ matched = REACTIONS[k]; matched._key = k; break; } }
  removeInstance(a.id); removeInstance(b.id);
  if(matched){
    const obj = {id:uid(), type:'compound', name:matched.name, kind:matched.type, symbols:combined, state:matched.state};
    instances.push(obj); renderInstance(obj);
    history.push({time:Date.now(), input:combined, result:matched.name});
    burstFx('success'); showReactionModal(matched, combined);
  } else {
    const obj = {id:uid(), type:'waste', symbols:combined}; instances.push(obj); renderInstance(obj);
    history.push({time:Date.now(), input:combined, result:'lixo'});
    burstFx('waste'); showReactionModal({name:'lixo', type:'Pilha de pó', bond:'-'}, combined);
  }
}
function generateKeys(symbols){
  const combos = [];
  combos.push(symbols.slice().sort().join(','));
  combos.push(Array.from(new Set(symbols)).sort().join(','));
  if(symbols.length>=2){
    for(let i=0;i<symbols.length;i++){
      for(let j=i+1;j<symbols.length;j++){
        combos.push([symbols[i],symbols[j]].slice().sort().join(','));
      }
    }
  }
  if(symbols.length>2) combos.push(symbols.join(','));
  return Array.from(new Set(combos));
}
function removeInstance(id){
  const idx = instances.findIndex(x=>x.id===id); if(idx>=0) instances.splice(idx,1);
  const el = grid.querySelector(`[data-id="${id}"]`); if(el) el.remove();
}

/* --------------- modal for reaction/result --------------- */
function showReactionModal(meta, input){
  modalRoot.innerHTML = '';
  const back = document.createElement('div'); back.className='modal-back'; back.onclick = closeModal;
  const box = document.createElement('div'); box.className='modal';
  box.innerHTML = `<h3>${meta.name}</h3><div style="color:#666;margin-top:6px">${meta.type || ''} • ${meta.bond || ''}</div>
    <p style="margin-top:10px">Elementos: ${input.join(', ')}</p>
    <div class="row"><div class="pill">Energia: ${meta.energy==null? '—' : meta.energy + ' kJ/mol'}</div><div class="pill">Estado: ${meta.state || '—'}</div></div>
    <div style="margin-top:12px"><button class="btn" id="closeReactionBtn">Fechar</button></div>`;
  back.appendChild(box); modalRoot.appendChild(back);
  document.getElementById('closeReactionBtn').onclick = closeModal;
}
function viewInstance(inst){
  if(!inst) return;
  if(inst.type === 'element'){
    const el = inst.el;
    const neutrons = Math.max(0, Math.round(el.mass) - el.z);
    modalRoot.innerHTML = '';
    const back = document.createElement('div'); back.className='modal-back'; back.onclick = closeModal;
    const box = document.createElement('div'); box.className='modal';
    box.innerHTML = `<h3>${el.name} (${el.symbol})</h3><div style="color:#666;margin-top:6px">Família: ${el.family} • Massa: ${el.mass}</div>
      <p style="margin-top:10px">${el.desc}</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">
        <div class="pill">Prótons<br><strong>${el.z}</strong></div>
        <div class="pill">Nêutrons<br><strong>${neutrons}</strong></div>
        <div class="pill">Elétrons<br><strong>${el.z}</strong></div>
      </div>
      <div style="margin-top:12px"><button class="btn" id="viewAtomBtn">Ver átomo</button> <button class="btn ghost" id="closeElBtn">Fechar</button></div>`;
    back.appendChild(box); modalRoot.appendChild(back);
    document.getElementById('closeElBtn').onclick = closeModal;
    document.getElementById('viewAtomBtn').onclick = ()=> viewAtom(el);
  } else {
    showReactionModal({name:inst.name || 'lixo', type: inst.kind || '—'}, inst.symbols);
  }
}
function closeModal(){ modalRoot.innerHTML = ''; }

/* --------------- view atom with orbit animation --------------- */
function viewAtom(el){
  modalRoot.innerHTML = '';
  const back = document.createElement('div'); back.className='modal-back'; back.onclick = closeModal;
  const box = document.createElement('div'); box.className='modal';
  const neutrons = Math.max(0, Math.round(el.mass) - el.z);
  box.innerHTML = `<h3>Átomo de ${el.name} (${el.symbol})</h3>
    <div style="margin-top:8px;color:#666">Prótons: ${el.z} • Nêutrons: ${neutrons} • Elétrons: ${el.z}</div>
    <div id="atomCanvas" style="width:100%;height:240px;margin-top:12px"></div>
    <div style="margin-top:12px"><button class="btn ghost" id="closeAtomBtn">Fechar</button></div>`;
  back.appendChild(box); modalRoot.appendChild(back);
  document.getElementById('closeAtomBtn').onclick = closeModal;
  // draw simple orbits
  const container = document.getElementById('atomCanvas');
  const canvas = document.createElement('canvas');
  canvas.width = container.clientWidth || 600; canvas.height = 220;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let t=0;
  function anim(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2, cy = 110;
    // nucleus
    ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fillStyle='#ffd580'; ctx.fill();
    ctx.fillStyle='#50350b'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center'; ctx.fillText(el.symbol, cx, cy+4);
    // shells
    const shells = [2,8,18,32];
    let remaining = el.z; let radius = 34;
    for(let s=0;s<4 && remaining>0;s++){
      const count = Math.min(remaining, shells[s]); remaining -= count;
      ctx.beginPath(); ctx.strokeStyle='rgba(100,150,255,0.25)'; ctx.lineWidth=1; ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.stroke();
      for(let i=0;i<count;i++){
        const ang = (i/Math.max(1,count))*Math.PI*2 + t*0.01*(s+1);
        const ex = cx + Math.cos(ang)*radius; const ey = cy + Math.sin(ang)*radius;
        ctx.beginPath(); ctx.arc(ex,ey,6,0,Math.PI*2); ctx.fillStyle='#60a5fa'; ctx.fill();
      }
      radius += 20;
    }
    t++; requestAnimationFrame(anim);
  }
  anim();
  }

/* --------------- FX particles --------------- */
let particles = [];
function burstFx(kind='mix'){
  const rect = stage.getBoundingClientRect();
  const x0 = rect.left + rect.width/2;
  const y0 = rect.top + rect.height/2;
  const colors = kind==='success' ? ['#ffd580','#fff1c2','#ffd9a8'] : kind==='waste' ? ['#9ca3af','#d1d5db'] : ['#06b6d4','#60a5fa','#fb7185'];
  for(let i=0;i<28;i++) particles.push({x: x0 + (Math.random()-0.5)*200, y: y0 + (Math.random()-0.5)*200, vx:(Math.random()-0.5)*6, vy:(Math.random()-1.2)*6, life:60+Math.random()*40, color:colors[Math.floor(Math.random()*colors.length)], size:2+Math.random()*6, drag:0.98});
}
function updateFx(){ fx.width = window.innerWidth; fx.height = window.innerHeight; fxCtx.clearRect(0,0,fx.width,fx.height);
  for(let i=particles.length-1;i>=0;i--){ const p = particles[i]; p.vy += 0.12; p.vx *= p.drag; p.vy *= p.drag; p.x += p.vx; p.y += p.vy; p.life -= 1; fxCtx.globalAlpha = Math.max(0,Math.min(1,p.life/80)); fxCtx.fillStyle = p.color; fxCtx.beginPath(); fxCtx.arc(p.x,p.y,p.size,0,Math.PI*2); fxCtx.fill(); if(p.life<=0) particles.splice(i,1); }
  requestAnimationFrame(updateFx);
}
updateFx();

/* --------------- export history --------------- */
function exportHistory(){ const blob = new Blob([JSON.stringify(history,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='tabela_quimica_history.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

/* --------------- search & UI bindings --------------- */
search.addEventListener('input', e=> renderSidebar(e.target.value));
exportBtn.addEventListener('click', exportHistory);
themeToggle.addEventListener('click', ()=>{
  const root = document.body;
  if(root.getAttribute('data-theme') === 'dark'){ root.removeAttribute('data-theme'); themeToggle.textContent='Tema'; }
  else { root.setAttribute('data-theme','dark'); themeToggle.textContent='Tema (claro)'; }
});
collapseBtn.addEventListener('click', ()=>{
  document.querySelector('.sidebar').classList.toggle('collapsed');
  if(document.querySelector('.sidebar').classList.contains('collapsed')){
    document.querySelector('.sidebar').style.width='72px';
    document.querySelector('.list').style.display='none';
  } else {
    document.querySelector('.sidebar').style.width='320px';
    document.querySelector('.list').style.display='block';
  }
});

/* --------------- initial render + demo atoms --------------- */
renderSidebar('');
addInstance({type:'element', symbols:['H'], el: ELEMENTS.find(e=>e.symbol==='H'), x:40, y:40});
addInstance({type:'element', symbols:['O'], el: ELEMENTS.find(e=>e.symbol==='O'), x:40, y:180});
addInstance({type:'element', symbols:['Au'], el: ELEMENTS.find(e=>e.symbol==='Au'), x:40, y:320});

/* expose for debugging */
window.viewInstance = viewInstance;
window.addInstance = addInstance;
window.exportHistory = exportHistory;
