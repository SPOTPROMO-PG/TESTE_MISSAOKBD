/* Fusão visual do repositório Missão KBD com linguagem UI inspirada no stitch */
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyWERu4e0iNLGkeB3Xq8Ou1dM4FFGI7SQagRVEjhCNIc-4gVAyt4DJPNe_rp9Le6kM/exec";

const ALLOWED_SECTORS = ["SPI200", "RS234", "PR87", "SC01"];

// ====== DADOS (Marcas/KBDs) ======
const CONTENT = {
  marcas: [
    {
      id: "always",
      nome: "ALWAYS",
      logo: "logos/always.jpg",
      kbds: [{ id: "kbd1", nome: "KBD Absorventes – Always Suave", videoId: null, imagens: [] }],
    },
    {
      id: "downy",
      nome: "DOWNY",
      logo: "logos/downy.png",
      kbds: [
        { id: "kbd1", nome: "KBD Ponto Extra – Brisa", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD Bloco Azul (50%)", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Bloco Colorido (40%) ou [Alfazema ou Lírios]", videoId: null, imagens: [] },
      ],
    },
    {
      id: "pantene",
      nome: "PANTENE",
      logo: "logos/pantene.png",
      kbds: [
        { id: "kbd1", nome: "KBD Bond Repair (20%)", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD Top Versões – Bambu, Colágeno e Biotinamina B3 (40%)", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Óleo – 2 Pontos de Contato", videoId: null, imagens: [] },
        { id: "kbd4", nome: "KBD Rio/Cachoeira Dourada", videoId: null, imagens: [] },
      ],
    },
    {
      id: "pampers",
      nome: "PAMPERS",
      logo: "logos/pampers.png",
      kbds: [
        { id: "kbd1", nome: "KBD Ponto Extra – 50% Tamanhos Grandes", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD Pants", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Pants + Premium (Lojas Sul)", videoId: null, imagens: [] },
        { id: "kbd4", nome: "KBD Vale Night – SOS Gôndola", videoId: null, imagens: [] },
        { id: "kbd5", nome: "KBD Vale Night – Ponto Extra Farma", videoId: null, imagens: [] },
      ],
    },
    {
      id: "secret",
      nome: "SECRET",
      logo: "logos/secret.png",
      kbds: [
        { id: "kbd1", nome: "KBD 2 Bandejas", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD Bloco 15 Frentes ou 3 Bandejas", videoId: null, imagens: [] },
      ],
    },
    {
      id: "oral-b",
      nome: "ORAL-B",
      logo: "logos/oral-b.png",
      kbds: [
        { id: "kbd1", nome: "KBD Branqueamento (60%)", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD 2 Pontos de Contato – Escovas", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Layout BIPE – Escovas", videoId: null, imagens: [] },
      ],
    },
    {
      id: "gillette",
      nome: "GILLETTE",
      logo: "logos/gillette.png",
      kbds: [
        { id: "kbd1", nome: "KBD Sistemas – % de Ganchos", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD 2 Pontos de Contato – Mach3/Presto3", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Carga Mach3 c/8 – 2 Ganchos", videoId: null, imagens: [] },
      ],
    },
    {
      id: "venus",
      nome: "VENUS",
      logo: "logos/venus.png",
      kbds: [
        { id: "kbd1", nome: "KBD Sistemas – 20% de Ganchos", videoId: null, imagens: [] },
        { id: "kbd2", nome: "KBD 2 Pontos de Contato", videoId: null, imagens: [] },
        { id: "kbd3", nome: "KBD Checkout – Venus Pele Sensível", videoId: null, imagens: [] },
      ],
    },
  ],
};

function normalizeSector(v) {
  return String(v || "").trim().toUpperCase().replace(/\s+/g, "");
}
function getSetor() {
  return (localStorage.getItem("SETOR") || "").trim();
}
function ensureSetor() {
  if (!getSetor()) window.location.href = "index.html";
}
function qs() {
  return new URLSearchParams(window.location.search);
}
function getCompletedData() {
  return JSON.parse(localStorage.getItem("QUIZZES_COMPLETED") || "{}");
}
function getOverallProgress() {
  const total = CONTENT.marcas.reduce((acc, marca) => acc + (marca.kbds?.length || 0), 0);
  const data = getCompletedData();
  let done = 0;
  CONTENT.marcas.forEach((marca) => (marca.kbds || []).forEach((kbd) => {
    if (data[marca.id] && data[marca.id][kbd.id]) done++;
  }));
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}
function updateShellProgress() {
  const overall = getOverallProgress();
  document.querySelectorAll('#overallPct').forEach((el) => (el.textContent = `${overall.pct}%`));
  document.querySelectorAll('#overallBar').forEach((el) => (el.style.width = `${overall.pct}%`));
  return overall;
}
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}
function definirSetorRapido(setor, btn) {
  const input = document.getElementById("setor");
  if (input) input.value = setor;
  document.querySelectorAll('.chip').forEach((el) => el.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function criarModal(c) {
  const o = document.createElement("div");
  o.className = "modal-overlay";
  o.innerHTML = `
    <div class="modal">
      <div class="modal-icon">${c.icon || ""}</div>
      <div class="modal-title">${c.title || ""}</div>
      <div class="modal-text">${c.text || ""}</div>
      <div class="modal-actions">
        ${(c.buttons || [])
          .map((b) => `<button class="modal-btn ${b.class || ""}" onclick="${b.action}">${b.label}</button>`)
          .join("")}
      </div>
    </div>`;
  document.body.appendChild(o);
  return o;
}
function fecharModal() {
  const o = document.querySelector(".modal-overlay");
  if (o) o.remove();
}
function confirmarSaida() {
  criarModal({
    icon: "⚠️",
    title: "Tem certeza?",
    text: "Ao sair, você perderá todo o progresso local armazenado neste navegador.",
    buttons: [
      { label: "Sim, sair", class: "confirm", action: "sairConfirmado()" },
      { label: "Cancelar", class: "cancel", action: "fecharModal()" },
    ],
  });
}
function sairConfirmado() {
  localStorage.removeItem("SETOR");
  window.location.href = "index.html";
}
function trocarSetor() {
  confirmarSaida();
}

function entrar() {
  const raw = document.getElementById("setor")?.value || "";
  const s = normalizeSector(raw);
  if (!s) return alert("Digite seu setor.");
  if (!ALLOWED_SECTORS.includes(s)) {
    return alert(`Setor inválido. Use um dos setores liberados: ${ALLOWED_SECTORS.join(", ")}`);
  }
  localStorage.setItem("SETOR", s);
  window.location.href = "home.html";
}

function isQuizCompleted(marcaId, kbdId) {
  const data = getCompletedData();
  return !!(data[marcaId] && data[marcaId][kbdId]);
}
function markQuizCompleted(marcaId, kbdId) {
  const data = getCompletedData();
  if (!data[marcaId]) data[marcaId] = {};
  data[marcaId][kbdId] = true;
  localStorage.setItem("QUIZZES_COMPLETED", JSON.stringify(data));
}
function getBrandProgress(marcaId) {
  const marca = CONTENT.marcas.find((m) => m.id === marcaId);
  if (!marca) return { done: 0, total: 0, pct: 0 };
  const data = getCompletedData();
  const total = marca.kbds.length;
  let done = 0;
  for (const kbd of marca.kbds) if (data[marcaId] && data[marcaId][kbd.id]) done++;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function renderHome() {
  ensureSetor();
  const setor = getSetor();
  setText("setorBadge", setor);
  const overall = updateShellProgress();
  setText("statMarcas", String(CONTENT.marcas.length));
  setText("statKbds", String(overall.total));
  setText("statSetor", setor.replace("SPI", "") || setor);
  setText("homeProgressText", `${overall.done}/${overall.total} concluídos`);
  const lista = document.getElementById("listaMarcas");
  if (!lista) return;
  lista.innerHTML = "";
  CONTENT.marcas.forEach((m) => {
    const prog = getBrandProgress(m.id);
    const div = document.createElement("button");
    div.type = "button";
    div.className = `brand-card ${prog.pct === 100 ? "done" : "pending"}`;
    div.innerHTML = `
      <div class="brand-card-top"><div class="brand-dot"></div></div>
      <div class="brand-logo-wrap"><img class="brand-logo" src="${m.logo}" alt="${m.nome}"></div>
      <div class="brand-name">${m.nome}</div>
      <div class="brand-sub">${prog.done}/${prog.total} KBDs concluídos</div>
      <div class="progressline ${prog.pct >= 80 ? "primary" : ""}"><span style="width:${prog.pct}%"></span></div>
      <div class="progress-text" style="color:${prog.pct === 100 ? '#86efcf' : prog.pct >= 50 ? '#d2a8ff' : '#ffb5cb'}">${prog.pct}% COMPLETO</div>`;
    div.onclick = () => (window.location.href = `marca.html?marca=${encodeURIComponent(m.id)}`);
    lista.appendChild(div);
  });
}
function voltarHome() {
  window.location.href = "home.html";
}

function renderMarca() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const marca = CONTENT.marcas.find((m) => m.id === marcaId);
  if (!marca) {
    alert("Marca não encontrada");
    voltarHome();
    return;
  }
  setText("setorBadge", getSetor());
  updateShellProgress();
  setText("marcaTitulo", marca.nome);
  setText("marcaHeroTitulo", marca.nome);
  const prog = getBrandProgress(marca.id);
  const progEl = document.getElementById("marcaProgresso");
  if (progEl) {
    progEl.textContent = `Progresso: ${prog.done}/${prog.total} (${prog.pct}%)`;
    progEl.className = prog.pct === 100 ? "brand-progress ok" : "brand-progress";
  }
  const lista = document.getElementById("listaKbds");
  if (!lista) return;
  lista.innerHTML = "";
  marca.kbds.forEach((kbd, index) => {
    const done = isQuizCompleted(marca.id, kbd.id);
    const div = document.createElement("button");
    div.type = "button";
    div.className = "kbd-card";
    div.innerHTML = `
      <div class="kbd-card-header">
        <div>
          <div class="kbd-card-kicker">KBD ${index + 1}</div>
          <div class="kbd-card-title">${kbd.nome}</div>
          <div class="kbd-card-sub">${done ? "Quiz concluído" : "Vídeo e referências visuais disponíveis"}</div>
        </div>
        <div class="pct-pill ${done ? "pct-ok" : "pct-pending"}">${done ? 100 : 0}%</div>
      </div>`;
    div.onclick = () => (window.location.href = `kbd.html?marca=${encodeURIComponent(marca.id)}&kbd=${encodeURIComponent(kbd.id)}`);
    lista.appendChild(div);
  });
}
function voltarMarca() {
  const marca = qs().get("marca");
  window.location.href = `marca.html?marca=${encodeURIComponent(marca)}`;
}

function renderKbd() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const kbdId = qs().get("kbd");
  const marca = CONTENT.marcas.find((m) => m.id === marcaId);
  if (!marca) {
    alert("Marca não encontrada");
    voltarHome();
    return;
  }
  const kbd = (marca.kbds || []).find((k) => k.id === kbdId);
  if (!kbd) {
    alert("KBD não encontrado");
    voltarMarca();
    return;
  }
  setText("kbdTitulo", `${marca.nome} • ${kbd.nome}`);
  setText("topbarSetor", getSetor());
  updateShellProgress();
  const iframe = document.getElementById("videoFrame");
  const placeholder = document.getElementById("videoPlaceholder");
  if (kbd.videoId) {
    iframe.src = "https://www.youtube.com/embed/" + kbd.videoId;
    iframe.style.display = "block";
    placeholder.style.display = "none";
  } else {
    iframe.style.display = "none";
    placeholder.style.display = "flex";
  }
  const imgBox = document.getElementById("imagensKbd");
  if (imgBox) {
    imgBox.innerHTML = "";
    if (kbd.imagens && kbd.imagens.length > 0) {
      kbd.imagens.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = kbd.nome;
        imgBox.appendChild(img);
      });
    } else {
      const msg = document.createElement("div");
      msg.className = "img-placeholder";
      msg.innerHTML = `<span class="material-symbols-outlined" style="font-size:28px;color:#ff89ab">image</span><div style="margin-top:8px">Imagens em breve.</div>`;
      imgBox.appendChild(msg);
    }
  }
  const status = document.getElementById("kbdStatus");
  if (status) {
    const done = isQuizCompleted(marca.id, kbd.id);
    status.innerHTML = done
      ? '<span class="material-symbols-outlined">check_circle</span><span>Quiz concluído</span>'
      : '<span class="material-symbols-outlined">schedule</span><span>Quiz pendente</span>';
    status.className = done ? "kbd-status done" : "kbd-status pending";
  }
}
function irParaQuiz() {
  const marca = qs().get("marca");
  const kbd = qs().get("kbd");
  window.location.href = `quiz.html?marca=${encodeURIComponent(marca)}&kbd=${encodeURIComponent(kbd)}`;
}

let quizState = {
  marcaAtual: null,
  kbdAtual: null,
  perguntaIndex: 0,
  acertos: 0,
  total: 0,
  respondendo: false,
  perguntas: [],
  selected: null,
  revealed: false,
};

function renderQuiz() {
  ensureSetor();
  const marcaId = qs().get("marca");
  const kbdId = qs().get("kbd");
  const marca = CONTENT.marcas.find((m) => m.id === marcaId);
  if (!marca) {
    alert("Marca não encontrada");
    voltarHome();
    return;
  }
  const kbd = (marca.kbds || []).find((k) => k.id === kbdId);
  const byBrand = (window.QUIZZES && window.QUIZZES[marcaId]) || null;
  const perguntas = byBrand && typeof byBrand === "object" && byBrand[kbdId] ? byBrand[kbdId] : [];
  setText("setorBadgeQuiz", getSetor());
  updateShellProgress();
  setText("quizTitulo", `Quiz ${marca.nome}`);
  setText("quizSubtitulo", kbd ? kbd.nome : "");
  if (!perguntas || perguntas.length === 0) {
    setHTML("quizArea", `
      <div class="card">
        <div class="card-title">Quiz não encontrado</div>
        <div class="card-sub">Não existe quiz cadastrado para este KBD.</div>
        <div style="height:12px"></div>
        <button class="btn" onclick="voltarMarca()">Voltar</button>
      </div>`);
    return;
  }
  quizState = { marcaAtual: marca, kbdAtual: kbd, perguntaIndex: 0, acertos: 0, total: perguntas.length, respondendo: false, perguntas, selected: null, revealed: false };
  mostrarPergunta();
}
function mostrarPergunta() {
  const p = quizState.perguntas[quizState.perguntaIndex];
  const progress = Math.round(((quizState.perguntaIndex + 1) / quizState.perguntas.length) * 100);
  quizState.respondendo = false;
  quizState.selected = null;
  quizState.revealed = false;
  setHTML("quizArea", `
    <div class="quiz-progress">Pergunta ${quizState.perguntaIndex + 1} de ${quizState.perguntas.length}</div>
    <div class="quiz-bar"><span style="width:${progress}%"></span></div>
    <div class="quiz-question">${p.pergunta}</div>
    <div class="quiz-options">
      ${p.alternativas.map((alt, i) => {
        const l = String.fromCharCode(65 + i);
        const clean = String(alt).replace(/^[A-D]\)\s*/, "");
        return `<button id="opt-${l}" class="opt" onclick="selecionarOpcao('${l}')"><span class="opt-letter">${l}</span><span class="opt-text">${clean}</span></button>`;
      }).join("")}
    </div>
    <div id="quizFeedback"></div>
    <div style="height:14px"></div>
    <button class="btn" id="quizActionBtn" onclick="confirmarResposta()">Confirmar resposta</button>`);
}
function selecionarOpcao(r) {
  if (quizState.revealed) return;
  quizState.selected = r;
  document.querySelectorAll('.opt').forEach((el) => el.classList.remove('selected'));
  const btn = document.getElementById(`opt-${r}`);
  if (btn) btn.classList.add('selected');
}
function confirmarResposta() {
  if (!quizState.selected) return;
  if (quizState.revealed) return proximaPergunta();
  responderQuiz(quizState.selected);
}
function responderQuiz(r) {
  if (quizState.respondendo) return;
  quizState.respondendo = true;
  const p = quizState.perguntas[quizState.perguntaIndex];
  const correto = r === p.gabarito;
  quizState.revealed = true;
  if (correto) quizState.acertos++;
  enviarParaSheets({
    setor: getSetor(),
    marca: quizState.marcaAtual.nome,
    kbd: quizState.kbdAtual ? quizState.kbdAtual.nome : "N/A",
    pergunta: p.pergunta,
    resposta: r,
    correta: p.gabarito,
    acertou: correto,
    score: Math.round((quizState.acertos / quizState.total) * 100),
  });
  document.querySelectorAll('.opt').forEach((el) => el.classList.add('disabled'));
  document.querySelectorAll('.opt').forEach((el) => {
    const letter = el.id.replace('opt-', '');
    if (letter === p.gabarito) el.classList.add('correct');
    if (letter === r && !correto) el.classList.add('wrong');
  });
  const corretaTxt = p.alternativas[p.gabarito.charCodeAt(0) - 65].replace(/^[A-D]\)\s*/, "");
  setHTML("quizFeedback", correto
    ? `<div class="feedback ok"><div class="feedback-icon">✓</div><div class="feedback-title">Resposta correta!</div><div class="feedback-sub">${p.justificativa || "Boa resposta. Você manteve a leitura certa do KBD."}</div></div>`
    : `<div class="feedback wrong"><div class="feedback-icon">✕</div><div class="feedback-title">Resposta incorreta</div><div class="feedback-sub"><strong>Resposta correta:</strong> ${p.gabarito}) ${corretaTxt}<br>${p.justificativa || ""}</div></div>`);
  const actionBtn = document.getElementById("quizActionBtn");
  if (actionBtn) actionBtn.textContent = quizState.perguntaIndex + 1 === quizState.perguntas.length ? "Ver resultado" : "Próxima pergunta";
  quizState.respondendo = false;
}
function proximaPergunta() {
  quizState.perguntaIndex++;
  if (quizState.perguntaIndex < quizState.perguntas.length) mostrarPergunta();
  else mostrarResultadoFinal();
}
function findNextPendingKbdInBrand(marcaId) {
  const marca = CONTENT.marcas.find((m) => m.id === marcaId);
  if (!marca) return null;
  const data = getCompletedData();
  for (const kbd of marca.kbds) if (!(data[marcaId] && data[marcaId][kbd.id])) return { marca: marcaId, kbd: kbd.id };
  return null;
}
function findNextBrandWithPending(afterMarcaId) {
  const data = getCompletedData();
  const idx = CONTENT.marcas.findIndex((m) => m.id === afterMarcaId);
  for (let i = idx + 1; i < CONTENT.marcas.length; i++) {
    const m = CONTENT.marcas[i];
    for (const kbd of m.kbds) if (!(data[m.id] && data[m.id][kbd.id])) return m.id;
  }
  for (let i = 0; i < CONTENT.marcas.length; i++) {
    const m = CONTENT.marcas[i];
    for (const kbd of m.kbds) if (!(data[m.id] && data[m.id][kbd.id])) return m.id;
  }
  return null;
}
function findFirstPendingQuiz() {
  const data = getCompletedData();
  for (const marca of CONTENT.marcas) for (const kbd of marca.kbds) if (!(data[marca.id] && data[marca.id][kbd.id])) return { marca: marca.id, kbd: kbd.id };
  return null;
}
function abrirQuizGlobal() {
  ensureSetor();
  const next = findFirstPendingQuiz();
  if (!next) {
    alert("Parabéns! Você concluiu todos os quizzes.");
    window.location.href = "home.html";
    return;
  }
  window.location.href = `quiz.html?marca=${encodeURIComponent(next.marca)}&kbd=${encodeURIComponent(next.kbd)}`;
}
function medalEmoji(pct) {
  if (pct === 100) return "🥇";
  if (pct >= 80) return "🥈";
  return "🥉";
}
function mostrarResultadoFinal() {
  const { acertos, total, marcaAtual, kbdAtual } = quizState;
  const pct = Math.round((acertos / total) * 100);
  const medal = medalEmoji(pct);
  markQuizCompleted(marcaAtual.id, kbdAtual.id);
  updateShellProgress();
  const nextInBrand = findNextPendingKbdInBrand(marcaAtual.id);
  const nextBrand = nextInBrand ? null : findNextBrandWithPending(marcaAtual.id);
  let nextLabel = "Concluir";
  let nextAction = `alert('Parabéns! Você concluiu todos os quizzes!'); window.location.href='home.html'`;
  if (nextInBrand) {
    nextLabel = "Próximo KBD";
    nextAction = `window.location.href='kbd.html?marca=${encodeURIComponent(nextInBrand.marca)}&kbd=${encodeURIComponent(nextInBrand.kbd)}'`;
  } else if (nextBrand) {
    nextLabel = "Próxima marca";
    nextAction = `window.location.href='marca.html?marca=${encodeURIComponent(nextBrand)}'`;
  }
  setHTML("quizArea", `
    <div class="result">
      <div class="result-medal">${medal}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-sub">${acertos} de ${total} perguntas corretas em <strong>${kbdAtual.nome}</strong>.</div>
      <button class="btn" onclick="${nextAction}">${nextLabel}</button>
    </div>`);
}

async function enviarParaSheets(d) {
  try {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    });
  } catch (e) {
    console.warn("Falha ao enviar para Sheets", e);
  }
}
