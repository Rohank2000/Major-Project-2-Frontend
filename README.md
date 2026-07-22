# Anvaya CRM (Major Project 2) - Lead Management App (Frontend)

The Anvaya CRM app will focus on lead management with defined steps for each lead's lifecycle. We will assign sales agents to leads and allow users to add comments or updates to each lead.

## Tech Stack
React 19, Vite 8, Axios, react-select, ESLint and more to be updated in future.

## Getting Started
1. Clone the repo
2. `npm install`
3. Create `.env` with `VITE_BASE_URL=<your-backend-url>`
4. `npm run dev`

## Available Scripts
- `npm run dev` – start dev server (network-hosted)
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## Project Structure
src/
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── hooks/
│   ├── useAxiosGET.jsx
│   └── useToast.jsx
└── pages/
    └── leadForm.jsx

## Environment Variables
| Variable        | Description           |
|-----------------|-----------------------|
| `VITE_BASE_URL` | Backend API base URL  |
