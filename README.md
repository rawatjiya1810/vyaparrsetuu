# VyaparSetu — AI Business Advisory for Local & Rural Entrepreneurs

A simple, trustworthy, AI-powered digital advisory platform designed specifically for local and rural micro-entrepreneurs in India.

---

## Netlify Deployment Guide

Follow these steps to deploy VyaparSetu from GitHub to Netlify:

1. **Extract the ZIP archive**:
   Extract `VyaparSetu-Netlify-Deploy.zip` to your computer.

2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/) and create a new repository (e.g., `vyaparsetu`).
   - Push the extracted codebase to your repository:
     ```bash
     git init
     git add .
     git commit -m "Initial VyaparSetu production commit"
     git branch -M main
     git remote add origin https://github.com/<your-username>/vyaparsetu.git
     git push -u origin main
     ```

3. **Deploy on Netlify**:
   - Log in to your [Netlify Dashboard](https://app.netlify.com/).
   - Click **Add new site** $\rightarrow$ **Import an existing project**.
   - Select **GitHub** and authorize access to your `vyaparsetu` repository.

4. **Build Settings Verification**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   *(Netlify automatically detects these settings from `netlify.toml`)*

5. **Environment Variables Configuration**:
   - In Netlify, go to **Site settings** $\rightarrow$ **Environment variables**.
   - (Optional) Add `VITE_API_BASE_URL` if connecting to a separate production backend server.
   - Click **Deploy Site**.

6. **Access Deployed Application**:
   - Open your generated Netlify URL (e.g., `https://vyaparsetu.netlify.app`) and perform post-deployment verification.

---

## Environment Variables

| Variable Name | Required | Purpose / Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Optional | Set to your hosted production backend server URL (e.g., `https://api.vyaparsetu.in`). If left empty, the frontend uses relative `/api/advisor/chat` endpoints with automatic local intelligence fallback. |

> **Security Note**: Never commit API keys or secret credentials to frontend source code or Netlify frontend environment variables. Confidential keys (such as `GEMINI_API_KEY`) belong on your secure backend server.

---

## Backend & CORS Configuration

- The frontend calls `/api/advisor/chat` relative to `VITE_API_BASE_URL` or the current domain.
- **CORS Action**: If your backend server is hosted separately (e.g., on Railway, Render, Heroku, or AWS), add your final Netlify site URL (e.g., `https://vyaparsetu.netlify.app`) to your backend's allowed CORS origins list.
- **Offline / Standalone Resilience**: If the backend server is temporarily unreachable or unconfigured, VyaparSetu automatically falls back to its built-in local intelligence engine to ensure non-stop user advisory service.

---

## Netlify SPA Routing Configuration

VyaparSetu is built as a single-page application (SPA). This repository includes a pre-configured `netlify.toml` file containing:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This prevents 404 errors when refreshing direct routes such as `/dashboard`, `/market-scan`, `/growth-score`, `/advisor`, or `/settings`.

---

## Post-Deployment Verification Checklist

Verify the deployed live site against this checklist:

- [ ] **Homepage**: Loads with hero headline, trust badges, and interactive live explorer widget
- [ ] **Get Started**: Opens registration modal cleanly
- [ ] **Login / Demo**: 1-Click Demo login works and loads Ramesh Kumar's dashboard
- [ ] **Dashboard Overview**: Displays Growth Score, Quick Actions, and Top Opportunities
- [ ] **Navigation**: Sidebar and top bar navigation switch views without page reload
- [ ] **Language Switcher**: Dynamically translates interface between English and Hindi
- [ ] **Business DNA**: Views and updates business profile details
- [ ] **Market Scan**: Interactive map, local competitor filters, supplier savings
- [ ] **Growth Score**: Breakdown of operational, digital, financial, and market scores
- [ ] **Opportunities**: Recommended hyperlocal gaps and B2B connections
- [ ] **Financial Structure**: Working capital calculator, cash flow charts, Mudra/SVANidhi matches
- [ ] **Risk Check**: Stress test simulation and risk mitigation advisories
- [ ] **Business Plan**: Formal micro-enterprise business plan generator
- [ ] **30-Day Plan**: Step-by-step 4-week task checklist with task modals
- [ ] **Community Connect**: Local merchant network directory & proposal composer
- [ ] **VyaparSetu Advisor**: AI advisory chat streaming and responses
- [ ] **Voice Assistant**: Mic button captures voice input in native languages
- [ ] **Settings**: Language preferences, WhatsApp/Scheme alert toggles
- [ ] **Help & Support**: WhatsApp desk, toll-free helpline, and localized FAQs
- [ ] **Official Logo & Favicon**: Crisp transparent logo renders across headers/drawers
- [ ] **Direct URLs**: Page refresh on `/dashboard` or `/advisor` does not 404
- [ ] **Mobile Responsiveness**: Drawer menu, responsive grid, and touch targets work on mobile
