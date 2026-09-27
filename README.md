# 🏥 AI-Powered Voice Triage & Clinical Intelligence Platform

> **Voice-first AI healthcare triage for rural and underserved communities.**

## 🚀 Live Prototype

🔗 **[Try the Prototype](https://ai.studio/apps/66dbfaaa-33f2-46eb-810b-1b1d07576e55)**

---

## 💡 Overview

The **AI-Powered Voice Triage & Clinical Intelligence Platform** helps patients access preliminary healthcare triage through a simple phone call — without requiring a smartphone.

Patients can speak in their preferred Indian language. AI converts their voice into structured clinical information, detects potential red flags, assigns a priority level, and provides doctors with a concise clinical summary and AI-assisted recommendations.

The platform follows a **doctor-in-the-loop** approach: AI assists the doctor, while the doctor makes the final clinical decision.

---

## 🎯 Problem

Rural and underserved communities face challenges such as:

* Limited access to doctors
* Smartphone and connectivity barriers
* Regional-language barriers
* Long waiting times
* Manual clinical documentation
* Difficulty identifying high-priority cases

The proposed system addresses these challenges through a voice-first and multilingual approach.

---

## 🧠 How It Works

```text
Patient Call
     ↓
Voice / IVR
     ↓
Speech-to-Text
     ↓
Clinical Information Extraction
     ↓
Red-Flag Detection
     ↓
AI Risk Scoring
     ↓
Emergency / Medium / Normal
     ↓
Doctor Priority Queue
     ↓
Doctor Review & Approval
     ↓
SMS / WhatsApp / IVR Follow-up
```

---

## ⭐ Key Features

* 📞 **IVR Voice Triage** — works through a phone call.
* 🌐 **10+ Indian Languages** — multilingual voice interaction.
* 🎙️ **Speech-to-Text** — IndicConformer with Whisper fallback.
* 🧠 **Clinical AI** — extracts symptoms, history and red flags.
* 🚨 **AI Triage** — XGBoost + rule-based red-flag detection.
* 👨‍⚕️ **Doctor Dashboard** — priority queue and clinical summary.
* 🤖 **AI Shadow Diagnosis** — clinical considerations for doctor review.
* 📚 **RAG Recommendations** — guideline-assisted recommendations.
* 📲 **Follow-up** — SMS, WhatsApp and IVR callback.
* 📊 **Analytics** — patient, triage and AI performance dashboards.

The technical approach and four-stage care journey are described in the submitted hackathon deck.

---

## 🏗️ AI Architecture

### Speech Recognition

**IndicConformer → Whisper fallback → Transcript**

### Clinical Extraction

**Qwen 7B/14B → LoRA → Structured Clinical JSON**

### Triage

**Clinical Data → Red-Flag Rules + XGBoost → Risk Score**

### Recommendations

**Clinical Data → Vector Retrieval → Qwen/RAG → Doctor Review**

---

## 📊 Evaluation Results

The submitted prototype deck reports:

| Area                              | Result                                    |
| --------------------------------- | ----------------------------------------- |
| Speech Recognition                | 34% WER improvement on medical vocabulary |
| Languages Evaluated               | 8 Indian languages                        |
| Recordings                        | 800                                       |
| Clinical Extraction F1            | >0.85                                     |
| Hallucinated Fields               | 41% fewer                                 |
| Triage Emergency Recall           | >0.92                                     |
| Triage Weighted F1                | >0.85                                     |
| PHC Records                       | 18,400                                    |
| Inappropriate Recommendation Rate | 0.8%                                      |

These are the evaluation results reported in the submitted hackathon deck.

---

## 🔐 Safety & Doctor-in-the-Loop

The platform is designed so that:

```text
AI Analysis
     ↓
AI Recommendation
     ↓
Doctor Review
     ↓
Approve / Edit / Reject
     ↓
Final Clinical Decision
```

AI output is **not treated as a confirmed diagnosis or treatment decision**.

The proposed safety architecture includes red-flag rules, model validation, RAG-grounded recommendations and doctor approval.

---

## 🛠️ Technology Stack

**AI/ML:** IndicConformer, Whisper, Qwen, LoRA, XGBoost, RAG

**Frontend:** React / Responsive Web UI

**Backend:** Python / Node.js APIs

**Database:** PostgreSQL, Redis / MongoDB

**Vector Store:** pgvector / Qdrant

**Infrastructure:** Docker, Kubernetes, AWS/GCP/Azure

---

## 🏆 Hackathon

**iQOO Hackathon 2026**

**Theme:** Rural Healthcare AI | Multilingual Voice Triage

**Category:** Healthcare / AI

---

## 🌍 Vision

> **“From Voice to Clinical Intelligence — making healthcare more accessible, multilingual, and doctor-centered.”**

The goal is to make the first step toward healthcare accessible through something almost everyone can use: **a phone call**.

---

## ⚠️ Disclaimer

This is a **hackathon prototype and research demonstration**. It is not a medical device and does not replace qualified healthcare professionals. Clinical decisions must always be made by healthcare professionals.

---

## 🔗 Links

**Live Prototype:**
https://ai.studio/apps/66dbfaaa-33f2-46eb-810b-1b1d07576e55

**Demo Video:**
https://drive.google.com/file/d/11b9XTdyLrSjBswxKNI2ytU9vkxQHVHiO/view?usp=drivesdk
