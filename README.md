# Foundy

Foundy is an early-stage platform for connecting young talent, founders and mentors through real product work and verified experience.

## Stack

- Frontend: Vue 3, TypeScript, Vite, Tailwind CSS
- Backend: Django 5.2, Django Ninja, PyMongo
- Development database: MongoDB 8 in Docker Compose

MongoDB is a temporary MVP store for landing-page waitlist submissions. The API is separated from the repository so the storage layer can later move to PostgreSQL without changing the frontend contract.

## Environment

Copy the root example before starting services:

```bash
cp .env.example .env
```

The `.env` file contains development credentials and is ignored by Git. Set a long unique `DJANGO_SECRET_KEY` outside local development.

For the frontend API URL, copy `frontend/.env.example` to `frontend/.env` if the default URL needs changing.

## Run MongoDB

```bash
docker compose up -d mongodb
```

## Run backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py ensure_mongo_indexes
python manage.py runserver
```

The public API provides `POST /api/v1/waitlist` and `GET /api/v1/health`. There is intentionally no public endpoint to read waitlist entries.

## Run frontend

```bash
cd frontend
npm install
npm run dev
```

## Tests and build

```bash
cd backend
pytest

cd ../frontend
npm run build
```

## Production follow-ups

- Replace the local-memory rate limiter with Redis before multi-instance deployment.
- Replace the temporary MongoDB repository with PostgreSQL when the wider product backend is ready.
- Put frontend and `/api/` behind one production origin such as `foundy.am`.
