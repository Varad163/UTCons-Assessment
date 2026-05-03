# 🤖 AI Learning Assistant



# 🤖 AI Learning Assistant

> **Generate structured, grade-appropriate educational content powered by AI — instantly.**

🔗 **Live Demo:** https://ut-cons-assessment.vercel.app/

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangChain-Groq-green?logo=chainlink)](https://langchain.com/)
[![License](https://img.shields.io/badge/License-Educational-orange)](#license)

--------

## 🌟 Overview

**AI Learning Assistant** is a full-stack web application that transforms any topic into a complete, grade-appropriate learning module. Simply enter a topic and grade level — the AI handles the rest.

Each generated module includes:

| Component | Description |
|-----------|-------------|
| 📝 **Summary** | A simplified, beginner-friendly explanation |
| 🔑 **Key Points** | 3–5 core takeaways |
| 🧪 **Interactive Quiz** | 3 multiple-choice questions with instant feedback |

---

## ✨ Features

### 🧠 Core
- Generate learning content from **any topic**
- Adapts explanations to the selected **grade level**
- Returns a fully structured AI response (summary, key points, quiz)

### ⚡ Advanced
- **Toggle** between Normal and Simplified explanations
- **Interactive quiz** with answer selection, correct/incorrect feedback, and score tracking
- **Regenerate** content with one click
- **Loading states** and user-friendly error messages
- **Recent searches** — stores your last 3 queries locally

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js (App Router), React, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **AI / LLM** | Groq API + LangChain |
| **Language** | TypeScript |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts       # Backend API route
│   └── page.tsx               # Main UI page
│
├── components/
│   ├── InputForm.tsx           # Topic & grade input
│   ├── Summary.tsx             # Summary display + toggle
│   ├── KeyPoints.tsx           # Key points list
│   └── Quiz.tsx                # Interactive quiz component
│
├── lib/
│   ├── langchain.ts            # LangChain + Groq integration
│   ├── prompt.ts               # LLM prompt templates
│   ├── paraphrase.ts           # Summary paraphrasing logic
│   └── validator.ts            # AI response validation
│
└── types/
    └── index.ts                # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com/)

### 1 — Clone the Repository

```bash
git clone https://github.com/your-username/ai-learning-assistant.git
cd ai-learning-assistant
```

### 2 — Install Dependencies

```bash
npm install
```

### 3 — Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GROQ_API_KEY=your_api_key_here
```

### 4 — Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔄 How It Works

```
User Input (topic + grade)
        │
        ▼
  Frontend (Next.js)
        │  POST /api/generate
        ▼
  Backend API Route
   ├── 1. Build prompt          ← lib/prompt.ts
   ├── 2. Call LLM via LangChain ← lib/langchain.ts
   ├── 3. Extract & parse JSON
   ├── 4. Validate structure    ← lib/validator.ts
   └── 5. Paraphrase summary   ← lib/paraphrase.ts
        │
        ▼
  Structured Response (JSON)
        │
        ▼
  UI renders:
   ├── Summary (with toggle)
   ├── Key Points
   └── Interactive Quiz
```

---

## 🧪 Data Validation Layer

The validation layer guards against malformed AI responses before they reach the UI.

| Check | Rule |
|-------|------|
| JSON structure | Must match expected schema |
| Key points | Must contain 3–5 items |
| Quiz questions | Must contain exactly 3 questions |
| Answer options | Each question must have 4 options (A/B/C/D) |
| Fallback | Retries parsing before surfacing an error |

---

## ⚠️ Error Handling

- **Malformed JSON** — Caught and retried automatically
- **LLM failures** — Surfaces a clear, actionable error message
- **Invalid structure** — Validation rejects and falls back gracefully
- **Network errors** — Displayed in the UI with retry guidance

---

## 📌 Assumptions & Limitations

- The LLM returns reasonably well-structured JSON
- Quiz answers are in `A / B / C / D` format
- Users provide a valid topic and grade level
- No persistent backend storage (recent searches use `localStorage`)

---

## 🔮 Future Improvements

- [ ] Dark mode support
- [ ] Smoother animations and transitions
- [ ] Additional quiz types (true/false, fill-in-the-blank)
- [ ] Persistent backend storage for saved sessions
- [ ] User accounts and learning history
- [ ] Export content as PDF or flashcards

---

## 👨‍💻 Author

**Varadraj Gholap**
Built for educational purposes.

---

## 📜 License

This project is intended for educational use only.