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

The backend service requires a `.env` file for its database connection and other secrets.

```bash
# Navigate to the backend directory
cd meridian-grid-backend

# Create the .env file by copying the example
# (Note: .env.example does not exist yet, but this is a best practice to add later) 
touch .env
```

Now, open the newly created `.env` file and add the following content. These values must match the credentials in your root `docker-compose.yml` file.

```env
# .env

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/meridian-grid-db"

# Add admin credentials for the seed script
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
# From the project root
docker-compose up -d
```

### 5. Run Database Migrations & Seeding

From the **`meridian-grid-backend` directory**, apply the database schema and populate it with initial data.

```bash
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
/meridian-grid
├── .github/                # CI/CD Workflows (coming soon)
├── meridian-grid-backend/  # Node.js + Express API (Week 1)
└── meridian-grid-frontend/ # React + TypeScript UI (coming soon)
```
