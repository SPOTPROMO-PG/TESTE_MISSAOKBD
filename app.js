const GOOGLE_SCRIPT_URL = "";
const ALLOWED_SECTORS = ["SPI200", "RS234", "PR87", "SC01"];

const CONTENT = {
  marcas: [
    { id: "always", nome: "Always", logo: "logos/always.jpg", kbds: [{ id: "kbd1", nome: "KBD Absorventes – Always Suave", videoId: null, imagens: [] }] },
    { id: "downy", nome: "Downy", logo: "logos/downy.png", kbds: [
      { id: "kbd1", nome: "KBD Ponto Extra – Brisa", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD Bloco Azul (50%)", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Bloco Colorido (40%)", videoId: null, imagens: [] },
    ] },
    { id: "pantene", nome: "Pantene", logo: "logos/pantene.png", kbds: [
      { id: "kbd1", nome: "KBD Bond Repair (20%)", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD Top Versões (40%)", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Óleo – 2 Pontos de Contato", videoId: null, imagens: [] },
      { id: "kbd4", nome: "KBD Rio/Cachoeira Dourada", videoId: null, imagens: [] },
    ] },
    { id: "pampers", nome: "Pampers", logo: "logos/pampers.png", kbds: [
      { id: "kbd1", nome: "KBD Ponto Extra – 50% Tamanhos Grandes", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD Pants", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Pants + Premium (Lojas Sul)", videoId: null, imagens: [] },
      { id: "kbd4", nome: "KBD Vale Night – SOS Gôndola", videoId: null, imagens: [] },
      { id: "kbd5", nome: "KBD Vale Night – Ponto Extra Farma", videoId: null, imagens: [] },
    ] },
    { id: "secret", nome: "Secret", logo: "logos/secret.png", kbds: [
      { id: "kbd1", nome: "KBD 2 Bandejas", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD Bloco 15 Frentes ou 3 Bandejas", videoId: null, imagens: [] },
    ] },
    { id: "oral-b", nome: "Oral-B", logo: "logos/oral-b.png", kbds: [
      { id: "kbd1", nome: "KBD Branqueamento (60%)", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD 2 Pontos de Contato – Escovas", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Layout BIPE – Escovas", videoId: null, imagens: [] },
    ] },
    { id: "gillette", nome: "Gillette", logo: "logos/gillette.png", kbds: [
      { id: "kbd1", nome: "KBD Sistemas – % de Ganchos", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD 2 Pontos de Contato – Mach3/Presto3", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Carga Mach3 c/8 – 2 Ganchos", videoId: null, imagens: [] },
    ] },
    { id: "venus", nome: "Venus", logo: "logos/venus.png", kbds: [
      { id: "kbd1", nome: "KBD Sistemas – 20% de Ganchos", videoId: null, imagens: [] },
      { id: "kbd2", nome: "KBD 2 Pontos de Contato", videoId: null, imagens: [] },
      { id: "kbd3", nome: "KBD Checkout – Venus Pele Sensível", videoId: null, imagens: [] },
    ] },
  ],
};

const ICONS = {
  menu: `<svg viewBox="0 0 24 24"><path d="M4 7h16"></path><path d="M4 12h16"></path><path d="M4 17h16"></path></svg>`,
  back: `<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"></path></svg>`,
  home: `<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"></path><path d="M5 9.8V21h14V9.8"></path><path d="M9 21v-6h6v6"></path></svg>`,
  brands: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg>`,
  quiz: `<svg viewBox="0 0 24 24"><path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4"></path><path d="M12 17h.01"></path><circle cx="12" cy="12" r="10"></circle></svg>`,
  play: `<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7z"></path></svg>`,
  check: `<svg viewBox="0 0 24 24"><path d="m20 6-11 11-5-5"></path></svg>`,
  x: `<svg viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`,
  rocket: `<svg viewBox="0 0 24 24"><path d="M4.5 19.5c1.5-1.5 3.5-1.5 5 0"></path><path d="M9 15l-3 3"></path><path d="M15 9l3-3"></path><path d="M14 10 9 15"></path><path d="M16.5 7.5c3-3 3-6 3-6s-3 0-6 3l-2 2c-.7.7-1.1 1.7-1.1 2.7V11l2 2h1.8c1 0 2-.4 2.7-1.1z"></path><circle cx="15.5" cy="8.5" r=".5"></circle></svg>`,
  trophy: `<svg viewBox="0 0 24 24"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"></path><path d="M5 6H3a2 2 0 0 0 0 4h2"></path><path d="M19 6h2a2 2 0 1 1 0 4h-2"></path></svg>`,
};

const BRAND_THEME = {
  always: { accent: '#b56bff', line: 'rgba(181,107,255,.22)', glow: '0 0 32px rgba(181,107,255,.12)' },
  downy: { accent: '#67deff', line: 'rgba(35,207,255,.2)', glow: '0 0 32px rgba(35,207,255,.12)' },
  pantene: { accent: '#ff9ac0', line: 'rgba(255,127,170,.18)', glow: '0 0 32px rgba(255,127,170,.10)' },
  pampers: { accent: '#67deff', line: 'rgba(35,207,255,.18)', glow: '0 0 32px rgba(35,207,255,.10)' },
  secret: { accent: '#ff9ac0', line: 'rgba(255,127,170,.18)', glow: '0 0 32px rgba(255,127,170,.10)' },
  'oral-b': { accent: '#67deff', line: 'rgba(35,207,255,.18)', glow: '0 0 32px rgba(35,207,255,.10)' },
  gillette: { accent: '#ff9ac0', line: 'rgba(255,127,170,.18)', glow: '0 0 32px rgba(255,127,170,.10)' },
  venus: { accent: '#b56bff', line: 'rgba(181,107,255,.22)', glow: '0 0 32px rgba(181,107,255,.12)' },
};

let quizState = null;

function icon(name) { return ICONS[name] || ''; }
function qs() { return new URLSearchParams(window.location.search); }
function normalizeSector(v) { return String(v || '').trim().toUpperCase().replace(/\s+/g, ''); }
function getSetor() { return localStorage.getItem('SETOR') || ''; }
function ensureSetor() { if (!getSetor()) window.location.href = 'index.html'; }
function escapeHtml(v) { return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
function getCompleted() { return JSON.parse(localStorage.getItem('QUIZZES_COMPLETED') || '{}'); }
function setCompleted(data) { localStorage.setItem('QUIZZES_COMPLETED', JSON.stringify(data)); }
function isDone(marcaId, kbdId) { const d = getCompleted(); return !!(d[marcaId] && d[marcaId][kbdId]); }
function markDone(marcaId, kbdId) { const d = getCompleted(); d[marcaId] ||= {}; d[marcaId][kbdId] = true; setCompleted(d); }
function getMarca(id) { return CONTENT.marcas.find(m => m.id === id) || null; }
function getKbd(marcaId, kbdId) { const m = getMarca(marcaId); return m ? m.kbds.find(k => k.id === kbdId) || null : null; }
function getBrandProgress(marcaId) { const marca = getMarca(marcaId); if (!marca) return { done:0, total:0, pct:0 }; const total = marca.kbds.length; const done = marca.kbds.filter(k => isDone(marcaId, k.id)).length; return { done, total, pct: total ? Math.round(done / total * 100) : 0 }; }
function getOverallProgress() { const total = CONTENT.marcas.reduce((a,m) => a + m.kbds.length, 0); const done = CONTENT.marcas.reduce((a,m) => a + m.kbds.filter(k => isDone(m.id, k.id)).length, 0); return { done, total, pct: total ? Math.round(done / total * 100) : 0 }; }
function getQuestions(marcaId, kbdId) { return (window.QUIZZES?.[marcaId]?.[kbdId]) || []; }
function medalFor(pct) { return pct === 100 ? '🥇' : pct >= 80 ? '🥈' : '🥉'; }
function nextPendingInBrand(marcaId) { const marca = getMarca(marcaId); if (!marca) return null; const pending = marca.kbds.find(k => !isDone(marcaId, k.id)); return pending ? { marcaId, kbdId: pending.id } : null; }
function firstPending() { for (const marca of CONTENT.marcas) { const pending = marca.kbds.find(k => !isDone(marca.id, k.id)); if (pending) return { marcaId: marca.id, kbdId: pending.id }; } return null; }
function nextBrandWithPending(currentMarcaId) {
  const start = CONTENT.marcas.findIndex(m => m.id === currentMarcaId);
  for (let i = start + 1; i < CONTENT.marcas.length; i++) if (nextPendingInBrand(CONTENT.marcas[i].id)) return CONTENT.marcas[i].id;
  for (let i = 0; i <= start; i++) if (nextPendingInBrand(CONTENT.marcas[i].id)) return CONTENT.marcas[i].id;
  return null;
}

function setTopbar({ backHref = null, title = 'MISSÃO KBD', percent = null }) {
  const left = document.getElementById('topbarLeft');
  const right = document.getElementById('topbarRight');
  if (!left || !right) return;
  left.innerHTML = `${backHref ? `<a class="icon-btn" href="${backHref}" aria-label="Voltar">${icon('back')}</a>` : `<button class="icon-btn" type="button" onclick="trocarSetor()" aria-label="Trocar setor">${icon('menu')}</button>`}<div class="topbar-title">${title}</div>`;
  const pct = percent ?? getOverallProgress().pct;
  right.innerHTML = `<div class="topbar-progress"><span>${pct}%</span><div class="track"><div class="fill" style="width:${pct}%"></div></div></div>`;
}

function setBottomNav(active, hrefQuiz = 'quiz.html') {
  const nav = document.getElementById('bottomNav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="bottom-nav-inner">
      <a class="nav-btn ${active === 'home' ? 'active' : ''}" href="home.html">${icon('home')}<span>Home</span></a>
      <a class="nav-btn ${active === 'brands' ? 'active' : ''}" href="home.html">${icon('brands')}<span>Marcas</span></a>
      <a class="nav-btn ${active === 'quiz' ? 'active' : ''}" href="${hrefQuiz}">${icon('quiz')}<span>Quiz</span></a>
    </div>`;
}

function entrar() {
  const input = document.getElementById('setor');
  const value = normalizeSector(input?.value);
  if (!value) return alert('Digite seu setor.');
  if (!ALLOWED_SECTORS.includes(value)) return alert(`Setor inválido. Use um dos setores liberados: ${ALLOWED_SECTORS.join(', ')}`);
  localStorage.setItem('SETOR', value);
  window.location.href = 'home.html';
}

function abrirModal(title, text, primary) {
  fecharModal();
  const div = document.createElement('div');
  div.className = 'modal-overlay';
  div.innerHTML = `<div class="modal"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><div class="modal-actions"><button class="secondary-btn" onclick="fecharModal()">Cancelar</button><button class="primary-btn pink" onclick="${primary}">Continuar</button></div></div>`;
  document.body.appendChild(div);
}
function fecharModal() { document.querySelector('.modal-overlay')?.remove(); }
function confirmarSaida() { abrirModal('Sair do app?', 'Você vai precisar informar o setor novamente. O progresso local continua salvo neste aparelho.', 'sairConfirmado()'); }
function sairConfirmado() { localStorage.removeItem('SETOR'); window.location.href = 'index.html'; }
function trocarSetor() { abrirModal('Trocar setor', 'Para trocar o setor, é preciso encerrar esta sessão.', 'sairConfirmado()'); }

function renderLogin() {
  document.getElementById('loginRocket').innerHTML = icon('rocket');
  document.getElementById('loginSectorList').textContent = ALLOWED_SECTORS.join(', ');
}

function renderHome() {
  ensureSetor();
  setTopbar({ title: 'MISSÃO KBD' });
  setBottomNav('home', getQuizHref());
  const overall = getOverallProgress();
  document.getElementById('homeApp').innerHTML = `
    <section class="hero">
      <div class="eyebrow">Missão do setor</div>
      <h1 class="hero-title">Treine. Execute.<br>Acerte o quiz.</h1>
      <p class="hero-copy">Fluxo original do Missão KBD com marcas, aulas, conteúdo de execução e quiz final, agora com visual neon, cards mais fortes e leitura mobile mais premium.</p>
      <div class="progress-line"><span style="width:${overall.pct}%"></span></div>
      <div class="status-row" style="margin-top:16px">
        <div class="status-card"><div class="mini-icon">${icon('brands')}</div><strong>${CONTENT.marcas.length}</strong><div class="subtle">Marcas</div></div>
        <div class="status-card"><div class="mini-icon">${icon('quiz')}</div><strong>${overall.done}/${overall.total}</strong><div class="subtle">KBDs concluídos</div></div>
      </div>
    </section>

    <section>
      <div class="section-head"><h2>Marcas do Setor</h2><div class="grid-icon"><span></span><span></span><span></span><span></span></div></div>
      <div class="brand-grid" style="margin-top:18px">${CONTENT.marcas.map(m => renderBrandCard(m)).join('')}</div>
      <div class="all-brands-card" style="margin-top:18px">
        <div>
          <div style="font-family:'Plus Jakarta Sans';font-weight:800;font-size:16px">Todas as marcas do setor</div>
          <div class="subtle" style="margin-top:6px">Fluxo preservado do app original</div>
        </div>
        <div class="all-brands-action">✓+</div>
      </div>
    </section>`;
}

function renderBrandCard(marca) {
  const prog = getBrandProgress(marca.id);
  const t = BRAND_THEME[marca.id] || BRAND_THEME.always;
  return `<a class="brand-card" href="marca.html?marca=${encodeURIComponent(marca.id)}" style="--accent:${t.accent};--card-line:${t.line};--card-glow:${t.glow};--pct:${prog.pct}%"><div class="brand-badge"></div><div class="brand-logo-box"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"></div><div class="brand-name">${escapeHtml(marca.nome)}</div><div class="brand-track"><span></span></div><div class="brand-pct">${prog.pct}% COMPLETO</div></a>`;
}

function renderMarca() {
  ensureSetor();
  const marcaId = qs().get('marca');
  const marca = getMarca(marcaId);
  if (!marca) return window.location.href = 'home.html';
  const prog = getBrandProgress(marca.id);
  setTopbar({ backHref: 'home.html', title: 'MISSÃO KBD', percent: prog.pct });
  setBottomNav('brands', getQuizHref(marca.id));
  const t = BRAND_THEME[marca.id] || BRAND_THEME.always;
  document.getElementById('homeApp').innerHTML = `
    <section class="hero brand-hero">
      <div class="brand-logo-box"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"></div>
      <div class="eyebrow">Marca</div>
      <h1 class="hero-title">${escapeHtml(marca.nome)}</h1>
      <p class="hero-copy">Setor ${escapeHtml(getSetor())} • KBDs disponíveis para estudo e quiz.</p>
      <div class="progress-line"><span style="width:${prog.pct}%;background:linear-gradient(90deg,${t.accent},color-mix(in srgb, ${t.accent} 65%, white))"></span></div>
      <div style="margin-top:14px"><span class="chip ${prog.pct === 100 ? 'done' : 'pending'}">${prog.done}/${prog.total} concluídos</span></div>
    </section>
    <section class="kbd-list">
      ${marca.kbds.map((kbd, i) => renderKbdRow(marca, kbd, i, t)).join('')}
    </section>
    <section class="challenge">
      <div class="eyebrow" style="color:#f4d8ff">Acelere a jornada</div>
      <h3>Conclua todos os KBDs desta marca para liberar a próxima missão.</h3>
      <p>O fluxo continua automático e leva você ao próximo conteúdo pendente sem perder contexto.</p>
      <a class="secondary-btn" href="${getQuizHref(marca.id)}">Continuar de onde parou</a>
    </section>`;
}

function renderKbdRow(marca, kbd, index, theme) {
  const done = isDone(marca.id, kbd.id);
  const pct = done ? 100 : 0;
  return `<a class="kbd-row ${done ? 'done' : 'pending'}" href="kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(kbd.id)}"><div class="kbd-icon">${done ? icon('check') : icon('quiz')}</div><div class="kbd-meta"><div class="kbd-tag-row"><span class="kbd-tag ${done ? 'done' : 'pending'}">KBD ${index + 1}</span><span class="subtle">${getQuestions(marca.id, kbd.id).length} perguntas</span></div><div class="kbd-name">${escapeHtml(kbd.nome)}</div><div class="kbd-bar" style="--accent:${theme.accent};--pct:${pct}%"><span></span></div></div><div class="kbd-side">${icon('back').replace('M15 18l-6-6 6-6','M9 6l6 6-6 6')}</div></a>`;
}

function renderKbd() {
  ensureSetor();
  const marcaId = qs().get('marca');
  const kbdId = qs().get('kbd');
  const marca = getMarca(marcaId);
  const kbd = getKbd(marcaId, kbdId);
  if (!marca || !kbd) return window.location.href = 'home.html';
  setTopbar({ backHref: `marca.html?marca=${encodeURIComponent(marca.id)}`, title: 'MISSÃO KBD' });
  setBottomNav('brands', `quiz.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(kbd.id)}`);
  document.getElementById('homeApp').innerHTML = `
    <section class="video-stage">
      ${kbd.videoId ? `<iframe class="video-embed" src="https://www.youtube.com/embed/${escapeHtml(kbd.videoId)}" allowfullscreen></iframe>` : `<div class="video-placeholder"><div class="video-play">${icon('play')}</div></div>`}
      <div class="video-progress"><span></span></div>
    </section>
    <section class="page" style="padding-top:26px;padding-bottom:140px">
      <div>
        <div class="badge-row"><span class="badge alt">${escapeHtml(getSetor())}</span><span class="badge">${escapeHtml(marca.nome)}</span></div>
        <h1 class="screen-title" style="margin-top:14px">${escapeHtml(kbd.nome)}</h1>
        <p class="screen-copy" style="margin-top:10px">Domine as principais regras de execução, visibilidade e organização deste KBD. A aula mantém o fluxo do original, mas com linguagem visual mais forte e leitura mais rápida.</p>
      </div>
      <section>
        <div class="gallery-head"><h3>Galeria de Execução</h3><span class="subtle">Referências visuais</span></div>
        <div class="gallery-grid" style="margin-top:14px">
          <div class="gallery-item"><div class="gallery-placeholder"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"><div>Bloco principal e leitura correta</div></div></div>
          <div class="gallery-item tall"><div class="gallery-placeholder"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"><div>Exposição ideal do KBD</div></div></div>
          <div class="gallery-item"><div class="gallery-placeholder"><img class="brand-logo" src="${marca.logo}" alt="${escapeHtml(marca.nome)}"><div>Ponto de contato e presença</div></div></div>
        </div>
      </section>
      <section class="info-card">
        <div class="label">Dica de ouro</div>
        <p>Mantenha a leitura do bloco simples, com exposição consistente e versões foco bem visíveis. A combinação entre presença, organização e preço legível é o que sustenta uma boa execução no PDV.</p>
      </section>
    </section>
    <div class="cta-fixed"><button class="primary-btn" onclick="irParaQuiz()">Responder o Quiz ${icon('quiz')}</button></div>`;
}

function irParaQuiz() {
  const marcaId = qs().get('marca');
  const kbdId = qs().get('kbd');
  window.location.href = `quiz.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}`;
}

function renderQuiz() {
  ensureSetor();
  const marcaId = qs().get('marca');
  const kbdId = qs().get('kbd');
  if (!marcaId || !kbdId) return renderQuizHub();
  const marca = getMarca(marcaId);
  const kbd = getKbd(marcaId, kbdId);
  const perguntas = getQuestions(marcaId, kbdId);
  if (!marca || !kbd || !perguntas.length) return renderQuizHub();
  setTopbar({ backHref: `kbd.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}`, title: 'MISSÃO KBD' });
  setBottomNav('quiz', `quiz.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}`);
  quizState = { marca, kbd, perguntas, index: 0, acertos: 0, selected: null, answered: false };
  drawQuestion();
}

function renderQuizHub() {
  ensureSetor();
  setTopbar({ backHref: 'home.html', title: 'MISSÃO KBD' });
  setBottomNav('quiz', getQuizHref());
  const overall = getOverallProgress();
  const next = firstPending();
  document.getElementById('homeApp').innerHTML = `
    <section class="hero">
      <div class="eyebrow">Central de Quiz</div>
      <h1 class="hero-title">Continue de onde parou</h1>
      <p class="hero-copy">Acompanhe o avanço geral e abra o próximo KBD pendente para seguir no fluxo.</p>
      <div class="progress-line"><span style="width:${overall.pct}%"></span></div>
      <div style="margin-top:14px"><span class="chip ${overall.pct === 100 ? 'done' : 'pending'}">${overall.done}/${overall.total} KBDs</span></div>
    </section>
    ${next ? `<section class="glass"><div class="eyebrow">Próximo recomendado</div><h2 class="screen-title" style="margin-top:10px">${escapeHtml(getMarca(next.marcaId).nome)} • ${escapeHtml(getKbd(next.marcaId, next.kbdId).nome)}</h2><p class="screen-copy" style="margin-top:10px">Abra o próximo conteúdo pendente e continue a missão sem quebrar o fluxo.</p><div style="margin-top:18px"><a class="primary-btn pink" href="kbd.html?marca=${encodeURIComponent(next.marcaId)}&kbd=${encodeURIComponent(next.kbdId)}">Abrir próximo KBD</a></div></section>` : `<section class="result-card"><div class="medal">🥇</div><div class="result-pill">Tudo concluído</div><h2 class="screen-title" style="margin-top:12px">Missão completa</h2><p class="screen-copy" style="margin-top:8px">Você respondeu todos os quizzes disponíveis. Agora pode revisar qualquer marca quando quiser.</p></section>`}`;
}

function drawQuestion() {
  const q = quizState.perguntas[quizState.index];
  const pct = Math.round(((quizState.index + 1) / quizState.perguntas.length) * 100);
  document.getElementById('homeApp').innerHTML = `
    <section class="quiz-progress-head">
      <div class="eyebrow">Desafio de merchandising</div>
      <h1>Pergunta ${quizState.index + 1} de ${quizState.perguntas.length}</h1>
      <div class="quiz-track"><span style="width:${pct}%"></span></div>
    </section>
    <section class="quiz-card"><h2>${escapeHtml(q.pergunta)}</h2></section>
    <section class="option-list">${q.alternativas.map((alt, i) => renderOption(alt, i)).join('')}</section>
    <div id="feedbackWrap"></div>
    <section style="padding-bottom:16px"><button id="confirmBtn" class="primary-btn pink" disabled onclick="confirmAnswer()">Confirmar resposta</button></section>`;
}

function renderOption(alt, i) {
  const letter = String.fromCharCode(65 + i);
  const text = String(alt).replace(/^[A-D][\)\.]\s*/, '');
  return `<button class="option" id="opt-${letter}" onclick="pickOption('${letter}')"><div class="option-letter">${letter}</div><div class="option-copy">${escapeHtml(text)}</div></button>`;
}

function pickOption(letter) {
  if (quizState.answered) return;
  quizState.selected = letter;
  document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
  document.getElementById(`opt-${letter}`)?.classList.add('selected');
  document.getElementById('confirmBtn').disabled = false;
}

function confirmAnswer() {
  if (!quizState.selected || quizState.answered) return;
  quizState.answered = true;
  const q = quizState.perguntas[quizState.index];
  const correct = quizState.selected === q.gabarito;
  if (correct) quizState.acertos += 1;
  document.querySelectorAll('.option').forEach(el => {
    const letter = el.id.replace('opt-', '');
    el.classList.add('disabled');
    if (letter === q.gabarito) el.classList.add('correct');
    if (letter === quizState.selected && !correct) el.classList.add('wrong');
  });
  const wrap = document.getElementById('feedbackWrap');
  wrap.innerHTML = `<section class="feedback ${correct ? '' : 'error'}"><div class="feedback-icon">${icon(correct ? 'check' : 'x')}</div><div><h3 class="feedback-title">${correct ? 'Resposta correta!' : 'Resposta incorreta'}</h3><div class="feedback-copy">${escapeHtml(q.justificativa || '')}</div></div></section><section style="margin-top:14px"><button class="primary-btn" onclick="nextQuestion()">${quizState.index + 1 < quizState.perguntas.length ? 'Próxima pergunta' : 'Ver resultado'}</button></section>`;
  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextQuestion() {
  quizState.index += 1;
  quizState.selected = null;
  quizState.answered = false;
  if (quizState.index >= quizState.perguntas.length) return renderResult();
  drawQuestion();
}

function renderResult() {
  markDone(quizState.marca.id, quizState.kbd.id);
  const pct = Math.round((quizState.acertos / quizState.perguntas.length) * 100);
  const medal = medalFor(pct);
  const nextBrandPending = nextPendingInBrand(quizState.marca.id);
  const nextBrand = nextBrandPending ? null : nextBrandWithPending(quizState.marca.id);
  let primaryHref = 'home.html';
  let primaryLabel = 'Voltar para a home';
  if (nextBrandPending) {
    primaryHref = `kbd.html?marca=${encodeURIComponent(nextBrandPending.marcaId)}&kbd=${encodeURIComponent(nextBrandPending.kbdId)}`;
    primaryLabel = 'Abrir próximo KBD';
  } else if (nextBrand) {
    primaryHref = `marca.html?marca=${encodeURIComponent(nextBrand)}`;
    primaryLabel = 'Ir para próxima marca';
  }
  document.getElementById('homeApp').innerHTML = `
    <section class="result-card">
      <div class="medal">${medal}</div>
      <div class="result-pill">Resultado final</div>
      <div class="result-score">${pct}%</div>
      <div class="result-copy">Você acertou ${quizState.acertos} de ${quizState.perguntas.length} perguntas em <strong>${escapeHtml(quizState.kbd.nome)}</strong>.</div>
      <div style="margin-top:20px;display:flex;flex-direction:column;gap:12px">
        <a class="primary-btn pink" href="${primaryHref}">${primaryLabel}</a>
        <a class="secondary-btn" href="marca.html?marca=${encodeURIComponent(quizState.marca.id)}">Voltar para a marca</a>
      </div>
    </section>`;
}

function getQuizHref(marcaId = null, kbdId = null) {
  if (marcaId && kbdId) return `quiz.html?marca=${encodeURIComponent(marcaId)}&kbd=${encodeURIComponent(kbdId)}`;
  const next = firstPending();
  return next ? `quiz.html?marca=${encodeURIComponent(next.marcaId)}&kbd=${encodeURIComponent(next.kbdId)}` : 'quiz.html';
}
