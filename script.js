:root{
  --bg:#ffffff; --muted:#666d78; --accent:#0ea5ff; --card:#ffffff;
  --radius:12px; --shadow:0 10px 30px rgba(10,20,40,0.06); --neon:#7C3AED;
}
*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,Arial;background:var(--bg);color:#071124;-webkit-font-smoothing:antialiased}
.topbar{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid #eef6fb;background:linear-gradient(180deg,#fff,#f6fbff)}
.brand{font-weight:800;font-size:18px}
.subtitle{color:var(--muted);font-size:13px}
.btn{padding:8px 12px;border-radius:10px;border:0;background:var(--accent);color:white;cursor:pointer;font-weight:700}
.btn.ghost{background:transparent;border:1px solid #e6f3fb;color:var(--muted)}
.btn.small{padding:6px 8px;font-size:13px}

.app{display:flex;height:calc(100vh - 56px);overflow:hidden}

/* Sidebar (B + C mix) */
.sidebar{width:320px;background:linear-gradient(180deg,#eaf6ff,#ffffff);padding:12px;border-right:1px solid #e6f3fb;box-shadow:var(--shadow);display:flex;flex-direction:column}
.sb-top{display:flex;gap:8px;align-items:center}
#search{flex:1;padding:10px;border-radius:10px;border:1px solid #e6f3fb;background:white}
.list{margin-top:10px;overflow:auto;padding-right:6px}
.element{display:flex;align-items:center;gap:10px;padding:8px;border-radius:10px;background:white;margin-bottom:8px;border:1px solid #eaf6fb;cursor:grab}
.element:active{cursor:grabbing}
.badge{width:56px;height:56px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;color:white;flex:0 0 56px}
.el-meta{display:flex;flex-direction:column}
.el-name{font-weight:700;font-size:14px}
.el-sub{font-size:12px;color:var(--muted)}
.sb-foot{margin-top:auto;font-size:12px;color:var(--muted);text-align:center;padding:8px}

/* Stage */
.stage{flex:1;position:relative;background:linear-gradient(180deg,#fff,#fbfeff);padding:18px;overflow:auto}
.grid{position:relative;min-height:100%}

/* Atom card on stage */
.atom-card{position:absolute;min-width:160px;padding:10px;border-radius:12px;background:var(--card);border:1px solid #edf6fb;box-shadow:0 10px 26px rgba(8,16,30,0.06);display:flex;gap:10px;align-items:center;cursor:grab;user-select:none;transition:transform .12s,box-shadow .12s}
.atom-card.dragging{opacity:0.85;transform:scale(.98)}
.icon-64{width:64px;height:64px;border-radius:8px;flex:0 0 64px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.card-body{display:flex;flex-direction:column}
.symbol{font-weight:900;font-size:20px}
.meta{font-size:12px;color:var(--muted)}
.bitgrid{margin-top:6px;display:inline-block}

/* modal */
.modal-back{position:fixed;inset:0;background:rgba(6,12,20,0.45);display:flex;align-items:center;justify-content:center;z-index:60}
.modal{background:white;padding:18px;border-radius:12px;border:1px solid #e8f4fb;max-width:720px;width:92%}
.modal h3{margin:0}
.row{display:flex;gap:12px;margin-top:10px}
.pill{padding:8px;border-radius:8px;border:1px solid #eef6fb;background:#fbfeff}

/* small footer */
.smallfoot{position:fixed;right:18px;bottom:12px;font-size:11px;color:var(--muted)}

/* Family colors */
.f-Nonmetal{background:#ef4444}
.f-Noble{background:#60a5fa}
.f-Alkali{background:#fb923c}
.f-Alkaline{background:#fde047;color:#111}
.f-Metalloid{background:#a78bfa}
.f-Transition{background:#06b6d4}
.f-Post{background:#f97316}
.f-Halogen{background:#34d399}
.f-Lanthanide{background:#f472b6}
.f-Actinide{background:#fb7185}
.f-Unknown{background:#94a3b8}

/* Dark theme: mix of D + C */
body[data-theme="dark"]{--bg:#040814;--muted:#9aa4b2;--accent:#7C3AED;--card:#07101a;--shadow:0 14px 40px rgba(10,12,30,0.7)}
body[data-theme="dark"] .sidebar{background:linear-gradient(180deg,#050816,#07101a);border-right:1px solid rgba(124,58,237,0.12)}
body[data-theme="dark"] .element{background:linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid rgba(124,58,237,0.12);color:#fff}
body[data-theme="dark"] .atom-card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid rgba(124,58,237,0.12);box-shadow:0 20px 40px rgba(124,58,237,0.06)}

/* responsive */
@media (max-width:900px){
  .sidebar{width:100%;position:relative}
  .app{flex-direction:column}
  .stage{padding:12px}
  .atom-card{min-width:140px}
    }}

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
