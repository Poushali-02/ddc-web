# DDC-Web Fullstack Project

A modern fullstack web application with a Django backend and a React + TypeScript + Vite frontend.

---

## Project Structure

```
├── backend/         # Django backend (API, authentication, RSS import, admin)
│   ├── ddcblog/     # Django project root
│   ├── ...          # Django apps: accounts, blogs, api
│   ├── requirements.txt
│   └── rss_importer.html  # Standalone API demo page
├── frontend/        # React + Vite + Tailwind frontend
│   ├── src/         # React source code
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── ...
├── .gitignore
├── README.md
└── ...
```

---

## Features

- **Backend (Django 5.x):**
  - User registration, login
  - Blog CRUD (create, read, update, delete)
  - RSS feed import and sync (with feedparser)
  - Domain/project statistics endpoints
  - Django admin for user and blog management
  - CORS enabled for frontend-backend integration

- **Frontend (React + Vite + Tailwind):**
  - Modern SPA with TypeScript
  - Authentication (register/login/logout)
  - Blog listing, detail, and domain/project views
  - RSS import UI
  - API testing utilities
  - Responsive, accessible UI

---

## Getting Started

### 1. Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ddcblog
python manage.py migrate
python manage.py createsuperuser  # Optional: create admin user
python manage.py runserver
```

- The API will be available at `http://localhost:8000/`
- Admin: `http://localhost:8000/admin/`

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

- The frontend will be available at `http://localhost:5173/` (default Vite port)

---

## API Endpoints (Backend)

- `POST   /register/`         — Register user
- `POST   /login/`            — Login (get token)
- `GET    /blogs/`            — List blogs
- `GET    /blogs/<id>/`       — Blog detail
- `GET    /domains/`          — List all domains
- `GET    /projects/`         — Domain/project stats
- `GET    /projects/<domain>/` — Blogs by domain
- `GET    /projects/<domain>/<id>/` — Blog by domain & id

---

## Development Notes

- All environment variables and secrets should be stored in `.env` files (see `.gitignore`).
- Python bytecode, cache, and build artifacts are ignored by default.
- To run the standalone API demo, open `backend/rss_importer.html` in your browser.
- For production, build the frontend with `npm run build` and serve the output as needed.

---

## Credits

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
