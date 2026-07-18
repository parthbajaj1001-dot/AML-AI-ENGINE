/* ================================================================
   AML Shield AI v3.5 — COMPLETE JAVASCRIPT (ES Module)
   Three.js 3D Hero + Neural Network Visualizer + Behavioral Timeline
   + Live Feed + World Map + Case Board + Full Scanner
   ================================================================ */
'use strict';

import * as THREE from 'three';

/* ── GLOBAL STATE ──────────────────────────────────────────────── */
const AML = {
  theme: 'dark',
  scanCount: 0,
  charts: {},
  feedRunning: true,
  feedFilter: 'all',
  feedData: { total: 0, high: 0, med: 0, low: 0 },
  feedPatterns: {},
  sparkData: [],
  cases: [],
  dragCaseId: null,
  worldAnimFrame: null,
  neuralRunning: true,
  neuralAnimFrame: null,
  behaviorAccount: 'ACC-4782',
  behaviorAnimFrame: null
};

/* ================================================================
   LOADER — Cinematic typewriter + canvas network
================================================================ */
(function initLoader() {
  const canvas = document.getElementById('loader-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  /* typewriter brand */
  const brandEl = document.getElementById('loader-brand-text');
  const brandText = 'AML Shield AI';
  let ti = 0;
  const typeInterval = setInterval(() => {
    if (ti <= brandText.length) { brandEl.textContent = brandText.slice(0, ti); ti++; }
    else clearInterval(typeInterval);
  }, 80);

  /* network nodes */
  const N = 30, nodes = [];
  for (let i = 0; i < N; i++) nodes.push({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .7, vy: (Math.random() - .5) * .7,
    r: Math.random() * 3 + 1.5,
    risk: Math.random() < .25 ? 'h' : Math.random() < .5 ? 'm' : 'l',
    p: Math.random() * Math.PI * 2
  });

  let loaderAF;
  function drawL() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#030712'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 190) {
        const a = (1 - d / 190) * .35;
        const susp = nodes[i].risk === 'h' && nodes[j].risk === 'h';
        ctx.strokeStyle = susp ? `rgba(255,50,80,${a})` : `rgba(0,200,255,${a * .5})`;
        ctx.lineWidth = susp ? 1.2 : .5;
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      }
    }
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.p += .04;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      const c = n.risk === 'h' ? '#ff3250' : n.risk === 'm' ? '#f5c518' : '#00e87c';
      ctx.shadowColor = c; ctx.shadowBlur = 10 + Math.abs(Math.sin(n.p)) * 8;
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });
    const sy = (Date.now() * .4) % canvas.height;
    const sg = ctx.createLinearGradient(0, sy - 50, 0, sy + 50);
    sg.addColorStop(0, 'transparent'); sg.addColorStop(.5, 'rgba(0,229,255,.12)'); sg.addColorStop(1, 'transparent');
    ctx.fillStyle = sg; ctx.fillRect(0, sy - 50, canvas.width, 100);
    loaderAF = requestAnimationFrame(drawL);
  }
  drawL();

  /* progress */
  const fill = document.getElementById('loader-fill');
  const pct = document.getElementById('loader-pct');
  const logs = ['ll-0', 'll-1', 'll-2', 'll-3', 'll-4', 'll-5'];
  let prog = 0, logIdx = 0;
  const pi = setInterval(() => {
    prog += Math.random() * 9 + 3; if (prog > 100) prog = 100;
    fill.style.width = prog + '%'; pct.textContent = Math.floor(prog) + '%';
    const newLog = Math.floor((prog / 100) * (logs.length - 1));
    while (logIdx <= newLog && logIdx < logs.length) {
      const el = document.getElementById(logs[logIdx]);
      if (el) {
        if (logIdx > 0) { const prev = document.getElementById(logs[logIdx - 1]); if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('.ll-dot').textContent = '✓'; } }
        el.classList.add('active');
      }
      logIdx++;
    }
    if (prog >= 100) {
      clearInterval(pi);
      setTimeout(() => {
        cancelAnimationFrame(loaderAF);
        const loader = document.getElementById('loader');
        loader.style.opacity = '0'; loader.style.transform = 'scale(1.04)';
        setTimeout(() => { loader.style.display = 'none'; initAll(); }, 700);
      }, 600);
    }
  }, 85);
})();

/* ================================================================
   INIT ALL
================================================================ */
function initAll() {
  initCursorGlow();
  initNavbar();
  initScrollProgress();
  initBackToTop();
  initThemeToggle();
  initTicker();
  initThreeHero();
  initParticleCanvas();
  initHeroMetrics();
  initTiltCards();
  initCounters();
  initCharts();
  initWorkflow();
  initSmoothScroll();
  initFAQ();
  initLiveFeed();
  initWorldMap();
  initNeuralViz();
  initBehavioralTimeline();
  initCaseBoard();
  initDragDrop();
  initIntersectionObserver();
  initRipple();
  initActiveNav();
  setReportDate();
  initNewV4Features();
  setTimeout(showDemoAlert, 4500);
}

/* ================================================================
   CURSOR GLOW
================================================================ */
function initCursorGlow() {
  const g = document.getElementById('cursor-glow');
  if (!g) return;
  document.addEventListener('mousemove', e => {
    g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';
  });
}

/* ================================================================
   THREE.JS 3D HERO — Advanced WebGL scene
================================================================ */
function initThreeHero() {
  const container = document.getElementById('three-container');
  if (!container) return;

  const W = window.innerWidth, H = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, .1, 1000);
  camera.position.set(0, 0, 28);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  /* Lights */
  scene.add(new THREE.AmbientLight(0x001830, 1));
  const pl1 = new THREE.PointLight(0x00e5ff, 3, 70); pl1.position.set(10, 10, 10); scene.add(pl1);
  const pl2 = new THREE.PointLight(0xff3250, 2, 50); pl2.position.set(-10, -5, 5); scene.add(pl2);
  const pl3 = new THREE.PointLight(0x00e87c, 1.5, 60); pl3.position.set(0, 15, -10); scene.add(pl3);
  const pl4 = new THREE.PointLight(0xa064ff, 1.5, 40); pl4.position.set(-15, 5, -5); scene.add(pl4);

  /* Transaction nodes */
  const nodeGeo = new THREE.SphereGeometry(.38, 20, 20);
  const nodes3d = [], edges3d = [];
  const colors = { h: 0xff3250, m: 0xf5c518, l: 0x00e87c };
  const riskTypes = ['h', 'h', 'h', 'h', 'm', 'm', 'm', 'l', 'l', 'l', 'l', 'l'];

  for (let i = 0; i < 22; i++) {
    const risk = riskTypes[i % riskTypes.length];
    const mat = new THREE.MeshStandardMaterial({
      color: colors[risk], emissive: colors[risk],
      emissiveIntensity: .7, roughness: .2, metalness: .8
    });
    const mesh = new THREE.Mesh(nodeGeo, mat);
    mesh.position.set(
      (Math.random() - .5) * 34,
      (Math.random() - .5) * 20,
      (Math.random() - .5) * 14
    );
    mesh.userData = {
      risk, phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - .5) * .035,
      vy: (Math.random() - .5) * .035,
      vz: (Math.random() - .5) * .02
    };
    scene.add(mesh); nodes3d.push(mesh);
  }

  /* Central threat node */
  const centerGeo = new THREE.SphereGeometry(.95, 32, 32);
  const centerMat = new THREE.MeshStandardMaterial({
    color: 0xff3250, emissive: 0xff3250,
    emissiveIntensity: 1.2, roughness: .1, metalness: .9
  });
  const centerSphere = new THREE.Mesh(centerGeo, centerMat);
  centerSphere.position.set(3, 1, 0); scene.add(centerSphere);

  /* Pulse rings */
  const ringGeo1 = new THREE.TorusGeometry(9, .06, 8, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .2 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat); scene.add(ring1);

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(13, .04, 8, 100),
    new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .1 })
  );
  ring2.rotation.x = Math.PI / 3; scene.add(ring2);

  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(6, .05, 8, 80),
    new THREE.MeshBasicMaterial({ color: 0xff3250, transparent: true, opacity: .15 })
  );
  ring3.rotation.x = Math.PI / 4; ring3.rotation.y = Math.PI / 6; scene.add(ring3);

  /* Edges between nodes */
  function createEdge(a, b, col) {
    const pts = [a.position.clone(), b.position.clone()];
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: .3 });
    const line = new THREE.Line(geo, mat);
    scene.add(line); edges3d.push({ line, a, b, mat });
  }
  nodes3d.forEach((n, i) => {
    if (i > 0 && Math.random() > .35) {
      const target = nodes3d[Math.floor(Math.random() * i)];
      createEdge(n, target, n.userData.risk === 'h' ? 0xff3250 : 0x00e5ff);
    }
  });

  /* Money flow packets along edges */
  const packets = [];
  edges3d.slice(0, 8).forEach(e => {
    packets.push({
      edge: e, t: Math.random(),
      speed: .004 + Math.random() * .006,
      mesh: (() => {
        const m = new THREE.Mesh(
          new THREE.SphereGeometry(.12, 8, 8),
          new THREE.MeshBasicMaterial({ color: e.edge ? 0xff3250 : 0x00e5ff })
        );
        scene.add(m); return m;
      })()
    });
  });

  /* Star field */
  const starGeo = new THREE.BufferGeometry();
  const starCount = 600;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) starPos[i] = (Math.random() - .5) * 100;
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x00e5ff, size: .06, transparent: true, opacity: .4 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* DNA Helix structure */
  const helixPoints1 = [], helixPoints2 = [];
  for (let i = 0; i < 60; i++) {
    const t = (i / 60) * Math.PI * 6;
    const r = 4;
    helixPoints1.push(new THREE.Vector3(Math.cos(t) * r - 12, (i / 60) * 20 - 10, Math.sin(t) * r));
    helixPoints2.push(new THREE.Vector3(Math.cos(t + Math.PI) * r - 12, (i / 60) * 20 - 10, Math.sin(t + Math.PI) * r));
  }
  const helixGeo1 = new THREE.BufferGeometry().setFromPoints(helixPoints1);
  const helixGeo2 = new THREE.BufferGeometry().setFromPoints(helixPoints2);
  const helixMat1 = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .25 });
  const helixMat2 = new THREE.LineBasicMaterial({ color: 0xff3250, transparent: true, opacity: .2 });
  scene.add(new THREE.Line(helixGeo1, helixMat1));
  scene.add(new THREE.Line(helixGeo2, helixMat2));

  /* Helix rungs */
  for (let i = 0; i < 60; i += 4) {
    const t = (i / 60) * Math.PI * 6;
    const r = 4;
    const rungGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(t) * r - 12, (i / 60) * 20 - 10, Math.sin(t) * r),
      new THREE.Vector3(Math.cos(t + Math.PI) * r - 12, (i / 60) * 20 - 10, Math.sin(t + Math.PI) * r)
    ]);
    scene.add(new THREE.Line(rungGeo, new THREE.LineBasicMaterial({ color: 0x334466, transparent: true, opacity: .3 })));
  }

  /* Mouse parallax */
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - .5) * 2;
    my = (e.clientY / window.innerHeight - .5) * 2;
  });

  /* Animation loop */
  let t = 0;
  function animate3d() {
    requestAnimationFrame(animate3d); t += .012;

    camera.position.x += (mx * 3.5 - camera.position.x) * .05;
    camera.position.y += (-my * 2.5 - camera.position.y) * .05;
    camera.lookAt(0, 0, 0);

    nodes3d.forEach(n => {
      n.position.x += n.userData.vx; n.position.y += n.userData.vy; n.position.z += n.userData.vz;
      if (Math.abs(n.position.x) > 18) n.userData.vx *= -1;
      if (Math.abs(n.position.y) > 11) n.userData.vy *= -1;
      if (Math.abs(n.position.z) > 9) n.userData.vz *= -1;
      n.userData.phase += .03;
      n.scale.setScalar(1 + Math.sin(n.userData.phase) * .18);
      n.material.emissiveIntensity = .5 + Math.abs(Math.sin(n.userData.phase)) * .6;
    });

    edges3d.forEach(e => {
      const pts = [e.a.position.clone(), e.b.position.clone()];
      e.line.geometry.setFromPoints(pts);
      e.line.geometry.attributes.position.needsUpdate = true;
    });

    /* Move money packets along edges */
    packets.forEach(pk => {
      pk.t += pk.speed;
      if (pk.t > 1) pk.t = 0;
      const a = pk.edge.a.position, b = pk.edge.b.position;
      pk.mesh.position.lerpVectors(a, b, pk.t);
      pk.mesh.material.color.setHex(pk.t < .5 ? 0xff3250 : 0x00e5ff);
    });

    centerSphere.scale.setScalar(1 + Math.sin(t * 2) * .1);
    centerSphere.material.emissiveIntensity = .9 + Math.sin(t * 3) * .4;
    centerSphere.position.y = 1 + Math.sin(t) * .6;

    ring1.rotation.z = t * .15; ring1.rotation.x = t * .08;
    ring2.rotation.y = t * .1; ring2.rotation.z = -t * .06;
    ring3.rotation.x = t * .12; ring3.rotation.z = t * .09;

    stars.rotation.y = t * .018; stars.rotation.x = t * .009;
    renderer.render(scene, camera);
  }
  animate3d();

  window.addEventListener('resize', () => {
    const W2 = window.innerWidth, H2 = window.innerHeight;
    camera.aspect = W2 / H2; camera.updateProjectionMatrix();
    renderer.setSize(W2, H2);
  });
}

/* ================================================================
   PARTICLE CANVAS (2D overlay)
================================================================ */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const particles = [];
  for (let i = 0; i < 70; i++) particles.push({
    x: Math.random() * canvas.width, y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
    r: Math.random() * 1.5 + .5, a: Math.random() * .5 + .1
  });
  function drawP() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.fillStyle = `rgba(0,229,255,${p.a})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(drawP);
  }
  drawP();
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

/* ================================================================
   HERO METRICS ANIMATION
================================================================ */
function initHeroMetrics() {
  document.querySelectorAll('.hm-val[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0; const dur = 2000; const start = performance.now();
    function upd(now) {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      current = Math.floor(e * target);
      el.textContent = current.toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(upd);
      else el.textContent = target.toLocaleString('en-IN') + suffix;
    }
    requestAnimationFrame(upd);
  });
}

/* ================================================================
   NAVBAR
================================================================ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60));
  ham.addEventListener('click', () => { ham.classList.toggle('active'); links.classList.toggle('open'); });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => { ham.classList.remove('active'); links.classList.remove('open'); }));
}

/* ================================================================
   ALERT TICKER
================================================================ */
function initTicker() {
  const inner = document.getElementById('ticker-inner');
  if (!inner) return;
  const alerts = [
    { icon: 'fa-triangle-exclamation', text: 'HIGH RISK: ACC-4782 — Layering Chain Detected — Score 91' },
    { icon: 'fa-bitcoin-sign', text: 'CRYPTO ALERT: WALLET-89X — Mixing Activity — Score 88' },
    { icon: 'fa-rotate', text: 'CIRCULAR TRANSFER: ACC-2201 — Score 74' },
    { icon: 'fa-globe', text: 'SANCTIONED COUNTRY: Wire Transfer flagged — Iran — Score 95' },
    { icon: 'fa-user-secret', text: 'MULE ACCOUNT: ACC-8832 — Dormant→Active Pattern — Score 79' },
    { icon: 'fa-scissors', text: 'STRUCTURING: BIZ-0019 — Sub-threshold splits — Score 67' },
    { icon: 'fa-bolt', text: 'RAPID TRANSFER: ACC-6653 — 45L in 3 hours — Score 95' },
    { icon: 'fa-shield-halved', text: 'SYSTEM: AI Engine v3.5 processing 1,847 transactions per second' },
    { icon: 'fa-brain', text: 'NEURAL VIZ: 312 nodes active — Layer 4 activation spike detected' },
    { icon: 'fa-fingerprint', text: 'BEHAVIOR ALERT: ACC-4782 — Anomaly spike detected in behavioral timeline' },
    { icon: 'fa-fire', text: 'HEATMAP: Tuesday 03:00 — Critical risk intensity 94% — 12 active alerts' },
    { icon: 'fa-diagram-project', text: 'GRAPH: Circular money flow detected — ACC-4782 → SHELL-001 → WALLET-89X → ACC-4782' },
    { icon: 'fa-robot', text: 'COPILOT: AML AI Assistant online — Ask about risk patterns, regulations, SAR filing' }
  ];
  const allAlerts = [...alerts, ...alerts];
  allAlerts.forEach((a, i) => {
    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.innerHTML = `<i class="fas ${a.icon}"></i> ${a.text}`;
    inner.appendChild(item);
    if (i < allAlerts.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'ticker-sep'; sep.textContent = '•';
      inner.appendChild(sep);
    }
  });
}

/* ================================================================
   SCROLL PROGRESS + BACK TO TOP
================================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  });
}
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ================================================================
   THEME TOGGLE
================================================================ */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const dark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', dark ? 'light' : 'dark');
    btn.innerHTML = dark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    AML.theme = dark ? 'light' : 'dark';
  });
}

/* ================================================================
   SMOOTH SCROLL
================================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar').offsetHeight + 28 + 10;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
      }
    });
  });
}

/* ================================================================
   TILT CARDS
================================================================ */
function initTiltCards() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * 10;
      const ry = ((r.width / 2 - x) / r.width) * 10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)');
  });
}

/* ================================================================
   COUNTERS
================================================================ */
function initCounters() { /* triggered by IntersectionObserver */ }
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const dur = 2000; const start = performance.now();
  function upd(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target).toLocaleString('en-IN');
    if (p < 1) requestAnimationFrame(upd); else el.textContent = target.toLocaleString('en-IN');
  }
  requestAnimationFrame(upd);
}

/* ================================================================
   CHARTS
================================================================ */
function initCharts() {
  Chart.defaults.color = '#8892a0';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.04)';

  const rc = document.getElementById('riskChart');
  if (rc) AML.charts.risk = new Chart(rc, {
    type: 'bar',
    data: {
      labels: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
      datasets: [{
        label: 'Transactions',
        data: [4200, 3800, 5100, 4400, 3200, 2800, 3600, 4800, 2900, 1247],
        backgroundColor: ['rgba(0,232,124,.7)', 'rgba(0,232,124,.7)', 'rgba(0,232,124,.6)', 'rgba(0,229,255,.6)', 'rgba(0,229,255,.6)', 'rgba(245,197,24,.7)', 'rgba(245,197,24,.7)', 'rgba(245,197,24,.8)', 'rgba(255,100,50,.8)', 'rgba(255,50,80,.9)'],
        borderColor: ['#00e87c', '#00e87c', '#00e87c', '#00e5ff', '#00e5ff', '#f5c518', '#f5c518', '#f5c518', '#ff6432', '#ff3250'],
        borderWidth: 1, borderRadius: 4
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgba(5,10,30,.95)', titleColor: '#00e5ff', bodyColor: '#e2e8f0', borderColor: 'rgba(0,229,255,.3)', borderWidth: 1 } },
      scales: { x: { ticks: { color: '#8892a0', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,.03)' } }, y: { ticks: { color: '#8892a0' }, grid: { color: 'rgba(255,255,255,.04)' } } }
    }
  });

  const tc = document.getElementById('trendChart');
  if (tc) {
    const labs = [], txD = [], rkD = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      labs.push(d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
      txD.push(Math.floor(15000 + Math.random() * 5000));
      rkD.push(Math.floor(80 + Math.random() * 120));
    }
    AML.charts.trend = new Chart(tc, {
      type: 'line',
      data: {
        labels: labs,
        datasets: [
          { label: 'Transactions', data: txD, borderColor: '#00e5ff', backgroundColor: 'rgba(0,229,255,.07)', fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: '#00e5ff', yAxisID: 'y' },
          { label: 'Risk Alerts', data: rkD, borderColor: '#ff3250', backgroundColor: 'rgba(255,50,80,.07)', fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: '#ff3250', yAxisID: 'y1' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { position: 'top', labels: { color: '#8892a0', boxWidth: 10, font: { size: 10 } } }, tooltip: { backgroundColor: 'rgba(5,10,30,.95)', titleColor: '#00e5ff', bodyColor: '#e2e8f0', borderColor: 'rgba(0,229,255,.3)', borderWidth: 1 } },
        scales: { x: { ticks: { color: '#8892a0', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,.03)' } }, y: { ticks: { color: '#8892a0' }, grid: { color: 'rgba(255,255,255,.04)' }, position: 'left' }, y1: { ticks: { color: '#ff3250' }, grid: { display: false }, position: 'right' } }
      }
    });
  }

  const pc = document.getElementById('pieChart');
  if (pc) AML.charts.pie = new Chart(pc, {
    type: 'doughnut',
    data: {
      labels: ['Layering Chain', 'Circular Transfer', 'Crypto Mixing', 'Smurfing', 'Mule Account', 'Wire Fraud'],
      datasets: [{
        data: [28, 22, 18, 14, 11, 7],
        backgroundColor: ['rgba(255,50,80,.85)', 'rgba(255,100,50,.85)', 'rgba(245,197,24,.85)', 'rgba(0,229,255,.85)', 'rgba(160,100,255,.85)', 'rgba(0,232,124,.85)'],
        borderColor: '#0a0f1e', borderWidth: 2, hoverOffset: 8
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { color: '#8892a0', boxWidth: 9, padding: 10, font: { size: 10 } } },
        tooltip: { backgroundColor: 'rgba(5,10,30,.95)', titleColor: '#00e5ff', bodyColor: '#e2e8f0', borderColor: 'rgba(0,229,255,.3)', borderWidth: 1, callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });
}

/* ================================================================
   WORKFLOW ANIMATION
================================================================ */
function initWorkflow() { /* triggered by IntersectionObserver */ }

/* ================================================================
   FAQ
================================================================ */
function initFAQ() { }
window.toggleFAQ = function(el) {
  const open = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => { f.classList.remove('open'); f.querySelector('.faq-ico').className = 'fas fa-plus faq-ico'; });
  if (!open) { el.classList.add('open'); el.querySelector('.faq-ico').className = 'fas fa-minus faq-ico'; }
};

/* ================================================================
   REPORT DATE
================================================================ */
function setReportDate() {
  const el = document.getElementById('report-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

/* ================================================================
   INTERSECTION OBSERVER
================================================================ */
function initIntersectionObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      const numEl = entry.target.querySelector('.ds-num[data-target]');
      if (numEl && !numEl.dataset.animated) { numEl.dataset.animated = '1'; animateCounter(numEl); }
      if (entry.target.classList.contains('wf-step')) {
        const s = parseInt(entry.target.dataset.step || 1);
        setTimeout(() => entry.target.classList.add('wf-active'), (s - 1) * 120);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.glass-card,.dash-stat,.wf-step,.feature-card,.usecase-card,.reasoning-card,.stage-card').forEach(el => obs.observe(el));
}

/* ================================================================
   RIPPLE
================================================================ */
function initRipple() {
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const rip = document.createElement('span');
      rip.className = 'ripple-effect';
      rip.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
      this.appendChild(rip);
      setTimeout(() => rip.remove(), 600);
    });
  });
}

/* ================================================================
   ACTIVE NAV
================================================================ */
function initActiveNav() {
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const l = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (l) l.classList.add('active');
      }
    });
  }, { threshold: .3 });
  secs.forEach(s => obs.observe(s));
}

/* ================================================================
   ✨ NEURAL NETWORK LIVE VISUALIZER (NEW v3.5)
================================================================ */
const NV_LAYERS = [
  { name: 'Input', nodes: 6, color: '#00e5ff' },
  { name: 'Graph GNN', nodes: 8, color: '#a064ff' },
  { name: 'Behavioral', nodes: 7, color: '#00e87c' },
  { name: 'Pattern', nodes: 6, color: '#f5c518' },
  { name: 'Risk Score', nodes: 5, color: '#ff6432' },
  { name: 'Output', nodes: 3, color: '#ff3250' }
];

const nvState = {
  activations: [1, 1, 1, 1, 1, 1],
  pulses: [],
  txRate: 0,
  frameCount: 0,
  highRiskMode: false
};

function initNeuralViz() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  /* Build activation bars */
  const barsEl = document.getElementById('nv-activation-bars');
  if (barsEl) {
    barsEl.innerHTML = NV_LAYERS.map((l, i) => `
      <div class="nv-act-row">
        <span class="nv-act-label">${l.name}</span>
        <div class="nv-act-bar-wrap"><div class="nv-act-bar" id="nvbar-${i}" style="width:80%;background:${l.color}"></div></div>
        <span class="nv-act-val" id="nvval-${i}">80%</span>
      </div>`).join('');
  }

  /* Canvas sizing */
  function resizeCanvas() {
    const wrap = canvas.parentElement;
    canvas.width = wrap.offsetWidth - 40;
    canvas.height = 340;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* Draw loop */
  const ctx = canvas.getContext('2d');
  let nvT = 0;

  function drawNeural() {
    if (!AML.neuralRunning) { AML.neuralAnimFrame = requestAnimationFrame(drawNeural); return; }
    nvT += .018; nvState.frameCount++;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    /* Background */
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(0, 0, W, H);

    /* Layer x positions */
    const layerXs = NV_LAYERS.map((_, i) => 60 + i * ((W - 80) / (NV_LAYERS.length - 1)));

    /* Compute node positions */
    const nodePositions = NV_LAYERS.map((layer, li) => {
      const x = layerXs[li];
      return Array.from({ length: layer.nodes }, (_, ni) => ({
        x, y: H / 2 + (ni - (layer.nodes - 1) / 2) * (H / (layer.nodes + 2)),
        active: Math.random() > .3
      }));
    });

    /* Draw connections */
    for (let li = 0; li < NV_LAYERS.length - 1; li++) {
      const fromNodes = nodePositions[li];
      const toNodes = nodePositions[li + 1];
      fromNodes.forEach(fn => {
        toNodes.forEach(tn => {
          if (Math.random() > .5) return; /* sparse connections */
          ctx.beginPath();
          ctx.moveTo(fn.x, fn.y); ctx.lineTo(tn.x, tn.y);
          const alpha = nvState.highRiskMode ? .18 : .08;
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = .5; ctx.stroke();
        });
      });
    }

    /* Draw pulses traveling between layers */
    nvState.pulses = nvState.pulses.filter(p => p.t < 1);
    nvState.pulses.forEach(p => {
      p.t += .025 + (nvState.highRiskMode ? .02 : 0);
      const fromNodes = nodePositions[p.fromLayer];
      const toNodes = nodePositions[p.toLayer];
      if (!fromNodes || !toNodes || !fromNodes[p.fromNode] || !toNodes[p.toNode]) return;
      const fn = fromNodes[p.fromNode], tn = toNodes[p.toNode];
      const px = fn.x + (tn.x - fn.x) * p.t;
      const py = fn.y + (tn.y - fn.y) * p.t;
      ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color; ctx.shadowBlur = 10;
      ctx.fill(); ctx.shadowBlur = 0;
    });

    /* Add new pulses periodically */
    if (nvState.frameCount % 3 === 0) {
      for (let li = 0; li < NV_LAYERS.length - 1; li++) {
        if (Math.random() > (nvState.highRiskMode ? .3 : .7)) continue;
        const fn = Math.floor(Math.random() * NV_LAYERS[li].nodes);
        const tn = Math.floor(Math.random() * NV_LAYERS[li + 1].nodes);
        const isHigh = nvState.highRiskMode && li >= 3;
        nvState.pulses.push({
          fromLayer: li, toLayer: li + 1,
          fromNode: fn, toNode: tn,
          t: 0, r: isHigh ? 3.5 : 2,
          color: isHigh ? '#ff3250' : NV_LAYERS[li].color
        });
      }
    }

    /* Draw nodes */
    NV_LAYERS.forEach((layer, li) => {
      const nodes = nodePositions[li];
      nodes.forEach((n, ni) => {
        const pulse = Math.sin(nvT * 2 + li * .7 + ni * .5) * .5 + .5;
        const isActive = Math.sin(nvT * 3 + li + ni) > -.3;
        const r = isActive ? 6 + pulse * 3 : 4;
        const alpha = isActive ? .8 + pulse * .2 : .3;

        /* Glow ring */
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = `${layer.color}18`; ctx.fill();

        /* Node */
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = layer.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.shadowColor = layer.color;
        ctx.shadowBlur = isActive ? 16 : 6;
        ctx.fill(); ctx.shadowBlur = 0;
      });
    });

    /* Update activation bars */
    NV_LAYERS.forEach((layer, i) => {
      const act = 50 + Math.sin(nvT * 1.5 + i * .8) * 30 + (nvState.highRiskMode && i >= 3 ? 20 : 0);
      nvState.activations[i] = Math.min(99, Math.max(20, act));
      const bar = document.getElementById(`nvbar-${i}`);
      const val = document.getElementById(`nvval-${i}`);
      if (bar) bar.style.width = nvState.activations[i].toFixed(0) + '%';
      if (val) val.textContent = nvState.activations[i].toFixed(0) + '%';
    });

    /* Update tx/s stat */
    if (nvState.frameCount % 20 === 0) {
      const txps = Math.floor(1200 + Math.sin(nvT) * 300 + (nvState.highRiskMode ? 500 : 0));
      const el = document.getElementById('nv-txps');
      if (el) el.textContent = txps.toLocaleString('en-IN');

      /* Add live decision */
      if (nvState.frameCount % 40 === 0) addNeuralDecision();
    }

    AML.neuralAnimFrame = requestAnimationFrame(drawNeural);
  }
  drawNeural();

  /* Decision counter */
  let decCount = 0;
  function addNeuralDecision() {
    decCount++;
    const types = [
      { text: 'Layering Chain → Score 91 → FLAG', cls: 'nv-dec-h' },
      { text: 'Normal Transfer → Score 14 → PASS', cls: 'nv-dec-l' },
      { text: 'Velocity Anomaly → Score 68 → WATCH', cls: 'nv-dec-m' },
      { text: 'Crypto Mixing → Score 88 → FLAG', cls: 'nv-dec-h' },
      { text: 'Wire Transfer → Score 42 → MONITOR', cls: 'nv-dec-m' },
      { text: 'Mule Pattern → Score 79 → FLAG', cls: 'nv-dec-h' },
    ];
    const t = types[decCount % types.length];
    const dec = document.getElementById('nv-decisions');
    if (!dec) return;
    const item = document.createElement('div');
    item.className = `nv-dec-item ${t.cls}`;
    item.innerHTML = `<i class="fas fa-microchip"></i> ${t.text}`;
    dec.insertBefore(item, dec.firstChild);
    if (dec.children.length > 8) dec.removeChild(dec.lastChild);
  }
}

window.toggleNeuralViz = function() {
  AML.neuralRunning = !AML.neuralRunning;
  const btn = document.getElementById('nv-pause-btn');
  if (btn) {
    btn.innerHTML = AML.neuralRunning ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Resume';
    btn.classList.toggle('active', AML.neuralRunning);
  }
};

window.injectHighRiskSignal = function() {
  nvState.highRiskMode = true;
  showToast('🚨 HIGH-RISK signal injected into neural network!', 'd');
  /* Add 20 pulses instantly */
  for (let i = 0; i < 20; i++) {
    nvState.pulses.push({
      fromLayer: Math.floor(Math.random() * 5),
      toLayer: Math.floor(Math.random() * 5) + 1,
      fromNode: Math.floor(Math.random() * 6),
      toNode: Math.floor(Math.random() * 6),
      t: Math.random() * .5, r: 4, color: '#ff3250'
    });
  }
  setTimeout(() => { nvState.highRiskMode = false; }, 5000);
};

/* ================================================================
   ✨ BEHAVIORAL BIOMETRICS TIMELINE (NEW v3.5)
================================================================ */
const behaviorProfiles = {
  'ACC-4782': {
    label: 'ACC-4782', risk: 'HIGH RISK', type: 'Circular Transfer', score: '91 / 100', events: '7 anomalies',
    color: '#ff3250', riskClass: 'high',
    basePattern: [12, 15, 10, 8, 14, 11, 9, 18, 22, 85, 91, 87, 82, 65, 45, 78, 92, 88, 72, 55, 40, 35, 28, 22, 18, 15, 12, 10, 8, 14],
    events: [
      { day: 9, label: 'Sudden velocity spike — 8 transfers in 2hr', cls: 'bt-ev-h' },
      { day: 11, label: 'Circular flow detected — 7 hops in 22hr', cls: 'bt-ev-h' },
      { day: 12, label: 'Near-identical amounts — structuring signal', cls: 'bt-ev-h' },
      { day: 16, label: 'Crypto conversion endpoint found', cls: 'bt-ev-h' },
      { day: 18, label: 'Account dormancy broken — active again', cls: 'bt-ev-m' },
    ]
  },
  'WALLET-89X': {
    label: 'WALLET-89X', risk: 'HIGH RISK', type: 'Crypto Mixing', score: '88 / 100', events: '5 anomalies',
    color: '#ff3250', riskClass: 'high',
    basePattern: [5, 8, 6, 10, 7, 5, 8, 22, 45, 78, 88, 72, 55, 40, 65, 82, 77, 60, 45, 35, 28, 22, 18, 12, 8, 6, 5, 8, 10, 7],
    events: [
      { day: 7, label: 'Large inflow from unknown wallet', cls: 'bt-ev-h' },
      { day: 9, label: 'Mixer protocol interaction detected', cls: 'bt-ev-h' },
      { day: 10, label: 'Cross-chain hop — ETH → BSC → TRX', cls: 'bt-ev-h' },
      { day: 15, label: 'Re-emergence — funds split across 4 wallets', cls: 'bt-ev-m' },
    ]
  },
  'ACC-2201': {
    label: 'ACC-2201', risk: 'MEDIUM RISK', type: 'Rapid Split', score: '74 / 100', events: '3 anomalies',
    color: '#f5c518', riskClass: 'med',
    basePattern: [8, 10, 12, 9, 11, 8, 10, 15, 18, 45, 62, 70, 55, 38, 28, 22, 18, 35, 48, 42, 30, 22, 18, 14, 12, 10, 8, 9, 11, 10],
    events: [
      { day: 9, label: 'Transaction frequency jump: 2→18/day', cls: 'bt-ev-m' },
      { day: 11, label: '6 sub-₹49,999 splits within 2 hours', cls: 'bt-ev-h' },
      { day: 18, label: 'Accounts receiving splits flagged', cls: 'bt-ev-m' },
    ]
  },
  'BIZ-0019': {
    label: 'BIZ-0019', risk: 'MEDIUM RISK', type: 'Smurfing', score: '67 / 100', events: '2 anomalies',
    color: '#f5c518', riskClass: 'med',
    basePattern: [15, 18, 14, 20, 16, 18, 22, 19, 35, 52, 58, 64, 55, 42, 30, 25, 20, 18, 22, 28, 32, 35, 40, 36, 28, 22, 18, 15, 16, 18],
    events: [
      { day: 8, label: '12 deposits of ₹49,000 across branches', cls: 'bt-ev-m' },
      { day: 11, label: 'Repeated pattern — 3 consecutive days', cls: 'bt-ev-h' },
    ]
  },
  'ACC-1147': {
    label: 'ACC-1147', risk: 'LOW RISK', type: 'Normal Activity', score: '22 / 100', events: '0 anomalies',
    color: '#00e87c', riskClass: 'low',
    basePattern: [20, 22, 18, 25, 21, 19, 24, 20, 22, 25, 19, 21, 23, 22, 20, 21, 24, 22, 19, 23, 21, 22, 20, 24, 21, 19, 22, 20, 23, 21],
    events: [
      { day: 0, label: 'Regular salary credit — normal pattern', cls: 'bt-ev-l' },
    ]
  }
};

function initBehavioralTimeline() {
  selectBehaviorAccount('ACC-4782', document.querySelector('.bt-acc-btn.active'));
}

window.selectBehaviorAccount = function(accId, btn) {
  AML.behaviorAccount = accId;
  document.querySelectorAll('.bt-acc-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const profile = behaviorProfiles[accId];
  if (!profile) return;

  /* Update info panel */
  const riskColor = profile.riskClass === 'high' ? '#ff3250' : profile.riskClass === 'med' ? '#f5c518' : '#00e87c';
  const setEl = (id, val, color) => { const el = document.getElementById(id); if (el) { el.textContent = val; if (color) el.style.color = color; } };
  setEl('bt-ai-id', profile.label);
  setEl('bt-ai-risk', profile.risk, riskColor);
  setEl('bt-ai-type', profile.type);
  setEl('bt-ai-score', profile.score, riskColor);
  setEl('bt-ai-events', (profile.events && profile.events.length ? profile.events.length : 0) + ' anomalies');

  /* Update chart title */
  const title = document.getElementById('bt-chart-title');
  if (title) title.textContent = `${profile.label} — Behavioral Transaction Timeline (30 Days)`;

  /* Draw timeline */
  drawBehaviorCanvas(profile);

  /* Events list */
  const evList = document.getElementById('bt-events-list');
  if (evList && profile.events && profile.events.length) {
    evList.innerHTML = profile.events.map((ev, i) => `
      <div class="bt-event-item ${ev.cls}" style="animation-delay:${i * .07}s">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${ev.label}</span>
        <span class="bt-ev-date">Day ${ev.day + 1}</span>
      </div>`).join('');
  } else if (evList) {
    evList.innerHTML = '<div class="bt-event-item bt-ev-l"><i class="fas fa-check-circle"></i><span>No anomalies detected — normal behavior</span></div>';
  }
};

function drawBehaviorCanvas(profile) {
  const canvas = document.getElementById('behavior-canvas');
  if (!canvas) return;
  const wrap = canvas.parentElement;
  canvas.width = wrap.offsetWidth - 40;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const data = profile.basePattern;
  const N = data.length;
  const padL = 40, padR = 20, padT = 20, padB = 30;
  const chartW = W - padL - padR, chartH = H - padT - padB;
  const maxVal = Math.max(...data, 100);
  const toX = i => padL + (i / (N - 1)) * chartW;
  const toY = v => padT + chartH - (v / maxVal) * chartH;

  ctx.clearRect(0, 0, W, H);

  /* Grid */
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const y = padT + (g / 4) * chartH;
    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxVal * (4 - g) / 4), padL - 4, y + 4);
  }

  /* Area gradient */
  const grad = ctx.createLinearGradient(0, padT, 0, H - padB);
  const c = profile.color;
  grad.addColorStop(0, c + '40'); grad.addColorStop(1, c + '05');

  /* Anomaly threshold line */
  const threshold = 50;
  const threshY = toY(threshold);
  ctx.setLineDash([6, 4]);
  ctx.strokeStyle = 'rgba(245,197,24,0.4)'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(padL, threshY); ctx.lineTo(W - padR, threshY); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = 'rgba(245,197,24,0.6)'; ctx.font = '9px JetBrains Mono, monospace';
  ctx.textAlign = 'left'; ctx.fillText('ALERT THRESHOLD', padL + 4, threshY - 3);

  /* Draw filled area */
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(data[0]));
  data.forEach((v, i) => { if (i > 0) ctx.lineTo(toX(i), toY(v)); });
  ctx.lineTo(toX(N - 1), padT + chartH); ctx.lineTo(toX(0), padT + chartH);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();

  /* Draw main line */
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(data[0]));
  data.forEach((v, i) => { if (i > 0) ctx.lineTo(toX(i), toY(v)); });
  ctx.strokeStyle = profile.color; ctx.lineWidth = 2;
  ctx.shadowColor = profile.color; ctx.shadowBlur = 8;
  ctx.stroke(); ctx.shadowBlur = 0;

  /* Plot data points & anomaly spikes */
  data.forEach((v, i) => {
    const isAnomaly = v > threshold;
    const r = isAnomaly ? 5 : 3;
    const pc = isAnomaly ? '#ff3250' : profile.color;
    ctx.beginPath(); ctx.arc(toX(i), toY(v), r, 0, Math.PI * 2);
    ctx.fillStyle = pc;
    ctx.shadowColor = pc; ctx.shadowBlur = isAnomaly ? 14 : 6;
    ctx.fill(); ctx.shadowBlur = 0;

    /* Spike indicator */
    if (isAnomaly) {
      ctx.beginPath();
      ctx.moveTo(toX(i), toY(v) - r - 2);
      ctx.lineTo(toX(i) - 5, toY(v) - r - 10);
      ctx.lineTo(toX(i) + 5, toY(v) - r - 10);
      ctx.closePath();
      ctx.fillStyle = '#ff3250'; ctx.fill();
    }
  });

  /* Event markers */
  if (profile.events) {
    profile.events.forEach(ev => {
      const x = toX(ev.day);
      const y = toY(data[ev.day] || 0);
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.strokeStyle = '#ff3250'; ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  /* X-axis labels */
  ctx.fillStyle = 'rgba(136,146,160,0.7)'; ctx.font = '9px Inter, sans-serif';
  ctx.textAlign = 'center';
  [0, 6, 13, 19, 29].forEach(i => {
    ctx.fillText(`Day ${i + 1}`, toX(i), H - 8);
  });
}

/* ================================================================
   AML SCANNER
================================================================ */
const HIGH_RISK = ['northkorea', 'iran', 'myanmar', 'panama', 'cayman', 'nigeria', 'pakistan', 'russia'];
const MED_RISK = ['uae'];

window.analyzeRisk = function() {
  const sender = document.getElementById('sender-id').value.trim();
  const receiver = document.getElementById('receiver-id').value.trim();
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const frequency = parseInt(document.getElementById('frequency').value) || 0;
  const country = document.getElementById('country').value;
  const txType = document.getElementById('tx-type').value;
  const timeGap = parseFloat(document.getElementById('time-gap').value) || 24;
  const numAcc = parseInt(document.getElementById('num-accounts').value) || 1;

  if (!sender || !receiver) { showToast('⚠️ Please enter Sender and Receiver Account IDs', 'w'); return; }

  const scanEl = document.getElementById('scan-scanning');
  scanEl.style.display = 'flex'; scanEl.style.flexDirection = 'column';
  document.getElementById('scan-result').style.display = 'none';

  const steps = ['sstep-1', 'sstep-2', 'sstep-3', 'sstep-4', 'sstep-5'];
  let idx = 0;
  const iv = setInterval(() => {
    if (idx > 0) {
      const prev = document.getElementById(steps[idx - 1]);
      if (prev) { prev.classList.remove('active'); prev.classList.add('done'); prev.querySelector('i').className = 'fas fa-circle-check'; }
    }
    if (idx < steps.length) { document.getElementById(steps[idx]).classList.add('active'); idx++; }
    else { clearInterval(iv); setTimeout(() => showResult(sender, receiver, amount, frequency, country, txType, timeGap, numAcc), 500); }
  }, 480);
};

function calcScore(amount, frequency, country, txType, timeGap, numAcc) {
  let score = 0; const factors = [];
  if (numAcc > 10) { score += 30; factors.push({ t: `${numAcc} accounts involved (critical)`, s: 'h' }); }
  else if (numAcc > 7) { score += 22; factors.push({ t: `${numAcc} accounts — high layering risk`, s: 'h' }); }
  else if (numAcc > 5) { score += 14; factors.push({ t: `${numAcc} accounts — elevated`, s: 'm' }); }
  else if (numAcc > 3) { score += 7; factors.push({ t: `${numAcc} accounts involved`, s: 'l' }); }
  if (frequency > 20) { score += 25; factors.push({ t: `${frequency} tx/day — extreme velocity`, s: 'h' }); }
  else if (frequency > 10) { score += 18; factors.push({ t: `${frequency} tx/day — high frequency`, s: 'h' }); }
  else if (frequency > 5) { score += 10; factors.push({ t: `${frequency} tx/day — elevated`, s: 'm' }); }
  if (amount > 5000000) { score += 20; factors.push({ t: `₹${amount.toLocaleString('en-IN')} — very large`, s: 'h' }); }
  else if (amount > 1000000) { score += 14; factors.push({ t: `₹${amount.toLocaleString('en-IN')} — large`, s: 'm' }); }
  else if (amount > 0 && amount < 50000 && frequency > 5) { score += 12; factors.push({ t: 'Sub-threshold splits — structuring signal', s: 'h' }); }
  if (HIGH_RISK.includes(country)) { score += 20; factors.push({ t: `High-risk jurisdiction: ${cName(country)}`, s: 'h' }); }
  else if (MED_RISK.includes(country)) { score += 8; factors.push({ t: `Medium-risk: ${cName(country)}`, s: 'm' }); }
  if (txType === 'crypto') { score += 12; factors.push({ t: 'Crypto transaction — reduced traceability', s: 'm' }); }
  else if (txType === 'cash') { score += 15; factors.push({ t: 'Cash deposit — minimal audit trail', s: 'h' }); }
  else if (txType === 'wire') { score += 8; factors.push({ t: 'International wire transfer', s: 'm' }); }
  if (timeGap < 0.5) { score += 18; factors.push({ t: `${timeGap}hr gap — near-instant chain`, s: 'h' }); }
  else if (timeGap < 2) { score += 12; factors.push({ t: `${timeGap}hr gap — very fast`, s: 'h' }); }
  else if (timeGap < 6) { score += 6; factors.push({ t: `${timeGap}hr gap — quick cycle`, s: 'm' }); }
  return { score: Math.min(score, 100), factors };
}

function cName(c) {
  const n = { india: 'India', usa: 'United States', uk: 'United Kingdom', uae: 'UAE', cayman: 'Cayman Islands', panama: 'Panama', myanmar: 'Myanmar', iran: 'Iran', russia: 'Russia', northkorea: 'North Korea', nigeria: 'Nigeria', pakistan: 'Pakistan', switzerland: 'Switzerland', singapore: 'Singapore' };
  return n[c] || c;
}
function getPattern(score, numAcc, txType, timeGap, frequency) {
  if (score >= 85) { if (numAcc > 7 && timeGap < 2) return 'Layering Chain'; if (txType === 'crypto') return 'Crypto Layering'; if (frequency > 15) return 'Rapid Structured Transfer'; return 'Complex Layering Pattern'; }
  if (score >= 65) { if (txType === 'crypto') return 'Crypto Mixing'; if (numAcc > 5) return 'Multi-Hop Transfer'; if (frequency > 8) return 'Structuring/Smurfing'; return 'Circular Transfer'; }
  if (score >= 40) return 'Moderate Anomaly';
  return 'Normal Activity';
}
function getAIText(score, numAcc, txType, timeGap, frequency, amount, country, pattern) {
  const pts = [];
  if (numAcc > 7 && timeGap < 2) pts.push(`Funds moved through ${numAcc} accounts within ${timeGap}hr — classic layering chain signature`);
  if (txType === 'crypto') pts.push('Crypto conversion breaks traditional audit trail and complicates fund tracing');
  if (HIGH_RISK.includes(country)) pts.push(`Destination country (${cName(country)}) is FATF-listed high-risk jurisdiction`);
  if (frequency > 10) pts.push(`${frequency} transactions/day suggests automated structuring to avoid detection`);
  if (amount > 0 && amount < 50000 && frequency > 5) pts.push('Sub-threshold transactions indicate structuring to evade ₹50,000 reporting');
  if (amount > 5000000) pts.push(`Amount of ₹${amount.toLocaleString('en-IN')} significantly above typical thresholds`);
  if (timeGap < 1) pts.push(`Transfer gap of ${timeGap}hr is abnormally short — consistent with automated layering`);
  if (pts.length === 0) { if (score > 40) return 'Transaction shows minor velocity and behavioral anomalies. Enhanced monitoring recommended.'; return 'Transaction parameters within normal range. Standard monitoring applies.'; }
  return pts.join('. ') + '.';
}
function getAction(score) {
  if (score >= 80) return 'IMMEDIATE: Flag accounts, freeze transactions, file SAR with FIU-IND. Escalate to senior compliance officer within 24 hours.';
  if (score >= 60) return 'URGENT: Enhanced monitoring. Initiate KYC re-verification. Prepare SAR draft within 48 hours.';
  if (score >= 40) return 'MONITOR: Apply enhanced due diligence. Document findings. Monitor for 30 days.';
  return 'LOW RISK: Standard monitoring applies. No immediate action required.';
}
function getLevelClass(score) { return score >= 70 ? 'level-high' : score >= 40 ? 'level-med' : 'level-low'; }
function getLevelText(score) { return score >= 70 ? 'HIGH RISK' : score >= 40 ? 'MEDIUM RISK' : 'LOW RISK'; }

function showResult(sender, receiver, amount, frequency, country, txType, timeGap, numAcc) {
  const { score, factors } = calcScore(amount, frequency, country, txType, timeGap, numAcc);
  const pattern = getPattern(score, numAcc, txType, timeGap, frequency);
  const aiText = getAIText(score, numAcc, txType, timeGap, frequency, amount, country, pattern);
  const action = getAction(score);
  const conf = (76 + score * .18 + Math.random() * 4).toFixed(1);
  AML.scanCount++;
  const caseId = `AML-DEMO-${String(AML.scanCount).padStart(4, '0')}`;

  document.getElementById('scan-scanning').style.display = 'none';
  const res = document.getElementById('scan-result');
  res.style.display = 'flex'; res.style.flexDirection = 'column';

  document.getElementById('sr-case').textContent = `Case: ${caseId}`;
  document.getElementById('sr-time').textContent = new Date().toLocaleString('en-IN');
  document.getElementById('level-text').textContent = getLevelText(score);
  document.getElementById('sr-level').className = `sr-level ${getLevelClass(score)}`;
  document.getElementById('pattern-text').textContent = pattern;
  document.getElementById('confidence-text').textContent = conf + '%';
  document.getElementById('alert-count').textContent = factors.length + ' factors';
  document.getElementById('ai-reason-text').textContent = aiText;
  document.getElementById('action-text').textContent = action;
  document.getElementById('rf-list').innerHTML = factors.map(f =>
    `<div class="rf-item rf-${f.s}"><i class="fas fa-${f.s === 'h' ? 'circle-xmark' : f.s === 'm' ? 'circle-exclamation' : 'circle-check'}"></i> ${f.t}</div>`
  ).join('') || '<div class="rf-item rf-l"><i class="fas fa-circle-check"></i> No significant risk factors detected</div>';

  animateScoreCircle(score);
  setTimeout(() => res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 200);
  if (score >= 70) setTimeout(() => showFraudToast(caseId, score, pattern), 1200);
}

function animateScoreCircle(targetScore) {
  const canvas = document.getElementById('score-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const numEl = document.getElementById('score-num');
  let cur = 0; const dur = 1600; const start = performance.now();
  function draw(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    cur = Math.floor(e * targetScore);
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, r = 72;
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 10; ctx.stroke();
    const color = targetScore >= 70 ? '#ff3250' : targetScore >= 40 ? '#f5c518' : '#00e87c';
    const end = -Math.PI / 2 + (2 * Math.PI * (cur / 100));
    ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, end);
    ctx.strokeStyle = color; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.shadowColor = color; ctx.shadowBlur = 18; ctx.stroke(); ctx.shadowBlur = 0;
    numEl.textContent = cur; numEl.style.color = color;
    if (p < 1) requestAnimationFrame(draw); else numEl.textContent = targetScore;
  }
  requestAnimationFrame(draw);
}

window.resetScanner = function() {
  document.getElementById('scan-result').style.display = 'none';
  document.getElementById('scan-scanning').style.display = 'none';
  ['sender-id', 'receiver-id', 'amount', 'frequency', 'time-gap', 'num-accounts'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('country').value = '';
  ['sstep-1', 'sstep-2', 'sstep-3', 'sstep-4', 'sstep-5'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active', 'done'); el.querySelector('i').className = 'fas fa-circle'; if (i === 0) { el.classList.add('active'); el.querySelector('i').className = 'fas fa-circle-dot'; } }
  });
};

/* ================================================================
   DASHBOARD TABLE FILTER
================================================================ */
window.filterAlerts = function(val) {
  const rows = document.querySelectorAll('#alerts-tbody tr'); let cnt = 0;
  rows.forEach(r => { const m = r.textContent.toLowerCase().includes(val.toLowerCase()); r.style.display = m ? '' : 'none'; if (m) cnt++; });
  document.getElementById('table-count').textContent = `Showing ${cnt} of ${rows.length}`;
};

/* ================================================================
   ALERT DETAIL MODAL
================================================================ */
const alertData = {
  'AML-001': { account: 'ACC-4782', amount: '₹8,50,000', pattern: 'Circular Transfer', score: 91, reason: 'Funds moved in circular pattern returning to origin cluster. 7-hop chain in 22 hours.', action: 'Freeze account. File SAR with FIU-IND immediately.' },
  'AML-002': { account: 'WALLET-89X', amount: '₹12,00,000', pattern: 'Crypto Layering', score: 88, reason: 'Ethereum wallet received large transfer and distributed across 4 DeFi protocols within 15 minutes.', action: 'Block wallet. Report to crypto exchange compliance team.' },
  'AML-003': { account: 'ACC-2201', amount: '₹2,40,000', pattern: 'Rapid Split', score: 74, reason: 'Single deposit split into 6 sub-₹49,999 transfers within 2 hours — structuring behavior.', action: 'Enhanced monitoring. KYC re-verification required.' },
  'AML-004': { account: 'ACC-6653', amount: '₹45,00,000', pattern: 'Wire Layering', score: 95, reason: 'International wire to Cayman Islands + 5 rapid round-trip transfers. Offshore layering signature.', action: 'Immediate freeze. Regulatory escalation required.' },
  'AML-005': { account: 'BIZ-0019', amount: '₹98,000', pattern: 'Smurfing', score: 67, reason: '12 deposits of ₹49,000 across different branches in 24 hours. Classic smurfing.', action: 'Enhanced KYC. Monitor for 30 days.' },
  'AML-006': { account: 'WALLET-C3X', amount: '₹3,75,000', pattern: 'Mixer Activity', score: 82, reason: 'Wallet linked to known mixing service. Tornado cash-equivalent detected.', action: 'Block wallet. Report to FIU-IND.' },
  'AML-007': { account: 'ACC-1147', amount: '₹1,20,000', pattern: 'Normal Activity', score: 22, reason: 'Regular salary credit and bill payments. No anomalous patterns.', action: 'No action. Continue standard monitoring.' },
  'AML-008': { account: 'ACC-8832', amount: '₹5,60,000', pattern: 'Mule Account', score: 79, reason: 'Dormant 8 months → sudden large inflows + immediate dispersal to multiple accounts.', action: 'Freeze pending investigation. KYC re-verification.' }
};

window.viewAlertDetail = function(id) {
  const d = alertData[id]; if (!d) return;
  const color = d.score >= 70 ? '#ff3250' : d.score >= 40 ? '#f5c518' : '#00e87c';
  document.getElementById('modal-title').textContent = `Alert Detail — ${id}`;
  document.getElementById('modal-content').innerHTML = `
    <div class="modal-detail-grid">
      <div><span class="md-label">Account</span><span class="md-value">${d.account}</span></div>
      <div><span class="md-label">Amount</span><span class="md-value">${d.amount}</span></div>
      <div><span class="md-label">Pattern</span><span class="md-value">${d.pattern}</span></div>
      <div><span class="md-label">Risk Score</span><span class="md-value" style="color:${color};font-weight:800">${d.score}/100</span></div>
    </div>
    <div class="md-reason"><strong><i class="fas fa-brain"></i> AI Reasoning</strong><p>${d.reason}</p></div>
    <div class="md-action"><strong><i class="fas fa-shield-halved"></i> Action</strong><p>${d.action}</p></div>
    <div class="md-btn-row"><button class="btn-primary ripple" onclick="downloadReportNotif();closeAlertModal()"><i class="fas fa-download"></i> Report</button><button class="btn-secondary ripple" onclick="closeAlertModal()"><i class="fas fa-times"></i> Close</button></div>`;
  document.getElementById('alert-modal').classList.add('open');
  initRipple();
};
window.closeModal = function(e) { if (e.target.id === 'alert-modal') closeAlertModal(); };
window.closeAlertModal = function() { document.getElementById('alert-modal').classList.remove('open'); };

/* ================================================================
   LIVE TRANSACTION FEED
================================================================ */
let feedInterval = null;
const feedAccounts = ['ACC-4782', 'ACC-9021', 'ACC-3347', 'ACC-5512', 'WALLET-89X', 'BIZ-0019', 'ACC-2201', 'ACC-6653', 'WALLET-C3X', 'ACC-8832', 'ACC-1147', 'BIZ-0047', 'WALLET-ETH1', 'ACC-7731', 'BIZ-9902'];
const feedTypes = ['Bank Transfer', 'Crypto Transfer', 'Wire Transfer', 'Cash Deposit', 'Business Payment'];
const feedPatternsList = ['Layering Chain', 'Circular Transfer', 'Smurfing', 'Mule Account', 'Crypto Mixing', 'Normal', 'Normal', 'Normal', 'Normal', 'Normal'];

function initLiveFeed() {
  feedInterval = setInterval(() => { if (AML.feedRunning) generateFeedRow(); }, 900);
  updatePatternCounts();
  initSparkline();
}

function generateFeedRow() {
  const score = Math.floor(Math.random() * 100);
  const riskClass = score >= 70 ? 'h' : score >= 40 ? 'm' : 'l';
  const filter = AML.feedFilter;
  if (filter === 'high' && riskClass !== 'h') return;
  if (filter === 'medium' && riskClass !== 'm') return;
  const txType = feedTypes[Math.floor(Math.random() * feedTypes.length)];
  if (filter === 'crypto' && !txType.includes('Crypto')) return;

  const stream = document.getElementById('lf-stream');
  if (!stream) return;
  const empty = stream.querySelector('.lf-empty');
  if (empty) empty.remove();

  const row = document.createElement('div');
  row.className = 'lf-row';
  const id = `TX-${Math.floor(Math.random() * 99999).toString().padStart(5, '0')}`;
  const acc = feedAccounts[Math.floor(Math.random() * feedAccounts.length)];
  const amount = `₹${(Math.random() * 2000000 + 10000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  const pattern = feedPatternsList[Math.floor(Math.random() * feedPatternsList.length)];
  const scoreColor = riskClass === 'h' ? 'score-h' : riskClass === 'm' ? 'score-m' : 'score-l';
  const typeColor = txType.includes('Crypto') ? 'pt-red' : txType.includes('Cash') ? 'pt-yellow' : 'pt-green';

  row.innerHTML = `
    <span class="lf-row-id">${id}</span>
    <span class="lf-row-acc">${acc}</span>
    <span class="lf-row-amt">${amount}</span>
    <span class="lf-row-type pt ${typeColor}">${txType}</span>
    <span class="lf-row-score ${scoreColor}">${score}</span>`;
  stream.insertBefore(row, stream.firstChild);

  const rows = stream.querySelectorAll('.lf-row');
  if (rows.length > 30) rows[rows.length - 1].remove();

  AML.feedData.total++;
  if (riskClass === 'h') AML.feedData.high++;
  else if (riskClass === 'm') AML.feedData.med++;
  else AML.feedData.low++;

  const setFeedEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setFeedEl('feed-total', AML.feedData.total);
  setFeedEl('feed-high', AML.feedData.high);
  setFeedEl('feed-med', AML.feedData.med);
  setFeedEl('feed-low', AML.feedData.low);

  if (pattern !== 'Normal') {
    AML.feedPatterns[pattern] = (AML.feedPatterns[pattern] || 0) + 1;
    updatePatternCounts();
  }
  AML.sparkData.push(score);
  if (AML.sparkData.length > 30) AML.sparkData.shift();
  drawSparkline();
}

function updatePatternCounts() {
  const el = document.getElementById('pattern-counts');
  if (!el) return;
  const sorted = Object.entries(AML.feedPatterns).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const max = sorted[0] ? sorted[0][1] : 1;
  el.innerHTML = sorted.length ? sorted.map(([p, c]) => `
    <div class="pc-item">
      <span style="font-size:.75rem;flex:1;color:var(--text2)">${p}</span>
      <div class="pc-bar-wrap"><div class="pc-bar" style="width:${(c / max * 100)}%"></div></div>
      <span class="pc-cnt">${c}</span>
    </div>`).join('') : '<span style="font-size:.75rem;color:var(--text3)">Watching for patterns...</span>';
}

function initSparkline() {
  for (let i = 0; i < 20; i++) AML.sparkData.push(Math.floor(Math.random() * 100));
  drawSparkline();
}

function drawSparkline() {
  const c = document.getElementById('sparkline-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;
  ctx.clearRect(0, 0, W, H);
  const data = AML.sparkData;
  if (data.length < 2) return;
  const sx = W / (data.length - 1);
  const points = data.map((v, i) => ({ x: i * sx, y: H - (v / 100) * (H - 10) - 5 }));
  ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = 'rgba(0,229,255,.8)'; ctx.lineWidth = 1.5; ctx.stroke();
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(0,229,255,.2)'); grad.addColorStop(1, 'rgba(0,229,255,0)');
  ctx.lineTo(points[points.length - 1].x, H); ctx.lineTo(points[0].x, H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();
}

window.toggleFeed = function(btn) {
  AML.feedRunning = !AML.feedRunning;
  btn.innerHTML = AML.feedRunning ? '<i class="fas fa-pause"></i> Pause' : '<i class="fas fa-play"></i> Resume';
  btn.classList.toggle('active', AML.feedRunning);
};
window.clearFeed = function() {
  const stream = document.getElementById('lf-stream');
  if (stream) stream.innerHTML = '<div class="lf-empty"><i class="fas fa-radar"></i><span>Stream cleared...</span></div>';
};
window.setFeedFilter = function(val) { AML.feedFilter = val; };

/* ================================================================
   WORLD THREAT MAP
================================================================ */
const countryDots = [
  { name: 'North Korea', lat: 40, lon: 127, risk: 4, alerts: 47, amount: '₹9,80,000' },
  { name: 'Iran', lat: 32, lon: 53, risk: 4, alerts: 38, amount: '₹7,20,000' },
  { name: 'Russia', lat: 60, lon: 90, risk: 3, alerts: 29, amount: '₹5,40,000' },
  { name: 'Nigeria', lat: 9, lon: 8, risk: 3, alerts: 24, amount: '₹3,10,000' },
  { name: 'Pakistan', lat: 30, lon: 70, risk: 3, alerts: 19, amount: '₹2,80,000' },
  { name: 'Myanmar', lat: 17, lon: 96, risk: 3, alerts: 15, amount: '₹1,90,000' },
  { name: 'Panama', lat: 9, lon: -80, risk: 3, alerts: 22, amount: '₹4,20,000' },
  { name: 'Cayman Islands', lat: 19, lon: -81, risk: 3, alerts: 18, amount: '₹3,60,000' },
  { name: 'UAE', lat: 24, lon: 54, risk: 2, alerts: 12, amount: '₹2,10,000' },
  { name: 'Switzerland', lat: 47, lon: 8, risk: 2, alerts: 8, amount: '₹1,40,000' },
  { name: 'India', lat: 20, lon: 77, risk: 1, alerts: 5, amount: '₹80,000' },
  { name: 'United States', lat: 38, lon: -97, risk: 1, alerts: 4, amount: '₹60,000' },
  { name: 'UK', lat: 54, lon: -2, risk: 1, alerts: 3, amount: '₹40,000' },
  { name: 'Singapore', lat: 1, lon: 104, risk: 1, alerts: 2, amount: '₹30,000' },
  { name: 'Germany', lat: 51, lon: 10, risk: 1, alerts: 2, amount: '₹25,000' }
];

const moneyRoutes = [
  { from: 'Pakistan', to: 'UAE', amount: '₹2,80,000', risk: 'high' },
  { from: 'North Korea', to: 'Russia', amount: '₹9,80,000', risk: 'high' },
  { from: 'Nigeria', to: 'UAE', amount: '₹3,10,000', risk: 'high' },
  { from: 'Iran', to: 'Switzerland', amount: '₹7,20,000', risk: 'high' },
  { from: 'Russia', to: 'Cayman Islands', amount: '₹5,40,000', risk: 'high' },
  { from: 'Myanmar', to: 'Singapore', amount: '₹1,90,000', risk: 'med' }
];

function initWorldMap() {
  const canvas = document.getElementById('world-map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  canvas.width = wrap.offsetWidth - 40;
  canvas.height = Math.max(350, canvas.width * .48);

  /* Sidebar */
  const rcl = document.getElementById('risk-country-list');
  if (rcl) {
    const topRisk = countryDots.filter(c => c.risk >= 3).sort((a, b) => b.alerts - a.alerts).slice(0, 6);
    rcl.innerHTML = topRisk.map(c => {
      const bar = Math.floor((c.alerts / 50) * 100);
      const color = c.risk >= 4 ? '#ff3250' : c.risk >= 3 ? '#ff6432' : '#f5c518';
      return `<div class="rcl-item"><span class="rcl-flag">🚩</span><span class="rcl-name">${c.name}</span><div class="rcl-bar" style="background:linear-gradient(90deg,${color},transparent);width:${bar}%"></div><span class="rcl-score">${c.alerts}</span></div>`;
    }).join('');
  }
  const rl = document.getElementById('route-list');
  if (rl) {
    rl.innerHTML = moneyRoutes.map(r =>
      `<div class="route-item"><span>${r.from}</span><span class="route-arrow"><i class="fas fa-arrow-right"></i></span><span>${r.to}</span><span class="route-amount">${r.amount}</span></div>`
    ).join('');
  }

  function latLonToXY(lat, lon, W, H) {
    return { x: (lon + 180) * (W / 360), y: (90 - lat) * (H / 180) };
  }

  let routeT = 0;
  function drawMap() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#070d1a'); bg.addColorStop(1, '#050a12');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    /* Grid */
    ctx.strokeStyle = 'rgba(0,229,255,.04)'; ctx.lineWidth = .5;
    for (let lat = -60; lat <= 60; lat += 30) {
      const y = (90 - lat) * (H / 180);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    for (let lon = -150; lon <= 150; lon += 30) {
      const x = (lon + 180) * (W / 360);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    /* Route arcs with moving packets */
    routeT += .004;
    moneyRoutes.forEach((route, ri) => {
      const from = countryDots.find(c => c.name === route.from);
      const to = countryDots.find(c => c.name === route.to);
      if (!from || !to) return;
      const fp = latLonToXY(from.lat, from.lon, W, H);
      const tp = latLonToXY(to.lat, to.lon, W, H);
      const cp = { x: (fp.x + tp.x) / 2, y: Math.min(fp.y, tp.y) - 80 };

      ctx.beginPath(); ctx.moveTo(fp.x, fp.y);
      ctx.quadraticCurveTo(cp.x, cp.y, tp.x, tp.y);
      const col = route.risk === 'high' ? 'rgba(255,50,80,.3)' : 'rgba(245,197,24,.25)';
      ctx.strokeStyle = col; ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]); ctx.stroke(); ctx.setLineDash([]);

      const t2 = ((routeT + ri * .18) % 1);
      const px = bezierPoint(fp.x, cp.x, tp.x, t2);
      const py = bezierPoint(fp.y, cp.y, tp.y, t2);
      ctx.fillStyle = route.risk === 'high' ? '#ff3250' : '#f5c518';
      ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12;
      ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    });

    /* Country dots */
    countryDots.forEach(c => {
      const { x, y } = latLonToXY(c.lat, c.lon, W, H);
      const r = c.risk >= 4 ? 9 : c.risk >= 3 ? 7 : c.risk >= 2 ? 5.5 : 4;
      const color = c.risk >= 4 ? '#ff3250' : c.risk >= 3 ? '#ff6432' : c.risk >= 2 ? '#f5c518' : '#00e87c';
      const pulse = Math.sin(routeT * 2.5 + c.lat * .1) * .5 + .5;

      /* Pulse ring */
      ctx.beginPath(); ctx.arc(x, y, r + 5 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = color + '40'; ctx.lineWidth = 1; ctx.stroke();

      /* Dot */
      ctx.fillStyle = color;
      ctx.shadowColor = color; ctx.shadowBlur = c.risk >= 3 ? 16 : 8;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;

      /* Label for high risk */
      if (c.risk >= 3) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font = '9px Inter,sans-serif';
        ctx.textAlign = 'center'; ctx.fillText(c.name, x, y - r - 5);
      }
    });

    AML.worldAnimFrame = requestAnimationFrame(drawMap);
  }
  drawMap();

  /* Hover tooltip */
  const tooltip = document.getElementById('tm-tooltip');
  if (tooltip) {
    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      let hit = null;
      countryDots.forEach(c => {
        const { x, y } = latLonToXY(c.lat, c.lon, canvas.width, canvas.height);
        if (Math.sqrt((mx - x) ** 2 + (my - y) ** 2) < 20) hit = c;
      });
      if (hit) {
        const color = hit.risk >= 4 ? '#ff3250' : hit.risk >= 3 ? '#ff6432' : hit.risk >= 2 ? '#f5c518' : '#00e87c';
        tooltip.style.display = 'block';
        tooltip.style.left = (mx + 14) + 'px'; tooltip.style.top = (my - 12) + 'px';
        tooltip.innerHTML = `<strong>${hit.name}</strong><div style="color:${color}">Risk: ${['', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][hit.risk]}</div><div>Alerts: ${hit.alerts}</div><div>Amount: ${hit.amount}</div>`;
      } else tooltip.style.display = 'none';
    });
    canvas.addEventListener('mouseleave', () => tooltip.style.display = 'none');
  }

  window.addEventListener('resize', () => {
    canvas.width = wrap.offsetWidth - 40;
    canvas.height = Math.max(350, canvas.width * .48);
  });
}

function bezierPoint(p0, p1, p2, t) { return (1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t ** 2 * p2; }

/* ================================================================
   CASE INVESTIGATION BOARD
================================================================ */
const initialCases = [
  { id: 'SAR-001', title: 'ACC-4782 Circular Transfer Chain', risk: 'h', riskLabel: 'High', account: 'ACC-4782', amount: '₹47,20,000', pattern: 'Layering Chain', date: 'Today', col: 'open' },
  { id: 'SAR-002', title: 'WALLET-89X Crypto Mixing Activity', risk: 'h', riskLabel: 'High', account: 'WALLET-89X', amount: '₹12,00,000', pattern: 'Crypto Mixing', date: 'Today', col: 'open' },
  { id: 'SAR-003', title: 'ACC-6653 International Wire Layering', risk: 'h', riskLabel: 'High', account: 'ACC-6653', amount: '₹45,00,000', pattern: 'Wire Layering', date: 'Yesterday', col: 'investigating' },
  { id: 'SAR-004', title: 'BIZ-0019 Smurfing Pattern', risk: 'm', riskLabel: 'Medium', account: 'BIZ-0019', amount: '₹98,000', pattern: 'Smurfing', date: '2 days ago', col: 'investigating' },
  { id: 'SAR-005', title: 'WALLET-C3X Mixer Usage', risk: 'h', riskLabel: 'High', account: 'WALLET-C3X', amount: '₹3,75,000', pattern: 'Mixer Activity', date: '3 days ago', col: 'review' },
  { id: 'SAR-006', title: 'ACC-2201 Rapid Split Transfers', risk: 'm', riskLabel: 'Medium', account: 'ACC-2201', amount: '₹2,40,000', pattern: 'Rapid Split', date: '4 days ago', col: 'review' },
  { id: 'SAR-007', title: 'ACC-8832 Mule Account Behavior', risk: 'h', riskLabel: 'High', account: 'ACC-8832', amount: '₹5,60,000', pattern: 'Mule Account', date: '5 days ago', col: 'closed' },
  { id: 'SAR-008', title: 'ACC-1147 Normal Activity Review', risk: 'l', riskLabel: 'Low', account: 'ACC-1147', amount: '₹1,20,000', pattern: 'Normal Activity', date: '6 days ago', col: 'closed' }
];

function initCaseBoard() {
  AML.cases = [...initialCases];
  renderBoard();
}

function renderBoard(filter = '') {
  ['open', 'investigating', 'review', 'closed'].forEach(col => {
    const container = document.getElementById(`col-${col}`);
    if (!container) return;
    const cases = AML.cases.filter(c => c.col === col && (filter ? c.title.toLowerCase().includes(filter) || c.account.toLowerCase().includes(filter) : true));
    container.innerHTML = cases.length ? cases.map(c => createCaseCard(c)).join('') : '<div style="text-align:center;color:var(--text3);font-size:.78rem;padding:1.5rem 0;font-family:var(--mono)">Drop cases here</div>';
    const cntEl = document.getElementById(`col-cnt-${col}`);
    if (cntEl) cntEl.textContent = cases.length;
  });
  const setBS = (id, col) => { const el = document.getElementById(id); if (el) el.textContent = AML.cases.filter(c => c.col === col).length; };
  setBS('bs-open', 'open'); setBS('bs-inv', 'investigating'); setBS('bs-rev', 'review'); setBS('bs-closed', 'closed');
}

function createCaseCard(c) {
  return `<div class="case-card" draggable="true" id="case-${c.id}" ondragstart="startDrag(event,'${c.id}')">
    <div class="cc-top"><span class="cc-id">${c.id}</span><span class="cc-risk cc-risk-${c.risk}">${c.riskLabel}</span></div>
    <div class="cc-title">${c.title}</div>
    <div class="cc-meta">
      <span><i class="fas fa-user"></i> ${c.account}</span>
      <span><i class="fas fa-indian-rupee-sign"></i> ${c.amount}</span>
    </div>
    <div class="cc-footer">
      <span class="cc-pattern">${c.pattern}</span>
      <div class="cc-actions">
        <button class="cc-btn" onclick="openCaseModal('${c.id}')" title="View"><i class="fas fa-eye"></i></button>
        <button class="cc-btn" onclick="deleteCase('${c.id}')" title="Delete"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  </div>`;
}

window.startDrag = function(e, id) {
  AML.dragCaseId = id;
  e.dataTransfer.effectAllowed = 'move';
  setTimeout(() => { const el = document.getElementById(`case-${id}`); if (el) el.classList.add('dragging'); }, 0);
};
window.dropCase = function(e, col) {
  e.preventDefault();
  if (!AML.dragCaseId) return;
  const c = AML.cases.find(x => x.id === AML.dragCaseId);
  if (c) { c.col = col; showToast(`📋 ${c.id} moved to ${col.charAt(0).toUpperCase() + col.slice(1)}`, 's'); renderBoard(); }
  AML.dragCaseId = null;
};
window.filterCases = function(val) { renderBoard(val.toLowerCase()); };
window.addNewCase = function() {
  const id = `SAR-${String(AML.cases.length + 1).padStart(3, '0')}`;
  AML.cases.unshift({
    id, title: `New Investigation Case ${id}`, risk: 'm', riskLabel: 'Medium',
    account: `ACC-${Math.floor(Math.random() * 9999)}`,
    amount: `₹${(Math.random() * 500000 + 50000).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
    pattern: 'Under Review', date: 'Just now', col: 'open'
  });
  renderBoard();
  showToast(`✅ New case ${id} created!`, 's');
};
window.deleteCase = function(id) {
  AML.cases = AML.cases.filter(c => c.id !== id);
  renderBoard();
  showToast(`🗑️ Case ${id} deleted`, 'w');
};
window.openCaseModal = function(id) {
  const c = AML.cases.find(x => x.id === id);
  if (!c) return;
  const modal = document.getElementById('case-modal');
  const body = document.getElementById('case-modal-body');
  const cols = { open: 'Open', investigating: 'Investigating', review: 'In Review', closed: 'Closed' };
  const riskColor = c.risk === 'h' ? '#ff3250' : c.risk === 'm' ? '#f5c518' : '#00e87c';
  body.innerHTML = `
    <button class="modal-close" onclick="closeCaseModal()"><i class="fas fa-times"></i></button>
    <h3>Case Detail — ${c.id}</h3>
    <div class="modal-detail-grid">
      <div><span class="md-label">Case ID</span><span class="md-value">${c.id}</span></div>
      <div><span class="md-label">Risk</span><span class="md-value" style="color:${riskColor};font-weight:800">${c.riskLabel}</span></div>
      <div><span class="md-label">Account</span><span class="md-value">${c.account}</span></div>
      <div><span class="md-label">Amount</span><span class="md-value">${c.amount}</span></div>
      <div><span class="md-label">Pattern</span><span class="md-value">${c.pattern}</span></div>
      <div><span class="md-label">Status</span><span class="md-value">${cols[c.col] || c.col}</span></div>
    </div>
    <div style="margin-top:1rem;margin-bottom:1rem">
      <label style="font-size:.78rem;color:var(--text2);font-weight:600">Move to Stage:</label>
      <div style="display:flex;gap:.5rem;margin-top:.5rem;flex-wrap:wrap">
        ${Object.entries(cols).map(([k, v]) =>
          `<button class="btn-secondary ripple" style="font-size:.78rem;padding:.4rem .9rem" onclick="moveCaseTo('${c.id}','${k}','${v}')">${v}</button>`
        ).join('')}
      </div>
    </div>
    <div class="md-btn-row">
      <button class="btn-primary ripple" onclick="downloadReportNotif();closeCaseModal()"><i class="fas fa-file-shield"></i> Generate SAR</button>
      <button class="btn-secondary ripple" onclick="closeCaseModal()"><i class="fas fa-times"></i> Close</button>
    </div>`;
  modal.classList.add('open');
  initRipple();
};
window.moveCaseTo = function(id, col, colLabel) {
  const c = AML.cases.find(x => x.id === id);
  if (c) { c.col = col; renderBoard(); closeCaseModal(); showToast(`📋 Moved to ${colLabel}`, 's'); }
};
window.closeCaseModal = function() { document.getElementById('case-modal').classList.remove('open'); };

/* ================================================================
   FILE UPLOAD
================================================================ */
function initDragDrop() {
  const area = document.getElementById('upload-area');
  if (!area) return;
  ['dragenter', 'dragover'].forEach(ev => area.addEventListener(ev, e => { e.preventDefault(); area.classList.add('drag-over'); }));
  ['dragleave', 'drop'].forEach(ev => area.addEventListener(ev, e => { e.preventDefault(); area.classList.remove('drag-over'); }));
  area.addEventListener('drop', e => {
    const f = e.dataTransfer.files;
    if (f.length) { document.getElementById('file-input').files = f; handleFileUpload(document.getElementById('file-input')); }
  });
}

window.handleFileUpload = function(input) {
  const file = input.files[0]; if (!file) return;
  document.getElementById('upload-area').style.display = 'none';
  document.getElementById('upload-results').style.display = 'none';
  const scan = document.getElementById('upload-scanning');
  scan.style.display = 'flex'; scan.style.flexDirection = 'column';
  document.getElementById('us-filename').textContent = file.name;
  document.getElementById('us-size').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
  const steps = [
    { m: 'Parsing transaction file...', p: 15 }, { m: 'Scanning for AML patterns...', p: 32 },
    { m: 'Detecting layering chains...', p: 50 }, { m: 'Analyzing crypto wallets...', p: 65 },
    { m: 'Calculating risk scores...', p: 80 }, { m: 'Detecting circular patterns...', p: 90 },
    { m: 'Generating compliance summary...', p: 97 }, { m: 'Scan complete!', p: 100 }
  ];
  const log = document.getElementById('scan-log');
  const fill = document.getElementById('scan-progress-fill');
  const status = document.getElementById('scan-status-text');
  let idx = 0;
  function next() {
    if (idx >= steps.length) {
      setTimeout(() => { scan.style.display = 'none'; const r = document.getElementById('upload-results'); r.style.display = 'flex'; r.style.flexDirection = 'column'; }, 500);
      return;
    }
    const s = steps[idx]; fill.style.width = s.p + '%'; status.textContent = s.m;
    const li = document.createElement('div'); li.className = 'log-item';
    li.innerHTML = `<i class="fas fa-circle-check"></i> <span>${s.m}</span>`;
    log.appendChild(li); log.scrollTop = log.scrollHeight;
    idx++; setTimeout(next, 300 + Math.random() * 200);
  }
  next();
};

window.resetUpload = function() {
  document.getElementById('upload-area').style.display = 'flex';
  document.getElementById('upload-area').style.flexDirection = 'column';
  document.getElementById('upload-area').style.alignItems = 'center';
  document.getElementById('upload-results').style.display = 'none';
  document.getElementById('upload-scanning').style.display = 'none';
  document.getElementById('file-input').value = '';
  document.getElementById('scan-log').innerHTML = '';
  document.getElementById('scan-progress-fill').style.width = '0%';
};

/* ================================================================
   TOAST + NOTIFICATIONS
================================================================ */
function showToast(msg, type = 's') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = `toast toast-${type} show`;
  setTimeout(() => t.classList.remove('show'), 3800);
}
window.downloadReportNotif = function() { showToast('✅ AML Report downloaded! Check your downloads folder.', 's'); };
window.shareNotif = function() { showToast('📧 Report shared with compliance team via secure link!', 's'); };
window.planNotif = function(p) { showToast(`🚀 ${p} plan selected! Redirecting to signup...`, 's'); };
window.submitContact = function(e) { e.preventDefault(); showToast('✅ Demo request submitted! Our team will contact you within 4 hours.', 's'); e.target.reset(); };
function showFraudToast(id, score, pattern) { showToast(`🚨 HIGH RISK: ${id} | Score ${score} | ${pattern}`, 'd'); }
function showDemoAlert() { showToast('🚨 LIVE ALERT: ACC-4782 — Layering Chain Detected — Score 91', 'd'); }

/* ================================================================
   NEW v4 FEATURE 1: AML TRANSACTION RISK HEATMAP
================================================================ */
const HMAP_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const HMAP_HOURS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
let hmapData = [], hmapMetric = 'risk', hmapAnimFrame = null;

function generateHmapData(metric) {
  // High-risk hours: 2-5am (wire layering), 11pm-1am (crypto), lunch (smurfing)
  const hotHours = {0:[2,3,4,23,0],1:[2,3,4,23],2:[3,4,22,23],3:[2,3,4],4:[2,3,11,12],5:[10,11,12,3,4],6:[3,4,23,0]};
  return HMAP_DAYS.map((day, di) => HMAP_HOURS.map(h => {
    let base = 0.08 + Math.random() * 0.2;
    if ((hotHours[di] || []).includes(h)) base += 0.35 + Math.random() * 0.45;
    if (h >= 8 && h <= 18) base += 0.08; // business hours baseline
    if (di >= 5) base *= 0.55; // weekends lower
    base = Math.min(1, base);
    const volume = metric === 'volume' ? Math.round(base * 980 + Math.random() * 120) :
                   metric === 'alerts'  ? Math.round(base * 48  + Math.random() * 8)  :
                                          Math.round(base * 100);
    return { day, hour: h, value: base, display: volume, raw: base };
  }));
}

function hmapColor(v) {
  if (v < 0.15) return `rgba(10,22,40,0.6)`;
  if (v < 0.3)  return `rgba(0,114,178,${0.3 + v})`;
  if (v < 0.5)  return `rgba(245,197,24,${0.4 + v * 0.5})`;
  if (v < 0.75) return `rgba(255,100,50,${0.5 + v * 0.4})`;
  return `rgba(255,50,80,${0.6 + v * 0.35})`;
}

function buildHeatmapGrid() {
  const grid = document.getElementById('hmap-grid');
  const xLabels = document.getElementById('hmap-x-labels');
  const yLabels = document.getElementById('hmap-y-labels');
  const tooltip = document.getElementById('hmap-tooltip');
  if (!grid) return;

  grid.style.gridTemplateColumns = `repeat(${HMAP_HOURS.length}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${HMAP_DAYS.length}, 1fr)`;
  grid.innerHTML = '';
  xLabels.innerHTML = '';
  yLabels.innerHTML = '';

  HMAP_HOURS.forEach(h => {
    const sp = document.createElement('span');
    sp.textContent = h % 6 === 0 ? `${h}:00` : '';
    xLabels.appendChild(sp);
  });
  HMAP_DAYS.forEach(d => {
    const sp = document.createElement('span');
    sp.textContent = d;
    yLabels.appendChild(sp);
  });

  hmapData.forEach((row, di) => {
    row.forEach((cell, hi) => {
      const div = document.createElement('div');
      div.className = 'hmap-cell';
      div.style.background = hmapColor(cell.value);
      div.style.boxShadow = cell.value > 0.6 ? `0 0 6px ${hmapColor(cell.value)}` : 'none';

      div.addEventListener('mouseenter', e => {
        tooltip.style.display = 'block';
        const suffix = hmapMetric === 'risk' ? '' : hmapMetric === 'alerts' ? ' alerts' : ' txns';
        const riskLabel = cell.value > 0.75 ? '🔴 CRITICAL' : cell.value > 0.5 ? '🟠 HIGH' : cell.value > 0.3 ? '🟡 MEDIUM' : '🟢 LOW';
        tooltip.innerHTML = `<div class="hmt-title">${cell.day} ${String(cell.hour).padStart(2,'0')}:00–${String(cell.hour+1).padStart(2,'0')}:00</div>
          <div class="hmt-row"><span>Risk Level</span><span class="hmt-val">${riskLabel}</span></div>
          <div class="hmt-row"><span>${hmapMetric === 'risk' ? 'Score' : hmapMetric === 'alerts' ? 'Alerts' : 'Volume'}</span><span class="hmt-val">${cell.display}${suffix}</span></div>
          <div class="hmt-row"><span>Intensity</span><span class="hmt-val">${Math.round(cell.value*100)}%</span></div>`;
      });
      div.addEventListener('mousemove', e => {
        tooltip.style.left = (e.clientX + 14) + 'px';
        tooltip.style.top  = (e.clientY - 20) + 'px';
      });
      div.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
      div.addEventListener('click', () => {
        showToast(`🔍 ${cell.day} ${String(cell.hour).padStart(2,'0')}:00 — Risk ${Math.round(cell.value*100)}% — ${cell.display} ${hmapMetric === 'alerts' ? 'alerts' : hmapMetric === 'volume' ? 'txns' : 'score'}`, cell.value > 0.6 ? 'd' : cell.value > 0.3 ? 'w' : 's');
      });
      grid.appendChild(div);
    });
  });
}

function buildHmapSidebar() {
  // Peak windows
  const peaks = document.getElementById('hmap-peaks');
  if (!peaks) return;
  const flat = hmapData.flat().sort((a,b) => b.value - a.value).slice(0,5);
  peaks.innerHTML = flat.map(c => `
    <div class="hmap-peak-item">
      <span class="hmap-peak-time">${c.day} ${String(c.hour).padStart(2,'0')}:00</span>
      <span class="hmap-peak-score ${c.value > 0.5 ? 'hp-h' : 'hp-m'}">${Math.round(c.value*100)}%</span>
    </div>`).join('');

  // Day summary bars
  const daySummary = document.getElementById('hmap-day-summary');
  const dayMaxes = hmapData.map(row => row.reduce((s,c) => s + c.value, 0) / row.length);
  const maxDay = Math.max(...dayMaxes);
  const dayColors = ['#00e5ff','#00e87c','#f5c518','#ff6432','#ff3250','#a064ff','#00e5ff'];
  daySummary.innerHTML = HMAP_DAYS.map((d,i) => `
    <div class="hmap-day-row">
      <span class="hdr-label">${d}</span>
      <div class="hmap-day-bar-wrap"><div class="hmap-day-bar" style="width:${(dayMaxes[i]/maxDay*100).toFixed(0)}%;background:${dayColors[i]}"></div></div>
      <span class="hmap-day-val">${Math.round(dayMaxes[i]*100)}%</span>
    </div>`).join('');

  // AI insight
  const peakDay = HMAP_DAYS[dayMaxes.indexOf(Math.max(...dayMaxes))];
  const peakHour = flat[0]?.hour ?? 3;
  document.getElementById('hmap-insight').innerHTML = `<strong>⚡ AI Insight:</strong> Suspicious activity peaks on <strong style="color:var(--cyan)">${peakDay}</strong> at <strong style="color:var(--red)">${String(peakHour).padStart(2,'0')}:00</strong>. Early morning windows show layering patterns consistent with overnight wire transfers and crypto mixing. Consider enhanced monitoring during 02:00–05:00 UTC.`;
}

function initHeatmap() {
  hmapData = generateHmapData(hmapMetric);
  buildHeatmapGrid();
  buildHmapSidebar();
}

window.updateHeatmap = function(metric) {
  hmapMetric = metric;
  hmapData = generateHmapData(metric);
  buildHeatmapGrid();
  buildHmapSidebar();
};

window.refreshHeatmap = function() {
  const btn = document.getElementById('hmap-refresh-btn');
  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...'; btn.disabled = true; }
  setTimeout(() => {
    hmapData = generateHmapData(hmapMetric);
    buildHeatmapGrid();
    buildHmapSidebar();
    if (btn) { btn.innerHTML = '<i class="fas fa-rotate"></i> Refresh'; btn.disabled = false; }
    showToast('🔄 Heatmap refreshed with latest risk data', 's');
  }, 600);
};

/* ================================================================
   NEW v4 FEATURE 2: ENTITY RELATIONSHIP GRAPH EXPLORER
================================================================ */
const EG = {
  nodes: [], edges: [], dragging: null, dragOffX: 0, dragOffY: 0,
  zoom: 1, panX: 0, panY: 0, animFrame: null, canvas: null, ctx: null,
  width: 0, height: 0, selectedNode: null, isPanning: false, panStartX: 0, panStartY: 0
};

const EG_INITIAL_NODES = [
  {id:'ACC-4782', type:'bank',   risk:'h', x:0,   y:0,   label:'ACC-4782',    score:91},
  {id:'ACC-9021', type:'bank',   risk:'h', x:0,   y:0,   label:'ACC-9021',    score:78},
  {id:'WALLET-89X',type:'crypto',risk:'h', x:0,   y:0,   label:'WALLET-89X',  score:88},
  {id:'ACC-2201', type:'bank',   risk:'m', x:0,   y:0,   label:'ACC-2201',    score:74},
  {id:'BIZ-0019', type:'shell',  risk:'m', x:0,   y:0,   label:'BIZ-0019',    score:67},
  {id:'ACC-6653', type:'bank',   risk:'h', x:0,   y:0,   label:'ACC-6653',    score:95},
  {id:'ACC-1147', type:'bank',   risk:'l', x:0,   y:0,   label:'ACC-1147',    score:22},
  {id:'WALLET-C3X',type:'crypto',risk:'h', x:0,   y:0,   label:'WALLET-C3X',  score:82},
  {id:'ACC-8832', type:'bank',   risk:'h', x:0,   y:0,   label:'ACC-8832',    score:79},
  {id:'SHELL-001',type:'shell',  risk:'h', x:0,   y:0,   label:'SHELL-001',   score:87},
  {id:'SHELL-002',type:'shell',  risk:'m', x:0,   y:0,   label:'SHELL-002',   score:55},
  {id:'WALLET-ZZ',type:'crypto', risk:'l', x:0,   y:0,   label:'WALLET-ZZ',   score:18},
];
const EG_INITIAL_EDGES = [
  ['ACC-4782','ACC-9021',4200000],['ACC-4782','WALLET-89X',8500000],
  ['ACC-4782','BIZ-0019',1200000],['ACC-9021','ACC-6653',3700000],
  ['ACC-6653','SHELL-001',4500000],['SHELL-001','WALLET-89X',4100000],
  ['WALLET-89X','WALLET-C3X',3750000],['ACC-2201','BIZ-0019',980000],
  ['BIZ-0019','SHELL-002',650000],['SHELL-002','ACC-8832',560000],
  ['ACC-8832','WALLET-ZZ',320000],['ACC-1147','ACC-2201',120000],
];

const EG_COLORS = { h:'#ff3250', m:'#f5c518', l:'#00e87c', bank:'#00e5ff', crypto:'#a064ff', shell:'#00e5ff' };
const EG_TYPE_LABEL = { bank:'Bank', crypto:'Crypto', shell:'Shell Co.' };

function egNodeColor(n) {
  if (n.risk === 'h') return '#ff3250';
  if (n.risk === 'm') return '#f5c518';
  return '#00e87c';
}
function egNodeRadius(n) { return n.risk === 'h' ? 22 : n.risk === 'm' ? 18 : 14; }

function egLayoutNodes() {
  const cx = EG.width / 2, cy = EG.height / 2;
  EG.nodes.forEach((n, i) => {
    const angle = (i / EG.nodes.length) * Math.PI * 2;
    const r = Math.min(EG.width, EG.height) * 0.32;
    n.x = cx + Math.cos(angle) * r;
    n.y = cy + Math.sin(angle) * r;
    n.vx = 0; n.vy = 0;
    n.phase = Math.random() * Math.PI * 2;
  });
}

function egApplyForces() {
  const k = 0.018, repel = 3200, damp = 0.88;
  // Repulsion
  for (let i = 0; i < EG.nodes.length; i++) {
    for (let j = i + 1; j < EG.nodes.length; j++) {
      const dx = EG.nodes[i].x - EG.nodes[j].x;
      const dy = EG.nodes[i].y - EG.nodes[j].y;
      const d = Math.sqrt(dx*dx + dy*dy) || 1;
      const f = repel / (d * d);
      EG.nodes[i].vx += (dx/d)*f; EG.nodes[i].vy += (dy/d)*f;
      EG.nodes[j].vx -= (dx/d)*f; EG.nodes[j].vy -= (dy/d)*f;
    }
  }
  // Spring attraction along edges
  EG.edges.forEach(e => {
    const a = EG.nodes.find(n => n.id === e.a);
    const b = EG.nodes.find(n => n.id === e.b);
    if (!a || !b) return;
    const dx = b.x - a.x, dy = b.y - a.y;
    const d = Math.sqrt(dx*dx + dy*dy) || 1;
    const f = (d - 120) * k;
    const fx = (dx/d)*f, fy = (dy/d)*f;
    a.vx += fx; a.vy += fy;
    b.vx -= fx; b.vy -= fy;
  });
  // Center gravity + boundary
  const cx = EG.width/2, cy = EG.height/2;
  EG.nodes.forEach(n => {
    if (n === EG.dragging) return;
    n.vx += (cx - n.x) * 0.003;
    n.vy += (cy - n.y) * 0.003;
    n.vx *= damp; n.vy *= damp;
    n.x += n.vx; n.y += n.vy;
    n.phase += 0.025;
    const pad = egNodeRadius(n) + 10;
    n.x = Math.max(pad, Math.min(EG.width - pad, n.x));
    n.y = Math.max(pad, Math.min(EG.height - pad, n.y));
  });
}

function egDrawFrame() {
  const ctx = EG.ctx;
  ctx.clearRect(0, 0, EG.width, EG.height);

  // Animated packet along each edge
  const t = Date.now() * 0.001;

  // Edges
  EG.edges.forEach((e, ei) => {
    const a = EG.nodes.find(n => n.id === e.a);
    const b = EG.nodes.find(n => n.id === e.b);
    if (!a || !b) return;

    const isHighRisk = a.risk === 'h' && b.risk === 'h';
    const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
    const aCol = egNodeColor(a), bCol = egNodeColor(b);
    grad.addColorStop(0, aCol + '55'); grad.addColorStop(1, bCol + '55');
    ctx.strokeStyle = grad;
    ctx.lineWidth = isHighRisk ? 2.5 : 1.2;
    if (isHighRisk) ctx.setLineDash([]); else ctx.setLineDash([5,4]);
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    ctx.setLineDash([]);

    // Amount label on edges
    const mx = (a.x + b.x)/2, my = (a.y + b.y)/2;
    const amtStr = e.amount >= 1e6 ? `₹${(e.amount/1e6).toFixed(1)}M` : `₹${(e.amount/1e3).toFixed(0)}K`;
    ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center'; ctx.fillText(amtStr, mx, my - 5);

    // Moving packet
    const pk_t = ((t * 0.4 + ei * 0.37) % 1);
    const px = a.x + (b.x - a.x) * pk_t;
    const py = a.y + (b.y - a.y) * pk_t;
    ctx.fillStyle = isHighRisk ? '#ff3250' : '#00e5ff';
    ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Nodes
  EG.nodes.forEach(n => {
    const r = egNodeRadius(n);
    const col = egNodeColor(n);
    const pulse = Math.abs(Math.sin(n.phase)) * 0.35;

    // Glow ring
    if (n.risk === 'h' || n === EG.selectedNode) {
      ctx.beginPath(); ctx.arc(n.x, n.y, r + 6 + pulse * 4, 0, Math.PI*2);
      ctx.strokeStyle = (n === EG.selectedNode ? '#ffffff' : col) + '55';
      ctx.lineWidth = n === EG.selectedNode ? 2.5 : 1.5; ctx.stroke();
    }

    // Node body
    const grad = ctx.createRadialGradient(n.x - r*0.3, n.y - r*0.3, 1, n.x, n.y, r);
    grad.addColorStop(0, col + 'cc'); grad.addColorStop(1, col + '44');
    ctx.fillStyle = grad;
    ctx.shadowColor = col; ctx.shadowBlur = n.risk === 'h' ? 18 : 10;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;

    // Border
    ctx.strokeStyle = n === EG.selectedNode ? '#ffffff' : col;
    ctx.lineWidth = n === EG.selectedNode ? 2.5 : 1.5;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI*2); ctx.stroke();

    // Type icon (text)
    const icon = n.type === 'crypto' ? '₿' : n.type === 'shell' ? '🏢' : '🏦';
    ctx.font = `${Math.floor(r*0.7)}px Inter, sans-serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff'; ctx.fillText(icon, n.x, n.y);

    // Label below
    ctx.font = '10px Inter, sans-serif'; ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText(n.label, n.x, n.y + r + 4);
  });
}

function egAnimate() {
  egApplyForces();
  egDrawFrame();
  EG.animFrame = requestAnimationFrame(egAnimate);
}

function egUpdateStats() {
  document.getElementById('eg-nodes-count').textContent = EG.nodes.length;
  document.getElementById('eg-edges-count').textContent = EG.edges.length;
  document.getElementById('eg-high-count').textContent = EG.nodes.filter(n => n.risk === 'h').length;
  document.getElementById('eg-clusters').textContent = Math.max(1, Math.floor(EG.nodes.length / 4));

  // Suspicious paths
  const pathsEl = document.getElementById('eg-paths');
  const highEdges = EG.edges.filter(e => {
    const a = EG.nodes.find(n => n.id === e.a), b = EG.nodes.find(n => n.id === e.b);
    return a?.risk === 'h' && b?.risk === 'h';
  });
  pathsEl.innerHTML = highEdges.slice(0,4).map(e => `
    <div class="eg-path-item"><i class="fas fa-arrow-right"></i>
      <span>${e.a} → ${e.b} <strong style="color:var(--red)">₹${(e.amount/1e6).toFixed(1)}M</strong></span>
    </div>`).join('') || '<div style="font-size:.75rem;color:var(--text3);padding:.3rem 0">No suspicious paths detected</div>';
}

function egShowNodeDetail(n) {
  EG.selectedNode = n;
  const el = document.getElementById('eg-node-detail');
  const connections = EG.edges.filter(e => e.a === n.id || e.b === n.id).length;
  const totalFlow = EG.edges.filter(e => e.a === n.id || e.b === n.id).reduce((s,e) => s + e.amount, 0);
  const riskColor = n.risk === 'h' ? '#ff3250' : n.risk === 'm' ? '#f5c518' : '#00e87c';
  el.innerHTML = `<div class="egs-title"><i class="fas fa-circle-info"></i> Node Details</div>
    <div class="eg-node-detail-body">
      <div class="eg-nd-name" style="color:${riskColor}">${n.label}</div>
      <div class="eg-nd-row"><span class="eg-nd-lbl">Type</span><span class="eg-nd-val">${EG_TYPE_LABEL[n.type]}</span></div>
      <div class="eg-nd-row"><span class="eg-nd-lbl">Risk Score</span><span class="eg-nd-val" style="color:${riskColor}">${n.score}/100</span></div>
      <div class="eg-nd-row"><span class="eg-nd-lbl">Connections</span><span class="eg-nd-val">${connections}</span></div>
      <div class="eg-nd-row"><span class="eg-nd-lbl">Total Flow</span><span class="eg-nd-val">₹${(totalFlow/1e6).toFixed(2)}M</span></div>
      <div class="eg-nd-row"><span class="eg-nd-lbl">Risk Level</span><span class="eg-nd-val" style="color:${riskColor}">${n.risk==='h'?'HIGH':n.risk==='m'?'MEDIUM':'LOW'}</span></div>
    </div>`;
}

function initEntityGraph() {
  const canvas = document.getElementById('entity-canvas');
  if (!canvas) return;
  EG.canvas = canvas;
  EG.ctx = canvas.getContext('2d');

  function resize() {
    EG.width = canvas.offsetWidth; EG.height = canvas.offsetHeight;
    canvas.width = EG.width * window.devicePixelRatio;
    canvas.height = EG.height * window.devicePixelRatio;
    EG.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  resize();
  window.addEventListener('resize', resize);

  EG.nodes = EG_INITIAL_NODES.map(n => ({...n}));
  EG.edges = EG_INITIAL_EDGES.map(([a,b,amount]) => ({a, b, amount}));
  egLayoutNodes();
  egUpdateStats();
  egAnimate();

  // Mouse drag
  canvas.addEventListener('mousedown', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const hit = EG.nodes.find(n => {
      const dx = mx - n.x, dy = my - n.y;
      return Math.sqrt(dx*dx + dy*dy) <= egNodeRadius(n) + 4;
    });
    if (hit) { EG.dragging = hit; hit.vx = 0; hit.vy = 0; egShowNodeDetail(hit); }
    else { EG.isPanning = true; EG.panStartX = e.clientX; EG.panStartY = e.clientY; }
  });
  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    if (EG.dragging) {
      EG.dragging.x = e.clientX - rect.left;
      EG.dragging.y = e.clientY - rect.top;
    }
  });
  canvas.addEventListener('mouseup', () => { EG.dragging = null; EG.isPanning = false; });
  canvas.addEventListener('mouseleave', () => { EG.dragging = null; EG.isPanning = false; });

  // Touch support
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const mx = t.clientX - rect.left, my = t.clientY - rect.top;
    const hit = EG.nodes.find(n => {
      const dx = mx - n.x, dy = my - n.y;
      return Math.sqrt(dx*dx + dy*dy) <= egNodeRadius(n) + 8;
    });
    if (hit) { EG.dragging = hit; hit.vx = 0; hit.vy = 0; egShowNodeDetail(hit); }
  }, { passive: false });
  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (!EG.dragging) return;
    const t = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    EG.dragging.x = t.clientX - rect.left;
    EG.dragging.y = t.clientY - rect.top;
  }, { passive: false });
  canvas.addEventListener('touchend', () => { EG.dragging = null; });
}

window.egAddRandomNode = function() {
  const types = ['bank','crypto','shell'];
  const risks = ['h','h','m','l'];
  const id = 'NODE-' + Math.random().toString(36).slice(2,6).toUpperCase();
  const type = types[Math.floor(Math.random()*types.length)];
  const risk = risks[Math.floor(Math.random()*risks.length)];
  const score = risk === 'h' ? 70 + Math.floor(Math.random()*30) : risk === 'm' ? 40 + Math.floor(Math.random()*30) : Math.floor(Math.random()*35);
  const newNode = { id, type, risk, score, label: id, x: EG.width/2 + (Math.random()-0.5)*80, y: EG.height/2 + (Math.random()-0.5)*80, vx:0, vy:0, phase: Math.random()*Math.PI*2 };
  EG.nodes.push(newNode);
  if (EG.nodes.length > 1) {
    const target = EG.nodes[Math.floor(Math.random() * (EG.nodes.length - 1))];
    EG.edges.push({ a: id, b: target.id, amount: Math.round(Math.random() * 5e6 + 5e4) });
  }
  egUpdateStats();
  showToast(`✅ Added ${id} (${EG_TYPE_LABEL[type]}, ${risk === 'h' ? 'High' : risk === 'm' ? 'Medium' : 'Low'} Risk)`, 's');
};

window.egResetLayout = function() {
  EG.nodes = EG_INITIAL_NODES.map(n => ({...n}));
  EG.edges = EG_INITIAL_EDGES.map(([a,b,amount]) => ({a, b, amount}));
  egLayoutNodes(); egUpdateStats();
  document.getElementById('eg-node-detail').innerHTML = `<div class="egs-title"><i class="fas fa-circle-info"></i> Node Details</div><div class="egs-placeholder">Click any node to inspect its connections and risk profile.</div>`;
  EG.selectedNode = null;
  showToast('🔄 Graph layout reset', 's');
};

window.egHighlightSuspicious = function() {
  const suspicious = EG.nodes.filter(n => n.risk === 'h');
  suspicious.forEach(n => { n.vx += (Math.random()-0.5)*8; n.vy += (Math.random()-0.5)*8; });
  showToast(`🚨 ${suspicious.length} high-risk entities highlighted!`, 'd');
};

window.egZoom = function(factor) {
  EG.zoom = Math.max(0.4, Math.min(2.5, EG.zoom * factor));
};
window.egFitView = function() {
  EG.zoom = 1;
  egLayoutNodes();
  showToast('📐 Graph fitted to view', 's');
};

/* ================================================================
   NEW v4 FEATURE 3: AI COMPLIANCE COPILOT
================================================================ */
const COPILOT_KB = {
  'smurfing': 'Smurfing (also called structuring) is an AML technique where a large sum of money is broken into many smaller transactions, each below the reporting threshold (e.g., ₹50,000 in India), to avoid triggering automatic suspicious activity reports. AML Shield detects this by flagging accounts with unusually high frequency of near-threshold amounts.',
  'layering': 'Layering is the second stage of money laundering — the most complex phase. Criminals move illicit funds through a series of transactions across multiple accounts, jurisdictions, shell companies, and crypto wallets to obscure the audit trail. AML Shield uses Graph Neural Networks to trace these multi-hop chains and identify circular flows.',
  'high risk score': 'A high risk score (>70) is triggered by factors including: (1) High transaction velocity, (2) Unusual amounts relative to account history, (3) Transactions involving high-risk jurisdictions, (4) Crypto transfers with mixing patterns, (5) Short time gaps between transfers, and (6) Multiple interconnected accounts. Each factor contributes weighted points to the 0–100 score.',
  'sar filing': 'A Suspicious Activity Report (SAR) must be filed with FIU-IND (Financial Intelligence Unit of India) within 7 days of detecting suspicious activity exceeding ₹50 lakh, or within 15 days for smaller amounts. AML Shield auto-generates a SAR draft with all required fields, evidence chain, and AI reasoning to streamline your compliance workflow.',
  'fatf': 'The Financial Action Task Force (FATF) is an inter-governmental body setting global AML/CFT standards. India is a FATF member. FATF\'s 40 Recommendations form the basis of India\'s Prevention of Money Laundering Act (PMLA). AML Shield maps its detection rules directly to FATF risk indicators.',
  'crypto': 'Crypto AML detection covers 50+ blockchains. Red flags include: wallet mixing/tumbling, rapid cross-exchange transfers, transactions with sanctioned wallet addresses, chain-hopping, DEX-based layering, and P2P transfers to high-risk jurisdictions. AML Shield traces the complete crypto money flow graph.',
  'mule account': 'A mule account is a bank or crypto account used to receive and forward illicit funds, often unknowingly. AML Shield detects mule patterns by identifying dormant→active→dormant behavior, rapid in/out flows from multiple sources, and accounts that receive from many senders but send to only one destination.',
  'risk score': 'AML Shield\'s risk score (0–100) is calculated using 6 weighted factors: transaction amount (vs. normal range), transfer frequency (per day), transaction type (crypto > wire > cash > bank), originating country risk, time gap between transfers (very short = suspicious), and number of accounts involved. Score ≥70 = High Risk; 40–69 = Medium; <40 = Low.',
  'wire transfer': 'International wire transfers are monitored for velocity, beneficiary country risk, and round-number amounts. Transfers to high-risk jurisdictions (Iran, North Korea, Myanmar, etc.) automatically receive a +25 risk score boost. Rapid back-to-back wires to multiple beneficiaries trigger the wire layering pattern.',
  'placement': 'Placement is the first stage of money laundering — introducing illicit cash into the financial system. Methods include cash deposits, smurfing, casino chips, invoice fraud, and real estate. AML Shield detects placement indicators like unusual cash deposit patterns and structuring near reporting thresholds.',
  'integration': 'Integration is the final stage of money laundering where laundered funds re-enter the legitimate economy through real estate, luxury goods, business investments, or stock purchases. AML Shield flags shell company activity, unusually large one-time purchases, and crypto-to-fiat conversion chains.',
  'kyc': 'KYC (Know Your Customer) is the process of verifying customer identity. AML Shield complements KYC by providing behavioral risk analysis — identifying when previously verified customers begin exhibiting suspicious transaction patterns. The combination of KYC + behavioral AI creates a complete compliance framework.',
  'rbi': 'The Reserve Bank of India (RBI) requires banks and NBFCs to comply with AML/CFT guidelines under the Prevention of Money Laundering Act (PMLA) 2002. Key requirements include KYC, transaction monitoring, SAR filing, and maintaining records for 5 years. AML Shield is designed with RBI guidelines as a core compliance reference.',
  'default': 'I\'m your AML Compliance Copilot! I specialize in anti-money laundering regulations, risk detection methods, and financial crime patterns. You can ask me about smurfing, layering, risk scores, SAR filing, FATF, crypto AML, mule accounts, KYC, or how the AML Shield platform works. What would you like to know?'
};

function copilotFindAnswer(q) {
  const ql = q.toLowerCase();
  for (const [key, ans] of Object.entries(COPILOT_KB)) {
    if (ql.includes(key)) return ans;
  }
  // Fuzzy match
  if (ql.includes('what') && ql.includes('money laundering')) return COPILOT_KB['layering'];
  if (ql.includes('pattern') || ql.includes('detect')) return `AML Shield detects 12+ money laundering patterns: Layering Chains, Smurfing/Structuring, Circular Transfers, Crypto Mixing, Wire Layering, Mule Account Networks, Shell Company Flows, Rapid Split Transactions, Dormant-to-Active Patterns, Cross-border Velocity, Threshold Avoidance, and DeFi Layering. Each pattern has a dedicated detection rule set contributing to the risk score.`;
  if (ql.includes('how') && ql.includes('work')) return `AML Shield uses a 5-stage AI pipeline: (1) Transaction graph construction mapping all relationships, (2) Graph Neural Network analysis identifying network-level anomalies, (3) Behavioral AI comparing current vs. historical patterns, (4) Multi-factor risk scoring (0–100), and (5) XAI language model generating human-readable explanations for every flagged transaction.`;
  if (ql.includes('price') || ql.includes('plan') || ql.includes('cost')) return `AML Shield offers 3 plans: **Starter** (₹999/month) — 1,000 scans, basic scoring, ideal for small businesses. **Professional** (₹4,999/month) — 50,000 scans, full AI engine, CSV upload, neural visualizer, behavioral analysis. **Enterprise** (Custom) — Unlimited scans, API integration, on-premise deployment, custom AI models. 14-day free trial available.`;
  if (ql.includes('accuracy') || ql.includes('precision')) return `AML Shield achieves 98.7% overall detection accuracy with <2% false positives, validated on 2.4M+ transactions. Pattern-specific accuracy: Transaction Pattern Analysis 99.1%, Layering Chain Detection 98.3%, Crypto Monitoring 97.8%, Mule Account Detection 96.4%. Accuracy is continuously improved via reinforcement learning from compliance officer feedback.`;
  return COPILOT_KB['default'];
}

function copilotAddMessage(text, role, typing = false) {
  const msgs = document.getElementById('cop-messages');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = `cop-msg cop-msg-${role}`;
  if (role === 'bot') {
    div.innerHTML = `<div class="cop-msg-avatar"><i class="fas fa-robot"></i></div><div class="cop-msg-bubble">${typing ? '<div class="cop-typing"><span></span><span></span><span></span></div>' : text}</div>`;
  } else {
    div.innerHTML = `<div class="cop-msg-bubble">${text}</div>`;
  }
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

window.copilotSend = function() {
  const input = document.getElementById('cop-input');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  input.value = '';
  copilotAddMessage(q, 'user');
  const typingEl = copilotAddMessage('', 'bot', true);
  const answer = copilotFindAnswer(q);
  setTimeout(() => {
    if (typingEl) typingEl.querySelector('.cop-msg-bubble').innerHTML = answer;
    const msgs = document.getElementById('cop-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }, 800 + Math.random() * 600);
};

window.copilotAsk = function(q) {
  const input = document.getElementById('cop-input');
  if (input) input.value = q;
  copilotSend();
};

window.toggleCopilot = function() {
  const panel = document.getElementById('copilot-panel');
  if (!panel) return;
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) {
    const badge = document.getElementById('cop-badge');
    if (badge) badge.style.display = 'none';
  }
};

/* ================================================================
   INIT ALL NEW v4 FEATURES — call from initAll
================================================================ */
function initNewV4Features() {
  initHeatmap();
  initEntityGraph();
  // Copilot initialized inline (no setup needed beyond HTML)
}
