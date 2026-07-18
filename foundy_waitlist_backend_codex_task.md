# Задача для Codex: подключить базовый Django Ninja backend к Landing Page Foundy

## 1. Контекст

Frontend Landing Page проекта **Foundy** уже создан на:

- Vue 3;
- TypeScript;
- Vite;
- Tailwind CSS.

На странице есть форма присоединения к раннему сообществу Foundy. Сейчас форма работает только в демонстрационном режиме и сохраняет данные локально либо вообще не отправляет их на backend.

Необходимо:

1. Создать базовый backend на **Django + Django Ninja**.
2. Подключить frontend-форму к backend API.
3. Сохранять отправленные заявки в локальную **MongoDB**.
4. Добавить валидацию Gmail-адресов.
5. Обновить главный слоган проекта на:

```text
կատարելագործիր և կատարելագործվիր
```

6. Не ломать существующий дизайн и frontend.
7. Не переделывать весь проект.
8. Реализовать только минимальный, аккуратный и безопасный backend для waitlist-формы.

---

# 2. Важное архитектурное решение

Основной backend проекта строится на Django и Django Ninja.

MongoDB используется **временно**, только для раннего MVP и хранения заявок с landing page.

Не пытаться использовать Django ORM с MongoDB.

Использовать официальный MongoDB Python driver:

```text
pymongo
```

Подключение к MongoDB должно быть вынесено в отдельный infrastructure/repository слой.

Не использовать:

- MongoEngine;
- Djongo;
- неофициальные Django-MongoDB адаптеры;
- прямое подключение к MongoDB внутри API endpoint;
- глобальный небезопасный mutable state;
- hardcoded credentials.

Позже MongoDB может быть заменена на PostgreSQL без изменения API-контракта frontend.

---

# 3. Сначала изучить существующий проект

Перед изменениями:

1. Изучи текущую структуру всего репозитория.
2. Найди:
   - папку `frontend`;
   - папку `backend`;
   - существующий Django-проект;
   - текущий `requirements.txt` или `pyproject.toml`;
   - существующий `package.json`;
   - компонент формы;
   - текущую логику demo/localStorage;
   - место, где отображается главный слоган.
3. Не удаляй существующую полезную конфигурацию.
4. Не изменяй дизайн страницы без необходимости.
5. Не создавай второй Django-проект, если backend уже инициализирован.
6. Если backend пустой, создай корректную минимальную Django-структуру.
7. Все имена файлов и импорты должны соответствовать реальной структуре проекта.

---

# 4. Требуемый backend-стек

Использовать:

```text
Python 3.13
Django 5.2 LTS
Django Ninja
PyMongo
python-dotenv или django-environ
Pydantic-схемы через Django Ninja
```

Для разработки:

```text
pytest
pytest-django
ruff
```

Не добавлять Redis, Celery, Kafka или другие сервисы для этой задачи.

---

# 5. MongoDB

Локальная MongoDB должна запускаться через Docker Compose.

Добавить или обновить корневой:

```text
docker-compose.yml
```

Минимальный сервис:

```yaml
services:
  mongodb:
    image: mongo:8
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - foundy_mongo_data:/data/db

volumes:
  foundy_mongo_data:
```

Не hardcode значения username/password непосредственно в YAML.

Создать:

```text
.env.example
```

Пример переменных:

```env
DJANGO_SECRET_KEY=replace-with-a-long-random-secret
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

MONGO_URI=mongodb://foundy:foundy_password@localhost:27017/?authSource=admin
MONGO_DB_NAME=foundy
MONGO_WAITLIST_COLLECTION=waitlist

MONGO_ROOT_USERNAME=foundy
MONGO_ROOT_PASSWORD=foundy_password

FRONTEND_ORIGIN=http://localhost:5173
```

Настоящий `.env` не добавлять в Git.

MongoDB database:

```text
foundy
```

Collection:

```text
waitlist
```

---

# 6. Структура backend

Предпочтительная структура:

```text
backend/
├── manage.py
├── requirements.txt
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── api.py
│   ├── asgi.py
│   └── wsgi.py
│
├── apps/
│   └── waitlist/
│       ├── __init__.py
│       ├── api.py
│       ├── schemas.py
│       ├── services.py
│       ├── repository.py
│       ├── validators.py
│       └── tests/
│           ├── __init__.py
│           └── test_waitlist_api.py
│
└── common/
    ├── __init__.py
    ├── mongodb.py
    └── exceptions.py
```

Можно адаптировать структуру под существующий проект, но должны быть разделены:

- API;
- schemas;
- validation;
- business logic;
- MongoDB repository;
- MongoDB connection.

Нельзя писать всё в одном `api.py`.

---

# 7. MongoDB connection

Создать отдельный модуль:

```text
backend/common/mongodb.py
```

Он должен:

- читать `MONGO_URI`;
- читать `MONGO_DB_NAME`;
- создавать `MongoClient`;
- устанавливать разумный timeout;
- предоставлять функцию получения database;
- не открывать новое подключение на каждый запрос;
- проверять соединение через health endpoint;
- корректно обрабатывать недоступность MongoDB;
- не выводить пароль или полный URI в лог.

Пример направления:

```python
from functools import lru_cache

from django.conf import settings
from pymongo import MongoClient
from pymongo.database import Database


@lru_cache(maxsize=1)
def get_mongo_client() -> MongoClient:
    return MongoClient(
        settings.MONGO_URI,
        serverSelectionTimeoutMS=3000,
        connectTimeoutMS=3000,
        socketTimeoutMS=5000,
    )


def get_mongo_database() -> Database:
    return get_mongo_client()[settings.MONGO_DB_NAME]
```

Не копировать пример слепо. Адаптировать типы и настройки.

---

# 8. Модель данных waitlist

MongoDB document должен иметь примерно такую структуру:

```json
{
  "_id": "ObjectId",
  "full_name": "Example User",
  "email": "example@gmail.com",
  "email_normalized": "example@gmail.com",
  "age_group": "16_17",
  "role": "young_specialist",
  "message": "Optional message",
  "consent": true,
  "source": "landing_page",
  "status": "new",
  "created_at": "UTC datetime",
  "updated_at": "UTC datetime",
  "ip_hash": "optional hash",
  "user_agent": "limited optional string"
}
```

Обязательные поля:

- `full_name`;
- `email`;
- `email_normalized`;
- `age_group`;
- `role`;
- `consent`;
- `source`;
- `status`;
- `created_at`;
- `updated_at`.

`message` необязательное.

Не сохранять:

- точную дату рождения;
- пароль;
- JWT;
- cookies;
- полный IP в открытом виде;
- лишние browser fingerprints;
- чувствительные данные.

Если IP не нужен — не сохранять его вообще.

---

# 9. Разрешённые значения

## Age group

Backend должен принимать только:

```text
under_16
16_17
18_24
25_plus
prefer_not_to_say
```

## Role

Backend должен принимать только:

```text
young_specialist
founder
mentor
company_partner
parent_educator
other
```

## Status

При создании автоматически:

```text
new
```

Пользователь не должен иметь возможность отправить свой `status`.

---

# 10. Gmail validation

Необходимо реализовать валидацию email и на frontend, и на backend.

Backend является источником истины.

## Разрешить только Gmail

Email должен:

1. Быть валидным email-адресом.
2. Заканчиваться строго на:

```text
@gmail.com
```

3. Сравнение домена должно быть case-insensitive.
4. Email должен нормализоваться:
   - удалить пробелы в начале и конце;
   - привести домен к lowercase;
   - желательно привести весь email к lowercase для поиска дубликатов.
5. Не принимать:
   - `@googlemail.com`;
   - поддомены;
   - `gmail.co`;
   - `gmail.am`;
   - временные email;
   - строки с пробелами внутри;
   - несколько email в одном поле.

Примеры валидных:

```text
user@gmail.com
user.name@gmail.com
example123@gmail.com
```

Примеры невалидных:

```text
user@yahoo.com
user@gmail.co
user@googlemail.com
user@gmail.com.example.org
user @gmail.com
```

Использовать `EmailStr` или эквивалентную строгую Pydantic-валидацию.

Дополнительный validator:

```python
domain = normalized_email.rsplit("@", 1)[1]
if domain != "gmail.com":
    raise ValueError("Only Gmail addresses are currently accepted.")
```

Не использовать только frontend regex.

## Важное замечание

Gmail считает варианты с точками и `+tag` часто связанными с одним inbox, но не реализовывать сложную канонизацию Gmail на этой стадии.

Для дедупликации использовать только lowercase + trim.

---

# 11. Другие правила валидации

## Full name

- обязательное;
- trim;
- минимум 2 символа;
- максимум 100 символов;
- не разрешать строку только из пробелов;
- разрешить армянские, латинские и кириллические символы;
- не пытаться ограничивать имя только ASCII.

## Message

- optional;
- trim;
- максимум 1000 символов;
- пустую строку можно сохранять как `null` или не сохранять;
- HTML не разрешён;
- не рендерить через `v-html`.

## Consent

Должно быть строго:

```text
true
```

Если false:

```text
400 validation error
```

## Request size

Ограничить разумный размер JSON body.

---

# 12. Уникальность email

Создать unique index:

```text
email_normalized
```

Index должен создаваться безопасно и idempotent.

Предпочтительный вариант:

Создать Django management command:

```bash
python manage.py ensure_mongo_indexes
```

Она должна создать:

```python
collection.create_index(
    [("email_normalized", 1)],
    unique=True,
    name="uniq_waitlist_email_normalized",
)
```

Не создавать index при каждом HTTP-запросе.

При duplicate key вернуть:

```text
409 Conflict
```

Response:

```json
{
  "detail": "This Gmail address is already on the Foundy early list.",
  "code": "email_already_exists"
}
```

Не возвращать stack trace.

---

# 13. API endpoints

Base path:

```text
/api/v1
```

## POST waitlist

Endpoint:

```text
POST /api/v1/waitlist
```

Request:

```json
{
  "full_name": "Example User",
  "email": "example@gmail.com",
  "age_group": "16_17",
  "role": "young_specialist",
  "message": "I want to join the pilot.",
  "consent": true
}
```

Successful response:

```text
201 Created
```

Body:

```json
{
  "success": true,
  "message": "You have joined the Foundy early list.",
  "data": {
    "id": "mongo-object-id-as-string",
    "email": "example@gmail.com",
    "created_at": "ISO-8601 UTC datetime"
  }
}
```

Не возвращать весь document.

## Health endpoint

```text
GET /api/v1/health
```

Response при нормальной работе:

```json
{
  "status": "ok",
  "services": {
    "api": "ok",
    "mongodb": "ok"
  }
}
```

Если MongoDB недоступна:

- вернуть `503 Service Unavailable`;
- не раскрывать credentials;
- дать безопасное сообщение.

## Не создавать сейчас

- endpoint списка всех заявок;
- endpoint удаления;
- admin API;
- authentication;
- публичный поиск по email.

Waitlist data не должна быть доступна через публичный GET endpoint.

---

# 14. Django Ninja API

Создать главный `NinjaAPI`.

Пример:

```python
api = NinjaAPI(
    title="Foundy API",
    version="1.0.0",
    urls_namespace="foundy-api",
)
```

Подключить waitlist router:

```text
/api/v1/waitlist
```

OpenAPI docs можно оставить доступными только в development.

В production:

- docs должны быть отключены или защищены;
- DEBUG false;
- подробные ошибки не показываются.

---

# 15. CORS и схема доменов

Предпочтительный production-вариант:

```text
foundy.am
foundy.am/api/*
```

То есть один origin через reverse proxy.

Для локальной разработки:

```text
frontend: http://localhost:5173
backend:  http://localhost:8000
```

Если используется CORS, разрешить только:

```text
http://localhost:5173
```

через env:

```text
FRONTEND_ORIGIN
```

Не использовать:

```python
CORS_ALLOW_ALL_ORIGINS = True
```

Если добавляется `django-cors-headers`:

- настроить только конкретный origin;
- разрешить только необходимые методы;
- не добавлять лишние credentials, если endpoint публичный и не использует cookies.

Для данного публичного waitlist endpoint session auth не требуется.

---

# 16. Rate limiting

Добавить базовую защиту от массового спама.

Поскольку Redis пока нет, реализовать минимальный вариант:

- ограничение через Django cache с локальным memory backend для development;
- либо простая безопасная middleware/decorator логика;
- не строить сложную distributed rate-limit систему.

Например:

```text
5 попыток за 10 минут на один IP
```

Если rate limit превышен:

```text
429 Too Many Requests
```

Response:

```json
{
  "detail": "Too many submissions. Please try again later.",
  "code": "rate_limit_exceeded"
}
```

Отдельно указать в коде TODO:

```python
# TODO: Move rate limiting to Redis before multi-instance production deployment.
```

Не считать локальный memory rate limit полноценной production-защитой.

---

# 17. Spam protection

Не добавлять CAPTCHA сейчас.

Добавить скрытое honeypot-поле на frontend:

```text
website
```

Обычный пользователь его не видит и не заполняет.

Backend schema может принять это поле, но:

- если оно заполнено, не сохранять заявку;
- вернуть общий успешный ответ или `400`, не раскрывая подробности защиты.

Предпочтительно вернуть обычный success response, чтобы бот не понял, что обнаружен.

---

# 18. Frontend integration

Найти текущий компонент waitlist-формы.

Удалить или отключить demo-localStorage поведение как основной способ сохранения.

Создать API client:

```text
frontend/src/api/client.ts
frontend/src/api/waitlist.ts
```

Пример:

```ts
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";
```

Создать:

```text
frontend/.env.example
```

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## TypeScript types

Создать types:

```ts
export type AgeGroup =
  | "under_16"
  | "16_17"
  | "18_24"
  | "25_plus"
  | "prefer_not_to_say";

export type WaitlistRole =
  | "young_specialist"
  | "founder"
  | "mentor"
  | "company_partner"
  | "parent_educator"
  | "other";

export interface WaitlistPayload {
  full_name: string;
  email: string;
  age_group: AgeGroup;
  role: WaitlistRole;
  message?: string;
  consent: boolean;
  website?: string;
}
```

Не использовать `any`.

---

# 19. Frontend Gmail validation

До отправки:

- trim email;
- lowercase;
- проверить общий email format;
- проверить домен `gmail.com`;
- показать ошибку рядом с полем;
- не использовать browser alert.

Пример сообщения на армянском:

```text
Այս պահին ընդունվում են միայն վավեր Gmail հասցեներ։
```

Backend error тоже нужно преобразовать в понятное сообщение.

Frontend validation не заменяет backend validation.

---

# 20. Состояния формы

Форма должна иметь:

```text
idle
submitting
success
validation_error
duplicate_email
server_error
rate_limited
```

Во время отправки:

- отключить кнопку;
- показать loading state;
- не разрешать повторные клики;
- сохранить введённые данные при server error;
- очистить форму только после success.

Success message на армянском:

```text
Շնորհակալություն։ Ձեր հայտը հաջողությամբ պահպանվել է։
```

Duplicate message:

```text
Այս Gmail հասցեն արդեն Foundy-ի առաջին ցանկում է։
```

Server error:

```text
Չհաջողվեց պահպանել հայտը։ Փորձեք կրկին մի փոքր ուշ։
```

Rate limit:

```text
Չափազանց շատ փորձեր։ Խնդրում ենք կրկին փորձել ավելի ուշ։
```

Не показывать raw backend exception.

---

# 21. Изменение слогана

Найти текущий главный слоган Landing Page.

Заменить его на точный текст:

```text
կատարելագործիր և կատարելագործվիր
```

Не изменять написание.

Не добавлять точку в конце, если она не подходит визуально.

Если слоган разбит на несколько строк, сохранить правильный порядок слов.

Проверить:

- desktop;
- tablet;
- mobile;
- отсутствие некрасивого переноса;
- корректное отображение армянского шрифта;
- достаточный line-height.

Если слоган отображается в нескольких местах, обновить его последовательно.

---

# 22. API error format

Все контролируемые ошибки возвращать в едином формате:

```json
{
  "detail": "Human-readable message",
  "code": "machine_readable_code",
  "fields": {
    "email": ["Only Gmail addresses are currently accepted."]
  }
}
```

`fields` может отсутствовать.

Коды:

```text
validation_error
email_already_exists
rate_limit_exceeded
mongodb_unavailable
internal_error
```

Не раскрывать:

- stack trace;
- environment variables;
- Mongo URI;
- внутренние пути;
- Python exception text.

---

# 23. Logging

Добавить аккуратное logging.

Логировать:

- успешное создание заявки без полного email;
- duplicate attempts;
- MongoDB unavailable;
- rate limit;
- unexpected error.

Не логировать:

- полное сообщение пользователя;
- consent payload;
- полный IP;
- секреты;
- полный email.

Можно маскировать email:

```text
u***@gmail.com
```

---

# 24. Tests

Добавить backend tests.

Обязательные тесты:

1. Успешное создание waitlist entry.
2. Gmail сохраняется в lowercase.
3. Не-Gmail отклоняется.
4. Невалидный email отклоняется.
5. Пустое имя отклоняется.
6. Слишком длинное имя отклоняется.
7. Неверная age group отклоняется.
8. Неверная role отклоняется.
9. Consent false отклоняется.
10. Duplicate email возвращает 409.
11. Honeypot submission не сохраняется.
12. MongoDB unavailable возвращает безопасную ошибку.
13. Health endpoint работает.
14. Response не содержит чувствительные данные.
15. Message больше 1000 символов отклоняется.

Тесты не должны требовать production MongoDB.

Можно:

- mock repository;
- использовать dependency injection;
- использовать отдельную test database;
- очищать collection после тестов.

---

# 25. Local development commands

После реализации должны работать:

## MongoDB

```bash
docker compose up -d mongodb
```

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py ensure_mongo_indexes
python manage.py runserver
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tests

```bash
cd backend
pytest
```

## Frontend build

```bash
cd frontend
npm run build
```

---

# 26. README

Обновить или создать корневой `README.md`.

Включить:

- описание;
- stack;
- env setup;
- MongoDB startup;
- backend startup;
- frontend startup;
- API endpoint;
- tests;
- build;
- место хранения данных;
- предупреждение, что MongoDB используется временно для MVP;
- TODO перехода на PostgreSQL;
- TODO production Redis rate limiting.

---

# 27. Безопасность

Обязательно:

- `.env` в `.gitignore`;
- `DEBUG` через env;
- безопасный `SECRET_KEY`;
- ограниченный `ALLOWED_HOSTS`;
- ограниченный CORS;
- Mongo credentials только в env;
- request validation на backend;
- duplicate protection через unique index;
- rate limiting;
- honeypot;
- body size limit;
- безопасные ошибки;
- отсутствие публичного endpoint для чтения waitlist;
- отсутствие secret в frontend;
- отсутствие `v-html`;
- отсутствие raw Mongo queries из пользовательского input;
- не использовать `$where`;
- не передавать request JSON напрямую в Mongo без whitelist;
- явное создание document из валидированной schema.

Плохой вариант:

```python
collection.insert_one(request.json())
```

Правильный подход:

```python
document = {
    "full_name": validated.full_name,
    "email": normalized_email,
    # остальные разрешённые поля
}
```

---

# 28. Что нельзя делать

Не создавать:

- регистрацию пользователей;
- login;
- JWT;
- Django admin для MongoDB;
- публичный список заявок;
- платежи;
- email-рассылку;
- Telegram-бота;
- Redis;
- Kafka;
- Celery;
- микросервисы;
- Kubernetes;
- сложную аналитику;
- отправку данных в Google Forms;
- Firebase;
- Supabase;
- сторонний form backend.

В этой задаче нужен только минимальный Foundy waitlist backend.

---

# 29. Acceptance criteria

Работа завершена, если:

- [ ] backend использует Django + Django Ninja;
- [ ] MongoDB работает локально через Docker Compose;
- [ ] используется PyMongo;
- [ ] waitlist сохраняется в MongoDB;
- [ ] email нормализуется;
- [ ] принимаются только `@gmail.com`;
- [ ] duplicate email возвращает 409;
- [ ] создан unique Mongo index;
- [ ] frontend отправляет данные на API;
- [ ] localStorage больше не является основным хранилищем;
- [ ] форма показывает loading/success/error states;
- [ ] frontend и backend validation работают;
- [ ] honeypot работает;
- [ ] rate limit работает;
- [ ] health endpoint проверяет MongoDB;
- [ ] нет публичного GET списка waitlist;
- [ ] env secrets не попали в Git;
- [ ] CORS не открыт для всех;
- [ ] backend tests проходят;
- [ ] frontend build проходит;
- [ ] слоган заменён на `կատարելագործիր և կատարելագործվիր`;
- [ ] существующий дизайн не сломан;
- [ ] responsive не сломан;
- [ ] README обновлён.

---

# 30. Финальный отчёт Codex

После выполнения:

1. Покажи все созданные файлы.
2. Покажи все изменённые файлы.
3. Объясни архитектуру.
4. Укажи env variables.
5. Укажи команды запуска.
6. Покажи результат backend tests.
7. Покажи результат:

```bash
npm run build
```

8. Укажи API endpoint.
9. Укажи MongoDB database и collection.
10. Подтверди, что принимаются только Gmail-адреса.
11. Подтверди, что slogan изменён на:

```text
կատարելագործիր և կատարելագործվիր
```

12. Не ограничивайся инструкцией — самостоятельно измени и создай все необходимые файлы.

---

# 31. Итоговая задача

Подключи существующую Vue + TypeScript + Tailwind форму Foundy к новому базовому Django Ninja API.

Заявки должны:

1. Валидироваться на frontend.
2. Повторно строго валидироваться на backend.
3. Принимать только Gmail.
4. Безопасно сохраняться в локальной MongoDB.
5. Не дублироваться по email.
6. Возвращать понятные ответы.
7. Не раскрывать чувствительные данные.

Также замени основной слоган Landing Page на:

```text
կատարելագործիր և կատարելագործվիր
```
