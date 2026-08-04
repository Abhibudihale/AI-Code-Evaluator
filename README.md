# 🤖 AI Code Evaluator

An AI-powered web application that evaluates handwritten or typed source code from images using OCR and Large Language Models (LLMs). The system extracts code from an uploaded image, analyzes its logic, and provides an intelligent evaluation score with feedback.

---

## 🚀 Project Overview

Writing code on paper is still common during coding interviews, exams, and classroom assessments. Evaluating handwritten code manually is time-consuming and inconsistent.

**AI Code Evaluator** automates this process by:

* Extracting code from an uploaded image using AI OCR
* Analyzing the program logic using an LLM
* Providing a score based on logical correctness
* Returning structured JSON results for easy integration

---

## ✨ Features

* 📷 Upload handwritten or printed code images
* 🔍 AI-powered OCR for accurate code extraction
* 🧠 Logic evaluation using Google Gemini/OpenAI
* 📊 Code scoring (0–10)
* ✅ Detects whether program logic is correct
* ⚡ REST API built with Spring Boot
* 🎨 Modern React frontend
* 🔄 JSON-based communication between frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Axios
* HTML5
* CSS3
* JavaScript

### Backend

* Java 21
* Spring Boot
* Spring Web
* Lombok
* Maven

### AI Services

* Google Gemini API
* OCR API (Google AI Vision / OCR Service)

---

## 🏗️ Project Architecture

```
React Frontend
        │
        ▼
Spring Boot REST API
        │
        ├──────────────► OCR Service
        │                     │
        │                     ▼
        │             Extract Source Code
        │
        ▼
Gemini Evaluation Service
        │
        ▼
JSON Evaluation Result
        │
        ▼
React UI
```

---

## 📂 Project Structure

```
ai-code-evaluator/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── dto/
│   ├── config/
│   ├── util/
│   ├── exception/
│   └── resources/
│
└── README.md
```

---

## ⚙️ Workflow

1. User uploads an image containing source code.
2. React frontend sends the image to the Spring Boot backend.
3. Backend calls the OCR service to extract the code.
4. Extracted code is sent to the Gemini API.
5. Gemini evaluates only the program logic.
6. Backend returns a JSON response.
7. Frontend displays the evaluation result.

---

## 📥 Sample API Request

```
POST /api/evaluate
```

Form Data

```
image : code.png
```

---

## 📤 Sample Response

```json
{
  "logicCorrect": true,
  "score": 8
}
```

---

## ▶️ Getting Started

### Clone Repository

```bash
git clone https://github.com/your-username/ai-code-evaluator.git
```

### Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔑 Environment Variables

Backend

```
GEMINI_API_KEY=YOUR_API_KEY
OCR_API_KEY=YOUR_API_KEY
```

---

## 📸 Screenshots

Add screenshots here after completing the UI.

```
Home Page

Upload Screen

Evaluation Result

OCR Output
```

---

## 🎯 Future Enhancements

* Support multiple programming languages
* Complexity analysis
* Syntax highlighting
* Explain logical mistakes
* Download evaluation report as PDF
* Authentication and user history
* Batch image evaluation
* Teacher dashboard
* Student performance analytics

---

## 👨‍💻 Author

**Abhishek**

Software Engineer

Java | Spring Boot | React | AI Integration

---

## 📄 License

This project is licensed under the MIT License.
