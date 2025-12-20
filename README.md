# 🧠 StudyBuddy - Track. Plan. Achieve. With your StudyBuddy

Study-Buddy is a full-stack web application designed to help students manage personal academic tasks, collaborate in group projects, track study progress, and stay productive with peer support.
Live demo link - https://study-buddy-3tys.onrender.com

---

## 🚀 Features

- 🔐 **JWT Authentication**
  - Register, Login, Logout
  - Protected Routes with Access + Refresh Tokens
- 👤 **User Profile Management**
  - Edit profile (username, organization, profile photo)
  - Upload profile images via **Cloudinary**
  - Delete account with password confirmation
- ✅ **Todo Task Management**
  - Create, update, delete personal tasks
  - Track assignments with subject & deadline
- 👥 **Group Task Management**

  - Invitation system (accept/reject)
  - Role-based team leader management
    - Update group task details (title, subject, deadline)
    - Add/remove group members.
    - Appoint a new group leader

- 🗂️ **Study Progress Tracker**
  - Track topic progress with progress bars
- 📨 **Contact Us Page**

  - Reach out to developers via in-app form

- ℹ️ **About Page**
  - Learn about the purpose and stack behind Study-Buddy
- 🌐 **MongoDB Atlas** for database
- ☁️ **Cloudinary** for image uploads
- ✨ **Integrate ChatGPT** (upcoming)
- 📊 **Attendance Tracking** (upcoming)
- 💬 **Group Chat** (upcoming)

---

## 🧰 Tech Stack

### 🔹 Frontend

- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Lucide React Icons
- Framer Motion, GSAP (animations)

### 🔸 Backend

- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication (Access & Refresh Tokens)
- Multer for file upload
- Cloudinary for image hosting
- CORS + Cookie-based sessions
- Centralized Error Handling (ApiResponse, ApiError, AsyncHandler)

---

## 🛠️ Setup Instructions

### 📦 Prerequisites

- Node.js (v18+)
- MongoDB Atlas Account
- Cloudinary Account

### 🔧 Install & Run Locally

```powershell
# Backend (PowerShell)
cd Backend
npm install
cp .env.example .env         # copy example env file and fill values (use PowerShell: copy-item .env.example .env)
npm run dev

# Frontend (PowerShell)
cd Frontend
npm install
npm run dev

```

Notes:
- The backend default port is **8000** (can be changed via `PORT` in `Backend/.env`).
- The frontend runs on Vite's default port (usually **5173**). To connect the frontend to the backend set your API base URL in the frontend config or environment variables.
- Place your real secrets in `Backend/.env` (never commit `.env`). See `Backend/.env.example` for required variables.

---

## 🙋‍♂️ Author

Built by **[Yash Dashore](mailto:yash.dashore1@gmail.com)**  
📞 +91-8871343163  
🌐 [LinkedIn](https://www.linkedin.com/in/yash-dashore-271264265/)
