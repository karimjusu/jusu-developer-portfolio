# Abdul-Karim Jusu — Developer Portfolio

A responsive personal software engineering portfolio. The frontend is a React + TypeScript application designed for Vercel. A separate Java 17 / Spring Boot REST API and PostgreSQL schema are included for the contact-message service.

## Repository structure

- `frontend/` — React, TypeScript, and Vite frontend (Vercel project root).
- `backend-springboot/` — Java 17 Spring Boot API.
- `database/schema.sql` — PostgreSQL schema reference.

## Run the frontend locally

1. Install Node.js 20.19+ or 22.12+.
2. Open a terminal in `frontend/`.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and set values as needed.
5. Run `npm run dev`.
6. Open the local URL printed by Vite.

The production build is created with `npm run build` and written to `frontend/dist`.

## Run the Spring Boot API

Requirements: Java 17+ and Maven 3.9+; PostgreSQL 14+.

Create a PostgreSQL database named `jusu_portfolio`, then run the API from `backend-springboot/`:

```bash
mvn spring-boot:run
```

The API listens on port 8080 by default. Configure the database with environment variables:

- `DATABASE_URL` — JDBC URL, e.g. `jdbc:postgresql://localhost:5432/jusu_portfolio`
- `DB_USERNAME`
- `DB_PASSWORD`
- `FRONTEND_ORIGIN` — allowed frontend origin, e.g. your Vercel URL

Contact endpoint: `POST /api/contact`

Example JSON body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to discuss a software project."
}
```

The API validates submitted fields and stores accepted messages in PostgreSQL. Before public production use, add rate limiting, abuse monitoring, email notifications, and a privacy/retention policy. Never commit database credentials or production secrets.

## Deploy the frontend to Vercel

1. In Vercel, choose **Add New → Project**.
2. Import `karimjusu/jusu-developer-portfolio` from GitHub.
3. Set **Root Directory** to `frontend`.
4. Select **Vite** as the framework preset.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Deploy.

When the Spring Boot API is deployed, add `VITE_API_BASE_URL` in the Vercel project environment variables. The current portfolio contact panel uses the email configured in `VITE_CONTACT_EMAIL`; the API endpoint is scaffolded separately and will be wired into the form in a later implementation step.

## Content accuracy

Project entries are intentionally labelled as research, in-development work, or prototypes where appropriate. Replace or expand these descriptions as you prepare each project for public demonstration. Add a professional email and verified LinkedIn URL before publishing the contact section.

## License

All rights reserved unless a separate license is added.