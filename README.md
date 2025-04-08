# 📝 Full Stack Blog Application

A full-stack blog platform where users can register, log in, and create/edit/delete blogs. Built with **React (frontend)** and **Django (backend)**, using **MySQL** as the database. Categories like "Mountains", "Beaches", etc., are predefined.

---

## 📚 Features

- 🔐 User Authentication with JWT
- ✍️ Create, Edit, Delete blogs (Authenticated users only)
- 🌍 View all blogs (Public)
- 📂 Predefined blog categories
- 📜 Pagination and blog details view
- 📦 REST API built with Django REST Framework
- ☁️ Deployed using Clever Cloud (backend) and Netlify (frontend)

---

## 🧱 Tech Stack

| Layer      | Tech                                      |
|------------|-------------------------------------------|
| Frontend   | React JS, Axios, Tailwind CSS, React Router |
| Backend    | Django, Django REST Framework, JWT        |
| Database   | MySQL                                |
| Deployment | Netlify (frontend), Clever Cloud (backend) |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
https://github.com/AmanJ10/Omnify-Assignment.git

## ⚙️ Backend Setup (Django)
cd server
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

🛠 Migrations
python manage.py makemigrations
python manage.py migrate

▶️ Run Server
python manage.py runserver

Backend will be live at: http://127.0.0.1:8000


## 🌐 Frontend Setup (React)
cd client
npm install

🔗 Connect to Backend
const BASE_URL = 'http://localhost:8000/api'; // for local dev

▶️ Start React App
npm start

Frontend will be live at: http://localhost:3000



## ☁️ Deployment
🚀 Backend (Clever Cloud)
Push Django app to GitHub
Attach MySQL addon

Add environment variables:
DATABASE_URL
SECRET_KEY
DEBUG=False

🌐 Frontend (Netlify)
Push React app to GitHub
Connect Netlify with GitHub repo
Set build command: npm run build
Set publish directory: build/
Add environment variable:
REACT_APP_API_URL → your backend URL
