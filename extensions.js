/* =========================================================
   AutoVModel — extensions.js
   Extensions: Health Radar Chart, Defect Tracker,
   Phase Gate Review System, and Export Report Engine
   ========================================================= */

'use strict';

// ── State for Extensions ──────────────────────────────────────────────────
const extState = {
  defects: [],
  gateChecks: {},
  selectedExportFmt: 'html',
};

// Default Gate Exit Criteria Checklists for each Phase
const GATE_CRITERIA = [
  {
    phaseId: 0,
    title: 'PH-01 Requirements Definition Gate',
    items: [
      { id: 'g0-1', label: 'System Requirements Specification (SRS) baselined', desc: 'All requirements have unique IDs, clear SHALL statements, and quantitative acceptance criteria.', mandatory: true },
      { id: 'g0-2', label: 'HARA completed per ISO 26262 Part 3', desc: 'All hazards evaluated for S/E/C, ASIL levels assigned, Safety Goals formulated.', mandatory: true },
      { id: 'g0-3', label: 'Functional Safety Concept established', desc: 'Safety requirements allocated to system architecture concepts.', mandatory: true },
      { id: 'g0-4', label: 'Initial Traceability Matrix established', desc: '100% of stakeholder requirements mapped to system requirements.', mandatory: false },
      { id: 'g0-5', label: 'Customer / CCB approval obtained', desc: 'Formal sign-off on requirements baseline from product owner.', mandatory: false }
    ]
  },
  {
    phaseId: 1,
    title: 'PH-02 System Design Gate',
    items: [
      { id: 'g1-1', label: 'System Architecture Description approved', desc: 'E/E architecture, subsystem breakdown, and physical interface bounds documented.', mandatory: true },
      { id: 'g1-2', label: 'Technical Safety Concept (TSC) finalized', desc: 'Safety mechanisms defined for fault detection, fault tolerance, and safe states.', mandatory: true },
      { id: 'g1-3', label: 'System-level FMEA / FTA completed', desc: 'Single-point and latent fault metrics reviewed against ISO 26262-4 targets.', mandatory: true },
      { id: 'g1-4', label: 'Network matrix / ARXML communication baselined', desc: 'CAN/LIN/Ethernet frame timings and signal definitions frozen.', mandatory: false },
      { id: 'g1-5', label: 'Design Verification Plan (DVP) approved', desc: 'System test strategy aligned with system requirements.', mandatory: false }
    ]
  },
  {
    phaseId: 2,
    title: 'PH-03 Component Design Gate',
    items: [
      { id: 'g2-1', label: 'AUTOSAR / Software Architecture baselined', desc: 'SWC ports, interfaces, and runnable configurations finalized.', mandatory: true },
      { id: 'g2-2', label: 'Hardware Design & MCAL Specification approved', desc: 'Schematics, pin mapping, and microcontroller configuration frozen.', mandatory: true },
      { id: 'g2-3', label: 'Unit Test Plan & Coverage targets defined', desc: 'MC/DC coverage targets set (100% for ASIL D, >=90% ASIL B/C).', mandatory: true },
      { id: 'g2-4', label: 'Component-level FMEA / FMEDA completed', desc: 'Diagnostic coverage metrics verified for safety-critical components.', mandatory: false }
    ]
  },
  {
    phaseId: 3,
    title: 'PH-04 Unit Implementation Gate',
    items: [
      { id: 'g3-1', label: 'Source code written per coding guidelines', desc: 'MISRA C:2012 / CERT C compliance verified.', mandatory: true },
      { id: 'g3-2', label: 'Zero mandatory MISRA rule violations', desc: 'Static analysis report generated with all deviations formally justified.', mandatory: true },
      { id: 'g3-3', label: 'Code review completed with zero open critical findings', desc: 'Peer review checklists archived for compliance audit.', mandatory: true },
      { id: 'g3-4', label: 'Target compilation error-free', desc: 'Clean build with target toolchain and memory map verified.', mandatory: false }
    ]
  },
  {
    phaseId: 4,
    title: 'PH-05 Unit Testing Gate',
    items: [
      { id: 'g4-1', label: '100% unit tests executed and passed', desc: 'All test cases in unit test specification executed without failure.', mandatory: true },
      { id: 'g4-2', label: 'Structural Code Coverage targets achieved', desc: 'MC/DC coverage verified for ASIL C/D software units.', mandatory: true },
      { id: 'g4-3', label: 'Zero open Critical/Major unit defects', desc: 'All unit-level bugs logged, analyzed, and resolved.', mandatory: true },
      { id: 'g4-4', label: 'Unit Test Traceability matrix verified', desc: '100% unit specs linked to detailed design units.', mandatory: false }
    ]
  },
  {
    phaseId: 5,
    title: 'PH-06 Integration Testing Gate',
    items: [
      { id: 'g5-1', label: 'HW-SW Integration tests passed on target ECU', desc: 'BSW, RTE, and Application SWCs integrated and verified on real HW.', mandatory: true },
      { id: 'g5-2', label: 'HiL (Hardware-in-the-Loop) test suite passed', desc: 'Bus communication, diagnostic stack (UDS), and actuator outputs validated.', mandatory: true },
      { id: 'g5-3', label: 'Fault injection & Safety mechanism testing passed', desc: 'Safety mechanisms verify transition to safe state under simulated faults.', mandatory: true },
      { id: 'g5-4', label: 'Network timing & load analysis acceptable', desc: 'No bus off errors, CAN message latency within design budget.', mandatory: false }
    ]
  },
  {
    phaseId: 6,
    title: 'PH-07 System Testing Gate',
    items: [
      { id: 'g6-1', label: 'Full System Test Suite executed and passed', desc: 'End-to-end vehicle functions verified against System Requirements.', mandatory: true },
      { id: 'g6-2', label: 'Environmental & EMC pre-compliance passed', desc: 'Thermal, vibration, and electrical disturbance tests passed.', mandatory: true },
      { id: 'g6-3', label: 'Regression Test Suite 100% pass rate', desc: 'No regressions detected across baseline feature set.', mandatory: true },
      { id: 'g6-4', label: 'System Traceability 100% verified', desc: 'Every system requirement linked to passed system test result.', mandatory: false }
    ]
  },
  {
    phaseId: 7,
    title: 'PH-08 Acceptance Testing Gate',
    items: [
      { id: 'g7-1', label: 'OEM Acceptance Test Protocol signed off', desc: 'Customer acceptance testing completed with formal sign-off.', mandatory: true },
      { id: 'g7-2', label: 'Functional Safety Assessment (FSA) completed', desc: 'Independent safety assessor confirms ISO 26262 compliance.', mandatory: true },
      { id: 'g7-3', label: 'Safety Case closed and archived', desc: 'Complete evidence package ready for safety audit.', mandatory: true },
      { id: 'g7-4', label: 'Homologation / Type Approval documentation ready', desc: 'Regulatory compliance reports prepared for authority submission.', mandatory: false },
      { id: 'g7-5', label: 'PPAP / Production Release approved', desc: 'Start of Production (SOP) readiness gate passed.', mandatory: false }
    ]
  }
];

// ── Initial Setup & Overrides ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSampleDefects();
  updateDefectUI();
  updateHeaderNavBtns();
  setTimeout(() => {
    renderRadarChart();
  }, 300);
});

// Patch global app functions if present
const origUpdateDashboard = window.updateDashboard;
window.updateDashboard = function() {
  if (origUpdateDashboard) origUpdateDashboard();
  updateHeaderNavBtns();
  updateDefectUI();
  renderRadarChart();
  updateGateKPI();
};

const origSwitchView = window.switchView;
window.switchView = function(view) {
  if (origSwitchView) origSwitchView(view);
  if (view === 'defects') {
    updateDefectUI();
  }
  if (view === 'dashboard') {
    renderRadarChart();
  }
};

function updateHeaderNavBtns() {
  const gateBtn = document.getElementById('gateBtn');
  const exportBtn = document.getElementById('exportBtn');
  const gateQuickBtn = document.getElementById('gateQuickBtn');

  if (state && state.project) {
    if (gateBtn) gateBtn.style.display = 'flex';
    if (exportBtn) exportBtn.style.display = 'flex';
    if (gateQuickBtn) gateQuickBtn.style.display = 'inline-block';
  } else {
    if (gateBtn) gateBtn.style.display = 'none';
    if (exportBtn) exportBtn.style.display = 'none';
    if (gateQuickBtn) gateQuickBtn.style.display = 'none';
  }
}

// ── Sample Defects Generator ──────────────────────────────────────────────
function initSampleDefects() {
  extState.defects = [
    {
      id: 'DEF-001',
      title: 'Pedestrian detection latency exceeds 150ms under low light',
      phase: 6,
      severity: 'critical',
      category: 'safety',
      status: 'open',
      desc: 'In system test TC-ADAS-002, response time measured 185ms during night scenario simulation.',
      reqId: 'REQ-ADA-002',
      assignee: 'Safety Team / Perception Lead',
      createdAt: new Date(Date.now() - 5 * 86400000).toISOString()
    },
    {
      id: 'DEF-002',
      title: 'MISRA C Rule 10.3 violation in E-Stop controller module',
      phase: 3,
      severity: 'major',
      category: 'implementation',
      status: 'inprog',
      desc: 'Implicit type conversion from float to uint16 without explicit cast in ebs_controller.c line 142.',
      reqId: 'REQ-ADA-003',
      assignee: 'Embedded SW Eng',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
    },
    {
      id: 'DEF-003',
      title: 'Missing requirement link for CAN message 0x310 timing',
      phase: 1,
      severity: 'minor',
      category: 'traceability',
      status: 'closed',
      desc: 'Frame timing requirement was omitted in initial ARXML matrix generation.',
      reqId: 'REQ-ADA-001',
      assignee: 'Systems Architect',
      createdAt: new Date(Date.now() - 8 * 86400000).toISOString()
    }
  ];
}

// ── RADAR CHART RENDERER ──────────────────────────────────────────────────
function renderRadarChart() {
  const canvas = document.getElementById('radarChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2 - 10;
  const radius = 80;

  ctx.clearRect(0, 0, W, H);

  const cp = state.project ? state.project.phaseStart : 0;
  const numPhases = 8;
  const angles = [];
  for (let i = 0; i < numPhases; i++) {
    angles.push((i * 2 * Math.PI / numPhases) - Math.PI / 2);
  }

  // Draw background web ( concentric octagons )
  const levels = [0.25, 0.5, 0.75, 1.0];
  ctx.lineWidth = 1;
  levels.forEach(lvl => {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(99,120,255,0.12)';
    for (let i = 0; i < numPhases; i++) {
      const r = radius * lvl;
      const x = cx + r * Math.cos(angles[i]);
      const y = cy + r * Math.sin(angles[i]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  });

  // Draw radial axes
  ctx.strokeStyle = 'rgba(99,120,255,0.15)';
  angles.forEach((angle, i) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.stroke();

    // Axis Labels
    const labelR = radius + 18;
    const lx = cx + labelR * Math.cos(angle);
    const ly = cy + labelR * Math.sin(angle);
    ctx.fillStyle = i <= cp ? (i === cp ? '#5b7fff' : '#34d399') : '#4e5a7a';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`PH-${String(i+1).padStart(2,'0')}`, lx, ly);
  });

  // Calculate Health Values (0.1 to 1.0)
  const values = PHASES.map((p, idx) => {
    if (!state.project) return 0.15;
    if (idx < cp) return 1.0;
    if (idx === cp) {
      const totalTasks = p.tasks.length;
      const doneTasks = p.tasks.filter((_, ti) => state.taskStatus[`${cp}-${ti}`]).length;
      return totalTasks > 0 ? 0.35 + (doneTasks / totalTasks) * 0.55 : 0.35;
    }
    return 0.15;
  });

  // Draw Data Polygon
  ctx.beginPath();
  values.forEach((v, i) => {
    const r = radius * v;
    const x = cx + r * Math.cos(angles[i]);
    const y = cy + r * Math.sin(angles[i]);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  // Fill gradient
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
  grad.addColorStop(0, 'rgba(91,127,255,0.4)');
  grad.addColorStop(1, 'rgba(52,211,153,0.2)');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#5b7fff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw Data Points
  values.forEach((v, i) => {
    const r = radius * v;
    const x = cx + r * Math.cos(angles[i]);
    const y = cy + r * Math.sin(angles[i]);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = i < cp ? '#34d399' : (i === cp ? '#5b7fff' : '#4e5a7a');
    ctx.fill();
    ctx.strokeStyle = '#050810';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });

  // Render Legend
  const legend = document.getElementById('radarLegend');
  if (legend) {
    legend.innerHTML = `
      <div class="rl-item"><div class="rl-dot" style="background:#34d399"></div> Complete</div>
      <div class="rl-item"><div class="rl-dot" style="background:#5b7fff"></div> Active Phase</div>
      <div class="rl-item"><div class="rl-dot" style="background:#4e5a7a"></div> Pending</div>
    `;
  }
}

// ── DEFECT TRACKER LOGIC ──────────────────────────────────────────────────
function openDefectForm() {
  const panel = document.getElementById('defectFormPanel');
  if (panel) {
    panel.style.display = 'block';
    if (state.project) {
      document.getElementById('defPhase').value = state.project.phaseStart;
    }
  }
}

function closeDefectForm() {
  const panel = document.getElementById('defectFormPanel');
  if (panel) panel.style.display = 'none';
}

function submitDefect() {
  const title = document.getElementById('defTitle').value.trim();
  if (!title) {
    alert('Please enter a defect title.');
    return;
  }

  const newDefect = {
    id: `DEF-${String(extState.defects.length + 1).padStart(3, '0')}`,
    title: title,
    phase: parseInt(document.getElementById('defPhase').value),
    severity: document.getElementById('defSeverity').value,
    category: document.getElementById('defCategory').value,
    status: 'open',
    desc: document.getElementById('defDesc').value.trim(),
    reqId: document.getElementById('defReqId').value.trim() || 'N/A',
    assignee: document.getElementById('defAssignee').value.trim() || 'Unassigned',
    createdAt: new Date().toISOString()
  };

  extState.defects.unshift(newDefect);
  closeDefectForm();
  document.getElementById('defTitle').value = '';
  document.getElementById('defDesc').value = '';

  updateDefectUI();
}

function filterDefects() {
  updateDefectUI();
}

function updateDefectUI() {
  const phaseFilter = document.getElementById('defectPhaseFilter')?.value || 'all';
  const sevFilter = document.getElementById('defectSeverityFilter')?.value || 'all';

  let filtered = extState.defects;
  if (phaseFilter !== 'all') {
    filtered = filtered.filter(d => d.phase === parseInt(phaseFilter));
  }
  if (sevFilter !== 'all') {
    filtered = filtered.filter(d => d.severity === sevFilter);
  }

  // Calculate Metrics
  const critical = extState.defects.filter(d => d.severity === 'critical' && d.status !== 'closed').length;
  const major = extState.defects.filter(d => d.severity === 'major' && d.status !== 'closed').length;
  const minor = extState.defects.filter(d => d.severity === 'minor' && d.status !== 'closed').length;
  const openCount = extState.defects.filter(d => d.status === 'open').length;
  const inprogCount = extState.defects.filter(d => d.status === 'inprog').length;
  const closedCount = extState.defects.filter(d => d.status === 'closed').length;

  // Set DOM text
  if (document.getElementById('ds-critical')) document.getElementById('ds-critical').textContent = critical;
  if (document.getElementById('ds-major')) document.getElementById('ds-major').textContent = major;
  if (document.getElementById('ds-minor')) document.getElementById('ds-minor').textContent = minor;
  if (document.getElementById('ds-open')) document.getElementById('ds-open').textContent = openCount;
  if (document.getElementById('ds-inprog')) document.getElementById('ds-inprog').textContent = inprogCount;
  if (document.getElementById('ds-closed')) document.getElementById('ds-closed').textContent = closedCount;

  // Nav badge & KPI
  const navBadge = document.getElementById('defectNavBadge');
  const openTotal = openCount + inprogCount;
  if (navBadge) {
    if (openTotal > 0) {
      navBadge.style.display = 'inline-flex';
      navBadge.textContent = openTotal;
    } else {
      navBadge.style.display = 'none';
    }
  }

  if (document.getElementById('kpi-defect-val')) document.getElementById('kpi-defect-val').textContent = openTotal;
  if (document.getElementById('kpi-defect-sub')) document.getElementById('kpi-defect-sub').textContent = `${critical} Critical · ${major} Major`;

  // Render Table
  const table = document.getElementById('defectTable');
  const empty = document.getElementById('defectEmpty');
  const tbody = document.getElementById('defectTbody');

  if (!tbody) return;

  if (filtered.length === 0) {
    if (table) table.style.display = 'none';
    if (empty) empty.style.display = 'flex';
  } else {
    if (table) table.style.display = 'table';
    if (empty) empty.style.display = 'none';

    tbody.innerHTML = filtered.map(d => `
      <tr>
        <td><span class="def-id">${d.id}</span></td>
        <td><div class="def-title">${escapeHtml(d.title)}</div></td>
        <td><span class="def-phase">${PHASES[d.phase].code}</span></td>
        <td><span class="def-sev ${d.severity}">${d.severity}</span></td>
        <td><span style="font-size:11px;color:var(--text-muted)">${d.category}</span></td>
        <td>
          <span class="def-status ${d.status}" onclick="cycleDefectStatus('${d.id}')">
            ${d.status === 'open' ? '○ Open' : (d.status === 'inprog' ? '◐ In Prog' : '✓ Closed')}
          </span>
        </td>
        <td><span style="font-size:11px;color:var(--text-secondary)">${escapeHtml(d.assignee)}</span></td>
        <td>
          <div class="def-actions">
            <button class="def-action-btn" onclick="cycleDefectStatus('${d.id}')">Status</button>
            <button class="def-action-btn danger" onclick="deleteDefect('${d.id}')">Del</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderDefectDonut(openCount, inprogCount, closedCount);
}

function cycleDefectStatus(id) {
  const def = extState.defects.find(d => d.id === id);
  if (!def) return;
  if (def.status === 'open') def.status = 'inprog';
  else if (def.status === 'inprog') def.status = 'closed';
  else def.status = 'open';

  updateDefectUI();
  updateDashboard();
}

function deleteDefect(id) {
  extState.defects = extState.defects.filter(d => d.id !== id);
  updateDefectUI();
  updateDashboard();
}

function renderDefectDonut(open, inprog, closed) {
  const canvas = document.getElementById('defectDonut');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2, r = 32;

  ctx.clearRect(0, 0, W, H);
  const total = open + inprog + closed;
  if (total === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 10;
    ctx.stroke();
    return;
  }

  const slices = [
    { count: open, color: '#5b7fff' },
    { count: inprog, color: '#a78bfa' },
    { count: closed, color: '#34d399' }
  ];

  let startAngle = -Math.PI / 2;
  slices.forEach(s => {
    if (s.count === 0) return;
    const sliceAngle = (s.count / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, startAngle + sliceAngle);
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 10;
    ctx.stroke();
    startAngle += sliceAngle;
  });
}

// ── PHASE GATE REVIEW MODAL ───────────────────────────────────────────────
function openGateModal() {
  const modal = document.getElementById('gateModal');
  if (!modal) return;
  modal.classList.add('open');

  const cp = state.project ? state.project.phaseStart : 0;
  const phase = PHASES[cp];

  document.getElementById('gateModalSubtitle').textContent = `Review Gate Checklist for ${phase.code}: ${phase.name}`;

  renderGateChecklist(cp);
}

function closeGateModal() {
  const modal = document.getElementById('gateModal');
  if (modal) modal.classList.remove('open');
}

function renderGateChecklist(phaseIdx) {
  const container = document.getElementById('gateModalBody');
  const criteriaData = GATE_CRITERIA[phaseIdx] || GATE_CRITERIA[0];

  let html = `
    <div class="gate-score-bar">
      <div class="gate-score-label">Gate Readiness</div>
      <div class="gate-score-track">
        <div class="gate-score-fill" id="gateScoreFill" style="width:0%"></div>
      </div>
      <div class="gate-score-pct" id="gateScorePct">0%</div>
    </div>
    <div class="gate-section">
      <div class="gate-section-title">Exit Verification Items</div>
  `;

  criteriaData.items.forEach(item => {
    const isChecked = extState.gateChecks[item.id] || false;
    html += `
      <div class="gate-check-item ${isChecked ? 'checked' : ''}" onclick="toggleGateCheck('${item.id}', ${phaseIdx})">
        <div class="gate-checkbox"></div>
        <div class="gate-check-text">
          <div class="gate-check-label">${item.label}</div>
          <div class="gate-check-desc">${item.desc}</div>
        </div>
        ${item.mandatory ? '<span class="gate-mandatory-badge">Mandatory</span>' : ''}
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
  calculateGateScore(phaseIdx);
}

function toggleGateCheck(id, phaseIdx) {
  extState.gateChecks[id] = !extState.gateChecks[id];
  renderGateChecklist(phaseIdx);
}

function calculateGateScore(phaseIdx) {
  const criteriaData = GATE_CRITERIA[phaseIdx] || GATE_CRITERIA[0];
  const items = criteriaData.items;
  const total = items.length;
  const checked = items.filter(i => extState.gateChecks[i.id]).length;
  const mandatoryUnchecked = items.filter(i => i.mandatory && !extState.gateChecks[i.id]).length;

  const pct = Math.round((checked / total) * 100);

  const fill = document.getElementById('gateScoreFill');
  const pctEl = document.getElementById('gateScorePct');
  const result = document.getElementById('gateResult');
  const advBtn = document.getElementById('gateAdvanceBtn');

  if (fill) fill.style.width = `${pct}%`;
  if (pctEl) pctEl.textContent = `${pct}%`;

  if (result) {
    if (mandatoryUnchecked === 0 && pct === 100) {
      result.className = 'gate-result pass';
      result.innerHTML = '✓ GATE PASSED — All criteria & mandatory items verified';
      if (advBtn && phaseIdx < 7) advBtn.style.display = 'inline-block';
    } else if (mandatoryUnchecked === 0 && pct >= 60) {
      result.className = 'gate-result partial';
      result.innerHTML = '⚡ CONDITIONAL PASS — Mandatory items met, non-critical items pending';
      if (advBtn && phaseIdx < 7) advBtn.style.display = 'inline-block';
    } else {
      result.className = 'gate-result fail';
      result.innerHTML = `✖ GATE BLOCKED — ${mandatoryUnchecked} mandatory requirement(s) pending verification`;
      if (advBtn) advBtn.style.display = 'none';
    }
  }

  updateGateKPI();
}

function updateGateKPI() {
  if (!state.project) return;
  const cp = state.project.phaseStart;
  const criteriaData = GATE_CRITERIA[cp] || GATE_CRITERIA[0];
  const items = criteriaData.items;
  const checked = items.filter(i => extState.gateChecks[i.id]).length;
  const mandatoryUnchecked = items.filter(i => i.mandatory && !extState.gateChecks[i.id]).length;
  const pct = Math.round((checked / items.length) * 100);

  const gateVal = document.getElementById('kpi-gate-val');
  const gateSub = document.getElementById('kpi-gate-sub');

  if (gateVal) {
    if (mandatoryUnchecked === 0 && pct === 100) {
      gateVal.textContent = 'PASS';
      gateVal.style.color = 'var(--accent-3)';
      if (gateSub) gateSub.textContent = 'Ready to advance';
    } else if (mandatoryUnchecked === 0 && pct >= 60) {
      gateVal.textContent = 'CONDITIONAL';
      gateVal.style.color = 'var(--accent-4)';
      if (gateSub) gateSub.textContent = `${pct}% verified`;
    } else {
      gateVal.textContent = 'BLOCKED';
      gateVal.style.color = 'var(--accent-5)';
      if (gateSub) gateSub.textContent = `${mandatoryUnchecked} mandatory pending`;
    }
  }
}

function advancePhaseFromGate() {
  if (!state.project) return;
  const cp = state.project.phaseStart;
  if (cp < 7) {
    setCurrentPhase(cp + 1);
    closeGateModal();
    alert(`🎉 Successfully advanced project to Phase ${cp + 2}: ${PHASES[cp + 1].name}!`);
  }
}

// ── EXPORT ENGINE ─────────────────────────────────────────────────────────
function openExportModal() {
  const modal = document.getElementById('exportModal');
  if (modal) modal.classList.add('open');
}

function closeExportModal() {
  const modal = document.getElementById('exportModal');
  if (modal) modal.classList.remove('open');
}

function selectExportFmt(el) {
  document.querySelectorAll('.export-opt').forEach(opt => {
    opt.classList.remove('selected');
    opt.querySelector('.export-opt-check').style.opacity = '0';
  });
  el.classList.add('selected');
  el.querySelector('.export-opt-check').style.opacity = '1';
  extState.selectedExportFmt = el.dataset.fmt;
}

function runExport() {
  const fmt = extState.selectedExportFmt;
  const projName = state.project ? state.project.name.replace(/[^a-z0-9]/gi, '_') : 'VModel_Project';

  if (fmt === 'html') {
    exportHTMLReport(projName);
  } else if (fmt === 'csv') {
    exportTraceabilityCSV(projName);
  } else if (fmt === 'defects') {
    exportDefectsCSV(projName);
  } else if (fmt === 'json') {
    exportProjectJSON(projName);
  }

  closeExportModal();
}

function downloadFile(content, filename, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

function exportHTMLReport(projName) {
  const p = state.project || { name: 'Automotive System', system: 'ADAS', asil: 'ASIL-D', phaseStart: 0 };
  const cp = p.phaseStart;
  const currentPhase = PHASES[cp];

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>V Model Report — ${p.name}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; background: #0a0e1a; color: #f0f4ff; line-height: 1.6; }
    h1 { color: #5b7fff; border-bottom: 2px solid rgba(91,127,255,0.3); padding-bottom: 10px; }
    .meta { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; background: #0d1120; padding: 20px; border-radius: 10px; border: 1px solid rgba(99,120,255,0.2); margin-bottom: 30px; }
    .meta-item { display: flex; flex-direction: column; }
    .label { font-size: 11px; color: #9ba8cc; text-transform: uppercase; }
    .val { font-size: 16px; font-weight: bold; color: #f0f4ff; margin-top: 4px; }
    .section { background: #0d1120; border-radius: 10px; padding: 20px; border: 1px solid rgba(99,120,255,0.2); margin-bottom: 25px; }
    .section h2 { font-size: 18px; color: #a78bfa; margin-top: 0; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid rgba(99,120,255,0.1); font-size: 13px; }
    th { background: rgba(255,255,255,0.03); color: #9ba8cc; }
    .badge { padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .critical { background: rgba(244,63,94,0.2); color: #f43f5e; }
    .major { background: rgba(251,146,60,0.2); color: #fb923c; }
    .linked { background: rgba(52,211,153,0.2); color: #34d399; }
  </style>
</head>
<body>
  <h1>Automotive V Model Execution Report</h1>
  <div class="meta">
    <div class="meta-item"><span class="label">Project Name</span><span class="val">${p.name}</span></div>
    <div class="meta-item"><span class="label">System Domain</span><span class="val">${p.system ? p.system.toUpperCase() : 'N/A'}</span></div>
    <div class="meta-item"><span class="label">ASIL Rating</span><span class="val">${p.asil}</span></div>
    <div class="meta-item"><span class="label">Current Phase</span><span class="val">${currentPhase.code} — ${currentPhase.name}</span></div>
  </div>

  <div class="section">
    <h2>V Model Stage Completion Status</h2>
    <table>
      <thead><tr><th>Code</th><th>Phase Name</th><th>Arm</th><th>Status</th><th>Standard Mapping</th></tr></thead>
      <tbody>
        ${PHASES.map((ph, idx) => `
          <tr>
            <td><strong>${ph.code}</strong></td>
            <td>${ph.name}</td>
            <td>${ph.side === 'left' ? 'Development (Left Arm)' : 'Validation (Right Arm)'}</td>
            <td><span class="badge ${idx <= cp ? 'linked' : ''}">${idx < cp ? 'COMPLETE' : (idx === cp ? 'ACTIVE' : 'PENDING')}</span></td>
            <td>${ph.iso}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="section">
    <h2>Active Defect Log (${extState.defects.length} Total)</h2>
    <table>
      <thead><tr><th>ID</th><th>Title</th><th>Phase</th><th>Severity</th><th>Status</th><th>Assignee</th></tr></thead>
      <tbody>
        ${extState.defects.map(d => `
          <tr>
            <td>${d.id}</td>
            <td>${d.title}</td>
            <td>PH-${String(d.phase+1).padStart(2,'0')}</td>
            <td><span class="badge ${d.severity}">${d.severity.toUpperCase()}</span></td>
            <td>${d.status.toUpperCase()}</td>
            <td>${d.assignee}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div style="text-align:center;font-size:11px;color:#4e5a7a;margin-top:40px">
    Generated by AutoVModel Platform · Designed by Bhadradri Technologies Inc. · ISO 26262 / ASPICE Compliant Documentation
  </div>
</body>
</html>`;

  downloadFile(html, `${projName}_VModel_Report.html`, 'text/html');
}

function exportTraceabilityCSV(projName) {
  const system = state.project ? state.project.system : 'adas';
  const items = generateTraceItems(system);

  let csv = 'Requirement ID,Requirement Description,System Design ID,Design Description,Implementation ID,Code Unit,Test Case ID,Test Description,Status\n';

  items.forEach(i => {
    csv += `"${i.reqId}","${i.reqText.replace(/"/g, '""')}","${i.designId}","${i.designText.replace(/"/g, '""')}","${i.implId}","${i.implText.replace(/"/g, '""')}","${i.testId}","${i.testText.replace(/"/g, '""')}","${i.status}"\n`;
  });

  downloadFile(csv, `${projName}_Traceability_Matrix.csv`, 'text/csv');
}

function exportDefectsCSV(projName) {
  let csv = 'Defect ID,Title,Phase,Severity,Category,Status,Linked Requirement,Assignee,Created At\n';

  extState.defects.forEach(d => {
    csv += `"${d.id}","${d.title.replace(/"/g, '""')}","PH-${String(d.phase+1).padStart(2,'0')}","${d.severity}","${d.category}","${d.status}","${d.reqId}","${d.assignee}","${d.createdAt}"\n`;
  });

  downloadFile(csv, `${projName}_Defect_Log.csv`, 'text/csv');
}

function exportProjectJSON(projName) {
  const snapshot = {
    project: state.project,
    taskStatus: state.taskStatus,
    defects: extState.defects,
    gateChecks: extState.gateChecks,
    exportedAt: new Date().toISOString()
  };

  downloadFile(JSON.stringify(snapshot, null, 2), `${projName}_Snapshot.json`, 'application/json');
}
