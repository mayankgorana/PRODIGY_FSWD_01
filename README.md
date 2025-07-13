# 🔐 Secure Authentication System – React & Node.js

This project is a full-stack **user authentication system** built using **React**, **Node.js**, **Express**, and **MongoDB** as part of **Task 1 for Prodigy Infotech Internship**. It implements secure login, registration, session management, and protected routes.

## 🚀 Tech Stack

- **Frontend:** React, Axios, React Router DOM
- **Backend:** Node.js, Express.js, MongoDB, bcrypt, express-session, connect-mongo

## ✅ Features

- 🔐 **User Registration** with hashed passwords using bcrypt  
- 🔑 **User Login** with session-based authentication  
- 🛡️ **Protected Routes** with React Router  
- 🔄 **Session Handling** with `express-session` and `connect-mongo`  
- 🌐 **CORS** configured for cross-origin requests  
- ✨ Clean and user-friendly UI for Login & Register  
- 🔁 Seamless navigation between **Login ↔️ Register ↔️ Dashboard**

## 📂 Project Structure
secure-authentication/
├── client/ # React frontend
│ ├── components/
│ │ ├── Login.js
│ │ └── Register.js
│ ├── styles/
│ │ └── Login.css
│ │ └── Register.css
│ ├── App.js
│ └── index.js
├── server/ # Node.js backend
│ └── server.js
├── .env
├── package.json
└── README.md


## ⚙️ Installation Steps

1. **Clone the repository**
git clone https://github.com/your-username/secure-authentication.git
cd secure-authentication

2. **Install Backend Dependencies**
cd server
npm install

3. **Set up Environment Variables**
Create a .env file in the server folder:
SESSION_SECRET=your_secret_key

4.**Run Backend**
npm start

5. **Install Frontend Dependencies**
cd ../client
npm install

6.**Start React App**
npm start

**Make sure your backend runs on http://localhost:3000 and frontend on http://localhost:3001.**
