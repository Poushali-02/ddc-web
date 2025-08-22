
# DDC-Web: Automated Domain-Based Blog Aggregator

Get all the latest tutorial blogs, automatically imported and categorized by domain, at [Projects by Devdotcom](https://projects.devdotcom.in)

---

## Project Overview

**DDC-Web** is a fullstack project that automatically imports blogs from RSS feeds, categorizes them by domain, and displays them in a modern, filterable frontend. All manual blog creation and authentication have been removed—everything is fully automated and public.

---

## Project Structure

```
├── backend/         # Django backend (API, RSS import, admin, scripts)
│   ├── ddcblog/     # Django project root & apps (api, blogs)
│   ├── requirements.txt
│   └── ...
├── frontend/        # React + Vite + Tailwind frontend
│   ├── src/         # React source code
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── ...
├── .gitignore
├── README.md
└── ...
```

---

## Features

- **Backend (Django 5.x):**
  - Automated RSS feed import and sync (feedparser)
  - Domain-based blog categorization and filtering
  - No authentication or manual blog creation—fully automated
  - Django admin for feed/domain management
  - REST API for blogs, domains, and stats
  - Scripts for bulk feed creation and scheduled sync

- **Frontend (React + Vite + Tailwind):**
  - Modern SPA with TypeScript
  - Blog listing, detail, and domain filtering
  - Scroll progress bar on all pages
  - Responsive, accessible UI

---

## Getting Started

### 1. Backend (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
cd ddcblog
python manage.py migrate
python manage.py runserver
python manage.py import_feed
```

- API: `http://localhost:8000/`
- Admin: `http://localhost:8000/admin/`

#### Automated RSS Import & Sync

- **Import/sync blogs for all domains:**
  - Run: use management command: `python manage.py import_feed`
- **Schedule sync (Windows Task Scheduler):**
  - Schedule `import_feed.py` to run everyday

### 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173/`

---

## API Endpoints (Backend)

- `GET    /blogs/`            — List all blogs
- `GET    /blogs/<id>/`       — Blog detail
- `GET    /domains/`          — List all domains
- `GET    /projects/`         — Domain/project stats
- `GET    /projects/<domain>/` — Blogs by domain

---

## Scripts & Automation

- **Bulk RSSFeed creation:** `backend/ddcblog/blogs/add_feeds_by_domain.py`
- **Import all feeds:** `python manage.py import_feed`
- **Schedule automation:** Use Windows Task Scheduler to run import/sync scripts every 2 days

---

## Development & Deployment Notes

- No authentication or manual blog creation—everything is automated
- All environment variables/secrets in `.env` (see `.gitignore`)
- For production, build frontend with `npm run build` and serve the output
- Python bytecode, cache, and build artifacts are ignored by default

---

## Credits

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
