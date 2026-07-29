/* =========================================================
   AutoVModel — app.js
   Core application logic for V Model Automotive Framework
   ========================================================= */

'use strict';

// ── Phase Data ───────────────────────────────────────────────────────────────
const PHASES = [
  {
    id: 0, side: 'left', arm: 'dev', level: 0,
    name: 'Requirements Definition',
    short: 'Requirements',
    code: 'PH-01',
    colors: { primary: '#5b7fff', glow: 'rgba(91,127,255,0.3)' },
    description: 'Capture stakeholder needs, system-level functional and non-functional requirements. Establish traceability foundation and HARA (Hazard Analysis & Risk Assessment) for ASIL classification.',
    artifacts: [
      { name: 'System Requirements Specification (SRS)', type: 'Document', status: 'required', icon: '📄' },
      { name: 'Stakeholder Requirements List', type: 'Input Doc', status: 'required', icon: '📋' },
      { name: 'Hazard Analysis & Risk Assessment (HARA)', type: 'Safety Doc', status: 'required', icon: '⚠️' },
      { name: 'Functional Safety Concept', type: 'Safety Doc', status: 'required', icon: '🛡️' },
      { name: 'Traceability Matrix (Draft)', type: 'Matrix', status: 'required', icon: '🔗' },
      { name: 'Interface Control Document (ICD)', type: 'Technical Doc', status: 'required', icon: '⚙️' },
    ],
    tasks: [
      { text: 'Elicit stakeholder requirements from OEM & product owners', tag: 'elicitation' },
      { text: 'Classify requirements (functional, performance, safety, regulatory)', tag: 'classification' },
      { text: 'Conduct HARA and assign ASIL levels per ISO 26262', tag: 'safety' },
      { text: 'Define system boundary and interfaces (ICD)', tag: 'architecture' },
      { text: 'Establish requirements traceability foundation', tag: 'traceability' },
      { text: 'Review requirements with customer / CCB approval', tag: 'review' },
      { text: 'Perform requirements freeze gate review', tag: 'gate' },
    ],
    pitfalls: [
      'Requirements written too vaguely — use SHALL/SHOULD with measurable acceptance criteria',
      'HARA performed too late — ASIL classification must precede system design',
      'Missing supplier interface requirements leading to integration failures',
    ],
    validates: 7,
    iso: 'ISO 26262 Part 3 — Concept Phase; ASPICE SWE.1',
  },
  {
    id: 1, side: 'left', arm: 'dev', level: 1,
    name: 'System Design',
    short: 'System Design',
    code: 'PH-02',
    colors: { primary: '#818cf8', glow: 'rgba(129,140,248,0.3)' },
    description: 'Define system architecture, allocate requirements to subsystems/ECUs, establish E/E architecture and network topology. Design functional safety architecture and safety mechanisms.',
    artifacts: [
      { name: 'System Architecture Description', type: 'Architecture', status: 'required', icon: '🏗️' },
      { name: 'Technical Safety Concept (TSC)', type: 'Safety Doc', status: 'required', icon: '🛡️' },
      { name: 'E/E Architecture Diagram', type: 'Architecture', status: 'required', icon: '🔌' },
      { name: 'Subsystem Requirements Allocation', type: 'Matrix', status: 'required', icon: '🗂️' },
      { name: 'FMEA — System Level', type: 'Analysis', status: 'required', icon: '🔍' },
      { name: 'CAN/LIN/Ethernet Network Spec', type: 'Technical Doc', status: 'required', icon: '🌐' },
      { name: 'DV Plan (Design Verification Plan)', type: 'Plan', status: 'required', icon: '✅' },
    ],
    tasks: [
      { text: 'Define E/E architecture and ECU partitioning', tag: 'architecture' },
      { text: 'Allocate requirements to subsystems and components', tag: 'allocation' },
      { text: 'Design safety mechanisms and monitor/react patterns', tag: 'safety' },
      { text: 'Define network topology and communication matrices (CAN DB / ARXML)', tag: 'network' },
      { text: 'Perform System-level FMEA and fault tree analysis (FTA)', tag: 'safety' },
      { text: 'Define software/hardware interface (SWI)', tag: 'interface' },
      { text: 'Create Technical Safety Concept (TSC)', tag: 'safety' },
    ],
    pitfalls: [
      'FMEA performed as a checkbox activity rather than driving design decisions',
      'Safety mechanisms added after design — must be part of the architecture from day one',
      'Insufficient consideration of diagnostic coverage metrics',
    ],
    validates: 6,
    iso: 'ISO 26262 Part 4; ASPICE SYS.3',
  },
  {
    id: 2, side: 'left', arm: 'dev', level: 2,
    name: 'Component Design',
    short: 'Component Design',
    code: 'PH-03',
    colors: { primary: '#a78bfa', glow: 'rgba(167,139,250,0.3)' },
    description: 'Detailed software and hardware component design. Define SW architecture (AUTOSAR layers, BSW, MCAL), hardware schematics, PCB layout requirements, and unit-level design.',
    artifacts: [
      { name: 'SW Architecture Design (AUTOSAR)', type: 'Architecture', status: 'required', icon: '💻' },
      { name: 'Software Component Specifications (SWC)', type: 'Technical Doc', status: 'required', icon: '🧩' },
      { name: 'HW Design Specification', type: 'Technical Doc', status: 'required', icon: '🔧' },
      { name: 'Detailed Design Document (DDD)', type: 'Document', status: 'required', icon: '📐' },
      { name: 'FMEA — Component Level', type: 'Analysis', status: 'required', icon: '🔍' },
      { name: 'Unit Test Plan', type: 'Plan', status: 'required', icon: '🧪' },
      { name: 'Code Review Checklist', type: 'Process', status: 'required', icon: '✔️' },
    ],
    tasks: [
      { text: 'Design AUTOSAR SW components and inter-component interfaces', tag: 'AUTOSAR' },
      { text: 'Define MCAL configuration for target microcontroller', tag: 'HW' },
      { text: 'Create detailed design with UML/SysML models', tag: 'modeling' },
      { text: 'Perform component-level FMEA and FMEDA', tag: 'safety' },
      { text: 'Establish coding guidelines (MISRA C, CERT C)', tag: 'coding' },
      { text: 'Plan unit test scenarios and coverage criteria (MC/DC for ASIL D)', tag: 'testing' },
      { text: 'Define HW-SW interface and BSP requirements', tag: 'HW-SW' },
    ],
    pitfalls: [
      'Unit test planning deferred to implementation phase — tests must be designed from specs, not code',
      'MISRA violations accumulated and deferred — creates costly remediation later',
      'MC/DC coverage targets not defined early enough for ASIL C/D components',
    ],
    validates: 5,
    iso: 'ISO 26262 Part 5 & 6; ASPICE SWE.2',
  },
  {
    id: 3, side: 'left', arm: 'dev', level: 3,
    name: 'Unit Implementation',
    short: 'Implementation',
    code: 'PH-04',
    colors: { primary: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
    description: 'Actual software coding, hardware fabrication, and ECU bring-up. Code to detailed design specifications following MISRA C, perform static analysis, and build first HW/SW integration.',
    artifacts: [
      { name: 'Source Code (versioned)', type: 'Code', status: 'required', icon: '💾' },
      { name: 'Static Analysis Report (MISRA/CERT)', type: 'Analysis', status: 'required', icon: '🔎' },
      { name: 'Code Coverage Report', type: 'Metrics', status: 'required', icon: '📊' },
      { name: 'Compiler / Linker Configuration', type: 'Build', status: 'required', icon: '🔨' },
      { name: 'Unit Test Code & Results', type: 'Test', status: 'required', icon: '🧪' },
      { name: 'Deviation Report (MISRA)', type: 'Process', status: 'draft', icon: '📝' },
      { name: 'HW Prototype / EVT Board', type: 'Hardware', status: 'required', icon: '🔌' },
    ],
    tasks: [
      { text: 'Implement software units per detailed design spec', tag: 'coding' },
      { text: 'Run static analysis — resolve MISRA C violations (zero tolerance for mandatory rules)', tag: 'MISRA' },
      { text: 'Achieve MC/DC code coverage per ASIL requirements', tag: 'coverage' },
      { text: 'Perform peer code reviews with documented findings', tag: 'review' },
      { text: 'Bring up hardware prototype and validate BSP/MCAL', tag: 'HW' },
      { text: 'Create software build and flash procedures', tag: 'build' },
      { text: 'Run first compilation with zero errors, track warnings', tag: 'build' },
    ],
    pitfalls: [
      'Gold-plating — implementing features not in design spec without ECR change control',
      'Skipping code reviews to meet schedule — creates defects caught late',
      'Coverage measurement done at end rather than continuously tracked',
    ],
    validates: 4,
    iso: 'ISO 26262 Part 6; ASPICE SWE.3',
  },
  {
    id: 4, side: 'right', arm: 'val', level: 3,
    name: 'Unit Testing',
    short: 'Unit Testing',
    code: 'PH-05',
    colors: { primary: '#34d399', glow: 'rgba(52,211,153,0.3)' },
    description: 'Verify individual software units against their component design specification. Execute unit tests in host or target environment, achieve coverage criteria, and verify safety-critical units.',
    artifacts: [
      { name: 'Unit Test Specification', type: 'Test Doc', status: 'required', icon: '📋' },
      { name: 'Unit Test Results Report', type: 'Results', status: 'required', icon: '📊' },
      { name: 'Code Coverage Report (MC/DC)', type: 'Metrics', status: 'required', icon: '📈' },
      { name: 'Defect Log & Resolution Report', type: 'Tracking', status: 'required', icon: '🐛' },
      { name: 'Test Framework Configuration (VectorCAST / gTest)', type: 'Tool', status: 'required', icon: '⚙️' },
      { name: 'Unit Test Traceability to DDD', type: 'Matrix', status: 'required', icon: '🔗' },
    ],
    tasks: [
      { text: 'Execute all planned unit test cases against unit specification', tag: 'testing' },
      { text: 'Achieve MC/DC coverage (100% for ASIL D, ≥90% ASIL B/C)', tag: 'coverage' },
      { text: 'Log, classify, and resolve all defects with root cause analysis', tag: 'defects' },
      { text: 'Verify boundary conditions, equivalence classes, and error injection', tag: 'testing' },
      { text: 'Confirm traceability: each unit spec requirement has at least one test', tag: 'traceability' },
      { text: 'Conduct unit test review and sign-off gate', tag: 'gate' },
    ],
    pitfalls: [
      'Unit tests written to pass code rather than verify requirements — test to spec, not to code',
      'Deviating from coverage requirements without formal deviation justification',
      'Not archiving test results — traceability audit will fail without evidence',
    ],
    validates: 3,
    validatedBy: 2,
    iso: 'ISO 26262 Part 6; ASPICE SWE.4',
  },
  {
    id: 5, side: 'right', arm: 'val', level: 2,
    name: 'Integration Testing',
    short: 'Integration Testing',
    code: 'PH-06',
    colors: { primary: '#2dd4bf', glow: 'rgba(45,212,191,0.3)' },
    description: 'Verify integrated SW components, then SW+HW integration. Test CAN/LIN communication, ECU bring-up, BSW interactions, and multi-ECU scenarios on HiL (Hardware-in-the-Loop).',
    artifacts: [
      { name: 'Integration Test Specification', type: 'Test Doc', status: 'required', icon: '📋' },
      { name: 'HiL Test Environment Setup', type: 'Infrastructure', status: 'required', icon: '🖥️' },
      { name: 'SW Integration Test Results', type: 'Results', status: 'required', icon: '📊' },
      { name: 'HW-SW Integration Test Results', type: 'Results', status: 'required', icon: '📊' },
      { name: 'CAN/Ethernet Log Files', type: 'Data', status: 'required', icon: '🌐' },
      { name: 'Integration Defect Report', type: 'Tracking', status: 'required', icon: '🐛' },
      { name: 'Network Load & Timing Analysis', type: 'Analysis', status: 'required', icon: '⏱️' },
    ],
    tasks: [
      { text: 'Integrate SW components incrementally (incremental integration strategy)', tag: 'integration' },
      { text: 'Validate CAN/LIN/Ethernet communication against FIBEX/ARXML databases', tag: 'network' },
      { text: 'Execute HW-SW integration tests on target ECU hardware', tag: 'HW-SW' },
      { text: 'Run HiL-based tests for actuator/sensor interface verification', tag: 'HiL' },
      { text: 'Perform EMC pre-compliance checks if applicable', tag: 'EMC' },
      { text: 'Validate diagnostic services (UDS — ISO 14229)', tag: 'diagnostics' },
      { text: 'Confirm all integration test requirements are linked to system design', tag: 'traceability' },
    ],
    pitfalls: [
      'Big-bang integration — always use incremental; isolate defects to specific interface changes',
      'HiL environment not representative of production vehicle — signal conditioning errors',
      'UDS diagnostics tested as afterthought — integrate from first HW-SW test phase',
    ],
    validates: 2,
    validatedBy: 1,
    iso: 'ISO 26262 Part 4 & 6; ASPICE SWE.5, SWE.6',
  },
  {
    id: 6, side: 'right', arm: 'val', level: 1,
    name: 'System Testing',
    short: 'System Testing',
    code: 'PH-07',
    colors: { primary: '#38bdf8', glow: 'rgba(56,189,248,0.3)' },
    description: 'Validate the complete system against system requirements. Conduct vehicle-level tests, function tests, performance benchmarks, EMC, environmental (temperature, vibration), and regulatory compliance.',
    artifacts: [
      { name: 'System Test Specification', type: 'Test Doc', status: 'required', icon: '📋' },
      { name: 'System Test Results Report', type: 'Results', status: 'required', icon: '📊' },
      { name: 'VehiclE-level Test Protocol', type: 'Test Doc', status: 'required', icon: '🚗' },
      { name: 'EMC / Environment Test Report', type: 'Results', status: 'required', icon: '🌡️' },
      { name: 'Performance Benchmark Report', type: 'Analysis', status: 'required', icon: '⚡' },
      { name: 'Regression Test Suite', type: 'Test', status: 'required', icon: '🔄' },
      { name: 'System Test Traceability Report', type: 'Matrix', status: 'required', icon: '🔗' },
    ],
    tasks: [
      { text: 'Execute all system test cases against system requirements specification', tag: 'testing' },
      { text: 'Conduct vehicle-level end-to-end functional tests', tag: 'vehicle' },
      { text: 'Perform performance & reliability testing (endurance cycles)', tag: 'performance' },
      { text: 'Validate OBD/UDS compliance and emission readiness if applicable', tag: 'compliance' },
      { text: 'Execute regression tests for all previously released functions', tag: 'regression' },
      { text: 'Validate safety mechanisms under fault injection scenarios', tag: 'safety' },
      { text: 'Perform system test exit gate review — achieve sign-off criteria', tag: 'gate' },
    ],
    pitfalls: [
      'System tests written at system test phase — must trace to requirements from day 1',
      'Safety fault injection tests conducted informally — must be fully documented per ASIL',
      'Regression automation gaps — manual regression on 1000+ test cases creates bottleneck near SOP',
    ],
    validates: 1,
    validatedBy: 0,
    iso: 'ISO 26262 Part 4; ASPICE SYS.5',
  },
  {
    id: 7, side: 'right', arm: 'val', level: 0,
    name: 'Acceptance Testing',
    short: 'Acceptance Testing',
    code: 'PH-08',
    colors: { primary: '#06b6d4', glow: 'rgba(6,182,212,0.3)' },
    description: 'Formal validation against stakeholder requirements and regulatory standards. OEM acceptance, homologation, functional safety assessment, and SOP readiness gate. Culminates in Safety Case closure.',
    artifacts: [
      { name: 'Acceptance Test Specification', type: 'Test Doc', status: 'required', icon: '📋' },
      { name: 'Functional Safety Assessment (FSA)', type: 'Safety Doc', status: 'required', icon: '🛡️' },
      { name: 'Safety Case / Safety Manual', type: 'Safety Doc', status: 'required', icon: '📗' },
      { name: 'OEM Acceptance Test Protocol', type: 'Results', status: 'required', icon: '🚗' },
      { name: 'Compliance Report (Type Approval)', type: 'Compliance', status: 'required', icon: '📜' },
      { name: 'Release Note & Release Baseline', type: 'Release', status: 'required', icon: '🏁' },
      { name: 'PPAP / DGS Documentation', type: 'Production', status: 'required', icon: '🏭' },
    ],
    tasks: [
      { text: 'Execute OEM-defined acceptance test scenarios at vehicle level', tag: 'acceptance' },
      { text: 'Conduct independent Functional Safety Assessment (FSA) per ISO 26262', tag: 'safety' },
      { text: 'Close Safety Case with complete evidence traceability', tag: 'safety' },
      { text: 'Achieve type approval / homologation (UN ECE regulations if applicable)', tag: 'compliance' },
      { text: 'Complete PPAP Level 3 documentation package for production', tag: 'production' },
      { text: 'Final traceability audit: requirements → design → implementation → tests', tag: 'traceability' },
      { text: 'Obtain SOP readiness sign-off from OEM Quality & Safety teams', tag: 'gate' },
    ],
    pitfalls: [
      'FSA assessment prepared from scratch at the end — evidence must be compiled throughout all phases',
      'Homologation requirements misunderstood — engage regulatory team at requirements phase',
      'Incomplete traceability discovered in final audit — embed traceability discipline from PH-01',
    ],
    validates: 0,
    validatedBy: null,
    iso: 'ISO 26262 Part 2 & 4; ASPICE MAN.3',
  },
];

// ── V Model Layout Positions (percentage) ────────────────────────────────────
const NODE_POSITIONS = [
  { x: 2,  y: 2  },   // PH-01 Requirements
  { x: 14, y: 18 },   // PH-02 System Design
  { x: 26, y: 34 },   // PH-03 Component Design
  { x: 38, y: 50 },   // PH-04 Implementation
  { x: 62, y: 50 },   // PH-05 Unit Testing
  { x: 74, y: 34 },   // PH-06 Integration Testing
  { x: 86, y: 18 },   // PH-07 System Testing
  { x: 98, y: 2  },   // PH-08 Acceptance Testing (adjusted below)
];

// ── Application State ─────────────────────────────────────────────────────────
const state = {
  project: null,
  currentView: 'dashboard',
  currentPhase: null,
  selectedPhase: null,
  taskStatus: {},
  modalStep: 1,
  selectedSystem: null,
  selectedAsil: null,
  phaseWeights: [15, 15, 15, 10, 10, 15, 15, 5],
};

// ── Initialization ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('initTime').textContent = formatTime(new Date());
  renderMiniVModel();
  setInitialDates();
  renderPhaseSliders();
  renderVModelDiagram();
  addMilestone();
});

function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── View Switching ────────────────────────────────────────────────────────────
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`view-${view}`).classList.add('active');
  document.querySelector(`[data-view="${view}"]`).classList.add('active');
  state.currentView = view;

  if (view === 'vmodel') renderVModelDiagram();
  if (view === 'traceability' && state.project) renderTraceability();
  if (view === 'timeline' && state.project) renderTimeline();
}

// ── Mini V Model Render ───────────────────────────────────────────────────────
function renderMiniVModel() {
  const el = document.getElementById('miniVModel');
  el.innerHTML = '';

  PHASES.forEach((phase, idx) => {
    const row = document.createElement('div');
    row.className = 'mv-row';

    if (phase.side === 'left') {
      const indent = '&nbsp;'.repeat(idx * 3);
      row.innerHTML = `
        <div class="mv-node ${getPhaseState(idx)}" onclick="showPhaseDetail(${idx})" id="mv-node-${idx}">
          <div class="mv-dot"></div>
          <div class="mv-label">${indent}${phase.short}</div>
          <div class="mv-phase-num">${phase.code}</div>
        </div>
      `;
    } else {
      const indent = '&nbsp;'.repeat((7 - idx) * 3);
      row.innerHTML = `
        <div class="mv-node ${getPhaseState(idx)}" onclick="showPhaseDetail(${idx})" id="mv-node-${idx}">
          <div class="mv-dot"></div>
          <div class="mv-label">${indent}${phase.short}</div>
          <div class="mv-phase-num">${phase.code}</div>
        </div>
      `;
    }

    el.appendChild(row);
  });
}

function getPhaseState(idx) {
  if (!state.project) return 'pending';
  const cp = parseInt(state.project.phaseStart) || 0;
  if (idx < cp) return 'done';
  if (idx === cp) return 'active';
  return 'pending';
}

// ── Full V Model Diagram ──────────────────────────────────────────────────────
function renderVModelDiagram() {
  const container = document.getElementById('vmodelNodes');
  const canvas    = document.getElementById('vmodelCanvas');
  if (!container) return;

  container.innerHTML = '';

  const diagramEl = document.querySelector('.vmodel-diagram');
  if (!diagramEl) return;

  const W = diagramEl.clientWidth  || 800;
  const H = Math.max(diagramEl.clientHeight || 560, 540);

  canvas.width  = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Define precise V positions
  const nodeW = 160, nodeH = 76;
  const padX  = 40, padTop = 56, padBot = 30;
  const innerW = W - padX * 2 - nodeW;
  const innerH = H - padTop - padBot - nodeH;

  const positions = [
    { x: padX,                         y: padTop },                            // PH-01
    { x: padX + innerW * 0.14,         y: padTop + innerH * 0.33 },            // PH-02
    { x: padX + innerW * 0.28,         y: padTop + innerH * 0.66 },            // PH-03
    { x: padX + innerW * 0.42,         y: padTop + innerH },                   // PH-04 (bottom)
    { x: padX + innerW * 0.58,         y: padTop + innerH },                   // PH-05 (bottom)
    { x: padX + innerW * 0.72,         y: padTop + innerH * 0.66 },            // PH-06
    { x: padX + innerW * 0.86,         y: padTop + innerH * 0.33 },            // PH-07
    { x: padX + innerW,                y: padTop },                            // PH-08
  ];

  // Draw V-shape arms
  const cx = (i) => positions[i].x + nodeW / 2;
  const cy = (i) => positions[i].y + nodeH / 2;

  // Left arm
  ctx.beginPath();
  ctx.moveTo(cx(0), cy(0));
  for (let i = 1; i <= 3; i++) ctx.lineTo(cx(i), cy(i));
  // Right arm
  for (let i = 4; i <= 7; i++) ctx.lineTo(cx(i), cy(i));

  const grad = ctx.createLinearGradient(cx(0), cy(0), cx(7), cy(7));
  grad.addColorStop(0, 'rgba(91,127,255,0.6)');
  grad.addColorStop(0.5, 'rgba(192,132,252,0.6)');
  grad.addColorStop(1, 'rgba(6,182,212,0.6)');
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Horizontal validation links (dashed)
  const links = [[0,7],[1,6],[2,5],[3,4]];
  links.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.setLineDash([6, 4]);
    ctx.moveTo(cx(a) + nodeW/2 - 10, cy(a));
    ctx.lineTo(cx(b) - nodeW/2 + 10, cy(b));
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Draw arrows at end of arms
  drawArrow(ctx, cx(6), cy(6), cx(7), cy(7), 'rgba(6,182,212,0.7)');

  // Render node HTML
  PHASES.forEach((phase, idx) => {
    const pos  = positions[idx];
    const pstate = getPhaseState(idx);

    const node = document.createElement('div');
    node.className = `vnode ${pstate}`;
    node.dataset.phase = idx;
    node.id = `vnode-${idx}`;
    node.style.cssText = `left:${pos.x}px; top:${pos.y}px; width:${nodeW}px;`;

    node.innerHTML = `
      <div class="vnode-inner" style="border-left-color:${phase.colors.primary}">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <div class="vnode-num">${phase.code}</div>
          <div class="vnode-status"></div>
        </div>
        <div class="vnode-title">${phase.short}</div>
        <div class="vnode-badge" style="background:${phase.colors.primary}22;color:${phase.colors.primary};border:1px solid ${phase.colors.primary}44">
          ${phase.side === 'left' ? 'Dev' : 'Val'}
        </div>
      </div>
    `;

    node.addEventListener('click', () => showPhaseDetail(idx));
    container.appendChild(node);
  });
}

function drawArrow(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const aSize = 8;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - aSize * Math.cos(angle - Math.PI / 6), y2 - aSize * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - aSize * Math.cos(angle + Math.PI / 6), y2 - aSize * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

// ── Phase Detail Panel ────────────────────────────────────────────────────────
function showPhaseDetail(idx) {
  const phase = PHASES[idx];
  state.selectedPhase = idx;

  // Update active state on diagram nodes
  document.querySelectorAll('.vnode').forEach(n => {
    const isActive = parseInt(n.dataset.phase) === idx;
    n.classList.toggle('active', isActive && getPhaseState(idx) !== 'done');
  });

  const panel = document.getElementById('phaseDetailPanel');
  panel.querySelector('#pdpBadge').textContent  = phase.code;
  panel.querySelector('#pdpTitle').textContent  = phase.name;
  panel.querySelector('#pdpDesc').textContent   = phase.description;

  const body = document.getElementById('pdpBody');

  // Artifacts section
  let artifactHtml = `
    <div class="pdp-section">
      <div class="pdp-section-title">Required Artifacts</div>
      <div class="pdp-items">
        ${phase.artifacts.map(a => `
          <div class="pdp-item">
            <span style="font-size:16px">${a.icon}</span>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600;color:var(--text-primary)">${a.name}</div>
              <div style="font-size:10px;color:var(--text-muted)">${a.type}</div>
            </div>
            <span class="artifact-status ${a.status}">${a.status}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Tasks section
  let tasksHtml = `
    <div class="pdp-section">
      <div class="pdp-section-title">Phase Tasks</div>
      <div class="pdp-items">
        ${phase.tasks.map((t, ti) => {
          const taskKey = `${idx}-${ti}`;
          const checked = state.taskStatus[taskKey] || false;
          return `
            <div class="pdp-item" onclick="toggleTask(${idx}, ${ti})" style="cursor:pointer">
              <div class="task-checkbox ${checked ? 'checked' : ''}" id="tc-${idx}-${ti}"></div>
              <div class="task-text ${checked ? 'done' : ''}">${t.text}</div>
              <span class="task-tag">${t.tag}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // Pitfalls section
  let pitfallsHtml = `
    <div class="pdp-section">
      <div class="pdp-section-title">⚠ Common Pitfalls</div>
      ${phase.pitfalls.map(p => `
        <div class="pdp-flag">
          <span class="pdp-flag-icon">⚠️</span>
          <span>${p}</span>
        </div>
      `).join('')}
    </div>
  `;

  // Validation link info
  let linkHtml = `
    <div class="pdp-section">
      <div class="pdp-section-title">Traceability & Standards</div>
      <div class="pdp-item">
        <span style="font-size:15px">🔗</span>
        <div style="flex:1">
          <div style="font-size:11px;color:var(--text-muted)">Validates Against</div>
          <div style="font-size:12px;font-weight:600;color:var(--accent)">${phase.validates !== undefined ? PHASES[phase.validates].name : '–'}</div>
        </div>
      </div>
      <div class="pdp-item" style="margin-top:6px">
        <span style="font-size:15px">📐</span>
        <div style="flex:1">
          <div style="font-size:11px;color:var(--text-muted)">Standard Reference</div>
          <div style="font-size:11px;font-weight:600;color:var(--text-secondary)">${phase.iso}</div>
        </div>
      </div>
    </div>
  `;

  // Actions
  let actionsHtml = `
    <div class="pdp-actions">
      <button class="btn-primary" style="font-size:11px;padding:8px 14px" onclick="setCurrentPhase(${idx})">Set as Current Phase</button>
      <button class="btn-secondary" style="font-size:11px;padding:8px 14px" onclick="askAboutPhase(${idx})">Ask Advisor</button>
    </div>
  `;

  body.innerHTML = artifactHtml + tasksHtml + pitfallsHtml + linkHtml + actionsHtml;

  // Scroll to panel on mobile
  if (window.innerWidth < 1200) {
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleTask(phaseIdx, taskIdx) {
  const key = `${phaseIdx}-${taskIdx}`;
  state.taskStatus[key] = !state.taskStatus[key];

  const cb = document.getElementById(`tc-${phaseIdx}-${taskIdx}`);
  if (cb) {
    cb.classList.toggle('checked', state.taskStatus[key]);
    cb.nextElementSibling?.classList.toggle('done', state.taskStatus[key]);
  }

  updateKPIs();
  if (state.project) updatePhaseTasksOnDashboard();
}

function setCurrentPhase(idx) {
  if (!state.project) {
    openProjectModal();
    return;
  }
  state.project.phaseStart = idx;
  state.currentPhase = idx;
  updateDashboard();
  renderMiniVModel();
  renderVModelDiagram();
}

function askAboutPhase(idx) {
  const phase = PHASES[idx];
  switchView('advisor');
  setTimeout(() => {
    const input = document.getElementById('chatInput');
    input.value = `What should I focus on in ${phase.name} for my ${state.project ? state.project.system : 'automotive'} project?`;
    sendChatMessage();
  }, 200);
}

function expandAllPhases() {
  PHASES.forEach((_, i) => showPhaseDetail(i === 0 ? 0 : i));
  showPhaseDetail(0);
}
function collapseAllPhases() {
  document.getElementById('pdpBody').innerHTML = `
    <div class="empty-state large">
      <div class="es-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M24 8v8M16 12l5.66 5.66M8 20h8M12 28l5.66-5.66M20 40v-8M28 36l-5.66-5.66M40 28h-8M36 20l-5.66 5.66"/></svg></div>
      <p>Select a phase node to see detailed guidance</p>
    </div>
  `;
  document.querySelectorAll('.vnode').forEach(n => n.classList.remove('active'));
}

// ── Modal Logic ───────────────────────────────────────────────────────────────
function openProjectModal() {
  document.getElementById('projectModal').classList.add('open');
  setInitialDates();
}
function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('open');
}

function modalNext() {
  const step = state.modalStep;

  if (step === 1 && !state.selectedSystem) {
    // Validate
    document.querySelector('.system-grid').style.outline = '1px solid var(--accent-5)';
    setTimeout(() => document.querySelector('.system-grid').style.outline = '', 1500);
    return;
  }

  if (step < 4) {
    document.getElementById(`modal-step-${step}`).classList.remove('active');
    document.getElementById(`step-${step}-dot`).classList.remove('active');
    document.getElementById(`step-${step}-dot`).classList.add('done');
    document.querySelector(`.step-line:nth-child(${step * 2})`).classList.add('done');

    state.modalStep = step + 1;

    document.getElementById(`modal-step-${step + 1}`).classList.add('active');
    document.getElementById(`step-${step + 1}-dot`).classList.add('active');
    document.getElementById('currentModalStep').textContent = step + 1;
    document.getElementById('modalBackBtn').style.display = 'block';

    if (step + 1 === 4) {
      document.getElementById('modalNextBtn').textContent = '✓ Create Project';
    }
  } else {
    createProject();
  }
}

function modalBack() {
  const step = state.modalStep;
  if (step > 1) {
    document.getElementById(`modal-step-${step}`).classList.remove('active');
    document.getElementById(`step-${step}-dot`).classList.remove('active');

    state.modalStep = step - 1;

    document.getElementById(`modal-step-${step - 1}`).classList.add('active');
    document.getElementById(`step-${step - 1}-dot`).classList.add('active');
    document.getElementById(`step-${step - 1}-dot`).classList.remove('done');
    document.getElementById('currentModalStep').textContent = step - 1;
    document.getElementById('modalNextBtn').textContent = 'Next →';

    if (step - 1 === 1) document.getElementById('modalBackBtn').style.display = 'none';
  }
}

function selectSystem(el) {
  document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedSystem = el.dataset.system;
}

function selectAsil(el) {
  document.querySelectorAll('.asil-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.selectedAsil = el.dataset.asil;
}

function createProject() {
  const name    = document.getElementById('projectNameInput').value || `${systemLabel(state.selectedSystem)} Project`;
  const devType = document.getElementById('devType').value;
  const teamSize= document.getElementById('teamSize').value;
  const supplier= document.getElementById('supplierInvolvement').value;
  const phStart = parseInt(document.getElementById('phaseStart').value) || 0;
  const desc    = document.getElementById('projectDesc').value;
  const asil    = state.selectedAsil || 'QM';
  const startD  = document.getElementById('startDate').value;
  const sopD    = document.getElementById('sopDate').value;

  const standards = [];
  if (document.getElementById('std-26262').checked) standards.push('ISO 26262');
  if (document.getElementById('std-sotif').checked)  standards.push('SOTIF');
  if (document.getElementById('std-aspice').checked) standards.push('AUTOSAR');
  if (document.getElementById('std-cyber').checked)  standards.push('UN R155');
  if (document.getElementById('std-ota').checked)    standards.push('UN R156');

  state.project = {
    name, system: state.selectedSystem, devType, teamSize,
    supplier, phaseStart: phStart, desc, asil, standards,
    startDate: startD, sopDate: sopD,
    phaseWeights: [...state.phaseWeights],
    createdAt: new Date(),
  };
  state.currentPhase = phStart;

  // Update UI
  document.getElementById('projectName').textContent = name;
  document.querySelector('.badge-dot').classList.add('active');

  closeProjectModal();
  updateDashboard();
  renderMiniVModel();
  renderVModelDiagram();
  renderTraceability();
  renderTimeline();

  // Update advisor context
  document.getElementById('ctx-system').textContent  = systemLabel(state.selectedSystem);
  document.getElementById('ctx-asil').textContent    = asil;
  document.getElementById('ctx-phase').textContent   = PHASES[phStart].short;
  document.getElementById('ctx-timeline').textContent = sopD ? `SOP: ${sopD}` : 'Not set';

  // Send welcome message to advisor
  setTimeout(() => {
    const introMsg = `Project created: ${name}. System: ${systemLabel(state.selectedSystem)}, ASIL: ${asil}, starting at ${PHASES[phStart].name}. Standards: ${standards.join(', ') || 'ISO 26262'}.`;
    addAdvisorMessage(generateProjectAdvice(state.project), 'PH-' + String(phStart + 1).padStart(2, '0'));
  }, 400);
}

function systemLabel(s) {
  const labels = {
    powertrain: 'Powertrain', adas: 'ADAS', safety: 'Safety Systems',
    chassis: 'Chassis', infotainment: 'Infotainment', ev: 'EV System',
    network: 'Vehicle Network', body: 'Body Electronics',
  };
  return labels[s] || 'Automotive System';
}

// ── Dashboard Update ──────────────────────────────────────────────────────────
function updateDashboard() {
  if (!state.project) return;

  const cp = state.project.phaseStart;
  const phase = PHASES[cp];

  // Current phase indicator
  document.getElementById('dashCurrentPhase').textContent = phase.short;
  document.getElementById('dashPhaseIndicator').style.display = 'flex';

  // KPIs
  const reqCov  = Math.min(100, 30 + cp * 10);
  const testAln  = cp >= 4 ? Math.min(100, (cp - 3) * 20) : 0;
  const phasePct = Math.round((cp / 8) * 100);

  document.getElementById('kpi-req-val').textContent = `${reqCov}%`;
  document.getElementById('kpi-req-bar').style.width  = `${reqCov}%`;
  document.getElementById('kpi-test-val').textContent = `${testAln}%`;
  document.getElementById('kpi-test-bar').style.width  = `${testAln}%`;
  document.getElementById('kpi-phase-val').textContent = `${cp}/8`;
  document.getElementById('kpi-phase-bar').style.width  = `${phasePct}%`;

  const riskLevel = getRiskLevel();
  document.getElementById('kpi-risk-val').textContent = riskLevel.label;
  document.getElementById('kpi-risk-val').style.color = riskLevel.color;
  document.getElementById('kpi-risk-sub').textContent = riskLevel.desc;

  // Risk flags
  renderRiskFlags();

  // Phase tasks
  updatePhaseTasksOnDashboard();

  // Artifacts
  updateArtifacts();

  updateKPIs();
}

function getRiskLevel() {
  const asil = state.project?.asil || 'QM';
  const cp   = state.project?.phaseStart || 0;

  if (asil === 'ASIL-D') return { label: 'CRITICAL', color: 'var(--accent-5)', desc: 'ASIL-D — Highest safety rigor' };
  if (asil === 'ASIL-C') return { label: 'HIGH', color: 'var(--accent-4)', desc: 'ASIL-C — Rigorous safety measures' };
  if (asil === 'ASIL-B') return { label: 'MEDIUM', color: '#facc15', desc: 'ASIL-B — Moderate safety requirements' };
  if (asil === 'ASIL-A') return { label: 'LOW', color: 'var(--accent-3)', desc: 'ASIL-A — Basic safety measures' };
  return { label: 'QM', color: 'var(--text-muted)', desc: 'Quality Management — No ASIL' };
}

function renderRiskFlags() {
  const cp = state.project?.phaseStart || 0;
  const asil = state.project?.asil || 'QM';

  const risks = [];

  if (cp === 0) {
    risks.push({ sev: 'high', text: 'HARA not yet initiated — ASIL classification pending', phase: 'PH-01' });
    risks.push({ sev: 'medium', text: 'Traceability matrix foundation must be established in this phase', phase: 'PH-01' });
  }
  if (cp === 1) {
    risks.push({ sev: 'high', text: 'Technical Safety Concept must be derived from HARA before design', phase: 'PH-02' });
    risks.push({ sev: 'medium', text: 'System FMEA should drive design decisions — not be added post-design', phase: 'PH-02' });
  }
  if (cp === 2) {
    risks.push({ sev: 'medium', text: 'Unit test plans must be authored now, not at implementation phase', phase: 'PH-03' });
    if (asil === 'ASIL-D' || asil === 'ASIL-C') {
      risks.push({ sev: 'high', text: 'MC/DC coverage criteria must be defined before coding begins', phase: 'PH-03' });
    }
  }
  if (cp >= 3 && cp <= 4) {
    risks.push({ sev: 'medium', text: 'MISRA violations should be zero for mandatory rules — track weekly', phase: 'PH-04' });
  }
  if (cp >= 5) {
    risks.push({ sev: 'low', text: 'Regression test automation needed before system test phase', phase: 'PH-06' });
  }
  if (cp >= 6) {
    risks.push({ sev: 'high', text: 'FSA assessment evidence must be complete before acceptance gate', phase: 'PH-07' });
  }

  // Generic always-present
  if (state.project?.supplier !== 'none') {
    risks.push({ sev: 'medium', text: 'Supplier interface requirements must be under change control', phase: 'All' });
  }

  const list = document.getElementById('riskList');
  document.getElementById('riskCount').textContent = risks.length;

  list.innerHTML = risks.map(r => `
    <div class="risk-item">
      <span class="risk-sev ${r.sev}">${r.sev.toUpperCase()}</span>
      <div>
        <div class="risk-text">${r.text}</div>
        <div class="risk-phase">${r.phase}</div>
      </div>
    </div>
  `).join('');
}

function updatePhaseTasksOnDashboard() {
  const cp = state.project?.phaseStart || 0;
  const phase = PHASES[cp];
  const list = document.getElementById('phaseTasksList');

  list.innerHTML = phase.tasks.map((t, i) => {
    const key     = `${cp}-${i}`;
    const checked = state.taskStatus[key] || false;
    return `
      <div class="task-item" onclick="toggleTaskOnDash(${cp}, ${i})">
        <div class="task-checkbox ${checked ? 'checked' : ''}" id="dash-tc-${cp}-${i}"></div>
        <div class="task-text ${checked ? 'done' : ''}">${t.text}</div>
        <span class="task-tag">${t.tag}</span>
      </div>
    `;
  }).join('');
}

function toggleTaskOnDash(phaseIdx, taskIdx) {
  const key = `${phaseIdx}-${taskIdx}`;
  state.taskStatus[key] = !state.taskStatus[key];

  const dashEl = document.getElementById(`dash-tc-${phaseIdx}-${taskIdx}`);
  if (dashEl) {
    dashEl.classList.toggle('checked', state.taskStatus[key]);
    dashEl.nextElementSibling?.classList.toggle('done', state.taskStatus[key]);
  }
  updateKPIs();
}

function updateArtifacts() {
  const cp = state.project?.phaseStart || 0;
  const phase = PHASES[cp];
  const list = document.getElementById('artifactsList');
  document.getElementById('artifactPhaseTag').textContent = phase.code;

  list.innerHTML = phase.artifacts.map(a => `
    <div class="artifact-item">
      <div class="artifact-icon" style="background:rgba(91,127,255,0.1)">${a.icon}</div>
      <div class="artifact-info">
        <div class="artifact-name">${a.name}</div>
        <div class="artifact-type">${a.type}</div>
      </div>
      <span class="artifact-status ${a.status}">${a.status}</span>
    </div>
  `).join('');
}

function updateKPIs() {
  const cp = state.project?.phaseStart || 0;
  const totalTasks = PHASES[cp].tasks.length;
  const doneTasks  = PHASES[cp].tasks.filter((_, i) => state.taskStatus[`${cp}-${i}`]).length;

  // Update req coverage based on tasks done
  const base = 30 + cp * 8;
  const bonus = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 15) : 0;
  const cov   = Math.min(100, base + bonus);

  document.getElementById('kpi-req-val').textContent = `${cov}%`;
  document.getElementById('kpi-req-bar').style.width  = `${cov}%`;
}

// ── Traceability Matrix ───────────────────────────────────────────────────────
function renderTraceability() {
  if (!state.project) return;

  const system = state.project.system;

  // Generate sample traceability items per system
  const traceItems = generateTraceItems(system);

  const container = document.getElementById('traceContainer');
  container.innerHTML = `
    <div class="trace-header-row">
      <div class="trace-col-header">Requirement ID</div>
      <div class="trace-col-header">System Design</div>
      <div class="trace-col-header">Implementation</div>
      <div class="trace-col-header">Test Case</div>
      <div class="trace-col-header">Status</div>
    </div>
    <div class="trace-rows" id="traceRows">
      ${traceItems.map(item => `
        <div class="trace-row" data-type="${item.type}">
          <div class="trace-cell req-cell">
            <div class="trace-id">${item.reqId}</div>
            <div class="trace-text">${item.reqText}</div>
          </div>
          <div class="trace-cell design-cell">
            <div class="trace-id">${item.designId}</div>
            <div class="trace-text">${item.designText}</div>
          </div>
          <div class="trace-cell impl-cell">
            <div class="trace-id">${item.implId}</div>
            <div class="trace-text">${item.implText}</div>
          </div>
          <div class="trace-cell test-cell">
            <div class="trace-id">${item.testId}</div>
            <div class="trace-text">${item.testText}</div>
          </div>
          <div class="trace-cell trace-status">
            <span class="trace-badge ${item.status}">${item.status}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function generateTraceItems(system) {
  const templates = {
    adas: [
      { reqText: 'System shall detect pedestrians within 50m in all lighting conditions', designText: 'Camera + LiDAR fusion module — Perception Engine v2', implText: 'perception_engine.c / pedestrian_detector.cpp', testText: 'TC-ADAS-001: Pedestrian detection accuracy > 98%', status: 'linked' },
      { reqText: 'System shall initiate emergency brake within 150ms of hazard detection', designText: 'Emergency Brake Controller — safety-critical path', implText: 'ebs_controller.c — ASIL-D partition', testText: 'TC-ADAS-002: Response time < 150ms under fault injection', status: 'partial' },
      { reqText: 'System shall provide ASIL-D safety for AEB function', designText: 'Dual-channel redundant sensor processing', implText: 'safety_monitor.c — watchdog + plausibility checks', testText: 'TC-ADAS-003: Single-point fault detection rate ≥ 99%', status: 'linked' },
      { reqText: 'System shall maintain lane centering accuracy within ±0.1m at 130km/h', designText: 'Lane Keeping Assist controller — lateral control', implText: 'lka_controller.c — PID + model predictive', testText: 'TC-ADAS-004: Lane centering HiL test at various speeds', status: 'missing' },
    ],
    ev: [
      { reqText: 'BMS shall monitor cell voltage within ±5mV accuracy', designText: 'Cell monitoring IC interface — AFE architecture', implText: 'bms_afe_driver.c / voltage_monitor.c', testText: 'TC-BMS-001: Voltage measurement accuracy calibration', status: 'linked' },
      { reqText: 'Charging control shall comply with IEC 61851 AC/DC modes', designText: 'Charge controller — CCS2 / CHAdeMO interface', implText: 'charge_ctrl.c — IEC 61851-1 state machine', testText: 'TC-BMS-002: Charging protocol compliance test suite', status: 'partial' },
      { reqText: 'System shall prevent cell temperature exceeding 45°C during fast charge', designText: 'Thermal management system — active cooling control', implText: 'thermal_mgmt.c — PID temperature controller', testText: 'TC-BMS-003: Thermal stress test at maximum C-rate', status: 'linked' },
    ],
    powertrain: [
      { reqText: 'ECU shall control engine torque within ±2Nm of driver demand', designText: 'Torque arbitration module — driver intent interpreter', implText: 'torque_arb.c / accelerator_ctrl.c', testText: 'TC-PT-001: Torque accuracy test over full pedal range', status: 'linked' },
      { reqText: 'Idle speed control shall maintain 750±25 RPM in steady state', designText: 'ISC controller — feedback + feedforward architecture', implText: 'isc_controller.c — PID with anti-windup', testText: 'TC-PT-002: Idle stability test — 200 engine cold starts', status: 'partial' },
      { reqText: 'OBD-II shall report fault codes compliant with ISO 15031-5', designText: 'Diagnostic module — UDS / OBD stack integration', implText: 'obd_handler.c — DTC management', testText: 'TC-PT-003: OBD-II protocol conformance test', status: 'linked' },
    ],
    safety: [
      { reqText: 'ABS shall prevent wheel lock-up under panic braking on μ < 0.4 surface', designText: 'Anti-lock Brake Controller — slip ratio feedback control', implText: 'abs_controller.c — wheel speed sensors + HCU PWM', testText: 'TC-ABS-001: ABS activation on split-μ surface — HiL', status: 'linked' },
      { reqText: 'ESC shall activate stability intervention within 50ms of yaw rate deviation', designText: 'ESC controller — yaw rate + lateral acceleration monitoring', implText: 'esc_controller.c — ASIL-D partition', testText: 'TC-ESC-001: Stability intervention timing test', status: 'partial' },
    ],
    chassis: [
      { reqText: 'EPS torque assist shall provide 0-30Nm assist within 10ms of steering input', designText: 'Electric Power Steering controller — assist map', implText: 'eps_ctrl.c / assist_map.c', testText: 'TC-EPS-001: Assist torque response time measurement', status: 'linked' },
      { reqText: 'Active suspension shall maintain body roll < 3° at 0.5g lateral acceleration', designText: 'Active suspension controller — roll compensation', implText: 'susp_ctrl.c — solenoid valve PWM control', testText: 'TC-SUSP-001: Roll dynamics test on banked track', status: 'missing' },
    ],
    infotainment: [
      { reqText: 'HMI boot time shall be < 3 seconds from ignition on', designText: 'FastBoot OS configuration — prioritized service startup', implText: 'bootloader_config / systemd unit priorities', testText: 'TC-HMI-001: Boot time measurement — 100 cold starts', status: 'linked' },
      { reqText: 'Navigation system shall achieve GPS fix within 30 seconds cold start', designText: 'GNSS module integration — AGPS data management', implText: 'gnss_driver.c / agps_client.c', testText: 'TC-NAV-001: TTFF test in open sky and urban canyon', status: 'partial' },
    ],
    network: [
      { reqText: 'Gateway shall route CAN messages with latency < 1ms', designText: 'AUTOSAR ComManager routing table — priority-based routing', implText: 'can_gateway.c / routing_table.c', testText: 'TC-GW-001: CAN routing latency measurement under 100% load', status: 'linked' },
      { reqText: 'Ethernet backbone shall support 1Gbps throughput for sensor data', designText: 'Automotive Ethernet (100BASE-T1 / 1000BASE-T1) switch', implText: 'eth_driver.c — 1G switch configuration', testText: 'TC-ETH-001: Throughput and latency benchmarking', status: 'linked' },
    ],
    body: [
      { reqText: 'Smart lighting shall adapt headlight intensity within 200ms of ambient change', designText: 'ALS-based adaptive lighting controller', implText: 'als_ctrl.c / led_pwm_driver.c', testText: 'TC-LIGHT-001: Response time test — simulated ambient ramp', status: 'partial' },
    ],
  };

  const items = templates[system] || templates['adas'];
  return items.map((item, i) => ({
    ...item,
    reqId: `REQ-${system.toUpperCase().slice(0,3)}-${String(i + 1).padStart(3,'0')}`,
    designId: `DES-${String(i + 1).padStart(3,'0')}`,
    implId: `IMPL-${String(i + 1).padStart(3,'0')}`,
    testId: item.testText.split(':')[0],
    type: 'requirements',
  }));
}

function filterTraceability() {
  const val = document.getElementById('traceFilter').value;
  // Simple filter — in full app would filter rows
  renderTraceability();
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function renderTimeline() {
  if (!state.project) return;

  const container = document.getElementById('timelineContainer');
  const startDate = state.project.startDate ? new Date(state.project.startDate) : new Date();
  const sopDate   = state.project.sopDate   ? new Date(state.project.sopDate)   : new Date(startDate.getTime() + 365 * 24 * 3600 * 1000);

  const totalDays = Math.round((sopDate - startDate) / (24 * 3600 * 1000));
  const weights   = state.project.phaseWeights || [15, 15, 15, 10, 10, 15, 15, 5];
  const totalW    = weights.reduce((a, b) => a + b, 0);

  let cursor = new Date(startDate);

  const phaseColors = ['#5b7fff','#818cf8','#a78bfa','#c084fc','#34d399','#2dd4bf','#38bdf8','#06b6d4'];
  const cp = state.project.phaseStart || 0;

  container.innerHTML = `
    <div class="card" style="padding:20px;margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
        <div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px">Project Start</div>
          <div style="font-size:16px;font-weight:700;color:var(--text-primary);margin-top:2px">${formatDate(startDate)}</div>
        </div>
        <div style="flex:1;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent-3));border-radius:1px"></div>
        <div>
          <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.8px">SOP (Start of Production)</div>
          <div style="font-size:16px;font-weight:700;color:var(--accent-3);margin-top:2px">${formatDate(sopDate)}</div>
        </div>
        <div style="padding:10px 20px;background:rgba(91,127,255,0.08);border:1px solid rgba(91,127,255,0.2);border-radius:10px;text-align:center">
          <div style="font-size:11px;color:var(--text-muted)">Total Duration</div>
          <div style="font-size:20px;font-weight:800;color:var(--accent)">${totalDays}d</div>
        </div>
      </div>
    </div>
    <div class="timeline-phases">
      ${PHASES.map((phase, idx) => {
        const phaseDays = Math.round((weights[idx] / totalW) * totalDays);
        const phEnd = new Date(cursor.getTime() + phaseDays * 24 * 3600 * 1000);
        const pct   = weights[idx];

        const isDone   = idx < cp;
        const isActive = idx === cp;

        const barHtml = `
          <div class="tl-bar" style="width:${pct}%;background:${isDone ? 'rgba(52,211,153,0.6)' : isActive ? `linear-gradient(90deg,${phaseColors[idx]},${phaseColors[idx]}aa)` : 'rgba(255,255,255,0.06)'};color:${isDone||isActive?'white':'var(--text-muted)'}">
            ${pct}%
          </div>
        `;

        const startStr = formatDate(cursor);
        cursor = phEnd;

        return `
          <div class="tl-phase" style="${isActive ? `border-color:${phaseColors[idx]};background:rgba(91,127,255,0.04)` : ''}${isDone ? 'border-color:rgba(52,211,153,0.2)' : ''}">
            <div class="tl-phase-info">
              <div class="tl-phase-name" style="color:${isActive ? phaseColors[idx] : isDone ? 'var(--accent-3)' : 'var(--text-primary)'}">${phase.name}</div>
              <div class="tl-phase-dates">${startStr} → ${formatDate(phEnd)}</div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${phase.code} · ${phase.iso.split(';')[0].trim()}</div>
            </div>
            <div class="tl-bar-track">${barHtml}</div>
            <div class="tl-duration">
              <div style="font-size:18px;font-weight:800;color:${isActive ? phaseColors[idx] : 'var(--text-secondary)'}">${phaseDays}d</div>
              <div style="font-size:10px;color:var(--text-muted);margin-top:2px">${isDone ? '✓ Done' : isActive ? '▶ Active' : '○ Pending'}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ── Phase Sliders ─────────────────────────────────────────────────────────────
function renderPhaseSliders() {
  const container = document.getElementById('phaseSliders');
  if (!container) return;

  container.innerHTML = PHASES.map((phase, idx) => `
    <div class="phase-slider-row">
      <div class="phase-slider-label">${phase.short}</div>
      <input type="range" class="phase-slider-input" min="5" max="40" value="${state.phaseWeights[idx]}"
             oninput="updateSlider(${idx}, this.value)" id="slider-${idx}" />
      <div class="phase-slider-val" id="slider-val-${idx}">${state.phaseWeights[idx]}%</div>
    </div>
  `).join('');
}

function updateSlider(idx, val) {
  state.phaseWeights[idx] = parseInt(val);
  document.getElementById(`slider-val-${idx}`).textContent = `${val}%`;
}

// ── Dates ─────────────────────────────────────────────────────────────────────
function setInitialDates() {
  const today = new Date();
  const sop   = new Date(today.getTime() + 365 * 24 * 3600 * 1000);
  document.getElementById('startDate').value = today.toISOString().split('T')[0];
  document.getElementById('sopDate').value   = sop.toISOString().split('T')[0];
}

// ── Milestone Add ─────────────────────────────────────────────────────────────
function addMilestone() {
  const container = document.getElementById('milestoneInputs');
  const row = document.createElement('div');
  row.className = 'milestone-row';
  row.innerHTML = `
    <input type="text" class="form-input" placeholder="Milestone name" />
    <input type="date" class="form-input" />
    <button class="btn-icon" onclick="this.parentElement.remove()">−</button>
  `;
  container.appendChild(row);
}

// ── AI Advisor Chat ───────────────────────────────────────────────────────────
const knowledgeBase = {
  'requirements definition': `
**Requirements Definition — Phase Guidance**

This is the most critical phase in the V Model. Errors here propagate through all downstream phases and are exponentially costly to fix.

**Key Actions:**
- Apply IEEE 29148 / ISO 26262 Part 3 methodology for requirements elicitation
- Each requirement must follow the \`<Subject> SHALL <Action>\` format with measurable acceptance criteria
- Perform HARA per ISO 26262 — classify every system function with Severity (S), Exposure (E), and Controllability (C) to derive ASIL levels
- Establish a Functional Safety Goal for each ASIL-rated hazard before proceeding to system design

**Traceability Foundation:**
Every stakeholder requirement → functional requirement → safety goal must be captured in your traceability matrix from day 1. Use tools like DOORS, Polarion, or Codebeamer.

**Phase Exit Gate Criteria:**
✓ SRS baselined and under change control
✓ HARA completed and reviewed
✓ ASIL assignments approved
✓ Traceability matrix shows 100% stakeholder → functional coverage
`,
  'system design': `
**System Design — Phase Guidance**

Decompose system requirements into an architecture that can be implemented and validated.

**Key Actions:**
- Define the E/E architecture: ECU partitioning, network topology, sensor/actuator interfaces
- Develop the Technical Safety Concept (TSC) — derive safety requirements from functional safety goals
- Define safety mechanisms: watchdog timers, plausibility checks, dual-channel redundancy, safe states
- Perform system-level FMEA and FTA to validate safety architecture
- Create the Development Interface Agreement (DIA) for supplier components

**AUTOSAR Consideration:**
If using AUTOSAR Classic/Adaptive, define the system configuration (SWC types, ports, interfaces) in SystemDesk or equivalent. This becomes the binding specification for component design.

**Common Gap:**
Safety mechanisms added post-architecture review. Safety must be baked in, not added on.
`,
  'iso 26262': `
**ISO 26262 — Functional Safety Standard**

ISO 26262 is the road vehicles functional safety standard derived from IEC 61508. It applies to electrical and electronic systems in production road vehicles up to 3,500kg.

**Part Structure mapped to V Model:**
- **Part 3** → Concept Phase = Requirements Definition (HARA, Functional Safety Concept)
- **Part 4** → System Level = System Design + System Testing + Acceptance
- **Part 5** → Hardware = Component Design (HW) + Integration Testing
- **Part 6** → Software = Component Design (SW) + Unit Implementation + Unit Testing
- **Part 8** → Support Processes = Traceability, Configuration Management, Change Management
- **Part 9** → ASIL-Oriented and Safety-Oriented Analysis

**ASIL Decomposition:**
ASIL can be decomposed into two elements (e.g., ASIL-D → ASIL-B + ASIL-B) when independent parallel implementations are used. Document this decomposition in the TSC.

**Key Deliverable:** Safety Case — living document assembled from all phase evidence, formally assessed by an independent Functional Safety Assessor (FSA) at acceptance gate.
`,
  'fmea': `
**FMEA in the V Model**

Failure Mode and Effects Analysis (FMEA) is a systematic bottom-up risk analysis technique. In automotive V Model, FMEA appears at two levels:

**System FMEA (PH-02 — System Design):**
- Scope: failures at the system/subsystem boundary
- Purpose: validate safety architecture, identify SPFs (Single Point Failures), latent faults
- Input to: Technical Safety Concept, system hardware requirements
- Tool: FMEDA (with Diagnostic Coverage metrics) for safety elements

**Component/HW FMEA (PH-03 — Component Design):**
- Scope: component-level failure modes (transistor, IC, connector)
- Purpose: assign diagnostic coverage, verify PMHF targets per ASIL
- Output: failure rate budgets, SPFM / LFM metrics per ISO 26262-5

**DFMEA vs PFMEA:**
- DFMEA = Design FMEA → V Model left arm (design phases)
- PFMEA = Process FMEA → Production/manufacturing, relevant to PPAP at Acceptance

**Critical Rule:** FMEA must drive design decisions — not document them after the fact.
`,
  'traceability': `
**Establishing Traceability in the V Model**

Traceability is the backbone of V Model compliance. The standard requires bidirectional traceability:

**Vertical Traceability Chain:**
\`Stakeholder Requirement → System Requirement → Subsystem Requirement → SW/HW Requirement → Design Element → Code Unit → Test Case\`

**Horizontal Traceability:**
Each left-arm phase element must be traceable to its right-arm counterpart:
- SRS ↔ Acceptance Test Spec
- System Architecture ↔ System Test Spec  
- Component Design ↔ Integration Test Spec
- Detailed Design ↔ Unit Test Spec

**Tool Recommendations:**
- **DOORS/DNG** — IBM requirement management with traceability links
- **Polarion / Codebeamer** — ALM with integrated traceability matrices
- **ReqIF** — exchange format for supplier traceability

**Audit Red Flags:**
- Requirements with no allocated test case (orphaned requirements)
- Test cases with no linked requirement (gold-plating)
- Design elements not traceable to any requirement (scope creep)

**Target:** 100% bidirectional traceability coverage before each phase exit gate.
`,
  'asil': `
**ASIL Levels — Automotive Safety Integrity Levels**

ASIL is determined by the HARA (Hazard Analysis & Risk Assessment) using three parameters:
- **Severity (S0–S3):** Consequence of injury from S0 (no injury) to S3 (life-threatening/fatality)
- **Exposure (E0–E4):** Probability of the hazardous situation occurring
- **Controllability (C0–C3):** Ability of the driver/others to control the hazard

**ASIL Table:**

| ASIL | Safety Measures Required |
|------|--------------------------|
| **QM** | No safety measures — quality management only |
| **ASIL A** | Basic safety measures — 60% diagnostic coverage |
| **ASIL B** | Moderate measures — 90% coverage, basic redundancy |
| **ASIL C** | Stringent — 97% coverage, formal verification methods |
| **ASIL D** | Highest — 99% coverage, MC/DC, independent safety assessment, formal methods |

**V Model Impact by ASIL:**
- QM/ASIL-A: Standard software development practices
- ASIL-B/C: MC/DC coverage, static analysis (MISRA C), FMEA mandatory
- ASIL-D: All above + independent software development, formal verification, dual-channel hardware
`,
  'sotif': `
**SOTIF (Safety of the Intended Functionality) — ISO 21448**

SOTIF addresses hazards arising from functional insufficiencies of the intended functionality — i.e., the system works as designed but still causes hazardous situations. This is particularly relevant for ADAS and automated driving.

**Key Difference from ISO 26262:**
- ISO 26262 → Safety from **failures** (hardware faults, software bugs)
- ISO 21448 → Safety from **performance limitations** (sensor limitations, ODD boundaries)

**V Model Integration:**
- **Requirements Phase:** Define Operational Design Domain (ODD) and functional performance requirements
- **System Design Phase:** Identify triggering conditions and scenarios using scenario libraries
- **Testing Phase (Right Arm):** Scenario-based testing using simulation, closed track, and public road testing to demonstrate SOTIF compliance
- **Acceptance:** Define residual risk acceptance criteria per ISO 21448 Annex C

**Key Activities:**
1. Identify known unsafe scenarios
2. Identify unknown unsafe scenarios (exploratory testing, simulation)
3. Evaluate and reduce triggering conditions
4. Validate that remaining risks are acceptable
`,
  'adas pitfalls': `
**Common V Model Pitfalls in ADAS Development**

ADAS introduces unique V Model challenges due to safety-critical AI/ML components, complex sensor fusion, and scenario-dependent behavior.

**Requirements Phase Pitfalls:**
⚠️ ODD (Operational Design Domain) not precisely defined — leads to unbounded test scope
⚠️ Performance requirements stated without measurement methodology (e.g., "shall detect pedestrians" without specifying range, lighting, occlusion conditions)
⚠️ Missing SOTIF analysis — ISO 21448 required alongside ISO 26262 for automated functions

**Design Phase Pitfalls:**
⚠️ Sensor fusion architecture not validated against individual sensor failure scenarios
⚠️ Fail-safe / minimal risk condition (MRC) design skipped — safety monitoring added as afterthought
⚠️ Assuming model-based (MIL/SIL) and hardware (HiL) results are equivalent without correlation studies

**Testing Phase Pitfalls:**
⚠️ Scenario coverage not systematically derived from ODD — test gaps create field failures
⚠️ Regression automation neglected — near SOP creates 5000+ manual tests bottleneck
⚠️ V2X and edge cases (adverse weather, unusual object types) tested informally

**Traceability Pitfalls:**
⚠️ ML model performance metrics not linked to system safety requirements
⚠️ Sensor calibration specifications missing from traceability chain
`,
  'autosar': `
**AUTOSAR in the Automotive V Model**

AUTOSAR (AUTomotive Open System ARchitecture) defines a standardized software architecture for automotive ECUs. It integrates with V Model phases as follows:

**Classic AUTOSAR (AUTOSAR CP):**
- Used in microcontroller-based ECUs (body, powertrain, safety systems)
- **PH-02 System Design:** Define System Configuration in SystemDesk — VFB (Virtual Functional Bus) model
- **PH-03 Component Design:** Define SWC (Software Components) with ports, interfaces, internal behavior
- **PH-04 Implementation:** Map SWC to ECU, generate RTE (Runtime Environment) code via TargetLink/DaVinci
- **PH-05/06:** Integration testing validates SWC communication through PDUR, ComStack

**Adaptive AUTOSAR (AUTOSAR AP):**
- Used for high-performance compute platforms (ADAS, autonomous driving, HPC)
- Service-oriented architecture using SOME/IP over Ethernet
- ara::com, ara::exec, ara::diag service APIs

**Key Artifacts:**
- ARXML files: System/ECU/SWC descriptions (machine-readable, tool-exchangeable)
- FIBEX: CAN/LIN network database
- COM Matrix: Signal routing specification

**V Model Traceability:**
SWC specification in ARXML becomes binding design document — test cases must reference SWC ports and signals.
`,
  'aspice': `
**ASPICE (Automotive SPICE) and V Model Alignment**

AUTOSAR SPICE (Software Process Improvement and Capability Determination) is a process framework used to assess automotive supplier software development capability. It maps directly to V Model phases.

**Process Area Mapping:**

| ASPICE Process | V Model Phase |
|----------------|---------------|
| SYS.2 System Requirements Analysis | PH-01 Requirements Definition |
| SYS.3 System Architectural Design | PH-02 System Design |
| SYS.4 System Integration & Integration Test | PH-06 Integration Testing |
| SYS.5 System Qualification Test | PH-07 System Testing |
| SWE.1 Software Requirements Analysis | PH-01 (SW subset) |
| SWE.2 Software Architectural Design | PH-02/03 |
| SWE.3 Software Detailed Design & Unit Constr. | PH-03/04 |
| SWE.4 Software Unit Verification | PH-05 Unit Testing |
| SWE.5 Software Integration & Integration Test | PH-06 |
| SWE.6 Software Qualification Test | PH-07 |

**Capability Levels:**
- **CL1** — Process performed (outputs exist)
- **CL2** — Managed (planned, tracked, verified)
- **CL3** — Established (defined process, tailored from standard)
- **CL4/5** — Predictable / Optimizing (statistical control, continuous improvement)

Most OEMs require Tier 1 suppliers to achieve **CL2–CL3** for all SWE processes.
`,
  'uds': `
**UDS (Unified Diagnostic Services) — ISO 14229**

UDS defines the communication protocol used for ECU diagnostics, calibration, programming, and end-of-line testing in vehicles.

**Key UDS Services in V Model Context:**

| Service | SID | V Model Relevance |
|---------|-----|-------------------|
| Diagnostic Session Control | 0x10 | Required for ECU testing at all phases |
| ECU Reset | 0x11 | Integration testing — soft/hard reset verification |
| Clear Diagnostic Information | 0x14 | System testing — DTC management |
| Read DTC Information | 0x19 | System testing — fault injection + DTC verification |
| Read Data by Identifier | 0x22 | Integration — signal readback during HiL testing |
| Write Data by Identifier | 0x2E | Calibration — parameter write at component phase |
| Input/Output Control | 0x2F | HW-SW integration — actuator activation |
| Routine Control | 0x31 | Integration — running EOL test routines |
| Request Download / Upload | 0x34/35 | Acceptance — OTA/flashing validation |
| Security Access | 0x27 | All phases — seed/key algorithm verification |

**Testing Phase Placement:**
- Unit Test (PH-05): UDS stack unit verification (session handling, security)
- Integration Test (PH-06): End-to-end UDS communication over CAN/Ethernet
- System Test (PH-07): Full OBD/OEM diagnostic cycle validation
- Acceptance (PH-08): OEM acceptance of diagnostic specification compliance
`,
};

function findKnowledgeResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes('requirements') && (msg.includes('definition') || msg.includes('phase') || msg.includes('artifact'))) return knowledgeBase['requirements definition'];
  if (msg.includes('system design')) return knowledgeBase['system design'];
  if (msg.includes('iso 26262') || msg.includes('26262')) return knowledgeBase['iso 26262'];
  if (msg.includes('fmea') || msg.includes('failure mode')) return knowledgeBase['fmea'];
  if (msg.includes('tracea')) return knowledgeBase['traceability'];
  if (msg.includes('asil') || msg.includes('safety integrity')) return knowledgeBase['asil'];
  if (msg.includes('sotif') || msg.includes('21448') || msg.includes('intended functionality')) return knowledgeBase['sotif'];
  if (msg.includes('adas') && msg.includes('pitfall')) return knowledgeBase['adas pitfalls'];
  if (msg.includes('autosar')) return knowledgeBase['autosar'];
  if (msg.includes('aspice') || msg.includes('spice')) return knowledgeBase['aspice'];
  if (msg.includes('uds') || msg.includes('diagnostic') || msg.includes('obd')) return knowledgeBase['uds'];
  if (msg.includes('asil') && msg.includes('adas')) return knowledgeBase['adas pitfalls'];

  return null;
}

function generateProjectAdvice(project) {
  const systemAdvice = {
    adas: 'For an **ADAS** project, ensure SOTIF (ISO 21448) analysis runs alongside ISO 26262. Define your Operational Design Domain precisely before system design — ODD gaps become test blind spots. Sensor fusion architecture requires independent channel analysis per ASIL requirement.',
    ev: 'For an **EV Battery Management System**, the ASIL rating drives your BMS architecture complexity. Cell monitoring accuracy (voltage, temperature, current) must have measurable acceptance criteria from day 1. IEC 61851 compliance must be addressed in requirements if supporting AC/DC charging.',
    powertrain: 'For a **Powertrain** project, OBD-II and emissions compliance requirements must be captured in PH-01. Engine management software typically carries ASIL-B to ASIL-C requirements for torque monitoring and failsafe modes.',
    safety: 'For **Safety Systems** (ABS/ESC/Airbag), expect ASIL-C to ASIL-D classification. Diagnostic coverage metrics (SPFM, LFM) are mathematically derived — establish targets at system design phase using FMEDA before hardware selection.',
    chassis: 'For **Chassis** systems like EPS or active suspension, define the steering/handling performance envelope in quantitative requirements. Endurance test profiles (road load data) must be established early to plan validation test fleet utilization.',
    infotainment: 'For **Infotainment**, functional safety requirements are typically QM unless the system controls vehicle functions (e.g., HMI for ADAS). Cybersecurity (UN R155) and software update (UN R156) compliance are increasingly mandatory.',
    network: 'For **Vehicle Networking**, establish the complete signal database (CAN DBC / ARXML) as the binding spec from system design phase. Gateway routing tables must be verified against all ECU requirements before integration testing begins.',
    body: 'For **Body Electronics**, focus on LIN slave node specification accuracy — timing, error frame handling. Central body controller FMEA should map to all connected loads and actuators.',
  };

  const phaseAdvice = PHASES[project.phaseStart];
  const asilAdvice = {
    'QM': 'Your **QM** project follows standard quality management practices. No safety certification required, but maintain traceability for potential future ASIL upgrades.',
    'ASIL-A': 'At **ASIL-A**, apply basic safety measures: MISRA C compliance, basic code coverage metrics, and documented FMEA.',
    'ASIL-B': 'At **ASIL-B**, you need MC/DC code coverage, documented FMEA with diagnostic coverage metrics, and static analysis with zero mandatory MISRA violations.',
    'ASIL-C': 'At **ASIL-C**, rigorous development process required: formal design reviews, 97%+ diagnostic coverage, pair programming or independent design verification.',
    'ASIL-D': 'At **ASIL-D**, maximum rigor applies: independent development and verification teams, formal verification methods, 100% MC/DC coverage, and mandatory independent FSA assessment.',
  };

  return `Project **${project.name}** has been loaded into the V Model framework.

${systemAdvice[project.system] || ''}

**Starting Phase: ${phaseAdvice.name}**
Your immediate priorities for ${phaseAdvice.code}:
${phaseAdvice.tasks.slice(0, 3).map(t => `• ${t.text}`).join('\n')}

**Safety Level: ${project.asil}**
${asilAdvice[project.asil] || ''}

${project.standards.length > 0 ? `**Active Standards:** ${project.standards.join(' · ')}` : ''}

Ask me about any V Model phase, artifact, or methodology — I'll give you direct, actionable guidance.`;
}

function generateDynamicResponse(message) {
  const msg = message.toLowerCase();

  // Project-context aware responses
  if (state.project) {
    const system = state.project.system;
    const cp     = state.project.phaseStart;
    const phase  = PHASES[cp];

    if (msg.includes('current phase') || msg.includes('what should i')) {
      return `In your current phase (**${phase.name}**), for a **${systemLabel(system)}** project at ${state.project.asil}:

**Top 3 Priorities:**
${phase.tasks.slice(0, 3).map((t, i) => `${i+1}. ${t.text}`).join('\n')}

**Key Artifacts to Produce:**
${phase.artifacts.slice(0, 3).map(a => `• ${a.icon} ${a.name} — *${a.status}*`).join('\n')}

**⚠ Watch Out For:**
${phase.pitfalls[0]}

**Standard Reference:** ${phase.iso}`;
    }

    if (msg.includes('next phase') || msg.includes('move to')) {
      const nextPhase = PHASES[Math.min(cp + 1, 7)];
      return `To advance to **${nextPhase.name}**, ensure your current phase exit criteria are met:

**Current Phase (${phase.code}) Exit Gate Checklist:**
${phase.artifacts.slice(0, 4).map(a => `☐ ${a.name} — baselined and approved`).join('\n')}
☐ All open defects severity ≥ Medium are resolved or risk-accepted
☐ Traceability matrix updated to 100% coverage
☐ Phase review sign-off obtained from relevant stakeholders

**Upon Entry to ${nextPhase.code}:**
${nextPhase.tasks.slice(0, 3).map(t => `→ ${t.text}`).join('\n')}`;
    }
  }

  // Generic V Model responses
  if (msg.includes('what is v model') || msg.includes('explain v model')) {
    return `The **V Model** is a Systems Development Life Cycle (SDLC) model used extensively in automotive engineering. It's named for its V-shape, where:

**Left Arm (Development) — Top to Bottom:**
1. Requirements Definition → 2. System Design → 3. Component Design → 4. Unit Implementation

**Right Arm (Validation) — Bottom to Top:**
5. Unit Testing → 6. Integration Testing → 7. System Testing → 8. Acceptance Testing

**Key Principle:** Each left-arm phase has a corresponding right-arm validation phase. Requirements Definition is validated by Acceptance Testing; System Design by System Testing — creating horizontal test traceability.

**Why Automotive Uses V Model:**
- ISO 26262 (Functional Safety) maps directly to V Model phases
- Provides structured phase gates for supplier management
- Establishes clear traceability from hazard → requirement → test → evidence
- Supported by automotive-standard tools (DOORS, Polarion, Vector tools, dSPACE HiL)`;
  }

  if (msg.includes('gap') || msg.includes('missing')) {
    return `Common **traceability and coverage gaps** I can identify in automotive V Model projects:

**Requirements Gaps:**
• Requirements without measurable acceptance criteria
• Safety goals without ASIL classification (HARA incomplete)  
• Missing system boundary / interface requirements

**Design Gaps:**
• Safety mechanisms not traceable to specific safety goals
• FMEA not linked to any design change records
• Supplier interface specs not under configuration control

**Testing Gaps:**
• Test cases written without requirement traceability links
• Coverage metrics not defined per ASIL level
• No regression test strategy for previously released functions

**Process Gaps:**
• Change management process not established — requirements change without impact analysis
• No configuration management baseline for phase exits
• Tool qualification missing for safety-critical tool usage (ISO 26262-8:11)

Use the **Traceability Matrix** tab to see the current state of your project's traceability coverage.`;
  }

  // Default helpful response
  return `I can provide specific guidance on any V Model phase or automotive engineering topic. Here are some areas I can help with:

• **Phase Guidance** — detailed tasks, artifacts, and exit criteria for any of the 8 V Model phases
• **ISO 26262** — functional safety mapping, ASIL levels, HARA methodology
• **SOTIF (ISO 21448)** — ADAS/AV scenario analysis and ODD definition
• **FMEA / FMEDA** — failure mode analysis placement and methodology
• **Traceability** — establishing bidirectional requirement-to-test links
• **AUTOSAR** — Classic/Adaptive architecture in the V Model context
• **ASPICE** — process capability assessment mapping
• **UDS / Diagnostics** — ISO 14229 testing placement in V Model

What specific aspect of your **${state.project ? systemLabel(state.project.system) : 'automotive'}** project would you like guidance on?`;
}

// ── Chat Functions ────────────────────────────────────────────────────────────
function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const msg   = input.value.trim();
  if (!msg) return;

  appendUserMessage(msg);
  input.value = '';
  input.style.height = 'auto';

  document.getElementById('chatSendBtn').disabled = true;

  // Show typing
  const typingId = showTyping();

  setTimeout(() => {
    removeTyping(typingId);
    document.getElementById('chatSendBtn').disabled = false;

    const knowledgeResp = findKnowledgeResponse(msg);
    const response = knowledgeResp || generateDynamicResponse(msg);

    const phaseTag = state.project ? PHASES[state.project.phaseStart].code : null;
    addAdvisorMessage(response, phaseTag);

    // Update context panel
    if (msg.toLowerCase().includes('asil') && state.project) {
      document.getElementById('ctx-asil').className = 'ctx-value active';
    }
  }, 1200 + Math.random() * 800);
}

function appendUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user-msg';
  div.innerHTML = `
    <div class="msg-avatar user-avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    </div>
    <div class="msg-bubble">
      <div class="msg-header">
        <span class="msg-name">You</span>
        <span class="msg-time">${formatTime(new Date())}</span>
      </div>
      <div class="msg-text">${escapeHtml(text)}</div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function addAdvisorMessage(text, phaseTag) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';

  const tagHtml = phaseTag ? `<div class="msg-phase-tag">📍 ${phaseTag}</div>` : '';

  div.innerHTML = `
    <div class="msg-avatar ai-avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/><path d="M12 14v7M9 18l3-3 3 3"/></svg>
    </div>
    <div class="msg-bubble">
      <div class="msg-header">
        <span class="msg-name">AutoVModel Advisor</span>
        <span class="msg-time">${formatTime(new Date())}</span>
      </div>
      <div class="msg-text">${markdownToHtml(text)}</div>
      ${tagHtml}
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';
  div.id = id;
  div.innerHTML = `
    <div class="msg-avatar ai-avatar">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
    </div>
    <div class="msg-bubble">
      <div class="msg-text" style="padding:10px 16px">
        <div class="typing-indicator">
          <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return id;
}

function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function sendQuickPrompt(text) {
  document.getElementById('chatInput').value = text;
  sendChatMessage();
}

function clearChat() {
  const messages = document.getElementById('chatMessages');
  // Keep only the first message
  while (messages.children.length > 1) {
    messages.removeChild(messages.lastChild);
  }
}

function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// ── Utility ───────────────────────────────────────────────────────────────────
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function markdownToHtml(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^#{1,3}\s+(.+)$/gm, '<strong style="font-size:13px;color:var(--text-primary)">$1</strong>')
    .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\|(.+)\|/g, (match) => {
      if (match.includes('---')) return '';
      const cells = match.split('|').filter(c => c.trim());
      return `<div style="display:flex;gap:4px;margin:2px 0">${cells.map(c => `<span style="flex:1;background:rgba(255,255,255,0.03);padding:3px 6px;border-radius:3px;font-size:11px;border:1px solid var(--border)">${c.trim()}</span>`).join('')}</div>`;
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/^(.+)$/, '<p>$1</p>');
}

function closePhasePopup() {
  document.getElementById('phasePopup').style.display = 'none';
}

// Handle window resize for V Model diagram
window.addEventListener('resize', () => {
  if (state.currentView === 'vmodel') {
    setTimeout(renderVModelDiagram, 100);
  }
});
