# BankDash 💳📊

A modern, responsive, full-stack financial dashboard application designed for managing user profiles, credit cards, secure authentication, and financial operations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Django](https://img.shields.io/badge/Django-DRF-092E20?logo=django)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)

---

## ✨ Features

- **🔒 Secure Authentication & Email Verification:** Complete user lifecycle management with OTP verification powered by Brevo’s HTTPS API.
- **👤 Dynamic Profile Management:** Update personal information, address settings, and upload profile photos via multipart encoding support.
- **💳 Credit Card Management:** Display custom styled user credit cards with balance formatting, masked PANs, dynamically assigned bank themes, and card detail routes.
- **⚡ Responsive UI:** Clean desktop-to-mobile user interface built with modern React hooks and Tailwind CSS.
- **☁️ Cloud Ready:** Network-optimized backend integration designed specifically for seamless cloud hosting platforms (e.g., Render, Vercel).

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** [React.js](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)

### **Backend**
- **Framework:** [Django](https://www.djangoproject.com/) & [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Database:** PostgreSQL
- **Transactional Mail:** Brevo HTTP API (Port 443 HTTPS REST execution)
- **File & Media Handling:** DRF `MultiPartParser`

---

## 📁 Repository Structure

```text
.
├── client/                     # React Frontend Application
│   ├── src/
│   │   ├── assets/             # Card icons, chips, and logos
│   │   ├── components/         # Modular UI components (CreditCard, Navbar, etc.)
│   │   ├── context/            # Global context (UserContext, Auth)
│   │   ├── pages/              # Primary dashboard and management views
│   │   └── api/                # Axios instance configuration
│   └── package.json
│
└── server/                     # Django REST API Backend
    ├── accounts/               # Custom user model, auth & profile endpoints
    ├── cards/                  # Credit card management app & models
    ├── config/                 # Project settings, DRF configurations & URLs
    └── requirements.txt
```

---

## 🚀 Getting Started

### **Prerequisites**
- **Node.js** (v18+)
- **Python** (v3.10+)
- **PostgreSQL** installed and running locally

---

### **1. Backend Setup (Django REST Framework)**

Navigate to the backend directory:
```bash
cd server
```

Create and activate a virtual environment:
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Create a `.env` file in the `server/` directory:
```env
DEBUG=True
SECRET_KEY=your_django_secret_key
DATABASE_URL=postgres://user:password@localhost:5432/bankdash_db
BREVO_API_KEY=your_brevo_api_key_here
```

Run database migrations:
```bash
python manage.py migrate
```

Start the Django development server:
```bash
python manage.py runserver
```

---

### **2. Frontend Setup (React)**

Navigate to the frontend directory:
```bash
cd client
```

Install packages:
```bash
npm install
```

Create a `.env` file in the `client/` directory:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/
```

Launch the React application:
```bash
npm run dev
```

---

## 🌐 Deployment Notes

- **Render Backend Deployment:** Render blocks outbound traffic on standard SMTP ports (`587`/`25`). The backend uses Brevo's REST HTTP API endpoint directly over port `443` to reliably send verification emails.
- **Multipart Form Uploads:** DRF settings include `MultiPartParser` to handle binary avatar uploads (`profile_picture`) alongside JSON fields seamlessly.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.