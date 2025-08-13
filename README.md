## Getting Started

After cloning/pulling, run `npm install` to install all required libraries

To see the site, run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To see another page, add its name to the url (Ex. For the committees page, you can go to http://localhost:3000/committees)

I've already set up the page structure, so you can edit your pages by opening the corresponding folder and editing `./page.tsx`. The page auto-updates as you edit the file.

You can modify the css for that page in the `page.module.css` file. The global styles are in `global.css`

## Extra Details

###Folder Structure:
app/: Contains all routes and pages.

- (public)/: Pages for all users.
- (protected)/: Routes for authenticated users.
- (admin)/: Routes for admins only.
  auth/: Authentication pages (login, signup, etc.).
  components/: Global, reusable UI components.
  hooks/: Custom React hooks.
  lib/: Supabase clients, utility functions, and API logic.
  styles/: Tailwind configuration and global CSS.

### Component Organization:

Use Atomic Design principles for large-scale projects.
For single-page components, place them in a \_components/ folder within that page's directory (e.g., app/(protected)/dashboard/\_components/).

Hello!
