# AML Shield AI — v4.0 ULTIMATE
## AI-Powered Anti Money Laundering Detection Platform

> **Status:** ✅ Fully operational — Zero JavaScript errors (verified via PlaywrightConsoleCapture)  
> **Build:** v4.0 ULTIMATE | Three.js ES Module + 15+ interactive sections + 3 new world-class features  
> **Type:** Static SPA (HTML + CSS + JS) — No backend required

---

## 🚀 Project Goal

A premium, futuristic, fully responsive AML (Anti Money Laundering) detection platform demonstrating AI-powered financial crime detection capabilities. Built as a complete SPA with real-time visualizations, interactive tools, and compliance workflows.

---

## ✅ Completed Features

### 🎬 Cinematic Loading Experience
- Canvas 2D network animation with animated transaction nodes
- Typewriter brand reveal (`AML Shield AI`)
- Progress bar with 6-step compliance initialization log
- Smooth fade-out transition to main app

### 🌐 Full Navigation & UX
- Fixed glassmorphism navbar with scroll-blur effect
- Mobile hamburger menu with slide-down overlay
- Live alert ticker bar (scrolling real-time threat alerts)
- Custom cursor glow effect (follows mouse)
- Scroll progress bar (top of viewport)
- Back-to-top button
- Dark/Light theme toggle with `[data-theme]` CSS custom properties
- Smooth scroll to all section anchors
- Active nav link tracking via IntersectionObserver
- SEO meta tags (description, keywords, Open Graph)
- Ripple button effects on all interactive buttons
- Card tilt effect on hover (`data-tilt` cards)

### 🎆 THREE.JS 3D HERO SECTION (WebGL)
- **Engine:** Three.js v0.168.0 (ES Module via importmap + es-module-shims)
- DNA double-helix structure (60 points × 2 strands + rungs)
- 22 transaction nodes (SphereGeometry, high/medium/low risk colors)
- Money flow packet animation (lerp along 8 edges)
- 3 rotating torus rings (cyan, cyan, red)
- 600-star field (PointsMaterial)
- 4 point lights (ambient + cyan + red + green + purple)
- Mouse parallax camera movement
- Central threat sphere (pulsing red)

### 🧠 AML Risk Scanner (Core Engine)
- 8-field input form (sender, receiver, amount, frequency, country, type, time gap, accounts)
- Animated 5-step scanning sequence
- Rule-based `calcScore()` with 6 weighted factors (0–100 score)
- Canvas arc gauge animation for score display
- Animated confidence percentage
- Risk factors list with color-coded severity
- AI reasoning text generation
- Suggested compliance action
- Reset scanner functionality
- Download report notification

### 📊 AML Intelligence Dashboard
- 6 animated counter stat cards (target values via IntersectionObserver)
- **Chart.js v4.4.0** charts:
  - Risk Score Distribution (bar chart — 10 buckets)
  - Volume & Risk Trend (dual-axis line chart — 14 days)
  - Alert Breakdown (doughnut chart — 6 pattern types)
- Recent AML Alerts table (8 rows) with search filter
- Alert detail modal (click Review for any alert)

### ⚡ Live Transaction Feed
- 900ms `setInterval` streaming fake transactions
- Pattern counter with animated percentages
- Sparkline canvas (70-point risk rate graph)
- Pause/Resume, Clear, Filter controls
- Feed stats: Total / High / Medium / Low counts
- Color-coded rows (red=high, yellow=medium, green=low)

### 🗺️ Global AI Threat Intelligence Map
- Canvas 2D world map (custom bezier curve lat/lon projection)
- 18 country hotspots with animated pulse rings
- 8 active money flow routes (animated bezier arcs with moving packets)
- Hover tooltip with country name, risk level, active transactions, amount
- High-risk country sidebar list
- Active route list sidebar

### 🔴 AI Neural Network Live Visualizer (v3.5)
- 6-layer canvas neural network animation
- NV_LAYERS: Input → Graph GNN → Behavioral → Pattern → Risk Score → Output
- Traveling pulse system (pulses created, travel layer-to-layer, fade out)
- Activation bars sidebar (live per-layer intensity)
- Live decision feed (color-coded HIGH/MED/LOW entries)
- Pause/Resume control
- Inject High-Risk Signal (20 simultaneous red pulses, 5s high-risk mode)
- TX rate counter (updates every 60 frames)

### 👆 Behavioral Biometrics Transaction Timeline (v3.5)
- 5 account profiles with 30-day behavioral data:
  - `ACC-4782` (High Risk — Circular Transfer — Score 91)
  - `WALLET-89X` (High Risk — Crypto Layering — Score 88)
  - `ACC-2201` (Medium Risk — Rapid Split — Score 74)
  - `BIZ-0019` (Medium Risk — Smurfing — Score 67)
  - `ACC-1147` (Low Risk — Normal Activity — Score 22)
- Canvas 2D filled area chart (30-day timeline)
- Anomaly threshold line (score 50)
- Spike markers + triangular indicators for anomalies
- Event dot annotations with labeled events list
- Account info panel (risk level, behavior type, anomaly score)

### 🔥 AML Transaction Risk Heatmap (NEW v4.0)
- 7×24 interactive grid (days × hours)
- 3 metric modes: Risk Score / Transaction Volume / Alert Count
- Dynamic color gradient (dark→blue→yellow→orange→red)
- Hover tooltip: time window, risk level, score, intensity
- Click-to-inspect with toast notification
- Peak Risk Windows sidebar (top 5 highest-risk time slots)
- Day Summary bar chart (7 days with relative intensity bars)
- AI Insight panel (auto-detects peak risk day/hour with explanation)
- Refresh button with 600ms loading animation

### 🕸️ Entity Relationship Graph Explorer (NEW v4.0)
- Force-directed physics simulation (repulsion + spring attraction + damping)
- 12 pre-built entities: bank accounts, crypto wallets, shell companies
- Animated money flow packets along edges
- Edge amount labels (₹M format)
- Node drag support (mouse + touch)
- Click node to see detailed panel: type, risk score, connections, total flow
- Add Random Node button (generates entity + connects to random existing node)
- Reset Layout button
- Highlight Suspicious button (shakes high-risk nodes)
- Zoom In/Out/Fit View controls
- Graph stats: Entities, Connections, High Risk count, Clusters
- Suspicious paths list (high-risk edge pairs)

### 🤖 AI Compliance Copilot (NEW v4.0)
- Floating robot FAB button (bottom-left, purple pulsing ring)
- Glassmorphism chat panel (360×480px, scale+opacity transition)
- Knowledge base covering 14+ AML topics:
  - Smurfing, Layering, Integration, Placement
  - High risk score triggers, SAR filing, FATF
  - Crypto AML, Mule accounts, KYC, RBI guidelines
  - Risk score calculation, Wire transfers, Pattern detection
- Intelligent fuzzy matching for natural language queries
- Typing animation (3-dot bounce) before response
- Quick suggestion buttons (4 common questions)
- Copilot message history (scrollable)
- Auto-closes and shows AI badge on FAB

### 📋 AML Case Investigation Board (Kanban)
- 4 columns: Open / Investigating / In Review / Closed
- 8 pre-built cases with scores, patterns, assignees
- HTML5 drag-and-drop between columns
- Case detail modal (full case info + move-to dropdowns + SAR button)
- Add New Case button (generates random case)
- Delete case functionality
- Case search filter
- Column count badges

### 🔍 AI Reasoning Engine Section
- 4 case cards with annotated AI analysis quotes
- Tags: Multi-hop, Velocity, Threshold Avoidance, Structuring, Circular Flow, etc.
- AI Architecture Pipeline (5-step illustrated flow)

### 📂 Upload Transaction Data
- Drag-and-drop file upload area
- Supports CSV, XLSX, XLS
- 8-step animated scan progress simulation
- Scan results display (1,248 scanned, 36 suspicious, 12 high risk, 5 crypto, 3 circular)
- Generate Report / Scan Another buttons

### 📄 SAR Report Generator
- Pre-built Suspicious Activity Report card
- Report meta: Case ID, Date, Risk Level, Pattern, Accounts Involved
- Transaction Summary block
- AI Reasoning block
- Compliance Action block (color-highlighted)
- Download / Export PDF / Share with Team buttons

### 🏢 Use Cases Section
- 8 industry cards: Banks, Fintech, Crypto Exchanges, Payment Gateways, Auditors, Small Businesses, NBFCs, Compliance Teams

### ⚙️ Workflow Section
- 6-step animated timeline: Upload → AI Analysis → Risk Score → Route Highlight → SAR Report → Team Action

### 💰 Pricing Section
- 3 tiers: Starter (₹999), Professional (₹4,999), Enterprise (Custom)
- Most Popular badge on Professional
- Feature comparison lists with ✓/✗ indicators
- Plan selection with toast notification

### ❓ FAQ Section
- 10 accordion items covering: AML layering, platform legality, Neural Viz, Behavioral Timeline, Heatmap, Entity Graph, AI Copilot, crypto detection, SAR generation
- Smooth max-height accordion animation

### 📬 Contact / Demo Request
- Contact info cards (Email, Phone, Location, Response Time)
- Demo request form (Name, Company, Email, Phone, Industry, Message)
- Form submission with success toast

### 🦶 Footer
- 4-column grid: Brand, Platform links, Use Cases, Company
- Social links (Twitter, LinkedIn, GitHub, YouTube)
- Legal disclaimer
- Copyright notice

---

## 📁 File Structure

```
index.html          Main SPA (1,100+ lines) — all sections, modals, copilot panel
css/
  style.css         Complete design system (~910 lines) — all components + responsive
js/
  main.js           Complete ES Module (~2,100+ lines) — all features, Three.js, Canvas
README.md           This file
```

---

## 🔗 Section URIs

| Section | Anchor | Description |
|---------|--------|-------------|
| Hero | `#hero` | 3D Three.js scene |
| Problem | `#problem` | AML Layering explainer |
| Features | `#features` | 8 feature cards |
| Scanner | `#scanner` | AML risk scanner form |
| Dashboard | `#dashboard` | Charts + alerts table |
| Neural AI | `#neural-viz` | Neural network visualizer |
| Behavior | `#behavior` | Behavioral timeline |
| Live Feed | `#live-feed` | Transaction stream |
| Threat Map | `#threat-map` | World map |
| AI Reasoning | `#ai-reasoning` | Case analysis cards |
| Case Board | `#case-board` | Kanban board |
| Use Cases | `#use-cases` | Industry cards |
| Workflow | `#workflow` | 6-step process |
| Upload | `#upload` | File upload |
| Report | `#report` | SAR report |
| Heatmap | `#heatmap` | Risk heatmap (NEW v4) |
| Entity Graph | `#entity-graph` | Graph explorer (NEW v4) |
| Pricing | `#pricing` | 3 pricing tiers |
| FAQ | `#faq` | 10 accordion items |
| Contact | `#contact` | Demo request form |

---

## 📦 CDN Dependencies

| Library | Version | Usage |
|---------|---------|-------|
| `es-module-shims` | 1.8.0 | ES Module importmap polyfill |
| `three` (ES Module) | 0.168.0 | 3D WebGL hero scene |
| `chart.js` | 4.4.0 | Risk/trend/pie charts |
| `@fortawesome/fontawesome-free` | 6.5.0 | All icons |
| Google Fonts (Inter) | — | Primary font |
| Google Fonts (JetBrains Mono) | — | Monospace/code font |

---

## 🎨 Design System

### CSS Custom Properties (Dark Theme)
```css
--bg:     #030712   (deepest background)
--bg2:    #060d1f   (section dark background)
--glass:  rgba(255,255,255,0.03)
--border: rgba(255,255,255,0.07)
--cyan:   #00e5ff   (primary accent)
--green:  #00e87c   (safe/low risk)
--yellow: #f5c518   (warning/medium risk)
--red:    #ff3250   (danger/high risk)
--orange: #ff6432   (elevated risk)
--purple: #a064ff   (AI/neural features)
--blue:   #3b82f6   (info)
```

### Risk Color Convention
- **Score 0–39** — Green (`#00e87c`) — Low Risk
- **Score 40–69** — Yellow (`#f5c518`) — Medium Risk
- **Score 70–100** — Red (`#ff3250`) — High Risk

---

## 🔬 Technical Architecture

### ES Module Loading (Three.js)
```html
<script async src="https://unpkg.com/es-module-shims@1.8.0/dist/es-module-shims.js"></script>
<script type="importmap">
{ "imports": { "three": "https://cdn.jsdelivr.net/.../three.module.js" } }
</script>
<script type="module" src="js/main.js"></script>
```

### Window Exposure for onclick Handlers
Since `main.js` is an ES Module (strict scope), all HTML `onclick=` functions are exposed as:
```javascript
window.analyzeRisk = function() {...}
window.toggleFAQ = function(el) {...}
window.selectBehaviorAccount = function(id, btn) {...}
window.toggleNeuralViz = function() {...}
window.injectHighRiskSignal = function() {...}
window.filterAlerts = function(val) {...}
window.viewAlertDetail = function(id) {...}
window.closeAlertModal = function() {...}
window.updateHeatmap = function(metric) {...}
window.refreshHeatmap = function() {...}
window.egAddRandomNode = function() {...}
window.egResetLayout = function() {...}
window.egHighlightSuspicious = function() {...}
window.egZoom = function(factor) {...}
window.egFitView = function() {...}
window.toggleCopilot = function() {...}
window.copilotSend = function() {...}
window.copilotAsk = function(q) {...}
// ... and 15+ more
```

### Risk Scoring Algorithm (`calcScore`)
```
score = 0
+ numAccounts factor  (max +30 pts)
+ frequency factor    (max +25 pts)
+ amount factor       (max +20 pts)
+ country risk factor (max +20 pts)
+ txType factor       (max +12 pts)
+ timeGap factor      (max +15 pts)
Score capped at 100
```

---

## 🧪 Test Status

| Test | Result |
|------|--------|
| PlaywrightConsoleCapture (v3.5) | ✅ Zero JS errors |
| PlaywrightConsoleCapture (v4.0) | ✅ Zero JS errors |
| Three.js ES Module loads | ✅ Confirmed |
| Neural Viz animation | ✅ Running |
| Behavioral Timeline | ✅ All 5 accounts work |
| Risk Heatmap | ✅ 7×24 grid, all 3 modes |
| Entity Graph | ✅ Physics simulation, drag, click |
| AI Copilot | ✅ 14+ topics, toggle, send |
| Case Board drag-drop | ✅ All 4 columns |
| World Map routes | ✅ Bezier arcs animating |
| Chart.js charts | ✅ 3 charts rendering |
| All window.* handlers | ✅ No undefined function errors |
| WebGL warnings (headless) | ⚠️ Expected — not a real-world issue |

---

## 🚧 Not Implemented / Future Improvements

- [ ] Real API backend for live transaction data
- [ ] Actual file parsing for CSV/XLSX uploads (currently simulated)
- [ ] Real PDF generation for SAR reports (currently triggers toast)
- [ ] Actual user authentication for compliance team access
- [ ] Real-time WebSocket data feed
- [ ] Three.js OrbitControls for the 3D hero
- [ ] Entity Graph export to PNG/SVG
- [ ] Heatmap historical date range selector
- [ ] Copilot LLM API integration (currently rule-based KB)
- [ ] Multi-language support (currently English only)

---

## 📈 Version History

| Version | Key Changes |
|---------|------------|
| v1.0 | Initial build — 15 sections, Three.js v0.160.0 UMD, scanner, dashboard |
| v2.0 | Live Feed, World Map, Case Board, typewriter loader, ticker bar, cursor glow |
| v3.5 | Three.js → ES Module (v0.168.0), DNA helix, Neural Viz, Behavioral Timeline |
| **v4.0** | **Risk Heatmap Analytics, Entity Graph Explorer, AI Compliance Copilot** |

---

*© 2025 AML Shield AI — Demo Platform. Not for production compliance use.*
