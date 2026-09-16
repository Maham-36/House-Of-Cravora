# House of Cravora — React site

## Run it locally

You need [Node.js](https://nodejs.org) installed (v18 or newer).

```bash
# 1. unzip this folder, then open a terminal inside it
cd house-of-cravora

# 2. install dependencies
npm install

# 3. start the dev server
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`) — open that in
your browser to see the site with hot-reload (edits to `src/App.jsx` show up
instantly).

## Before going live

- Open `src/App.jsx` and set `WHATSAPP_NUMBER` near the top to your real
  WhatsApp number (country code + number, digits only, no `+` or spaces).
- Double check the address text (`ADDRESS_TEXT`) and hours in the same file.

## Build for deployment

```bash
npm run build
```

This creates a `dist/` folder with static files you can upload anywhere
(Vercel, Netlify, GitHub Pages, your own hosting, etc.). For Vercel or
Netlify, you can also just connect the project's Git repo and it will run
`npm run build` automatically.

## Project structure

```
house-of-cravora/
├── index.html          # HTML entry point
├── package.json         # dependencies + scripts
├── vite.config.js       # build tool config
└── src/
    ├── main.jsx          # mounts the app
    └── App.jsx           # the whole site (menu, cart, hero, etc.)
```
# House-Of-Cravora
