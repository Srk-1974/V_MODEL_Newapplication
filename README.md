# AutoVModel — Automotive V Model Framework

> **Stage-by-stage visibility into automotive project execution, functional safety (ISO 26262), and validation.**
>
> Designed by **Bhadradri Technologies Inc.**

---

## 🚗 Overview

AutoVModel is an interactive web application designed to guide automotive systems engineers, software leads, and functional safety managers through the **V Model** development lifecycle.

It provides real-time tracking from requirements definition down to unit implementation and back up through unit testing, integration testing, system testing, and OEM acceptance testing.

---

## ✨ Features

- **8 V Model Phases**: Dedicated task lists, required artifacts, common pitfalls, and ISO 26262 / ASPICE standard mappings.
- **Interactive V Model Canvas**: Visual V-diagram with live phase status nodes and horizontal validation links.
- **Project Setup Wizard**: Configure system domain (*ADAS, EV, Powertrain, Safety, Chassis, Infotainment, Network, Body*), ASIL level (*QM, ASIL A–D*), team structure, and SOP dates.
- **Traceability Matrix**: Bidirectional mapping between *Requirements → System Design → Implementation → Test Cases*.
- **Phase Health Radar Chart**: Real-time 8-axis spider radar visualization of phase completeness.
- **Defect & Bug Tracker**: Log and track defects categorized by phase, severity (*Critical, Major, Minor*), and linked requirement.
- **Phase Gate Review Engine**: Customized exit criteria checklists with mandatory item enforcement, scoring, and stage advancement.
- **Export Report Engine**: Export interactive HTML Reports, CSV Traceability Matrices, CSV Defect Logs, or JSON Project Snapshots.
- **AI Advisor**: Automotive engineering co-pilot trained on ISO 26262, SOTIF (ISO 21448), AUTOSAR, ASPICE, UDS (ISO 14229), and FMEA/FMEDA methodology.

---

## 🚀 Getting Started

### Local Launch
Simply open `index.html` in any web browser:

```bash
# Windows PowerShell
Start-Process "index.html"
```

Or serve via local HTTP server:
```bash
npx serve .
```

### Streamlit Cloud Deployment (Public Link)
This repository is configured with `streamlit_app.py` for 1-click deployment on Streamlit Community Cloud ([share.streamlit.io](https://share.streamlit.io/)):

1. Go to [share.streamlit.io](https://share.streamlit.io/)
2. Click **"New app"**
3. Select Repository: `Srk-1974/v-model`
4. Main file path: `streamlit_app.py`
5. Click **"Deploy!"**

---

## 📄 License & Attribution

Designed and developed by **Bhadradri Technologies Inc.**
