# The Meridian Grid

A full-stack Industrial IoT (IIoT) platform designed for the real-time monitoring, control, and data analysis of a machine fleet.

> **Note:** This project is currently under active development as part of a 12-week intensive learning program.

---

## Core Technologies (Backend Foundation)

The backend foundation is built with a modern, scalable, and type-safe stack:

-   **Runtime:** Node.js
-   **Language:** TypeScript
-   **Framework:** Express.js
-   **Database:** PostgreSQL (running in Docker)
-   **ORM:** Prisma
-   **Environment:** Docker & Docker Compose

---

## Getting Started

To get the backend service running locally, follow these steps.

### Prerequisites

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/en/) (v20.x or later recommended, via `nvm`)
-   [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
-   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the Repository

```bash
git clone https://github.com/Novav20/TheMeridianGrid.git
cd TheMeridianGrid
```

### 2. Configure Environment Variables

This project uses two `.env` files for configuration: one for Docker Compose at the root, and one for the Node.js application and Prisma tools within the backend service.

#### Root Environment (`.env`)

At the **project root** (`TheMeridianGrid/`), create a file named `.env`. This file provides secrets to Docker Compose.

```bash
touch .env
```

Open this file and add the following content:

```env
# TheMeridianGrid/.env
# Used by Docker Compose to set the database password

POSTGRES_PASSWORD=mysecretpassword
```

#### Backend Environment (`meridian-grid-backend/.env`)

Navigate into the backend directory and create another `.env` file. This file provides secrets to the Node.js application and the Prisma CLI.

```bash
cd meridian-grid-backend
touch .env
```

Open this file and add the following content. The password must match the `POSTGRES_PASSWORD` you set in the root `.env` file.

```env
# meridian-grid-backend/.env
# Used by the Prisma CLI and the application seed script

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/meridian-grid-db"

# Credentials for the seed script
ADMIN_APP_USER="admin@meridian.grid.com"
ADMIN_APP_PASSWORD="ChangeMe_AdminPassword123!"
```

### 3. Install Dependencies

```bash
# From the meridian-grid-backend directory
pnpm install
```

### 4. Start the Database

From the **root `TheMeridianGrid` directory**, start the PostgreSQL database container.

```bash
# Return to the project root
cd ..

# Start the container
docker-compose up -d
```

### 5. Run Database Migrations & Seeding

From the **`meridian-grid-backend` directory**, apply the database schema and populate it with initial data.

```bash
# Navigate back to the backend
cd meridian-grid-backend

# Apply the schema
npx prisma migrate dev

# Seed the database with initial users and machines
npx prisma db seed
```

### 6. Run the Development Server

You are now ready to start the backend server.

```bash
# From the meridian-grid-backend directory
pnpm dev
```

The server should now be running on `http://localhost:3000`.

---

## Project Structure

This project is structured as a monorepo to contain all related services in one place.

```
/TheMeridianGrid
├── .env                    # Docker Compose Environment
├── docker-compose.yml      # Docker Compose Configuration
├── meridian-grid-backend/  # Node.js + Express API (Week 1)
│   └── .env                # Backend Application Environment
└── meridian-grid-frontend/ # React + TypeScript UI (coming soon)
```
