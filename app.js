/* =========================================================
   V-PATH.AGENT v4.2 — Engineering Compliance & Artifact Tracing
   app.js
   ========================================================= */

// ── GLOBAL APPLICATION STATE ──────────────────────────────
const APP_STATE = {
  activeTab: 'vmodel',
  selectedProject: 'insulin',
  selectedNode: 'SYS1',
  selectedModel: 'Gemini 3.7',
  highlightBranch: null
};

// ── PROJECT DATABASE & ARTIFACT TRACE MODELS ──────────────
const PROJECTS_DATA = {
  insulin: {
    name: "Smart Insulin Infusion Pump",
    standard: "IEC 62304 (CLASS C / CLASS B)",
    traceCount: "48/48",
    tracePercent: "100%",
    nodes: {
      SYS1: {
        id: "SYS.1",
        tier: "TIER 1 — SYSTEM",
        title: "System Requirements Specification",
        standardRef: "IEC 62304 5.1",
        meta: "12 REQS",
        bridge: "SYS.5",
        summary: "High-level medical safety requirements for basal/bolus delivery and continuous glucose monitoring.",
        reqs: [
          { id: "SYS-REQ-101", desc: "Basal rate shall be controllable between 0.05 U/h and 15.0 U/h in 0.025 U increments." },
          { id: "SYS-REQ-102", desc: "Maximum allowable bolus delivery ceiling shall not exceed 15.0 Units within 60 minutes." },
          { id: "SYS-REQ-103", desc: "Pump motor occlusion detection must trigger alarm within 5 seconds of pressure > 25 PSI." }
        ]
      },
      SYS2: {
        id: "SYS.2",
        tier: "TIER 2 — ARCHITECTURE",
        title: "System Architecture & Safety Concept",
        standardRef: "HARA / Risk Class C",
        meta: "4 ARCHES",
        bridge: "SYS.4",
        summary: "Dual Microcontroller Safety Architecture (Primary ECU + Independent Safety Supervisor).",
        arches: [
          { id: "SYS-ARCH-01", desc: "Dual Lockstep ARM Cortex-M4 CPUs with hardware memory protection (MPU)." },
          { id: "SYS-ARCH-02", desc: "Independent hardware watchdog timer tied to occlusion pressure sensor." }
        ]
      },
      SW1: {
        id: "SW.1",
        tier: "TIER 3 — SOFTWARE REQS",
        title: "Software Requirements Specification (SRS)",
        standardRef: "IEC 62304 5.2",
        meta: "18 SRS",
        bridge: "SW.6",
        summary: "Detailed software algorithmic constraints, fault detection, and UI safety lock.",
        srs: [
          { id: "SW-SRS-201", desc: "Dose calculation algorithm must validate sensor integrity before execution." },
          { id: "SW-SRS-202", desc: "Over-infusion safety cutoff must interrupt motor PWM signal asynchronously." }
        ]
      },
      SW2: {
        id: "SW.2",
        tier: "TIER 4 — UNIT SPEC",
        title: "Software Architectural & Detailed Unit Design",
        standardRef: "IEC 62304 5.3 & 5.4",
        meta: "14 MODULES",
        bridge: "SW.5",
        summary: "Module decomposition for `bolus_calculator.c`, `occlusion_monitor.c`, and `safety_supervisor.c`.",
        modules: [
          { id: "MOD-BOLUS-01", name: "Calculate_Bolus_Dose()", misra: "Rule 10.3 / Rule 17.7" },
          { id: "MOD-OCCL-02", name: "Monitor_Pressure_ADC()", misra: "Rule 8.4 / Rule 12.1" }
        ]
      },
      SW4: {
        id: "SW.4",
        tier: "VERTEX — CODE",
        title: "Software Code Implementation (C/C++)",
        standardRef: "MISRA-C:2012",
        meta: "3,420 LOC (100% TRACED)",
        summary: "Production MISRA-C source code files verified against unit design specs.",
        codeSnippet: `/* V-PATH CONTEXT BUNDLE TRACED CODE (IEC 62304 CLASS C) */
#include "insulin_safety.h"
#include "sensor_interface.h"

DoseResult_t Calculate_Bolus_Dose(const GlucoseReading_t* const reading) {
    if (reading == NULL || reading->sensor_status != SENSOR_OK) {
        return (DoseResult_t){ .dose_units = 0.0f, .status = DOSE_ERR_SENSOR_FAULT };
    }
    
    float raw_dose = (reading->glucose_mg_dl - TARGET_GLUCOSE_BASE) / INSULIN_SENSITIVITY_RATIO;
    
    /* Enforce SYS-REQ-102 Safety Ceiling */
    if (raw_dose > MAX_SAFE_CEILING_UNITS) {
        raw_dose = MAX_SAFE_CEILING_UNITS;
    }
    
    return (DoseResult_t){ .dose_units = raw_dose, .status = DOSE_SUCCESS };
}`
      },
      SW5: {
        id: "SW.5",
        tier: "VERIFICATION 1",
        title: "Software Unit Verification & Code Testing",
        standardRef: "IEC 62304 5.5",
        meta: "32/32 PASSED",
        bridge: "SW.2",
        summary: "Unit test suite with 100% MC/DC branch coverage via Ceedling/Unity framework.",
        tests: [
          { id: "UT-BOLUS-01", target: "MOD-BOLUS-01", result: "PASSED (100% Branch Coverage)" },
          { id: "UT-BOLUS-02", target: "SYS-REQ-102 Ceiling Test", result: "PASSED (15.0 U Limit Enforced)" }
        ]
      },
      SW6: {
        id: "SW.6",
        tier: "VERIFICATION 2",
        title: "Software Integration & Integration Testing",
        standardRef: "IEC 62304 5.6",
        meta: "14/14 PASSED",
        bridge: "SW.1",
        summary: "Software component interface verification under simulated hardware fault conditions.",
        tests: [
          { id: "IT-PUMP-01", target: "SW-SRS-202 Cutoff", result: "PASSED (PWM Interrupt triggered in <2ms)" }
        ]
      },
      SYS4: {
        id: "SYS.4",
        tier: "VERIFICATION 3",
        title: "System Verification & Hardware Integration",
        standardRef: "System HIL",
        meta: "8/8 PASSED",
        bridge: "SYS.2",
        summary: "Hardware-In-The-Loop (HIL) automated test bench verifying motor pressure cutoff.",
        tests: [
          { id: "SYS-HIL-01", target: "Dual Lockstep CPU", result: "PASSED (Fault injection handled)" }
        ]
      },
      SYS5: {
        id: "SYS.5",
        tier: "VERIFICATION 4",
        title: "System Acceptance & Clinical/Safety Validation",
        standardRef: "IEC 62304 5.7",
        meta: "6/6 PASSED",
        bridge: "SYS.1",
        summary: "Final clinical validation proving strict adherence to system requirements SYS.1.",
        tests: [
          { id: "SYS-VAL-01", target: "SYS-REQ-101 Basal Delivery", result: "PASSED (Clinical Accuracy ±0.5%)" }
        ]
      }
    }
  },
  aeb: {
    name: "Autonomous Emergency Braking (AEB ECU)",
    standard: "ISO 26262 (ASIL-D)",
    traceCount: "64/64",
    tracePercent: "100%",
    nodes: {
      SYS1: {
        id: "SYS.1", tier: "TIER 1 — SYSTEM", title: "Automotive Safety Goals (ASIL-D)", standardRef: "ISO 26262 Part 3", meta: "16 REQS", bridge: "SYS.5",
        summary: "Prevent unintended braking deceleration > 0.8g at high speeds (> 80 km/h).",
        reqs: [{ id: "SG-AEB-01", desc: "AEB system must trigger full hydraulic brake pressure within 120ms of TTC < 1.2s." }]
      },
      SYS2: { id: "SYS.2", tier: "TIER 2 — ARCHITECTURE", title: "Functional Safety Concept (FSC)", standardRef: "ASIL-D", meta: "6 ARCHES", bridge: "SYS.4", summary: "Radar + Camera fusion architecture." },
      SW1: { id: "SW.1", tier: "TIER 3 — SOFTWARE REQS", title: "Software Safety Requirements (SSR)", standardRef: "ISO 26262 Part 6", meta: "24 SSR", bridge: "SW.6", summary: "Object distance filter and TTC calculation." },
      SW2: { id: "SW.2", tier: "TIER 4 — UNIT SPEC", title: "SW Detailed Design & AUTOSAR Components", standardRef: "AUTOSAR Classic", meta: "18 MODULES", bridge: "SW.5", summary: "AUTOSAR Runnables for AEB_Control_SWC." },
      SW4: {
        id: "SW.4", tier: "VERTEX — CODE", title: "AUTOSAR SWC Implementation (C)", standardRef: "MISRA-C:2012", meta: "5,120 LOC",
        summary: "AUTOSAR Runnable code enforcing ASIL-D safety bounds.",
        codeSnippet: `/* ISO 26262 ASIL-D AEB SWC IMPLEMENTATION */
void Runnable_AEB_Evaluate(void) {
    Std_ReturnType status = RTE_E_OK;
    float32 ttc_sec = 0.0f;
    status = Rte_Read_rpTTC_TTC_Seconds(&ttc_sec);
    if ((status == RTE_E_OK) && (ttc_sec < 1.2f)) {
        Rte_Write_ppBrakeCmd_RequestBrake(TRUE);
    }
}`
      },
      SW5: { id: "SW.5", tier: "VERIFICATION 1", title: "SW Unit Verification & MC/DC Coverage", standardRef: "ISO 26262-6", meta: "45/45 PASSED", bridge: "SW.2", summary: "Unit tests with 100% MC/DC structural coverage." },
      SW6: { id: "SW.6", tier: "VERIFICATION 2", title: "SW Integration & AUTOSAR SIL Test", standardRef: "SIL Testing", meta: "18/18 PASSED", bridge: "SW.1", summary: "Software-in-the-loop validation." },
      SYS4: { id: "SYS.4", tier: "VERIFICATION 3", title: "System HIL Brake Bench Verification", standardRef: "dSPACE HIL", meta: "10/10 PASSED", bridge: "SYS.2", summary: "Real-time brake pressure actuator response bench test." },
      SYS5: { id: "SYS.5", tier: "VERIFICATION 4", title: "Vehicle Track Acceptance Validation", standardRef: "Euro NCAP", meta: "8/8 PASSED", bridge: "SYS.1", summary: "Track testing under Euro NCAP AEB Car-to-Car Rear Stationary scenarios." }
    }
  }
};

// ── INITIALIZATION ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderVModelDiagram();
  generateContextBundle();
  renderTraceabilityMatrix();
  setupSVGConnections();

  window.addEventListener('resize', setupSVGConnections);
});

// ── NAVIGATION & TAB SWITCHING ────────────────────────────
function switchTab(tabId) {
  APP_STATE.activeTab = tabId;

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  if (tabId === 'vmodel') {
    setTimeout(setupSVGConnections, 50);
  }
}

// ── PROJECT SWITCHER LOGIC ────────────────────────────────
function onProjectChange(projKey) {
  if (PROJECTS_DATA[projKey]) {
    APP_STATE.selectedProject = projKey;
    const proj = PROJECTS_DATA[projKey];

    // Update Header Badges
    document.getElementById('complianceBadge').querySelector('.pill-text').textContent = proj.standard;
    document.getElementById('traceBadge').querySelector('.pill-text').innerHTML = `TRACE <em>${proj.tracePercent}</em> <small>(${proj.traceCount})</small>`;

    // Refresh Active Views
    renderVModelDiagram();
    generateContextBundle();
    renderTraceabilityMatrix();
    showToast(`Loaded Active Project: ${proj.name}`);
  }
}

// ── SVG VERIFICATION BRIDGES DRAWING ──────────────────────
function setupSVGConnections() {
  const svg = document.getElementById('vmodelSvgConnections');
  const wrapper = document.getElementById('vmodelCanvasWrapper');
  if (!svg || !wrapper) return;

  const wRect = wrapper.getBoundingClientRect();
  svg.setAttribute('width', wRect.width);
  svg.setAttribute('height', wRect.height);
  svg.innerHTML = ''; // Clear existing SVG paths

  const bridges = [
    { left: 'SYS1', right: 'SYS5', color: '#111111' },
    { left: 'SYS2', right: 'SYS4', color: '#111111' },
    { left: 'SW1',  right: 'SW6',  color: '#111111' },
    { left: 'SW2',  right: 'SW5',  color: '#D93838' } // Highlight SW2-SW5 Bridge
  ];

  bridges.forEach(b => {
    const lNode = document.getElementById(`node-${b.left}`);
    const rNode = document.getElementById(`node-${b.right}`);
    if (lNode && rNode) {
      const lRect = lNode.getBoundingClientRect();
      const rRect = rNode.getBoundingClientRect();

      const x1 = lRect.right - wRect.left;
      const y1 = lRect.top + lRect.height / 2 - wRect.top;
      const x2 = rRect.left - wRect.left;
      const y2 = rRect.top + rRect.height / 2 - wRect.top;

      // Draw dashed horizontal bridge path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const cx1 = x1 + (x2 - x1) * 0.4;
      const cx2 = x1 + (x2 - x1) * 0.6;
      const d = `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;

      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', b.color);
      path.setAttribute('stroke-width', b.color === '#D93838' ? '2.5' : '1.5');
      path.setAttribute('stroke-dasharray', b.color === '#D93838' ? '4,4' : '6,6');
      path.setAttribute('opacity', '0.6');
      svg.appendChild(path);
    }
  });
}

// ── NODE SELECTION & DRAWER LOGIC ─────────────────────────
function onNodeClick(nodeKey) {
  APP_STATE.selectedNode = nodeKey;
  const proj = PROJECTS_DATA[APP_STATE.selectedProject] || PROJECTS_DATA.insulin;
  const node = proj.nodes[nodeKey] || PROJECTS_DATA.insulin.nodes[nodeKey];

  // Highlight selected node card
  document.querySelectorAll('.vmodel-node-card').forEach(card => {
    card.classList.toggle('active-node', card.dataset.node === nodeKey);
  });

  // Update Bottom Quick Bar
  document.getElementById('qbTag').textContent = `SELECTED NODE: ${node.id}`;
  document.getElementById('qbTitle').textContent = node.title;
  document.getElementById('qbTrace').textContent = `Trace Link: ${node.id} ↔ ${node.bridge || 'SW.4 (VERTEX)'} (100% Validated)`;
}

function openSelectedNodeModal() {
  const proj = PROJECTS_DATA[APP_STATE.selectedProject] || PROJECTS_DATA.insulin;
  const node = proj.nodes[APP_STATE.selectedNode] || PROJECTS_DATA.insulin.nodes.SYS1;

  document.getElementById('nodeModalTitle').textContent = `${node.id} — ${node.title}`;
  
  let html = `
    <div class="node-modal-content">
      <div class="meta-row" style="display:flex; gap:1rem; margin-bottom:1rem; font-family:var(--font-mono); font-size:0.8rem;">
        <span class="tag">STANDARD: ${node.standardRef}</span>
        <span class="tag">STATUS: ${node.meta}</span>
        <span class="tag">BRIDGE: ↔ ${node.bridge || 'SW.4'}</span>
      </div>
      <p style="margin-bottom:1rem; font-size:0.9rem;">${node.summary}</p>
  `;

  if (node.reqs) {
    html += `<h4>Requirements List:</h4><ul style="font-family:var(--font-mono); font-size:0.8rem; padding-left:1.2rem;">`;
    node.reqs.forEach(r => html += `<li><strong>${r.id}:</strong> ${r.desc}</li>`);
    html += `</ul>`;
  }

  if (node.codeSnippet) {
    html += `<h4>Traced Vertex Code:</h4><pre style="background:var(--bg-dark); color:#fff; padding:0.75rem; font-family:var(--font-mono); font-size:0.78rem;"><code>${escapeHtml(node.codeSnippet)}</code></pre>`;
  }

  html += `</div>`;
  document.getElementById('nodeModalBody').innerHTML = html;
  openModal('nodeModal');
}

// ── CONTEXT BUNDLE GENERATOR ENGINE ───────────────────────
function generateContextBundle() {
  const projKey = APP_STATE.selectedProject;
  const proj = PROJECTS_DATA[projKey] || PROJECTS_DATA.insulin;
  const scope = document.getElementById('bundleTargetNode')?.value || 'SW.4';
  const format = document.getElementById('bundleFormat')?.value || 'json';

  const bundleObj = {
    vpath_version: "4.2",
    project_id: projKey,
    project_name: proj.name,
    compliance_standard: proj.standard,
    timestamp: new Date().toISOString(),
    context_scope: scope,
    structured_artifacts: {
      system_requirement: proj.nodes.SYS1,
      architecture_spec: proj.nodes.SYS2,
      software_requirement: proj.nodes.SW1,
      unit_design: proj.nodes.SW2,
      vertex_code_target: proj.nodes.SW4,
      verification_tests: proj.nodes.SW5
    },
    ai_agent_instructions: [
      "Strictly enforce max dose ceiling (SYS-REQ-102).",
      "Do NOT alter signature Calculate_Bolus_Dose(const GlucoseReading_t*).",
      "Must satisfy MISRA-C 2012 rules 10.3 and 17.7."
    ]
  };

  let formattedOutput = '';
  let filename = `vpath_context_bundle_${projKey}_${scope.toLowerCase()}.${format}`;

  if (format === 'json') {
    formattedOutput = JSON.stringify(bundleObj, null, 2);
  } else if (format === 'yaml') {
    formattedOutput = `vpath_version: "4.2"\nproject: "${proj.name}"\nstandard: "${proj.standard}"\nscope: "${scope}"\nreqs:\n  - id: SYS-REQ-101\n    desc: "Basal rate rate 0.05 U/h to 15.0 U/h"\n  - id: SYS-REQ-102\n    desc: "Max bolus ceiling 15.0 Units"\ncode_target: "SW.4 Implementation"\nverification: "SW.5 Unit Tests (32 Passed)"`;
  } else if (format === 'markdown') {
    formattedOutput = `# CONTEXT BUNDLE FOR AI AGENT (V-PATH.AGENT V4.2)\n\n## PROJECT: ${proj.name}\n## COMPLIANCE: ${proj.standard}\n\n### SYSTEM REQUIREMENTS (SYS.1)\n- SYS-REQ-102: Maximum allowable bolus delivery ceiling shall not exceed 15.0 Units.\n\n### VERTEX CODE (SW.4)\n\`\`\`c\n${proj.nodes.SW4.codeSnippet}\n\`\`\`\n\n### VERIFICATION CONSTRAINTS\nMust pass Ceedling unit test suite SW.5 with 100% MC/DC branch coverage.`;
  } else {
    formattedOutput = `<ARXML xmlns="http://autosar.org/schema/r4.0">\n  <SHORT-NAME>${projKey.toUpperCase()}_VPATH_BUNDLE</SHORT-NAME>\n</ARXML>`;
  }

  const codeDisplay = document.getElementById('contextBundleCodeDisplay');
  if (codeDisplay) {
    codeDisplay.textContent = formattedOutput;
  }

  document.getElementById('bundleFileName').textContent = filename;
  document.getElementById('bundleTokenCount').textContent = `${Math.round(formattedOutput.length / 4)} tokens`;
}

function copyContextBundleToClipboard() {
  const content = document.getElementById('contextBundleCodeDisplay')?.textContent || '';
  navigator.clipboard.writeText(content).then(() => {
    showToast('Context Bundle copied to clipboard! Ready to paste to AI Agent.');
  }).catch(() => {
    showToast('Copied Context Bundle payload.');
  });
}

function downloadContextBundle() {
  const content = document.getElementById('contextBundleCodeDisplay')?.textContent || '';
  const filename = document.getElementById('bundleFileName')?.textContent || 'context_bundle.json';

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${filename}`);
}

function openServeBundleModal() {
  generateContextBundle();
  const content = document.getElementById('contextBundleCodeDisplay')?.textContent || '';
  document.getElementById('modalBundleContent').textContent = content;
  openModal('serveBundleModal');
}

function serveNodeBundle(nodeId) {
  APP_STATE.selectedNode = nodeId;
  openServeBundleModal();
}

function serveSelectedNodeBundle() {
  openServeBundleModal();
}

// ── TRACEABILITY MATRIX TABLE RENDERER ────────────────────
function renderTraceabilityMatrix() {
  const tbody = document.getElementById('traceTableBody');
  if (!tbody) return;

  const proj = PROJECTS_DATA[APP_STATE.selectedProject] || PROJECTS_DATA.insulin;

  const matrixRows = [
    { sys: "SYS-REQ-101", sw: "SW-SRS-201", arch: "SYS-ARCH-01", code: "bolus_calculator.c:L12", ut: "UT-BOLUS-01", it: "IT-PUMP-01", status: "PASSED" },
    { sys: "SYS-REQ-102", sw: "SW-SRS-202", arch: "SYS-ARCH-02", code: "bolus_calculator.c:L24", ut: "UT-BOLUS-02", it: "IT-PUMP-02", status: "PASSED" },
    { sys: "SYS-REQ-103", sw: "SW-SRS-203", arch: "SYS-ARCH-02", code: "occlusion_monitor.c:L45", ut: "UT-OCCL-01",  it: "IT-PUMP-03", status: "PASSED" }
  ];

  tbody.innerHTML = matrixRows.map(r => `
    <tr>
      <td><span class="tag-id">${r.sys}</span><br/><small>Basal/Bolus Control</small></td>
      <td><span class="tag-id">${r.sw}</span><br/><small>Dose Validation</small></td>
      <td><span class="tag-id">${r.arch}</span><br/><small>Dual Lockstep</small></td>
      <td><span class="tag-code">${r.code}</span></td>
      <td><span class="tag-id">${r.ut}</span></td>
      <td><span class="tag-id">${r.it}</span></td>
      <td><span class="badge-status-pass">✔ 100% PASSED</span></td>
      <td><button class="btn-sm-primary" onclick="serveNodeBundle('SW4')">Serve Bundle</button></td>
    </tr>
  `).join('');
}

function filterMatrixTable() {
  const query = document.getElementById('matrixSearch')?.value.toLowerCase() || '';
  const rows = document.querySelectorAll('#traceTableBody tr');
  rows.forEach(r => {
    const text = r.textContent.toLowerCase();
    r.style.display = text.includes(query) ? '' : 'none';
  });
}

// ── AI AGENT SANDBOX SIMULATOR ────────────────────────────
function runSandboxSimulation() {
  showToast('Running AI Benchmark Simulation...');
  setTimeout(() => {
    showToast('Simulation complete! Benchmark verified 100% V-PATH compliance vs Raw Prompt failure.');
  }, 600);
}

function onSandboxPromptChange() {
  const task = document.getElementById('sandboxPromptSelect').value;
  if (task === 'aeb_trigger') {
    document.getElementById('simRawPrompt').textContent = '"Write C code for emergency brake trigger based on radar distance."';
    document.getElementById('simCodeRaw').textContent = `void check_brake(float dist) {\n  if (dist < 10.0) {\n    brake_now(); // Hardcoded assumption\n  }\n}`;
    document.getElementById('simCodeVPath').textContent = `/* ISO 26262 ASIL-D SWC */\nvoid Runnable_AEB_Evaluate(void) {\n  if (ttc_seconds < SAFETY_TTC_LIMIT_1_2S) {\n    Rte_Write_ppBrakeCmd_RequestBrake(TRUE);\n  }\n}`;
  }
}

// ── INTERACTIVE FAQ ACCORDION TOGGLE ──────────────────────
function toggleFaq(el) {
  if (el && el.parentElement) {
    el.parentElement.classList.toggle('open');
  }
}

// ── UTILITIES & MODAL HELPERS ─────────────────────────────
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

function openNewProjectModal() {
  openModal('newProjectModal');
}

function createNewProject() {
  const name = document.getElementById('newProjName')?.value || 'Custom V-Model Project';
  const std = document.getElementById('newProjStandard')?.value || 'IEC 62304';

  const newKey = 'custom_' + Date.now();
  PROJECTS_DATA[newKey] = {
    name: name,
    standard: std,
    traceCount: "12/12",
    tracePercent: "100%",
    nodes: PROJECTS_DATA.insulin.nodes
  };

  const sel = document.getElementById('projectSelect');
  const opt = document.createElement('option');
  opt.value = newKey;
  opt.textContent = `${name} (${std})`;
  sel.appendChild(opt);
  sel.value = newKey;

  closeModal('newProjectModal');
  onProjectChange(newKey);
  showToast(`Created new project "${name}"!`);
}

function exportAuditReport() {
  showToast('Exporting V-PATH Artifact Trace Bundle (PDF/XML)...');
}

function copyApiCurl() {
  const curl = `curl -X GET "https://vpath.agent/api/v1/bundle?project=${APP_STATE.selectedProject}&scope=SW.4" -H "Authorization: Bearer vpath_sec_token_99"`;
  navigator.clipboard.writeText(curl);
  showToast('Copied REST API cURL command to clipboard!');
}

function highlightBranch(branchType) {
  APP_STATE.highlightBranch = branchType;
  showToast(`Highlighted ${branchType.toUpperCase()} topology branch.`);
}

function renderVModelDiagram() {
  // Re-sync V-Model state if needed
  onNodeClick('SYS1');
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
