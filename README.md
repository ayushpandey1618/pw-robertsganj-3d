# 🚀 Physics Wallah Coaching Helpline Robertsganj - 3D Web App & Leads Portal

An interactive, high-converting 3D admission website and lead management platform built with **Node.js, Express, and Three.js WebGL**.

---

## 🌟 Key Features

1. **3D WebGL Science Portal**:
   - Central interactive Atomic Core with orbiting electron rings and 2,000+ cosmic quantum particles.
   - Interactive subject nodes (**Physics, Chemistry, Biology, Mathematics**) with raycast detection and dynamic HUD.
2. **Admission & Helpline Hub**:
   - Direct Call to `074288 90305` and instant WhatsApp Helpline.
   - Address: Tagore Nagar, Robertsganj, Uttar Pradesh 231216 (Plus Code: `M3P8+GH`).
   - Live 24/7 Helpline status indicator and LGBTQ+ friendly badge.
3. **Interactive NSAT Scholarship Calculator (Up to 90%)**:
   - Interactive percentage slider generating instant discount calculation and unique reservation voucher.
4. **Director / Owner Admin Portal (`/admin`)**:
   - 🔒 **Password Protected** (Default passcode: `pw2026`).
   - Real-time auto-updating table with audio chime when a student fills any form.
   - 1-Click Direct Call & WhatsApp Chat buttons for every lead.
   - Export all student leads to Excel / CSV with one click.
5. **Bilingual Support (English & हिंदी)**:
   - One-click language switch translating all content.

---

## ⚡ Quick Start Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Access**:
   - Main 3D Student Website: `http://localhost:3000`
   - Owner Leads Portal: `http://localhost:3000/admin` (Passcode: `pw2026`)

---

## 🌐 How to Deploy for Free (Render.com)

### Step 1: Push to GitHub
Run the following commands in your terminal:
```bash
git init
git add .
git commit -m "Initial commit of 3D PW Robertsganj website"
git branch -M main
```
Create a new repository on [GitHub.com](https://github.com/new) and link it:
```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### Step 2: Deploy on Render.com (2 Minutes)
1. Go to [Render.com](https://render.com) and Sign In with GitHub.
2. Click **"New +"** -> **"Web Service"**.
3. Select your GitHub repository.
4. Fill in the settings:
   - **Name**: `pw-helpline-robertsganj`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. *(Optional)* Add Environment Variable:
   - Key: `ADMIN_PASSWORD` | Value: `YourSecretPasscode`
6. Click **Deploy Web Service**!
   - Render will generate a live URL like: `https://pw-helpline-robertsganj.onrender.com`.

---

## 🏷️ How to Rebrand / White-Label for Other Coaching Centers

To sell this website to another coaching center:
1. Open `server.js` and update `CENTER_INFO`:
   - Change `name`, `phone`, `whatsappNumber`, `address`, and `results`.
2. Open `public/index.html` and update brand text/colors.
3. Open `public/css/style.css` and adjust `--pw-gold` or `--pw-cyan` to match the client's brand colors.

---

## 📞 Support & Contacts
- Helpline: `074288 90305`
- Location: Tagore Nagar, Robertsganj, Uttar Pradesh 231216
