# 🚀 AI Interview Preparation Platform (InterviewIQ.AI)

An AI-powered interview preparation platform that helps users practice real-world interview questions, improve communication skills, and receive instant AI-driven feedback with detailed performance analytics.

---

## 🌟 Features

* 🎯 AI-based mock interviews (Technical + HR)
* 🎤 Voice-enabled interview system (Speech Recognition + AI Voice)
* 📄 Resume upload & intelligent analysis
* 🧠 Dynamic question generation based on user profile
* 📊 Detailed performance analytics (Confidence, Communication, Accuracy)
* 📈 Question-wise feedback & scoring
* 🧾 Downloadable PDF interview report
* 💳 Credit-based system with Razorpay integration
* 🕘 Interview history tracking
* 🔐 Secure Authentication using Firebase

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Framer Motion
* Recharts
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)

### Authentication

* Firebase Authentication

### Other Integrations

* Browser Speech Recognition API
* Speech Synthesis API (AI Voice)
* Razorpay Payment Gateway
* PDF Generation (jsPDF)

---

## 📸 Screenshots

> Add screenshots of:

* Home Page
* Interview UI
* Report Dashboard
* Pricing Page

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-interview-platform.git
cd ai-interview-platform
```

---

### 2️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

### 3️⃣ Setup Backend

```bash
cd server
npm install
npm start
```

---

## 🔑 Environment Variables

### Frontend (.env)

```env
VITE_SERVER_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key

# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

## 💡 How It Works

1. User signs up / logs in via Firebase Authentication
2. Uploads resume (optional AI analysis)
3. Selects role, experience, interview type
4. AI asks questions (voice + text interaction)
5. User answers via mic or typing
6. AI evaluates responses in real-time
7. Final report is generated with performance analytics

---

## 📊 Project Highlights

* 🔥 Real-time AI interaction using browser APIs
* 🤖 Resume-based personalized interview generation
* 🎤 Voice + Text hybrid interaction system
* 📈 Advanced analytics dashboard
* 💳 Fully integrated payment system
* 🔐 Secure authentication using Firebase
* ⚡ Modern UI/UX with smooth animations

---

## 🚀 Future Improvements

* 🤖 GPT-based smarter feedback system
* 📹 Video-based AI interviewer
* 🌍 Multi-language support
* 📱 Mobile app version
* 🧑‍💼 Recruiter dashboard

---

## 👨‍💻 Author

**Rajan Kumar Singh**
📧 Email: [cpsrajan2002@gmail.com](mailto:your-email@example.com)
🔗 GitHub: https://github.com/your-username

---

## ❤️ Support

If you like this project, consider giving it a ⭐ on GitHub!

---

## 📄 License

This project is licensed under the MIT License.
