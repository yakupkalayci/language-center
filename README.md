# My Language Center

My Language Center is a Turkish-language vocabulary learning platform for collecting English words, reviewing them by time period, tracking learned words, and practicing with a matching game. The repository contains a learner-facing React application, an Express REST API backed by PostgreSQL, and a separate Next.js administration dashboard.

## Features

### Learner application

- Public landing page with product information and a rate-limited contact form.
- Account registration, login, logout, profile editing, password changes, and account deletion.
- Cookie-based sessions with short-lived JWT access tokens and rotating refresh tokens.
- Personal vocabulary CRUD with:
  - word and part of speech (`NOUN`, `VERB`, `ADJECTIVE`, or `ADVERB`)
  - description/translation
  - examples and synonyms
  - optional notes
- Paginated word lists for all words, today, the previous week, and the previous month.
- A daily learning session based on each user's configured word count.
- Mark-as-learned and mark-as-unlearned workflows.
- Learned-word history with date filtering and a Recharts activity chart.
- Browser text-to-speech pronunciation with American (`en-US`) or British (`en-GB`) voice preference.
- Configurable daily word target and pronunciation accent.
- Word/description matching game with randomized cards (up to 10 words per round).
- Media-specific vocabulary collections for films, series, or videos, including cover images and per-media word lists.
- Responsive Chakra UI interface, route-level lazy loading, protected routes, modals, toasts, loaders, and error boundaries.
- Persisted client-side user state with Zustand.

### Administration dashboard

- Separate admin login and protected dashboard.
- Paginated user list.
- Promote users to `ADMIN` or return them to `USER`.
- Delete users.
- View contact/feedback submissions.
- Next.js route handlers proxy requests to the Express API and forward authentication cookies.

## Architecture

```text
Browser
  |-- Learner app (React + Vite, default :5173)
  |      `-- /api requests --------------------.
  |                                             v
  |-- Admin dashboard (Next.js, default :3001) -> Express API (:3000)
  |                                                |
  |                                                v
  `------------------------------------------ PostgreSQL (:5433 on host)
```

| Component | Location | Main technology | Purpose |
| --- | --- | --- | --- |
| Learner client | `client/` | React 18, Vite 6, Chakra UI 2 | Public site and authenticated learning experience |
| API | `server/api/` | Node.js, Express 4, Prisma 6 | Authentication, business logic, and persistence |
| Admin dashboard | `dashboard/` | Next.js 15, React 19, TypeScript, Tailwind CSS 4 | User and feedback administration |
| Database | `docker-compose.yaml` | PostgreSQL 15 | Local relational data store |

The API mounts every file in `server/api/routes/` automatically under `/api/<filename>`. For example, `routes/words.js` is exposed at `/api/words`.

## Prerequisites

- Node.js 20 or newer (the Docker images use Node 20)
- npm
- Docker and Docker Compose for the recommended local PostgreSQL setup
- A browser with Web Speech API support for pronunciation

## Local development

### 1. Start PostgreSQL

From the repository root:

```bash
docker compose up -d postgres
```

The included Compose configuration creates:

| Setting | Value |
| --- | --- |
| Host | `localhost` |
| Host port | `5433` |
| Container port | `5432` |
| Database | `myapp` |
| User | `postgres` |
| Password | `postgres` |

Database files are retained in the named `postgres-data` volume.

### 2. Configure and start the API

```bash
cd server/api
npm install
cp .env.example .env
```

Configure `server/api/.env`:

```dotenv
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/myapp"
JWT_SECRET="replace-with-a-long-random-secret"
TOKEN_EXPIRE_TIME=900
REFRESH_TOKEN_EXPIRE_TIME=604800
BCRYPT_SALT_ROUNDS=10
CORS_ORIGINS=http://localhost:5173,http://localhost:3001
PORT=3000
NODE_ENV=development
```

Durations are in seconds. `TOKEN_EXPIRE_TIME`, `REFRESH_TOKEN_EXPIRE_TIME`, and `BCRYPT_SALT_ROUNDS` are optional and default to 15 minutes, 7 days, and 10 rounds respectively. `CORS_ORIGINS` must be present because the server reads it at startup; use a comma-separated list without spaces.

Apply the checked-in migrations, generate Prisma Client, and start the server:

```bash
npx prisma migrate deploy
npx prisma generate
npm run dev
```

For schema changes during development, use `npx prisma migrate dev`. The API is available at `http://localhost:3000/api`, and `GET /api/health` can be used as a health check.

### 3. Configure and start the learner client

In a second terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

The client needs:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

Vite serves the app at `http://localhost:5173` by default. API requests use `withCredentials: true`, so the client origin must also appear in the API's `CORS_ORIGINS`.

### 4. Configure and start the admin dashboard

In a third terminal:

```bash
cd dashboard
npm install
```

Create `dashboard/.env.local`:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Then start the dashboard on a port that does not conflict with the API:

```bash
npm run dev -- -p 3001
```

Open `http://localhost:3001`. The backend only accepts users whose `role` array contains `ADMIN`; after registering a user, assign that role directly in the database (for example with `npx prisma studio`) to create the first administrator.

## Available scripts

Run each command from the relevant package directory.

| Package | Command | Description |
| --- | --- | --- |
| `client` | `npm run dev` | Start the Vite development server |
| `client` | `npm run build` | Create the production bundle in `client/dist/` |
| `client` | `npm run preview` | Preview the production bundle |
| `client` | `npm run lint` | Run ESLint |
| `server/api` | `npm run dev` | Start Express with Nodemon |
| `server/api` | `npm start` | Start Express with Node |
| `dashboard` | `npm run dev` | Start Next.js with Turbopack |
| `dashboard` | `npm run build` | Create a production Next.js build |
| `dashboard` | `npm start` | Serve the production Next.js build |

No automated test suite is currently configured.

## Environment variables

| Variable | Component | Required | Description |
| --- | --- | --- | --- |
| `DATABASE_URL` | API | Yes | PostgreSQL connection string used by Prisma |
| `JWT_SECRET` | API | Yes | Secret used to sign and decode access and refresh JWTs |
| `CORS_ORIGINS` | API | Yes | Comma-separated browser origins allowed to send credentialed requests |
| `PORT` | API | No | HTTP port; defaults to `3000` |
| `NODE_ENV` | API | No | Enables secure cookies when set to `production` |
| `TOKEN_EXPIRE_TIME` | API | No | Access-token lifetime in seconds; defaults to `900` |
| `REFRESH_TOKEN_EXPIRE_TIME` | API | No | Refresh-token lifetime in seconds; defaults to `604800` |
| `BCRYPT_SALT_ROUNDS` | API | No | Password hashing cost; defaults to `10` |
| `VITE_API_URL` | Client | Yes | Complete API base URL, including `/api` |
| `NEXT_PUBLIC_API_BASE_URL` | Dashboard | Yes | Complete Express API base URL, including `/api` |

Never commit real secrets or production connection strings. The repository ignores `.env` files; keep only placeholder values in `.env.example` files.

## Authentication and security

- Passwords are hashed with bcrypt.
- Access and refresh JWTs are stored in `httpOnly` cookies named `access_token` and `refresh_token`.
- Protected API endpoints also accept a bearer access token through `Authorization: Bearer <token>`.
- Cookies use `SameSite=Lax`; `Secure` is enabled in production.
- Refresh tokens are persisted in PostgreSQL, rotated on refresh, and revoked on logout. Reuse of a revoked token revokes all refresh tokens for that user.
- Passport JWT middleware loads the current user from the database for every authenticated request.
- Login, registration, contact submission, and account-setting operations use IP-based rate limiting. Login, registration, and contact submission are limited to 10 requests per 15 minutes; the general limiter defaults to 100 per 15 minutes.
- The contact payload is validated with Zod.
- User-owned records use cascading deletion in the database.

The learner client initializes its session through `/users/me`; on an expired access token it calls `/users/refresh` and retries. Zustand persists non-sensitive user profile/settings data in local storage, while authentication tokens remain in `httpOnly` cookies.

## REST API

All paths below are relative to `/api`. Unless marked **Public**, an endpoint requires the access-token cookie or a bearer token. Standard list endpoints accept `pageIndex` and `pageSize` query parameters.

### Health and contact

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | API health check |
| `POST` | `/contact` | Public | Store a validated contact message (`name`, `email`, `subject`, `message`) |

### Users and sessions

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/users/register` | Public | Register a user and create default settings |
| `POST` | `/users/login` | Public | Authenticate and set access/refresh cookies |
| `POST` | `/users/refresh` | Refresh cookie/token | Rotate refresh token and issue a new access token |
| `POST` | `/users/logout` | Public | Revoke the supplied refresh token and clear cookies |
| `GET` | `/users/me` | User | Return the authenticated user |
| `PATCH` | `/users/update-profile` | User | Update first name, last name, or email |
| `PATCH` | `/users/update-password` | User | Validate current password and set a new password |
| `PUT` | `/users/update-settings` | User | Update `dailyWordCount` and `accentChoice` |
| `DELETE` | `/users/delete/:userId` | User | Delete a user account |

New passwords must be at least eight characters and include an uppercase letter, lowercase letter, number, and one of `@$!%*?&`.

### Vocabulary

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/words` | List the user's words; supports `pageIndex`, `pageSize`, `dateType`, and `tzOffset` |
| `POST` | `/words` | Create a word |
| `PUT` | `/words/:id` | Update a word |
| `DELETE` | `/words/:id` | Delete a word |
| `GET` | `/words/daily-learning` | Get unlearned words up to the user's daily target and record today's session |
| `POST` | `/words/daily-learning/:id/mark-learned` | Mark a daily word as learned |
| `GET` | `/words/learned` | List learned words and daily counts; requires `startDate` and `endDate` |
| `POST` | `/words/:id/mark-unlearned` | Remove the learned marker |

`dateType` supports `day`, `week`, and `month`. `tzOffset` is the browser's `Date.getTimezoneOffset()` value in minutes and is used to calculate local date boundaries.

A word request uses this shape:

```json
{
  "word": "example",
  "type": "NOUN",
  "description": "örnek",
  "examples": "This is an example.",
  "synonyms": "sample, instance",
  "extraNotes": "Optional note"
}
```

### Media vocabulary

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/media` | List the user's media collections |
| `POST` | `/media` | Create a collection with `title` and optional `image` |
| `GET` | `/media/:id` | Get one collection |
| `PUT` | `/media/:id` | Update a collection |
| `DELETE` | `/media/:id` | Delete a collection and its words |
| `GET` | `/mediaWords/:id/words` | List a collection's words with pagination |
| `POST` | `/mediaWords/:id/words` | Add a word to a collection |
| `PUT` | `/mediaWords/:id/words/:wordId` | Update a collection word |
| `DELETE` | `/mediaWords/:id/words/:wordId` | Delete a collection word |

### Administration

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/admin` | Basic admin route health response |
| `POST` | `/admin/login` | Authenticate a user with the `ADMIN` role |
| `POST` | `/admin/logout` | Revoke refresh token and clear cookies |
| `GET` | `/admin/me` | Return the authenticated admin session |
| `GET` | `/admin/users` | Paginated user list |
| `GET` | `/admin/users/delete-user/:userId` | Delete a user (current API contract) |
| `PUT` | `/admin/users/toggle-admin-role/:userId` | Toggle `ADMIN` membership |
| `GET` | `/admin/feedbacks` | Paginated contact-message list |

Most API handlers return a response envelope with a `status` field and a `data` object. Validation and application errors are normalized by `server/api/lib/Response.js`.

## Database model

| Model | Purpose | Important constraints |
| --- | --- | --- |
| `User` | Account, profile, and role data | Unique email; one-to-many ownership; `USER`/`ADMIN` role array |
| `Settings` | Learning and speech preferences | One-to-one with user; default accent `EN_US` |
| `Word` | User vocabulary item | Unique `(word, userId)`; indexed by user |
| `LearnedWord` | Learned state and timestamp | Unique `(userId, wordId)` |
| `DailySession` | Words assigned on a calendar day | Unique `(userId, wordId, date)` |
| `RefreshToken` | Persistent session token | Unique token; expiry and revocation state |
| `Media` | User-owned film/series/video collection | Optional image; cascades with user |
| `MediaWord` | Vocabulary scoped to media | Unique `(word, mediaId, userId)` |
| `ContactMessage` | Landing-page feedback | Indexed by creation date |

All primary keys are Prisma CUID strings. User-owned relations and word-learning relations use `onDelete: Cascade`. Timestamps are stored as PostgreSQL `DateTime` values.

## Frontend routes

### Learner client

| Route | Access | Screen |
| --- | --- | --- |
| `/` | Public | Landing page |
| `/uyelik-islemleri` | Public | Login and registration |
| `/panel` | User | Learning dashboard |
| `/gunun-kelimeleri` | User | Today's words |
| `/haftanin-kelimeleri` | User | Previous-week words |
| `/ayin-kelimeleri` | User | Previous-month words |
| `/kelime-listesi` | User | Complete word list |
| `/ogrenilen-kelimeler` | User | Learned history and chart |
| `/kelime-oyunlari` | User | Matching game |
| `/film-dizi-video-kelimeleri` | User | Media collections |
| `/media/:id` | User | Media collection details |
| `/ayarlar` | User | Daily target and accent settings |
| `/profilim` | User | Profile and account management |

### Admin dashboard

| Route | Screen |
| --- | --- |
| `/login` | Admin login |
| `/` | User and feedback overview |
| `/users` | User administration |
| `/feedbacks` | Contact submissions |

The Next.js middleware protects `/` and `/users`; the dashboard initializer also validates the session through its `/api/me` proxy.

## Production builds and containers

The learner client and API each include a Dockerfile:

```bash
docker build -t language-center-client ./client
docker build -t language-center-api ./server/api
```

- The client image performs a Vite build and serves the SPA with Nginx on port `80`. Its Nginx fallback sends unknown paths to `index.html` for client-side routing.
- The API image installs production dependencies, generates Prisma Client in the build stage, and listens on port `3000`.
- `docker-compose.yaml` currently defines PostgreSQL only; it does not orchestrate the client, API, or dashboard.
- Vite variables are embedded at build time. Supply `VITE_API_URL` while building the client image for the target environment.
- Run `npx prisma migrate deploy` as a release/startup step before serving a new API version.

For cross-site production deployments, review the cookie `SameSite`/`Secure` settings and CORS origins for the actual domains. Keep the API, client, and dashboard behind HTTPS.

## Project structure

```text
language-center/
├── client/
│   ├── public/                 # Logos, screenshots, fonts, and icon font
│   ├── src/
│   │   ├── components/         # Forms, lists, cards, drawers, and modals
│   │   ├── hooks/              # Word-list and dashboard behavior
│   │   ├── layouts/            # Landing and authenticated layouts
│   │   ├── pages/              # Learner-facing route components
│   │   ├── services/           # Axios API adapters
│   │   ├── store/              # Zustand auth and modal stores
│   │   ├── theme/              # Chakra theme configuration
│   │   └── utils/              # Speech and randomization helpers
│   ├── Dockerfile
│   └── nginx.conf
├── dashboard/
│   ├── app/
│   │   ├── api/                # Server-side proxy route handlers
│   │   ├── components/         # Admin UI
│   │   ├── hooks/              # User and feedback data hooks
│   │   ├── store/              # Admin session store
│   │   └── types/              # TypeScript API models
│   └── middleware.ts           # Cookie-based page protection
├── server/api/
│   ├── config/                 # Security defaults and enums
│   ├── lib/                    # Auth, Prisma, errors, and responses
│   ├── middlewares/            # Request validation
│   ├── prisma/                 # Schema and migrations
│   ├── routes/                 # Express route modules
│   ├── validators/             # Zod schemas
│   └── Dockerfile
└── docker-compose.yaml         # Local PostgreSQL service
```

## Current implementation notes

- The UI language is primarily Turkish; stored vocabulary is designed for English-to-Turkish study.
- Media routes and UI exist, although the media dashboard card is currently commented out in the learner dashboard; the page remains reachable from its route.
- Admin API operations are authenticated with the common JWT middleware. The admin role is checked during admin login, but individual admin endpoints do not perform an additional role check after authentication.
- Some update/delete handlers identify the record by its ID without consistently including the current user's ID in the mutation filter. Treat authorization hardening as a priority before a public production launch.
- The admin user-delete operation currently uses `GET`; changing it to `DELETE` would improve HTTP semantics and should be coordinated between the dashboard proxy and Express route.
- There is no root workspace package, CI workflow, seed script, or automated test suite at present.


