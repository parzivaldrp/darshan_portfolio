# Darshan Panchal — Portfolio

> The live site is the deliverable. This README is for devs and recruiters who landed on the GitHub repo and want a quick read of how it's built.

🌐 **Live:** https://darshan-portfolio-rose.vercel.app/
👤 **Me:** Junior Full Stack Developer based in Melbourne, AU
📧 **Reach me:** panchaldarshan507@gmail.com · [LinkedIn](https://www.linkedin.com/in/darshan-panchal-11668129a/) · [GitHub](https://github.com/parzivaldrp)

---

![Portfolio hero](./public/og-image.png)

## What is this

A personal portfolio site I designed and built end-to-end. It's a Next.js app with a public-facing side (Home / About / Projects / Contact) and a private admin panel I use to manage my project list without redeploying. The code itself is the second half of the portfolio — anyone reviewing it can see how I structure routes, handle authentication, model data, and keep the layer between the UI and the database thin.

## Notable features

- **Self-managed project list** — projects aren't hardcoded in JSX. They live in MongoDB and are CRUD-managed from a private admin panel at `/Admin`. Adding or updating a project never requires a deploy.
- **Hidden admin via Basic Auth middleware** — `/Admin` is gated by HTTP Basic Auth at the edge. There's no visible login UI on the public site (recruiters never see a "sign in" button on a portfolio — that would be weird). Credentials live in env vars.
- **Edge middleware also gates write APIs** — `/api/createProject`, `/api/editProject/:id`, `/api/deleteProject/:id` are all behind the same auth gate, so even if someone finds the endpoint, they can't write to the database.
- **Animated project showcase** — Framer Motion staggered entry, hover lift, and image scale on the project grid.
- **Light + dark theme** — system-preference aware, persists to localStorage.
- **Custom UI primitives** — small shadcn-style component library (Button, Card, Badge, Dialog, Select, Input, Textarea, Switch) hand-rolled in `src/components/ui/`.
- **Mobile-first responsive** — Tailwind's `md:` and `lg:` breakpoints, hamburger menu on small screens.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| UI | Tailwind CSS 4 + custom shadcn-style primitives |
| Database | MongoDB (via Mongoose) |
| Animation | Framer Motion |
| Icons | Lucide |
| Email (contact form) | EmailJS |
| Hosting | Vercel |

## Architecture & engineering decisions

A few of the calls I made and why — happy to walk through any of these in an interview.

### Edge middleware for admin gating, not a visible login

Adding a "Sign In" button to a portfolio site looks confusing — recruiters expect a portfolio, not a SaaS app. So `/Admin` is gated by HTTP Basic Auth in `src/middleware.ts`, scoped via `config.matcher` to **only** the admin routes and the project-write APIs. Everything else stays public. Visitors hitting any other page see no auth UI at all and don't even know an admin exists. See [`src/middleware.ts`](./src/middleware.ts).

### Project data lives in MongoDB, not JSX

It would have been easier to hardcode the projects array in a `data.ts` file. But "easier" means every time I want to update a project description or add a screenshot, I have to push code. With MongoDB + the admin panel, I update the field in the form, click save, and the public site reflects it on the next page load. That's what real CMS-driven sites do — even though this is a single-author site, the pattern is the same and I get to demonstrate it.

### `getUpdatedFields()` for partial PATCH

The edit endpoint diffs the old project against the new payload and only sends changed fields to MongoDB. Cuts down on unnecessary writes, makes audit logs cleaner, and matches how real production update handlers work. See [`src/lib/getUpdatedFields.ts`](./src/lib/getUpdatedFields.ts).

### `await params` for Next.js 15+ dynamic routes

Next.js 15 made `params` async — synchronous destructuring silently produces `undefined` and breaks dynamic route handlers. Both `editProject/[id]` and `deleteProject/[id]` await `params` correctly. A subtle gotcha that bit me once and now lives in muscle memory.

### Custom UI primitives, no off-the-shelf component library

Rather than pulling in MUI / Chakra / NextUI, the components in `src/components/ui/` are hand-rolled shadcn-style: thin React wrappers over native HTML with Tailwind classes and `class-variance-authority` for variants. Smaller bundle, full design control, and I learn how the patterns work instead of treating them as black boxes.

## Project structure

```
src/
├── app/
│   ├── About/                # About page (story, skills, education, hobbies)
│   ├── Admin/                # Project CRUD admin (gated by middleware)
│   ├── Contact/              # Contact form (EmailJS)
│   ├── Project/              # Public project showcase
│   ├── api/
│   │   ├── createProject/    # POST — create
│   │   ├── editProject/[id]/ # PATCH — partial update
│   │   ├── deleteProject/[id]/  # DELETE
│   │   └── getProject/       # GET — list
│   ├── layout.tsx, page.tsx  # Root layout + home/hero
│   └── tailwind.css          # Theme tokens (HSL CSS variables)
├── components/
│   ├── ui/                   # Custom shadcn-style primitives
│   ├── Navigation.tsx        # Sticky nav with theme toggle
│   ├── Footer.tsx
│   └── ProjectDialog.tsx     # Project detail modal
├── lib/
│   ├── connectDB.js          # Mongoose connection (singleton)
│   ├── api.ts                # Client-side fetch helpers
│   └── getUpdatedFields.ts   # Diff helper for PATCH
├── models/
│   └── Project.js            # Mongoose schema
├── types/
│   └── project.ts            # TypeScript types for Project
└── middleware.ts             # Edge-level basic auth on /Admin
```

## Local development

### Prerequisites

- Node 20+
- A MongoDB instance (Atlas free tier is fine)
- An EmailJS account if you want the contact form to send mail

### Setup

```bash
git clone https://github.com/parzivaldrp/darshanportfolio.git
cd darshanportfolio
npm install
```

### Environment variables

Create `.env.local`:

```bash
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxx
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_strong_admin_password
```

### Run it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production preview
npm run lint
```

## Other projects

The headline project featured here is **InvoicePro** — a SaaS-shaped invoice generator that uses AWS Textract to OCR receipts, with Supabase auth + Postgres RLS, PDF generation via `@react-pdf/renderer`, and email delivery via Resend. See it live and read the deeper writeup at:

→ [https://github.com/parzivaldrp/invoice-creator](https://github.com/parzivaldrp/invoice-creator)

## License

This source is published for portfolio review. Feel free to read it and learn from it. Please don't redeploy it as your own — if something's useful, take the idea, not the brand.

---

_Built by Darshan Panchal · Open to junior / entry-level developer roles in Melbourne or remote-friendly. Reach out: panchaldarshan507@gmail.com_
