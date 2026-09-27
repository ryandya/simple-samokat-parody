# Samokat Parody

> A full-stack grocery shopping application built with Expo, React Native, NestJS, and PostgreSQL.

<p align="center">
  <img src="frontend/assets/icon.png" alt="Samokat Parody application icon" width="120" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-55-000020?logo=expo&logoColor=white" alt="Expo 55" />
  <img src="https://img.shields.io/badge/React_Native-0.83-61DAFB?logo=react&logoColor=black" alt="React Native 0.83" />
  <img src="https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white" alt="NestJS 12" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-Full_Stack-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</p>

Samokat Parody is a learning project inspired by modern grocery delivery apps. It combines a cross-platform mobile storefront with a REST API for authentication, products, categories, user profiles, and favourites.

> [!NOTE]
> This is an independent educational project and is not affiliated with, endorsed by, or connected to the Samokat brand.

## Features

- Email and password registration and sign-in
- JWT access and refresh token authentication
- Product catalogue with categories and product details
- Product search and category filtering
- Shopping cart with persistent local state
- Favourite products linked to the authenticated user
- User profile screen
- Static product and category image hosting
- Android, iOS, and web support through Expo

## Tech Stack

| Area | Technologies |
| --- | --- |
| Mobile app | Expo, React Native, React Navigation, NativeWind |
| Client state | Redux Toolkit, Redux Persist |
| Server state | TanStack Query, Axios |
| Forms | React Hook Form |
| API | NestJS, Passport, JWT, Argon2 |
| Database | PostgreSQL, Prisma ORM |
| Language | TypeScript |

## Project Structure

```text
samokat-parody/
├── frontend/              # Expo and React Native application
│   ├── assets/            # Icons, splash screen, and local images
│   └── src/
│       ├── app/           # Application root and providers
│       ├── components/    # Shared UI and catalogue components
│       ├── navigation/    # Public and private navigation
│       ├── screens/       # Application screens and screen hooks
│       ├── services/      # API client and feature services
│       └── store/         # Redux store and cart state
├── backend/               # NestJS REST API
│   ├── prisma/            # Prisma schema
│   ├── src/               # API modules and application bootstrap
│   └── uploads/           # Public product and category images
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following tools are available locally:

- A recent Node.js LTS release and npm
- PostgreSQL
- An Android/iOS emulator, a physical device with Expo Go, or a web browser

### 1. Clone the repository

```bash
git clone <repository-url>
cd samokat-parody
```

### 2. Configure and start the API

Install the backend dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```dotenv
DATABASE_URL="postgresql://postgres:password@localhost:5432/samokat_parody"
JWT_SECRET="replace-this-with-a-long-random-secret"
PORT=4200
```

`PORT` is optional and defaults to `4200`.

Create the database tables, generate the Prisma client, and start the development server:

```bash
npm run push
npm run generate
npm run start:dev
```

The API will be available at `http://localhost:4200/api`. Uploaded assets are served from `http://localhost:4200/uploads`.

### 3. Configure and start the mobile app

Open a second terminal and install the frontend dependencies:

```bash
cd frontend
npm install
```

Copy the example environment file:

```bash
cp .env.example .env
```

Set the backend origin in `frontend/.env`:

```dotenv
SERVER_URL=http://localhost:4200
```

Then start Expo:

```bash
npm start
```

Choose a platform from the Expo terminal, or use one of the dedicated commands:

```bash
npm run android
npm run ios
npm run web
```

> [!IMPORTANT]
> A physical phone cannot reach the backend through the computer's `localhost`. Use the computer's local network address instead, for example `SERVER_URL=http://192.168.1.10:4200`, and keep both devices on the same network. The Android emulator commonly uses `http://10.0.2.2:4200` for the host machine.

Restart Expo after changing `.env` because the value is injected when the bundle is built.

## Environment Variables

### Backend

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma | `postgresql://postgres:password@localhost:5432/samokat_parody` |
| `JWT_SECRET` | Yes | Secret used to sign access and refresh tokens | `a-long-random-secret` |
| `PORT` | No | HTTP port for the API; defaults to `4200` | `4200` |

### Frontend

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `SERVER_URL` | Yes | Backend origin without the `/api` suffix | `http://localhost:4200` |

## Available Scripts

### Frontend

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Open the app on Android |
| `npm run ios` | Open the app on iOS |
| `npm run web` | Open the app in a browser |
| `npm run typecheck` | Check TypeScript types without emitting files |
| `npm run lint` | Run the Expo ESLint configuration |

### Backend

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run start:dev` | Start the API in watch mode |
| `npm run build` | Compile the NestJS application |
| `npm run start:prod` | Run the compiled production build |
| `npm run lint` | Check backend source and tests with Oxlint |
| `npm run generate` | Generate the Prisma client |
| `npm run push` | Synchronize the Prisma schema with the database |
| `npm run migrate` | Create and apply a development migration |
| `npm run studio` | Open Prisma Studio |

## API Overview

All REST endpoints use the `/api` prefix.

| Method | Endpoint | Description | Authentication |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register a user | No |
| `POST` | `/api/auth/login` | Sign in and receive tokens | No |
| `POST` | `/api/auth/login/access-token` | Refresh authentication tokens | Yes |
| `GET` | `/api/products` | List or search products | No |
| `GET` | `/api/products/by-slug/:slug` | Get a product by slug | No |
| `GET` | `/api/products/by-category/:categorySlug` | List products in a category | No |
| `GET` | `/api/categories` | List categories | No |
| `GET` | `/api/categories/by-id/:id` | Get a category by ID | No |
| `GET` | `/api/categories/by-slug/:slug` | Get a category by slug | No |
| `GET` | `/api/users/profile` | Get the current user profile | Yes |
| `PATCH` | `/api/users/profile/favourites/:productId` | Toggle a favourite product | Yes |

Authenticated requests use the following header:

```http
Authorization: Bearer <access-token>
```

Product and category creation, update, and deletion endpoints are also available and require authentication.

## Development Notes

- Prices are stored as integers in the database.
- The frontend automatically attaches the access token and attempts to refresh expired sessions.
- Authentication tokens are stored with Expo Secure Store.
- The cart is persisted locally with Redux Persist.
- The backend enables CORS for local cross-platform development.

## Disclaimer

This repository is intended for educational and portfolio purposes. Product names, imagery, and branding should be replaced before using the project in a commercial environment.
