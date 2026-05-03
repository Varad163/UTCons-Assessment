# 🤖 AI Learning Assistant

> **Generate structured, grade-appropriate educational content powered by AI — instantly.**

🔗 **Live Demo:** https://ut-cons-assessment.vercel.app/

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![LangChain](https://img.shields.io/badge/LangChain-Groq-green?logo=chainlink)](https://langchain.com/)
[![License](https://img.shields.io/badge/License-Educational-orange)](#license)

---

## 🌟 Overview

**AI Learning Assistant** is a full-stack web application that transforms any topic into a complete, grade-appropriate learning module. Simply enter a topic and grade level — the AI handles the rest.

Each generated module includes:

| Component               | Description                                       |
| ----------------------- | ------------------------------------------------- |
| 📝 **Summary**          | A simplified, beginner-friendly explanation       |
| 🔑 **Key Points**       | 3–5 core takeaways                                |
| 🧪 **Interactive Quiz** | 3 multiple-choice questions with instant feedback |

---

## ✨ Features

### 🧠 Core

* Generate learning content from **any topic**
* Adapts explanations to the selected **grade level**
* Returns a fully structured AI response (summary, key points, quiz)

### ⚡ Advanced

* **Toggle** between Normal and Simplified explanations
* **Interactive quiz** with answer selection, correct/incorrect feedback, and score tracking
* **Regenerate** content with one click
* **Loading states** and user-friendly error messages
* **Recent searches** — stores your last 3 queries locally

---

## 🛠️ Tech Stack

| Layer        | Technology                                |
| ------------ | ----------------------------------------- |
| **Frontend** | Next.js (App Router), React, Tailwind CSS |
| **Backend**  | Next.js API Routes                        |
| **AI / LLM** | Groq API + LangChain                      |
| **Language** | TypeScript                                |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts
│   └── page.tsx
│
├── components/
│   ├── InputForm.tsx
│   ├── Summary.tsx
│   ├── KeyPoints.tsx
│   └── Quiz.tsx
│
├── lib/
│   ├── langchain.ts
│   ├── prompt.ts
│   ├── paraphrase.ts
│   └── validator.ts
│
└── types/
    └── index.ts
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* Groq API Key

### 1 — Clone Repository

```bash
git clone https://github.com/your-username/ai-learning-assistant.git
cd ai-learning-assistant
```

### 2 — Install Dependencies

```bash
npm install
```

### 3 — Setup Environment Variables

Create `.env.local`:

```env
GROQ_API_KEY=your_api_key_here
```

### 4 — Run Project

```bash
npm run dev
```

---

## 🧠 Approach

The application follows a full-stack architecture using Next.js.

* The frontend collects user input (topic and grade)
* A POST request is sent to the backend API
* The backend:

  * Generates a structured prompt
  * Calls the LLM via LangChain and Groq
  * Extracts and parses JSON from the response
  * Validates the structure of the response
  * Paraphrases the summary into simpler language
* The processed data is returned to the frontend
* The UI displays:

  * Summary (with toggle)
  * Key Points
  * Interactive Quiz with feedback and score

---

## 🔄 How It Works

```
User Input → API → LLM → JSON → Validation → Paraphrase → UI
```

---

## 🧪 Data Validation Layer

* Ensures correct JSON structure
* Validates key points (3–5 items)
* Ensures quiz has 3 questions and 4 options each
* Retries parsing if malformed

---

## ⚠️ Error Handling

* Handles malformed AI responses
* Retry logic for robustness
* Displays user-friendly error messages

---

## 📌 Assumptions

* AI returns reasonably structured JSON
* Quiz answers follow A/B/C/D format
* User inputs valid topic and grade
* No persistent backend storage (uses localStorage)

---

## 🔮 Future Improvements

* Dark mode
* Better animations
* Additional quiz formats
* Backend storage
* User accounts

---

## 👨‍💻 Author

**Varadraj Gholap**

---

## 📜 License

Educational use only.
