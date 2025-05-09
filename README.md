# TechTrendz – MERN Stack Tech News Portal with AI Integration

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Project Overview

**TechTrendz** is a full-stack web application that allows users to explore, interact with, and stay updated on the latest tech and startup news. Users can like, comment, and engage with articles, while admins can securely create, manage, and delete posts through a dedicated dashboard.

This platform also integrates **AI-powered features** such as **fake news detection** and **automated article summarization**, enhancing content credibility and user experience.

**Live Demo:**  
🌐 Frontend: [https://techtrendz.onrender.com](https://techtrendz.onrender.com)  
🔗 Backend API: [https://news-portal-yv7z.onrender.com](https://news-portal-yv7z.onrender.com)  
📂 GitHub Repo: [https://github.com/GunjanRathore0011/News-Portal](https://github.com/GunjanRathore0011/News-Portal)

---

## Features

### 👤 User Features
- Browse tech and startup news articles
- Like and comment on articles
- Google Login (via Firebase)
- Authenticated user dashboard
- Auto-summarized article view (Gemini AI)

### 🔐 Admin Features
- Role-based authentication (Admin/User)
- Secure admin dashboard for:
  - Creating, editing, and deleting posts
  - Managing users and comments

### 🤖 AI Integrations
- **Fake News Detection**
  - [BERT model](https://huggingface.co/mrm8488/bert-tiny-finetuned-fake-news-detection) via Hugging Face API
- **News Summarization**
  - Gemini 2.0 Flash model via Google Generative AI API

### 📄 Additional Pages
- About Page
- All News Listing Page

---

## Technologies Used

### 💻 Frontend
- React.js
- Tailwind CSS
- ShadCN UI
- Firebase (Google OAuth)

### 🌐 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcrypt for authentication
- Cloudinary for image hosting

### 🧠 AI & APIs
- Gemini 2.0 Flash (Google Generative AI)
- Hugging Face BERT Fake News Detector

---

## Installation

### ⚙️ Prerequisites
- Node.js
- npm or yarn
- MongoDB instance
- Firebase project for Google OAuth

---

### 🔧 Backend Setup

```bash
git clone https://github.com/GunjanRathore0011/News-Portal.git
cd News-Portal/backend
npm install
```

Create a `.env` file with the following structure:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
GEMINI_API_KEY=your_gemini_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

Start the backend server:

```bash
npm start
```

---

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file:

```env
REACT_APP_API_BASE_URL=https://news-portal-yv7z.onrender.com/api
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
```

Start the frontend:

```bash
npm start
```

---

## Usage

1. **Visit** [TechTrendz](https://techtrendz.onrender.com)
2. Register/login via email or Google
3. Browse latest tech/startup news
4. Like or comment on articles
5. If you're an admin (manually added in DB), access the dashboard to manage content

---

## Contributing

Contributions are welcome!

### Steps:
1. Fork the repository
2. Create a feature branch  
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit and push changes  
   ```bash
   git commit -m "Add Your Feature"
   git push origin feature/YourFeature
   ```
4. Open a pull request

---

## Contact

**Gunjan Rathore**  
🔗 [LinkedIn](https://www.linkedin.com/in/gunjanrathore11/)  
💻 [GitHub](https://github.com/GunjanRathore0011)
