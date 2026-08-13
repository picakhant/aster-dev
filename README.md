# Aster.dev — UCS-Pyay Portfolio

A 100% free, self-contained portfolio template for students of the University of Computer Studies, Pyay.

## Getting Started

Install dependencies and copy the environment file:

```bash
npm install
cp .env.example .env.local
```

Then fill in the environment variables:

| Variable       | Description                                                          |
| -------------- | -------------------------------------------------------------------- |
| `REVALIDATE_SECRET` | Reserved for on-demand revalidation (optional)                  |

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint
