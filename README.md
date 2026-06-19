# Responsible Computing Club @ SJSU
Welcome to the RCC website repository! If you're a new team member and you're
just getting your feet wet with web development, you are in the right place. 

This document is your map. Modern web development can feel overwhelming because
there are *so many* tools out there. This README explains our specific tech
stack: what each tool does, why we chose it, and how they all fit together.

## The Golden Rule: Use What We Have

Before we dive in, please note our core philosophy: **Avoid adding new NPM
dependencies if our current stack can already do the job.** It is incredibly
easy to ask an LLM (like ChatGPT or Claude) for a solution and have it
confidently tell you to `npm install cool-new-package`. However, every package
we add increases our bundle size, introduces potential security vulnerabilities,
and gives future maintainers more code to learn. 

We carefully selected our current tools because they are powerful enough to
handle 99% of our needs. If you think you need a new package, check this
document first to see if one of our existing tools already solves your problem!

If you *really* think you need to add a dependency, **check with the team
leads** before adding it.

---

## 🛠️ Getting Started (Build Instructions)

To get the project running locally on your machine, ensure you have **Node.js**
(v18+ recommended) and **NPM** installed. 

1. **Clone the repository and switch to the correct branch:**

```bash
git checkout main
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Open the Supabase project. Underneath the "RCC Site" title of the project's
homepage, you should see a "Copy" modal. Click it, then click "Get Connected" at
the bottom. Select "Next.js" as the Framework, then scroll down to step 2: "Add
files". Copy the contents of `.env.local`, and save it in a `.env.local` file at
the root of this repository. You now have everything you need to connect to the
Supabase backend.

4. **Run the development server:**

```bash
npm run dev
```

Open
[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)
in your browser to see the site running.

---

##  The Big Picture: How the Pieces Fit Together

Our tech stack is built around Next.js, React, and Supabase.

### 1. Next.js

Next.js is a framework built on top of React. It makes it easy to build a build
an application with [server-side
rendering](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering)
and provides conventions for structuring our application.

* **What it offers:** 
    - It handles **Routing**: when a user navigates to `/events`, Next.js knows
      which file to show via the `app/` directory).
    - It manages server-side rendering versus client-side rendering.
* **Why we chose it:** It gives us a highly optimized, standardized structure so
  we don't have to manually stitch web pages together.
* **Documentation:** [Next.js Docs](https://nextjs.org/docs)

### 2. React

React is the de-facto JavaScript user interface library.

* **What it offers:** It allows us to build interactive, reusable components
  (like a `<Navbar />` or a `<Button />`) and handles "state" (e.g., remembering
  if a dropdown menu is currently open or closed).
* **Why we chose it:** It is the industry standard for frontend development with
  massive community support.
* **Documentation:** [React Docs](https://react.dev)

### 3. Tailwind CSS

Tailwind is a "utility-first" CSS framework.

* **What it offers:** Instead of writing separate `.css` files with custom class
  names, we style our React components directly using Tailwind's utility classes
  (like `className="bg-blue-500 text-white p-4"`).
* **Why we chose it:** It keeps styling consistent, speeds up development, and 
  allows us to offload the energy of structuring and maintaining CSS files.
  Also, its really popular and good to know if you plan to pursue front-end
  development roles.
* **Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)

### 4. ShadCN & Base UI

ShadCN is a collection of styled, accessible UI components (like Modals,
Dropdowns, and Calendars).

* **Important Architecture Note:** While standard ShadCN usually relies on Radix
  UI for its underlying logic, **our codebase chooses to use Base UI instead 
  of Radix**. Base UI provides the unstyled, accessible foundational
  behavior. ShadCN wraps these components with visually appealing designs,
  giving us a consistent look and feel to all the components on our site.
  When looking at the documentation for any ShadCN component, **make sure you
  select the Base UI variant at the top of the page**.
* **What it offers:** ShadCN *copies* the raw component code directly into our
  `components/ui` folder rather than hiding it in `node_modules`.
* **Why we chose it:** If you need a switch, an accordion, or a dialog, **do not
  install an NPM package.** Look in our ShadCN components first. You can
  customize the copied code directly to fit our design needs perfectly.
* **Documentation:** [ShadCN UI Docs](https://ui.shadcn.com) | [Base UI
  Docs](https://base-ui.com)

### 5. React Hook Form & Zod

These two libraries work hand-in-hand to manage everything related to forms,
inputs, and user submissions.

* **React Hook Form:** Manages the "state" of the form. It tracks what the user
  is typing, handles form submission, and ensures our inputs perform quickly
  without slowing down the page. It is important that **once a form uses React
  Hook Form to manage state, you don't manually update state in raw React**.
* **Zod:** Acts as our schema validation library. It checks
  the data submitted via React Hook Form to make sure it matches our exact rules
  (e.g., ensuring an email is properly formatted, or a password is long enough).
  Users receive warnings and errors when they input invalid data, which improves
  user experience.
* **Why we chose them:** These are the recommended validation and state
  management libraries for ShadCN. All the documentation in ShadCN uses them as
  a reference. React Hook Form in particular abstracts away the complexity of
  managing the state of a form as a user interacts with it while optimizing
  performance over other approaches.
* **Documentation:** [React Hook Form Docs](https://react-hook-form.com) | [Zod
  Docs](https://zod.dev)

### 6. Supabase

Supabase is our Backend-as-a-Service (BaaS), built on top of a powerful
PostgreSQL database.

* **What it offers:** It handles user Authentication (sign-ups, logins, session
  security) and stores all our data (club events, articles, user profiles). It
  also provides an easy interface for setting up storage buckets for hosting
  static assets like ambassador headshots.
* **Why we chose it:** Supabase is basically just Postgres under the hood.
  Postgres is the most popular database. Supabase manages the database for us
  and provides a convenient web interface for managing it. It has a generous
  free tier, easy to set up authentication, and a convenient TypeScript API. It
  makes developing the backend a breeze because it sets up REST APIs
  automatically for tables based on pre-defined authorization policies.
* **Note:** Since Supabase is fundamentally just a Postgres database, a lot of
  the time the features you're looking for are actually in the Postgres
  documentation. If you can't find an answer in the Supabase documentations, try
  reading the Postgres documentation.
* **Documentation:** [Supabase Docs](https://supabase.com/docs) | [Postgres
  Docs](https://www.postgresql.org/docs/current/index.html)

---

## Database Security: Row Level Security (RLS)

Because Supabase allows the frontend to communicate directly with the database,
security is paramount. We handle this using PostgreSQL's **Row Level Security
(RLS)**.

> ⚠️ **Strict Policy:** Every single table created in our database must have RLS
> enabled. Exceptions may only be granted if you provide a compelling reason to
> disable it.

By default, a database table allows anyone to read or write data if they have
the API key. RLS acts as a firewall directly on the database tables. It allows
us to write specific SQL rules (Policies) determining exactly who can interact
with data. For example:

* *Public Read, Admin Write:* Anyone can view an event, but only users with an
  `admin` role can create or update an event.
* *User-Owned Data:* A user can read and write their own profile details, but
  they cannot read or change another user's profile details.

When building or modifying features, always verify that your database tables are
locked down with appropriate RLS policies. You can audit RLS policies in the
Supabase admin web dashboard, or using `supabase db lint` (with the [Supabase
CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)
installed).

---

## Database Migrations: Managing the Schema

Our database structure (the schema) is tracked entirely in code. You will find
our migration files and database configuration inside the `supabase/` directory.
**Do not make manual, untracked changes directly to the production database.**

We use two primary tools to manage database changes:

### The Supabase CLI

The Command Line Interface (CLI) is what you will use locally to create and
manage migrations.

* When you need to alter a table or add a new one, you will use the CLI to
  generate a new migration file in the `supabase/migrations/` folder.
* This ensures that your database changes are committed to Git, allowing other
  developers to sync their local databases with your changes.

### The Supabase Dashboard (Web Page)

The web-based dashboard is a powerful visual interface provided by Supabase.

* It is excellent for viewing data quickly, testing SQL queries in the SQL
  Editor, checking auth logs, or visually prototyping a table design.
* **Workflow Best Practice:** You can use the local web dashboard to prototype
  your tables visually, but you must use the CLI to capture those changes into a
  migration file before pushing your code.

---

## Summary Checklist for Developers

When you are assigned a task, keep this workflow in mind:

* **Need a new page?** Add a folder/file to the Next.js `app/` router.
* **Need to build a basic UI element?** Use React + Tailwind CSS.
* **Need a complex UI element (like a popover or select menu)?** Look in
  `components/ui` for our ShadCN/BaseUI components.
* **Need to build a form?** Wire it up with React Hook Form and validate the
  inputs using a Zod schema.
* **Need to update the database?** Check the `supabase/` folder, use the
  Supabase CLI to create a migration, and make sure Row Level Security (RLS) is
  strictly enabled.

---

## Special Mention: tsconfig.json
Please, **do not** change `compilerOptions.jsx`! Next.js *requires*
this value to be `"react-jsx"`, and will overwrite it if you change it! If you
write a commit that changes this option, it **will be rejected**!
