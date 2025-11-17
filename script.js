/* script.js — versão completa (118 elementos, reações reais, pixel-art bloco 64x64, som retrô)
   Usa Howler.js via CDN (in index.html).
   IMPORTANTE: não remova vírgulas ou aspas dentro do array ELEMENTS.
*/

/* ----------------- ELEMENTS (118) -----------------
   Campos: z, symbol, name, family, mass, period, group, state, color, desc
*/
const ELEMENTS = [
{"z":1,"symbol":"H","name":"Hydrogen","family":"Nonmetal","mass":1.008,"period":1,"group":1,"state":"gas","color":"#FFFFFF","desc":"Lightest element, diatomic gas."},
{"z":2,"symbol":"He","name":"Helium","family":"Noble","mass":4.0026,"period":1,"group":18,"state":"gas","color":"#D9FFFF","desc":"Inert noble gas."},
{"z":3,"symbol":"Li","name":"Lithium","family":"Alkali","mass":6.94,"period":2,"group":1,"state":"solid","color":"#CC80FF","desc":"Soft, reactive metal used in batteries."},
{"z":4,"symbol":"Be","name":"Beryllium","family":"Alkaline","mass":9.0122,"period":2,"group":2,"state":"solid","color":"#C2FF00","desc":"Light, stiff metal."},
{"z":5,"symbol":"B","name":"Boron","family":"Metalloid","mass":10.81,"period":2,"group":13,"state":"solid","color":"#FFB5B5","desc":"Metalloid used in ceramics."},
{"z":6,"symbol":"C","name":"Carbon","family":"Nonmetal","mass":12.011,"period":2,"group":14,"state":"solid","color":"#909090","desc":"Basis of organic chemistry."},
{"z":7,"symbol":"N","name":"Nitrogen","family":"Nonmetal","mass":14.007,"period":2,"group":15,"state":"gas","color":"#3050F8","desc":"Major component of air."},
{"z":8,"symbol":"O","name":"Oxygen","family":"Nonmetal","mass":15.999,"period":2,"group":16,"state":"gas","color":"#FF0D0D","desc":"Essential for respiration."},
{"z":9,"symbol":"F","name":"Fluorine","family":"Halogen","mass":18.998,"period":2,"group":17,"state":"gas","color":"#90E050","desc":"Very reactive halogen."},
{"z":10,"symbol":"Ne","name":"Neon","family":"Noble","mass":20.180,"period":2,"group":18,"state":"gas","color":"#B3E3F5","desc":"Inert gas used in signs."},
{"z":11,"symbol":"Na","name":"Sodium","family":"Alkali","mass":22.990,"period":3,"group":1,"state":"solid","color":"#AB5CF2","desc":"Reactive soft metal."},
{"z":12,"symbol":"Mg","name":"Magnesium","family":"Alkaline","mass":24.305,"period":3,"group":2,"state":"solid","color":"#8AFF00","desc":"Light metal, reacts with acids."},
{"z":13,"symbol":"Al","name":"Aluminium","family":"Post","mass":26.982,"period":3,"group":13,"state":"solid","color":"#BFA6A6","desc":"Light and corrosion resistant."},
{"z":14,"symbol":"Si","name":"Silicon","family":"Metalloid","mass":28.085,"period":3,"group":14,"state":"solid","color":"#F0C8A0","desc":"Semiconductor."},
{"z":15,"symbol":"P","name":"Phosphorus","family":"Nonmetal","mass":30.974,"period":3,"group":15,"state":"solid","color":"#FF8000","desc":"Biologically important."},
{"z":16,"symbol":"S","name":"Sulfur","family":"Nonmetal","mass":32.06,"period":3,"group":16,"state":"solid","color":"#FFFF30","desc":"Yellow solid used industrially."},
{"z":17,"symbol":"Cl","name":"Chlorine","family":"Halogen","mass":35.45,"period":3,"group":17,"state":"gas","color":"#1FF01F","desc":"Used for disinfection."},
{"z":18,"symbol":"Ar","name":"Argon","family":"Noble","mass":39.948,"period":3,"group":18,"state":"gas","color":"#80D1E3","desc":"Inert noble gas."},
{"z":19,"symbol":"K","name":"Potassium","family":"Alkali","mass":39.098,"period":4,"group":1,"state":"solid","color":"#8F40D4","desc":"Very reactive metal."},
{"z":20,"symbol":"Ca","name":"Calcium","family":"Alkaline","mass":40.078,"period":4,"group":2,"state":"solid","color":"#3DFF00","desc":"Important for bones."},
{"z":21,"symbol":"Sc","name":"Scandium","family":"Transition","mass":44.956,"period":4,"group":3,"state":"solid","color":"#E6E6E6","desc":"Light transition metal."},
{"z":22,"symbol":"Ti","name":"Titanium","family":"Transition","mass":47.867,"period":4,"group":4,"state":"solid","color":"#BFC2C7","desc":"Strong and corrosion resistant."},
{"z":23,"symbol":"V","name":"Vanadium","family":"Transition","mass":50.942,"period":4,"group":5,"state":"solid","color":"#A6A6AB","desc":"Used in steel alloys."},
{"z":24,"symbol":"Cr","name":"Chromium","family":"Transition","mass":51.996,"period":4,"group":6,"state":"solid","color":"#8A99C7","desc":"Hard, corrosion-resistant."},
{"z":25,"symbol":"Mn","name":"Manganese","family":"Transition","mass":54.938,"period":4,"group":7,"state":"solid","color":"#9C7AC7","desc":"Used in alloys."},
{"z":26,"symbol":"Fe","name":"Iron","family":"Transition","mass":55.845,"period":4,"group":8,"state":"solid","color":"#E06633","desc":"Core metal of steel."},
{"z":27,"symbol":"Co","name":"Cobalt","family":"Transition","mass":58.933,"period":4,"group":9,"state":"solid","color":"#F090A0","desc":"Used in batteries and alloys."},
{"z":28,"symbol":"Ni","name":"Nickel","family":"Transition","mass":58.693,"period":4,"group":10,"state":"solid","color":"#50D050","desc":"Magnetic transition metal."},
{"z":29,"symbol":"Cu","name":"Copper","family":"Transition","mass":63.546,"period":4,"group":11,"state":"solid","color":"#C88033","desc":"Conductive, used in wiring."},
{"z":30,"symbol":"Zn","name":"Zinc","family":"Transition","mass":65.38,"period":4,"group":12,"state":"solid","color":"#7D80B0","desc":"Used for galvanizing steel."},
{"z":31,"symbol":"Ga","name":"Gallium","family":"Post","mass":69.723,"period":4,"group":13,"state":"solid","color":"#C28F8F","desc":"Melts near room temperature."},
{"z":32,"symbol":"Ge","name":"Germanium","family":"Metalloid","mass":72.63,"period":4,"group":14,"state":"solid","color":"#668F8F","desc":"Semiconductor element."},
{"z":33,"symbol":"As","name":"Arsenic","family":"Metalloid","mass":74.922,"period":4,"group":15,"state":"solid","color":"#BD80E3","desc":"Toxic metalloid."},
{"z":34,"symbol":"Se","name":"Selenium","family":"Nonmetal","mass":78.971,"period":4,"group":16,"state":"solid","color":"#FFA100","desc":"Important trace element."},
{"z":35,"symbol":"Br","name":"Bromine","family":"Halogen","mass":79.904,"period":4,"group":17,"state":"liquid","color":"#A62929","desc":"Red-brown liquid at room temp."},
{"z":36,"symbol":"Kr","name":"Krypton","family":"Noble","mass":83.798,"period":4,"group":18,"state":"gas","color":"#8FA8DB","desc":"Inert noble gas."},
{"z":37,"symbol":"Rb","name":"Rubidium","family":"Alkali","mass":85.468,"period":5,"group":1,"state":"solid","color":"#702EB0","desc":"Soft, highly reactive metal."},
{"z":38,"symbol":"Sr","name":"Strontium","family":"Alkaline","mass":87.62,"period":5,"group":2,"state":"solid","color":"#00FF00","desc":"Used in fireworks."},
{"z":39,"symbol":"Y","name":"Yttrium","family":"Transition","mass":88.906,"period":5,"group":3,"state":"solid","color":"#94FFFF","desc":"Used in electronics."},
{"z":40,"symbol":"Zr","name":"Zirconium","family":"Transition","mass":91.224,"period":5,"group":4,"state":"solid","color":"#94E0E0","desc":"Resistant to corrosion."},
{"z":41,"symbol":"Nb","name":"Niobium","family":"Transition","mass":92.906,"period":5,"group":5,"state":"solid","color":"#73C2C9","desc":"Used in alloys and superconductors."},
{"z":42,"symbol":"Mo","name":"Molybdenum","family":"Transition","mass":95.95,"period":5,"group":6,"state":"solid","color":"#54B5B5","desc":"Used in steel alloys."},
{"z":43,"symbol":"Tc","name":"Technetium","family":"Transition","mass":98,"period":5,"group":7,"state":"solid","color":"#428296","desc":"Radioactive, first artificial element."},
{"z":44,"symbol":"Ru","name":"Ruthenium","family":"Transition","mass":101.07,"period":5,"group":8,"state":"solid","color":"#3B9E9E","desc":"Used in electronics."},
{"z":45,"symbol":"Rh","name":"Rhodium","family":"Transition","mass":102.91,"period":5,"group":9,"state":"solid","color":"#2F7D7D","desc":"Rare, used in catalysts."},
{"z":46,"symbol":"Pd","name":"Palladium","family":"Transition","mass":106.42,"period":5,"group":10,"state":"solid","color":"#006985","desc":"Catalyst and jewelry."},
{"z":47,"symbol":"Ag","name":"Silver","family":"Transition","mass":107.87,"period":5,"group":11,"state":"solid","color":"#C0C0C0","desc":"Highly conductive metal."},
{"z":48,"symbol":"Cd","name":"Cadmium","family":"Transition","mass":112.41,"period":5,"group":12,"state":"solid","color":"#FFD98F","desc":"Toxic, used in batteries."},
{"z":49,"symbol":"In","name":"Indium","family":"Post","mass":114.82,"period":5,"group":13,"state":"solid","color":"#A67573","desc":"Soft, used in electronics."},
{"z":50,"symbol":"Sn","name":"Tin","family":"Post","mass":118.71,"period":5,"group":14,"state":"solid","color":"#668080","desc":"Used as coating for steel."},
{"z":51,"symbol":"Sb","name":"Antimony","family":"Metalloid","mass":121.76,"period":5,"group":15,"state":"solid","color":"#9E63B5","desc":"Used in alloys."},
{"z":52,"symbol":"Te","name":"Tellurium","family":"Metalloid","mass":127.60,"period":5,"group":16,"state":"solid","color":"#D47A00","desc":"Rare metalloid."},
{"z":53,"symbol":"I","name":"Iodine","family":"Halogen","mass":126.90,"period":5,"group":17,"state":"solid","color":"#940094","desc":"Essential trace element; disinfectant."},
{"z":54,"symbol":"Xe","name":"Xenon","family":"Noble","mass":131.29,"period":5,"group":18,"state":"gas","color":"#429EB0","desc":"Heavy noble gas."},
{"z":55,"symbol":"Cs","name":"Caesium","family":"Alkali","mass":132.91,"period":6,"group":1,"state":"solid","color":"#57178F","desc":"Highly reactive metal."},
{"z":56,"symbol":"Ba","name":"Barium","family":"Alkaline","mass":137.33,"period":6,"group":2,"state":"solid","color":"#00C900","desc":"Used in drilling fluids."},
{"z":57,"symbol":"La","name":"Lanthanum","family":"Lanthanide","mass":138.91,"period":6,"group":null,"state":"solid","color":"#70D4FF","desc":"First of lanthanides."},
{"z":58,"symbol":"Ce","name":"Cerium","family":"Lanthanide","mass":140.12,"period":6,"group":null,"state":"solid","color":"#FFFFC7","desc":"Used in catalysts."},
{"z":59,"symbol":"Pr","name":"Praseodymium","family":"Lanthanide","mass":140.91,"period":6,"group":null,"state":"solid","color":"#D9FFC7","desc":"Used in magnets."},
{"z":60,"symbol":"Nd","name":"Neodymium","family":"Lanthanide","mass":144.24,"period":6,"group":null,"state":"solid","color":"#C7FFC7","desc":"Strong permanent magnets."},
{"z":61,"symbol":"Pm","name":"Promethium","family":"Lanthanide","mass":145,"period":6,"group":null,"state":"solid","color":"#A3FFC7","desc":"Radioactive lanthanide."},
{"z":62,"symbol":"Sm","name":"Samarium","family":"Lanthanide","mass":150.36,"period":6,"group":null,"state":"solid","color":"#8FFFC7","desc":"Used in magnets."},
{"z":63,"symbol":"Eu","name":"Europium","family":"Lanthanide","mass":151.96,"period":6,"group":null,"state":"solid","color":"#61FFC7","desc":"Used in phosphors."},
{"z":64,"symbol":"Gd","name":"Gadolinium","family":"Lanthanide","mass":157.25,"period":6,"group":null,"state":"solid","color":"#45FFC7","desc":"Used in MRI contrast."},
{"z":65,"symbol":"Tb","name":"Terbium","family":"Lanthanide","mass":158.93,"period":6,"group":null,"state":"solid","color":"#30FFC7","desc":"Used in electronics."},
{"z":66,"symbol":"Dy","name":"Dysprosium","family":"Lanthanide","mass":162.50,"period":6,"group":null,"state":"solid","color":"#1FFFC7","desc":"Used in magnets."},
{"z":67,"symbol":"Ho","name":"Holmium","family":"Lanthanide","mass":164.93,"period":6,"group":null,"state":"solid","color":"#00FF9D","desc":"Rare earth metal."},
{"z":68,"symbol":"Er","name":"Erbium","family":"Lanthanide","mass":167.26,"period":6,"group":null,"state":"solid","color":"#00E675","desc":"Used in fiber optics."},
{"z":69,"symbol":"Tm","name":"Thulium","family":"Lanthanide","mass":168.93,"period":6,"group":null,"state":"solid","color":"#00D450","desc":"Rare and expensive."},
{"z":70,"symbol":"Yb","name":"Ytterbium","family":"Lanthanide","mass":173.05,"period":6,"group":null,"state":"solid","color":"#00C238","desc":"Used in alloys."},
{"z":71,"symbol":"Lu","name":"Lutetium","family":"Lanthanide","mass":174.97,"period":6,"group":null,"state":"solid","color":"#00B000","desc":"Dense, rare."},
{"z":72,"symbol":"Hf","name":"Hafnium","family":"Transition","mass":178.49,"period":6,"group":4,"state":"solid","color":"#4D80CC","desc":"Used in nuclear control rods."},
{"z":73,"symbol":"Ta","name":"Tantalum","family":"Transition","mass":180.95,"period":6,"group":5,"state":"solid","color":"#4DA6FF","desc":"Used in capacitors."},
{"z":74,"symbol":"W","name":"Tungsten","family":"Transition","mass":183.84,"period":6,"group":6,"state":"solid","color":"#2194D6","desc":"Very high melting point."},
{"z":75,"symbol":"Re","name":"Rhenium","family":"Transition","mass":186.21,"period":6,"group":7,"state":"solid","color":"#267DAB","desc":"High melting point metal."},
{"z":76,"symbol":"Os","name":"Osmium","family":"Transition","mass":190.23,"period":6,"group":8,"state":"solid","color":"#266696","desc":"Very dense metal."},
{"z":77,"symbol":"Ir","name":"Iridium","family":"Transition","mass":192.22,"period":6,"group":9,"state":"solid","color":"#175487","desc":"Very corrosion-resistant."},
{"z":78,"symbol":"Pt","name":"Platinum","family":"Transition","mass":195.08,"period":6,"group":10,"state":"solid","color":"#D0D0E0","desc":"Catalyst and jewelry."},
{"z":79,"symbol":"Au","name":"Gold","family":"Transition","mass":196.97,"period":6,"group":11,"state":"solid","color":"#FFD700","desc":"Precious metal."},
{"z":80,"symbol":"Hg","name":"Mercury","family":"Transition","mass":200.59,"period":6,"group":12,"state":"liquid","color":"#B8B8D0","desc":"Liquid metal at room temp."},
{"z":81,"symbol":"Tl","name":"Thallium","family":"Post","mass":204.38,"period":6,"group":13,"state":"solid","color":"#A6544D","desc":"Toxic heavy metal."},
{"z":82,"symbol":"Pb","name":"Lead","family":"Post","mass":207.2,"period":6,"group":14,"state":"solid","color":"#575961","desc":"Toxic heavy metal."},
{"z":83,"symbol":"Bi","name":"Bismuth","family":"Post","mass":208.98,"period":6,"group":15,"state":"solid","color":"#9E4FB5","desc":"Low toxicity heavy metal."},
{"z":84,"symbol":"Po","name":"Polonium","family":"Metalloid","mass":209,"period":6,"group":16,"state":"solid","color":"#AB5CF2","desc":"Radioactive."},
{"z":85,"symbol":"At","name":"Astatine","family":"Halogen","mass":210,"period":6,"group":17,"state":"solid","color":"#754F45","desc":"Very rare radioactive halogen."},
{"z":86,"symbol":"Rn","name":"Radon","family":"Noble","mass":222,"period":6,"group":18,"state":"gas","color":"#428296","desc":"Radioactive noble gas."},
{"z":87,"symbol":"Fr","name":"Francium","family":"Alkali","mass":223,"period":7,"group":1,"state":"solid","color":"#420066","desc":"Extremely rare and radioactive."},
{"z":88,"symbol":"Ra","name":"Radium","family":"Alkaline","mass":226,"period":7,"group":2,"state":"solid","color":"#007D00","desc":"Radioactive alkaline earth."},
{"z":89,"symbol":"Ac","name":"Actinium","family":"Actinide","mass":227,"period":7,"group":null,"state":"solid","color":"#70ABFA","desc":"Radioactive actinide."},
{"z":90,"symbol":"Th","name":"Thorium","family":"Actinide","mass":232.04,"period":7,"group":null,"state":"solid","color":"#00A1FF","desc":"Radioactive, potential fuel."},
{"z":91,"symbol":"Pa","name":"Protactinium","family":"Actinide","mass":231.04,"period":7,"group":null,"state":"solid","color":"#00A1A1","desc":"Rare radioactive element."},
{"z":92,"symbol":"U","name":"Uranium","family":"Actinide","mass":238.03,"period":7,"group":null,"state":"solid","color":"#008FFF","desc":"Used as nuclear fuel."},
{"z":93,"symbol":"Np","name":"Neptunium","family":"Actinide","mass":237,"period":7,"group":null,"state":"solid","color":"#0080FF","desc":"Radioactive actinide."},
{"z":94,"symbol":"Pu","name":"Plutonium","family":"Actinide","mass":244,"period":7,"group":null,"state":"solid","color":"#006BFF","desc":"Radioactive, used in reactors/weapons."},
{"z":95,"symbol":"Am","name":"Americium","family":"Actinide","mass":243,"period":7,"group":null,"state":"solid","color":"#0000FF","desc":"Used in smoke detectors."},
{"z":96,"symbol":"Cm","name":"Curium","family":"Actinide","mass":247,"period":7,"group":null,"state":"solid","color":"#0000C7","desc":"Radioactive, synthetic."},
{"z":97,"symbol":"Bk","name":"Berkelium","family":"Actinide","mass":247,"period":7,"group":null,"state":"solid","color":"#6600FF","desc":"Synthetic radioactive."},
{"z":98,"symbol":"Cf","name":"Californium","family":"Actinide","mass":251,"period":7,"group":null,"state":"solid","color":"#9200C7","desc":"Highly radioactive."},
{"z":99,"symbol":"Es","name":"Einsteinium","family":"Actinide","mass":252,"period":7,"group":null,"state":"solid","color":"#B000B0","desc":"Synthetic isotope."},
{"z":100,"symbol":"Fm","name":"Fermium","family":"Actinide","mass":257,"period":7,"group":null,"state":"solid","color":"#C00078","desc":"Synthetic, rare."},
{"z":101,"symbol":"Md","name":"Mendelevium","family":"Actinide","mass":258,"period":7,"group":null,"state":"solid","color":"#D40054","desc":"Synthetic element."},
{"z":102,"symbol":"No","name":"Nobelium","family":"Actinide","mass":259,"period":7,"group":null,"state":"solid","color":"#F0004A","desc":"Synthetic."},
{"z":103,"symbol":"Lr","name":"Lawrencium","family":"Actinide","mass":266,"period":7,"group":null,"state":"solid","color":"#FF0040","desc":"Synthetic."},
{"z":104,"symbol":"Rf","name":"Rutherfordium","family":"Transition","mass":267,"period":7,"group":4,"state":"solid","color":"#FF2A2A","desc":"Synthetic."},
{"z":105,"symbol":"Db","name":"Dubnium","family":"Transition","mass":268,"period":7,"group":5,"state":"solid","color":"#FF3A3A","desc":"Synthetic."},
{"z":106,"symbol":"Sg","name":"Seaborgium","family":"Transition","mass":269,"period":7,"group":6,"state":"solid","color":"#FF4A4A","desc":"Synthetic."},
{"z":107,"symbol":"Bh","name":"Bohrium","family":"Transition","mass":270,"period":7,"group":7,"state":"solid","color":"#FF5A5A","desc":"Synthetic."},
{"z":108,"symbol":"Hs","name":"Hassium","family":"Transition","mass":269,"period":7,"group":8,"state":"solid","color":"#FF6A6A","desc":"Synthetic."},
{"z":109,"symbol":"Mt","name":"Meitnerium","family":"Unknown","mass":278,"period":7,"group":9,"state":"solid","color":"#FF7A7A","desc":"Very unstable synthetic."},
{"z":110,"symbol":"Ds","name":"Darmstadtium","family":"Unknown","mass":281,"period":7,"group":10,"state":"solid","color":"#FF8A8A","desc":"Synthetic."},
{"z":111,"symbol":"Rg","name":"Roentgenium","family":"Unknown","mass":282,"period":7,"group":11,"state":"solid","color":"#FF9A9A","desc":"Synthetic."},
{"z":112,"symbol":"Cn","name":"Copernicium","family":"Unknown","mass":285,"period":7,"group":12,"state":"solid","color":"#FFAAAA","desc":"Synthetic."},
{"z":113,"symbol":"Nh","name":"Nihonium","family":"Unknown","mass":286,"period":7,"group":13,"state":"solid","color":"#FFBABA","desc":"Synthetic."},
{"z":114,"symbol":"Fl","name":"Flerovium","family":"Unknown","mass":289,"period":7,"group":14,"state":"solid","color":"#FFCACA","desc":"Synthetic."},
{"z":115,"symbol":"Mc","name":"Moscovium","family":"Unknown","mass":290,"period":7,"group":15,"state":"solid","color":"#FFDADA","desc":"Synthetic."},
{"z":116,"symbol":"Lv","name":"Livermorium","family":"Unknown","mass":293,"period":7,"group":16,"state":"solid","color":"#FFEAEA","desc":"Synthetic."},
{"z":117,"symbol":"Ts","name":"Tennessine","family":"Halogen","mass":294,"period":7,"group":17,"state":"solid","color":"#FFF0F0","desc":"Synthetic."},
{"z":118,"symbol":"Og","name":"Oganesson","family":"Noble","mass":294,"period":7,"group":18,"state":"gas","color":"#E6E6E6","desc":"Synthetic noble gas."}
];

/* ----------------- REACTIONS (representative ~80 real combos) -----------------
   Key: sorted symbols joined by ',' optionally with multiplicity like H,H,O
*/
const REACTIONS = {
  "H,O": {name:"Water (H₂O)", type:"Molecule", bond:"Polar covalent", state:"Liquid"},
  "H,H,O": {name:"Water (H₂O) (2H:1O)", type:"Molecule", bond:"Polar covalent", state:"Liquid"},
  "C,O,O": {name:"Carbon dioxide (CO₂)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "C,O": {name:"Carbon monoxide (CO)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "Na,Cl": {name:"Sodium chloride (NaCl)", type:"Salt", bond:"Ionic", state:"Solid"},
  "K,Cl": {name:"Potassium chloride (KCl)", type:"Salt", bond:"Ionic", state:"Solid"},
  "Na,O": {name:"Sodium oxide (Na₂O)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Mg,O": {name:"Magnesium oxide (MgO)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Ca,O": {name:"Calcium oxide (CaO)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Ca,C,O": {name:"Calcium carbonate (CaCO₃)", type:"Salt", bond:"Ionic", state:"Solid"},
  "Fe,O,O": {name:"Magnetite (Fe₃O₄)", type:"Oxide", bond:"Ionic/Metallic", state:"Solid"},
  "Fe,O": {name:"Hematite (Fe₂O₃)", type:"Oxide", bond:"Ionic/Metallic", state:"Solid"},
  "Cu,Sn": {name:"Bronze (Cu+Sn)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Cu,Zn": {name:"Brass (Cu+Zn)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Fe,C": {name:"Steel (Fe+C)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Al,Cu,Mg": {name:"Duralumin (Al-Cu-Mg)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Au,Cu": {name:"Gold-copper alloy (rose gold)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Ag,Cu": {name:"Sterling silver (Ag+Cu)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Cu,O": {name:"Copper(II) oxide (CuO)", type:"Oxide", bond:"Ionic/Covalent", state:"Solid"},
  "Cu,O,O": {name:"Copper(I) oxide (Cu₂O)", type:"Oxide", bond:"Ionic/Covalent", state:"Solid"},
  "Zn,O": {name:"Zinc oxide (ZnO)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Al,O": {name:"Aluminium oxide (Al₂O₃)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Pb,O": {name:"Lead(II) oxide (PbO)", type:"Oxide", bond:"Ionic", state:"Solid"},
  "Ag,Cl": {name:"Silver chloride (AgCl)", type:"Salt", bond:"Ionic", state:"Solid"},
  "H,Cl": {name:"Hydrogen chloride (HCl)", type:"Acid (gas/aqueous)", bond:"Ionic/Covalent", state:"Gas/Aqueous"},
  "H,Br": {name:"Hydrogen bromide (HBr)", type:"Acid", bond:"Ionic/Covalent", state:"Gas"},
  "S,O,O": {name:"Sulfur trioxide (SO₃)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "S,O": {name:"Sulfur dioxide (SO₂)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "N,O,O": {name:"Nitrogen dioxide (NO₂)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "N,O": {name:"Nitric oxide (NO)", type:"Oxide", bond:"Covalent", state:"Gas"},
  "N,N": {name:"Nitrogen (N₂)", type:"Diatomic gas", bond:"Triple covalent", state:"Gas"},
  "H,N": {name:"Ammonia (NH₃) simplified", type:"Base", bond:"Covalent", state:"Gas"},
  "H,S": {name:"Hydrogen sulfide (H₂S)", type:"Acidic gas", bond:"Covalent", state:"Gas"},
  "C,H,H,H,H": {name:"Methane (CH₄)", type:"Hydrocarbon", bond:"Covalent", state:"Gas"},
  "C,H,H,O": {name:"Ethanol (C₂H₅OH) simplified", type:"Organic", bond:"Covalent", state:"Liquid"},
  "Si,O": {name:"Silicon dioxide (SiO₂) - Quartz", type:"Oxide", bond:"Covalent", state:"Solid"},
  "Na,H": {name:"Sodium hydride (NaH) representative", type:"Hydride", bond:"Ionic", state:"Solid"},
  "Na,OH": {name:"Sodium hydroxide (NaOH)", type:"Base", bond:"Ionic", state:"Solid"},
  "K,OH": {name:"Potassium hydroxide (KOH)", type:"Base", bond:"Ionic", state:"Solid"},
  "H,SO4": {name:"Sulfuric acid (H₂SO₄) representative", type:"Acid", bond:"Ionic/Covalent", state:"Liquid"},
  "H,NO3": {name:"Nitric acid (HNO₃) representative", type:"Acid", bond:"Ionic/Covalent", state:"Liquid"},
  "O,O": {name:"Oxygen (O₂)", type:"Diatomic gas", bond:"Double covalent", state:"Gas"},
  "Cl,Cl": {name:"Chlorine (Cl₂)", type:"Diatomic gas", bond:"Covalent", state:"Gas"},
  "Br,Br": {name:"Bromine (Br₂)", type:"Diatomic liquid", bond:"Covalent", state:"Liquid"},
  "I,I": {name:"Iodine (I₂)", type:"Diatomic solid", bond:"Covalent", state:"Solid"},
  "C,C": {name:"Allotropes of Carbon (graphite/diamond)", type:"Allotrope", bond:"Covalent", state:"Solid"},
  "Fe,S": {name:"Iron sulfide (FeS) representative", type:"Sulfide", bond:"Ionic", state:"Solid"},
  "Zn,S": {name:"Zinc sulfide (ZnS)", type:"Sulfide", bond:"Ionic", state:"Solid"},
  "Al,Si,O": {name:"Silicate (representative)", type:"Silicate", bond:"Ionic/Covalent", state:"Solid"},
  "Cu,SO4": {name:"Copper(II) sulfate (CuSO₄) representative", type:"Salt", bond:"Ionic", state:"Solid"},
  "Pb,SO4": {name:"Lead(II) sulfate (PbSO₄) representative", type:"Salt", bond:"Ionic", state:"Solid"},
  "Fe,Ni,Cr": {name:"Stainless steel (Fe-Ni-Cr) simplified", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Ti,Al,V": {name:"Ti-Al-V alloy representative", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Sn,Pb": {name:"Tin-lead alloy (solder-like)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "O,H,H": {name:"Hydrogen peroxide (H₂O₂) simplified", type:"Peroxide", bond:"Covalent", state:"Liquid"},
  "Na,CO3": {name:"Sodium carbonate (Na₂CO₃) representative", type:"Salt", bond:"Ionic", state:"Solid"},
  "Na,H,CO3": {name:"Baking soda (NaHCO₃) representative", type:"Salt", bond:"Ionic", state:"Solid"},
  "Ag,NO3,Cl": {name:"AgCl precipitation (AgNO₃ + Cl⁻)", type:"Precipitate", bond:"Ionic", state:"Solid"},
  "C,H": {name:"Simple hydrocarbon (representative)", type:"Organic", bond:"Covalent", state:"Gas/Liquid"},
  "Fe,Cr": {name:"Alloy (Fe-Cr) representative", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Cu,Au": {name:"Copper-gold alloy (representative)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Mg,Al": {name:"Al-Mg alloy representative", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Zn,Cu": {name:"Brass (Cu-Zn)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "Si,C": {name:"Silicon carbide (SiC) representative", type:"Ceramic", bond:"Covalent", state:"Solid"},
  "C,N": {name:"Cyanide compounds (representative)", type:"Salt/Complex", bond:"Covalent/Ionic", state:"Solid"},
  "Cl,Na,Ag": {name:"Halide precipitate patterns (representative)", type:"Salt/Precipitate", bond:"Ionic", state:"Solid"},
  "H,F": {name:"Hydrogen fluoride (HF)", type:"Acid/Reactive", bond:"Covalent", state:"Gas/Liquid"},
  "Fe,Mo": {name:"Steel alloy components (Fe-Mo)", type:"Alloy", bond:"Metallic", state:"Solid"},
  "C,O,O,O": {name:"Formaldehyde/oxidation representative", type:"Organic oxide", bond:"Covalent", state:"Gas/Liquid"},
  "P,O": {name:"Phosphorus oxides (representative)", type:"Oxide", bond:"Covalent", state:"Solid/Gas"},
  "S,H,H": {name:"Sulfuric / sulfides patterns (representative)", type:"Acid/Salt", bond:"Ionic/Covalent", state:"Liquid/Solid"},
  "Na,Cl,H2O": {name:"Salt in water (NaCl(aq))", type:"Solution", bond:"Ionic", state:"Aqueous"}
};

/* ----------------- AUDIO (Howler) ----------------- */
const sounds = {
  drag: new Howl({src:['https://cdn.jsdelivr.net/gh/spencercox/sfx/retro-blip-1.mp3'], volume:0.4}),
  combine: new Howl({src:['https://cdn.jsdelivr.net/gh/spencercox/sfx/retro-success.mp3'], volume:0.6}),
  waste: new Howl({src:['https://cdn.jsdelivr.net/gh/spencercox/sfx/retro-fail.mp3'], volume:0.5})
};
let soundEnabled = true;

/* ----------------- Roots & state ----------------- */
const elementListRoot = document.getElementById('elementList');
const stage = document.getElementById('stage');
const grid = document.getElementById('grid');
const modalRoot = document.getElementById('modalRoot');
const fx = document.getElementById('fxCanvas');
const fxCtx = fx.getContext('2d');
const search = document.getElementById('search');
const exportBtn = document.getElementById('exportBtn');
const themeToggle = document.getElementById('themeToggle');
const soundToggle = document.getElementById('soundToggle');
const collapseBtn = document.getElementById('collapseBtn');

let instances = []; // placed objects on stage
let history = [];

/* ----------------- Helpers ----------------- */
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,6); }
function familyClass(f){ if(!f) return 'f-Unknown'; if(f.includes('Noble')) return 'f-Noble'; if(f.includes('Alkali')) return 'f-Alkali'; if(f.includes('Alkaline')) return 'f-Alkaline'; if(f.includes('Metalloid')) return 'f-Metalloid'; if(f.includes('Transition')) return 'f-Transition'; if(f.includes('Post')) return 'f-Post'; if(f.includes('Halogen')) return 'f-Halogen'; if(f.includes('Lanthanide')) return 'f-Lanthanide'; if(f.includes('Actinide')) return 'f-Actinide'; if(f.includes('Nonmetal')) return 'f-Nonmetal'; return 'f-Unknown'; }

/* ----------------- Pixel-art generator (blocky 8x8 scaled to 64) ----------------- */
function blockyPatternFor(el){
  // deterministic seed from z and symbol
  let s = (el.z * 1103515245 + 12345) >>> 0;
  for(let i=0;i<el.symbol.length;i++) s = (s ^ (el.symbol.charCodeAt(i) * 2654435761)) >>> 0;
  let out='';
  for(let i=0;i<64;i++){
    s = (s ^ (s << 13)) >>> 0;
    s = (s ^ (s >>> 17)) >>> 0;
    s = (s ^ (s << 5)) >>> 0;
    out += (s & 1) ? '1' : '0';
    s = ((s >>> 1) | ((s & 1) << 31)) >>> 0;
  }
  return out;
}
function svgBlockIcon(el,size=64){
  const pattern = blockyPatternFor(el);
  const cell = Math.floor((size-8)/8);
  const gap = 1;
  const offset = 4;
  const bg = el.color || '#999999';
  let rects='';
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const i = r*8+c;
      const on = pattern[i] === '1';
      const x = offset + c*(cell+gap);
      const y = offset + r*(cell+gap);
      const fill = on ? '#111111' : '#ffffff';
      // make block color mix with base
      rects += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="0" fill="${on ? bg : '#ffffff'}" opacity="${on?1:0.18}" />`;
    }
  }
  // Special-case Au (gold) as gold bar
  if(el.symbol === 'Au'){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect rx='10' width='100%' height='100%' fill='${bg}' /><rect x='8' y='18' width='${size-16}' height='28' rx='4' fill='#D4AF37' stroke='#B28B2B' stroke-width='2'/><text x='50%' y='52%' font-size='14' font-weight='700' text-anchor='middle' fill='#5A3E0E'>Au</text></svg>`;
    return encodeURIComponent(svg);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><rect rx='12' width='100%' height='100%' fill='${bg}'/>${rects}<text x='50%' y='14' font-size='12' text-anchor='middle' fill='white' font-weight='800'>${el.symbol}</text></svg>`;
  return encodeURIComponent(svg);
}

/* ----------------- Variáveis ----------------- */
const sidebar = document.getElementById('elementList');
const stage = document.getElementById('stage'); // área principal
let draggingElement = null; // para mobile touch

/* ----------------- Render sidebar ----------------- */
function renderSidebar(q=''){
  sidebar.innerHTML = ''; // limpa a barra
  const qq = (q||'').trim().toLowerCase();

  for(const el of ELEMENTS){
    // filtro de pesquisa
    if(qq && !(el.name.toLowerCase().includes(qq) ||
               el.symbol.toLowerCase().includes(qq) ||
               (el.family && el.family.toLowerCase().includes(qq)))) continue;

    // cria a div principal do elemento
    const row = document.createElement('div');
    row.className = 'element element-item';
    row.draggable = true;
    row.dataset.symbol = el.symbol;

    // --- dragstart desktop ---
    row.addEventListener('dragstart', ev => {
      ev.dataTransfer.setData('application/json', JSON.stringify({from:'sidebar', symbol:el.symbol}));
      ev.dataTransfer.effectAllowed = 'copy';
      if(soundEnabled) sounds.drag.play();
    });

    // --- touchstart mobile ---
    row.addEventListener('touchstart', ev => {
      draggingElement = el.symbol;
    });

    // --- visual do elemento ---
    const badge = document.createElement('div');
    badge.className = 'badge ' + familyClass(el.family);
    badge.innerHTML = `<img src="data:image/svg+xml;utf8,${svgBlockIcon(el,56)}" width="56" height="56" alt="${el.symbol}">`;

    const meta = document.createElement('div');
    meta.className = 'el-meta';
    const nameEl = document.createElement('div');
    nameEl.className = 'el-name';
    nameEl.textContent = `${el.symbol} — ${el.name}`;
    const sub = document.createElement('div');
    sub.className = 'el-sub';
    sub.textContent = `#${el.z} • ${el.family}`;

    meta.appendChild(nameEl);
    meta.appendChild(sub);
    row.appendChild(badge);
    row.appendChild(meta);

    sidebar.appendChild(row); // adiciona à barra
  }
}

/* ----------------- Stage drop ----------------- */
stage.ondragover = ev => ev.preventDefault();
stage.ondrop = ev => {
  ev.preventDefault();
  const j = ev.dataTransfer.getData('application/json');
  if(!j) return;
  try {
    const p = JSON.parse(j);
    if(p.from === 'sidebar'){
      const el = ELEMENTS.find(x => x.symbol === p.symbol);
      if(!el) return;
      const rect = stage.getBoundingClientRect();
      const x = Math.max(8, Math.min(rect.width-180, ev.clientX - rect.left - 40));
      const y = Math.max(8, Math.min(rect.height-100, ev.clientY - rect.top - 30));
      addInstance({type:'element', symbols:[el.symbol], el, x, y});
    }
  } catch(e){ console.error(e); }
};

/* ----------------- Touchend mobile ----------------- */
window.addEventListener('touchend', ev => {
  if(draggingElement){
    const touch = ev.changedTouches[0];
    const el = ELEMENTS.find(x => x.symbol === draggingElement);
    if(el){
      const rect = stage.getBoundingClientRect();
      const x = Math.max(8, Math.min(rect.width-180, touch.clientX - rect.left - 40));
      const y = Math.max(8, Math.min(rect.height-100, touch.clientY - rect.top - 30));
      addInstance({type:'element', symbols:[el.symbol], el, x, y});
    }
    draggingElement = null;
  }
});

/* ----------------- Inicializar ----------------- */
renderSidebar(); // chama para mostrar os elementos na barra

/* ----------------- Add instance & render ----------------- */
function addInstance(obj){
  obj.id = uid();
  instances.push(obj);
  renderInstance(obj);
}

function renderInstance(obj){
  const elDiv = document.createElement('div');
  elDiv.className = 'atom-card';
  elDiv.dataset.id = obj.id;
  elDiv.style.left = (obj.x||40) + 'px';
  elDiv.style.top = (obj.y||40) + 'px';

  if(obj.type === 'element'){
    const svg64 = svgBlockIcon(obj.el,64);
    elDiv.innerHTML = `<div class="icon-64"><img src="data:image/svg+xml;utf8,${svg64}" width="64" height="64" alt="${obj.el.symbol}"></div>
      <div class="card-body"><div class="symbol">${obj.el.symbol}</div><div class="meta">${obj.el.name} • #${obj.el.z}</div><div class="bitgrid">${renderBitGrid(obj.el)}</div></div>`;
  } else if(obj.type === 'compound'){
    const cs = compoundSVG(obj);
    elDiv.innerHTML = `<div class="icon-64"><img src="data:image/svg+xml;utf8,${cs}" width="64" height="64"></div>
      <div class="card-body"><div class="symbol">${obj.name}</div><div class="meta">${obj.kind} • ${obj.state||''}</div></div>`;
  }

  grid.appendChild(elDiv);
  makeDraggable(elDiv, obj);
}

/* ----------------- Inicializar sidebar ----------------- */
renderSidebar();
 
/* ----------------- Bitgrid small svg ----------------- */
function renderBitGrid(el){
  const p = blockyPatternFor(el);
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

/* ----------------- make draggable (mouse + touch) ----------------- */
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
    if(soundEnabled) sounds.drag.play();
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

/* ----------------- get DOM rect relative to stage ----------------- */
function getDomRectForId(id){
  const el = grid.querySelector(`[data-id="${id}"]`);
  if(!el) return null;
  const stageRect = stage.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {left: r.left - stageRect.left, top: r.top - stageRect.top, right: r.right - stageRect.left, bottom: r.bottom - stageRect.top};
}
function rectOverlap(a,b){ return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom); }

/* ----------------- combination detection & perform ----------------- */
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
    if(soundEnabled) sounds.combine.play(); burstFx('success'); showReactionModal(matched, combined);
  } else {
    const obj = {id:uid(), type:'waste', symbols:combined}; instances.push(obj); renderInstance(obj);
    history.push({time:Date.now(), input:combined, result:'lixo'});
    if(soundEnabled) sounds.waste.play(); burstFx('waste'); showReactionModal({name:'lixo', type:'Pilha de pó', bond:'-'}, combined);
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

/* ----------------- modal for reaction/result ----------------- */
function showReactionModal(meta, input){
  modalRoot.innerHTML = '';
  const back = document.createElement('div'); back.className='modal-back'; back.onclick = closeModal;
  const box = document.createElement('div'); box.className='modal';
  box.innerHTML = `<h3>${meta.name}</h3><div style="color:#666;margin-top:6px">${meta.type || ''} • ${meta.bond || ''}</div>
    <p style="margin-top:10px">Elementos: ${input.join(', ')}</p>
    <div class="row"><div class="pill">Estado: ${meta.state || '—'}</div></div>
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

/* ----------------- view atom with orbit animation ----------------- */
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
  const container = document.getElementById('atomCanvas');
  const canvas = document.createElement('canvas'); canvas.width = container.clientWidth || 640; canvas.height = 220;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d'); let t=0;
  function anim(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const cx = canvas.width/2, cy = 110;
    ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fillStyle='#ffd580'; ctx.fill();
    ctx.fillStyle='#50350b'; ctx.font='bold 14px sans-serif'; ctx.textAlign='center'; ctx.fillText(el.symbol, cx, cy+4);
    const shells = [2,8,18,32]; let remaining = el.z; let radius = 34;
    for(let s=0;s<4 && remaining>0;s++){
      const count = Math.min(remaining, shells[s]); remaining -= count;
      ctx.beginPath(); ctx.strokeStyle='rgba(100,150,255,0.22)'; ctx.lineWidth=1; ctx.arc(cx,cy,radius,0,Math.PI*2); ctx.stroke();
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

/* ----------------- FX particles ----------------- */
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

/* ----------------- export history ----------------- */
function exportHistory(){ const blob = new Blob([JSON.stringify(history,null,2)],{type:'application/json'}); const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='tabela_quimica_history.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }

/* ----------------- search & UI bindings ----------------- */
search.addEventListener('input', e=> renderSidebar(e.target.value));
exportBtn.addEventListener('click', exportHistory);
themeToggle.addEventListener('click', ()=>{
  const root = document.body;
  if(root.getAttribute('data-theme') === 'dark'){ root.removeAttribute('data-theme'); themeToggle.textContent='Tema'; }
  else { root.setAttribute('data-theme','dark'); themeToggle.textContent='Tema (claro)'; }
});
soundToggle.addEventListener('click', ()=>{
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? 'Som: ON' : 'Som: OFF';
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

/* ----------------- initial render + sample instances ----------------- */
renderSidebar('');
// add three starter elements for convenience
addInstance({type:'element', symbols:['H'], el: ELEMENTS.find(e=>e.symbol==='H'), x:40, y:40});
addInstance({type:'element', symbols:['O'], el: ELEMENTS.find(e=>e.symbol==='O'), x:40, y:160});
addInstance({type:'element', symbols:['Au'], el: ELEMENTS.find(e=>e.symbol==='Au'), x:40, y:280});

/* ----------------- expose for debug ----------------- */
window.viewInstance = viewInstance;
window.addInstance = addInstance;
window.exportHistory = exportHistory;
