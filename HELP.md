# V-PATH.AGENT v4.2 — User Guide & Layman's Help Manual

Welcome to **V-PATH.AGENT v4.2**, the documentation standard and artifact tracing framework designed for AI-driven software development in safety-critical engineering (Medical Devices, Automotive ECUs, Aerospace Flight Computers).

---

## 1. What Problem Does V-PATH.AGENT Solve?

When you ask an AI Coding Agent (like Gemini, ChatGPT, or Claude) to *"write code for an insulin pump"* or *"write brake control code for a car"*, the AI does not know your exact safety rules, hardware limits, or regulatory standards. 

It **guesses**. 

And when an AI guesses in safety-critical software, it creates dangerous bugs, misses safety limits, and fails regulatory audits (FDA, ISO 26262, FAA).

**V-PATH.AGENT** solves this by generating structured **"Context Bundles"**. A Context Bundle packages together:
1. **System Requirements** (What the device must do and never do)
2. **Architectural Constraints** (Hardware limits, dual-CPU rules)
3. **Unit Design Specs** (Function signatures, input ranges)
4. **MISRA-C Coding Standards** (No unsafe raw pointers, clean memory usage)
5. **Verification Test Assertions** (What test must pass to prove the code works)

When you give an AI Agent a Context Bundle, **it never has to guess**. It writes 100% compliant, audit-ready code on the very first try.

---

## 2. Real-Life Layman Analogies

### Analogy #1: The High-Tech House (Understanding the V-Model)
Imagine building a 50-story skyscraper. You wouldn't just tell construction workers: *"Start putting bricks together!"*

- **Left side of the V (Decomposition / Planning)**:
  - **Top Level (SYS.1)**: Architect's overall blueprint (*"The building must withstand 100 mph winds"*).
  - **Middle Level (SYS.2 / SW.1)**: Electrical & Plumbing schematics (*"Use 220V copper wiring"*).
  - **Detailed Level (SW.2)**: Exact specs for door hinges & window locks (*"Use Grade-3 steel bolts"*).
- **Bottom Vertex (SW.4 - Vertex: Code)**: Manufacturing the actual bricks, bolts, and wires (Writing the source code).
- **Right side of the V (Verification / Testing)**:
  - **Unit Test (SW.5)**: Testing individual bolts in a lab.
  - **Integration Test (SW.6)**: Testing if electrical wiring connects safely to the generator.
  - **System Acceptance Test (SYS.5)**: Simulating a 100 mph wind storm to verify the building stands strong!

Every single item on the left (Requirement) has a corresponding test on the right (Verification). **That is the V-Model!**

---

### Analogy #2: Ordering Pizza (Why AI Agents Need Context Bundles)

Imagine ordering food from a professional chef:

#### ❌ Scenario A: Without Context Bundle (Vague Prompt)
You text the chef: *"Bake me a pizza."*
- **What happens**: The chef guesses! He adds peanut butter and pineapple, uses wheat flour that triggers your severe allergy, and bakes it at the wrong temperature. 
- **Result**: **Disaster & Danger!**

#### ✔ Scenario B: With V-PATH Context Bundle (Structured Spec)
You send the chef a V-PATH Context Bundle:
1. **Requirement (SYS.1)**: Must be 100% Gluten-Free & Peanut-Free (Safety Ceiling).
2. **Kitchen Rule (SW.1)**: Oven must be pre-heated to exactly 450°F.
3. **Recipe Spec (SW.2)**: 100g Mozzarella, 50ml Tomato Sauce, 12-minute bake time.
4. **Quality Test (SW.5)**: Crust must measure between 4mm and 6mm thickness before serving.
- **Result**: **The chef (AI Agent) bakes a 100% perfect, safe, delicious pizza every single time without guessing!**

---

## 3. Step-by-Step Guide: How to Use V-PATH.AGENT

### Step 1: Select or Create an Active Project
- At the top right of the application, click the **ACTIVE PROJECT** dropdown menu.
- Choose a pre-loaded engineering project:
  - **Smart Insulin Infusion Pump** (IEC 62304 Medical Class C)
  - **Autonomous Emergency Braking (AEB)** (ISO 26262 Automotive ASIL-D)
  - **Fly-by-Wire Flight Computer** (DO-178C Aerospace DAL-A)
  - **Cardiac Pacemaker Controller** (IEC 62304 / ISO 14971)
- Or click the **`+`** button to create your own custom engineering project!

### Step 2: Explore the Rigid V-Model Diagram
- Click the **`V-Model Diagram`** tab.
- Hover your mouse over any node (e.g. `SYS.1`, `SW.2`, `SW.4`, `SW.5`) to illuminate vertical parent/child links and horizontal verification bridges (`SYS.1 ↔ SYS.5`).
- Click any node card to open the **Artifact Inspector Drawer**, showing exact requirements, code lines, and test assertions.

### Step 3: Serve Context Bundles to Your AI Agent
- Click the black **`SERVE BUNDLE`** button in the header (or go to the **`Context Bundle Engine`** tab).
- Select your target format:
  - **JSON Schema** (Machine-readable)
  - **AI System Prompt (Markdown)** (Human & LLM friendly)
  - **YAML / ARXML** (Automotive standards)
- Click **`COPY CONTEXT BUNDLE TO CLIPBOARD`**.
- Paste this Context Bundle into your AI coding tool (**Antigravity**, **Gemini 3.7**, **Cursor**, **ChatGPT**, or **Claude**).

### Step 4: Verify 100% Traceability
- Click the **`Traceability Matrix`** tab.
- View the end-to-end trace mapping table: `System Req (SYS.1)` ➔ `SW Req (SW.1)` ➔ `Architecture (SW.2)` ➔ `Code File (SW.4)` ➔ `Unit Test (SW.5)`.
- Use the search bar to filter by requirement ID or status.

### Step 5: Test the AI Agent Sandbox Simulator
- Click the **`AI Agent Sandbox`** tab.
- Select a safety task (e.g., *"Task 1: Calculate Insulin Bolus Dosage"*).
- Click **`RUN SIMULATION BENCHMARK`**.
- Compare the side-by-side results:
  - **Left**: Raw AI output (Fails audit, missing safety ceilings).
  - **Right**: V-PATH Context-driven AI output (100% compliant, MISRA-C clean, safety ceiling enforced).

---

## 4. Frequently Asked Questions (FAQ)

#### Q: Can I use V-PATH.AGENT with any AI Model?
**Yes!** Context Bundles are model-agnostic. They work seamlessly with **Gemini 3.7 / 3.6**, **Claude 3.7**, **GPT-4o**, **Antigravity AI**, **Cursor**, **GitHub Copilot**, and local LLMs (Ollama / Llama 3).

#### Q: What does "Vertex: Code" mean?
In the V-Model, the "Vertex" is the bottom tip of the V. It represents the actual source code (C/C++/Rust) where planning transitions into testing. In V-PATH.AGENT, the Vertex is highlighted in crimson red (`#D93838`).

#### Q: What regulatory safety standards are supported out-of-the-box?
- **IEC 62304** (Medical Device Software - Class A, B, C)
- **ISO 26262** (Automotive Functional Safety - ASIL A to ASIL D)
- **DO-178C / ED-12C** (Airborne Systems & Equipment - DAL A to DAL E)
- **ISO 14971** (Medical Risk Management)
- **Automotive SPICE (A-SPICE)**

---

*V-PATH.AGENT v4.2 — Designed by Bhadradri Technologies Inc. for AI Agent Engineering Compliance.*
