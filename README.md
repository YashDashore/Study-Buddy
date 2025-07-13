# 🧠 StudyBuddy - Track. Plan. Achieve. With your StudyBuddy

Study-Buddy is a full-stack web application designed to help students manage personal academic tasks, collaborate in group projects, track study progress, and stay productive with peer support.

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

```bash
# Backend
cd server
npm install
npm run dev

# Frontend
cd client
npm install
npm run dev

```

---

## 🙋‍♂️ Author

Built by **[Yash Dashore](mailto:yash.dashore1@gmail.com)**  
📞 +91-8871343163  
🌐 [LinkedIn](https://www.linkedin.com/in/yash-dashore-271264265/)
