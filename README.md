# ShieldHire AI 🛡️

Anonymized Recruitment Portal — Powered by Gemini AI & Midnight Zero-Knowledge Privacy Architecture.

## 💡 The Core Problem

Modern technical recruitment suffers from two major flaws:

1. **Unconscious Bias:** Names, genders, dates, and geographic locations on resumes frequently introduce human bias early in the hiring process.
2. **Data Vulnerability:** Companies want verified proof of talent, but storing raw, unencrypted candidate credentials on public databases introduces massive data-leak liabilities.

## 🚀 Solution

**ShieldHire AI** completely decouples a candidate's real identity from their raw engineering merit.

- **The Objective AI Engine (Gemini API):** Ingests raw resume text, strips out all Personally Identifiable Information (PII) to eliminate bias, and calculates a standardized merit score based strictly on technical experience.
- **The ZK Cryptographic Anchor (Midnight Network):** The merit score is fed into a custom Zero-Knowledge smart contract (`shield_hire.compact`). It compiles a cryptographic proof that the candidate passes the hiring threshold _without revealing the exact score or leaking resume metadata onto the public ledger._

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React.js, Vite, Custom Inline Dark-Engine UI
- **Backend:** Node.js, Express.js
- **AI Core:** Google Gemini Pro API (Advanced Context Processing & Data Redaction)
- **Privacy Layer:** Midnight Protocol, Compact Smart Contract Compiler (`compactc.bin`), 1AM Extension Wallet

---

## 🏗️ Smart Contract Compilation

The cryptographic proof core was written in the **Compact** smart contract language and compiled via WSL using target-specific Linux architectures:

```bash
# Setting the local runtime binary path
export PATH="/root/.compact/versions/0.30.0/x86_64-unknown-linux-musl:$PATH"

# Compiling the ZK circuit structures
compactc.bin shield_hire.compact .
```
