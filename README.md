# 🏗️ Ogun State Town Planning Directory & Permit Portal

A premium, high-performance web portal for Ogun State's **Ministry of Physical Planning and Urban Development**. This platform provides citizens with an easy way to locate town planning offices and check documentation requirements for building permits.

## 🌟 Features

-   **📍 Live Office Directory**: Real-time search by town or office name.
-   **🗺️ Google Maps Integration**: Direct navigation links for every zonal office.
-   **📋 Permit Requirements**: Categorized documentation checklist for Residential, Commercial, and Public buildings.
-   **📥 PDF Generation**: Download an official formatted checklist for offline use.
-   **🎨 Premium UI**: Cinematic architectural background, technical planning grid overlays, and smooth glassmorphism design.
-   **📱 Responsive**: Fully optimized for mobile, tablet, and desktop viewing.

---

## 🚀 How to Make This Site Live (Deploy)

This project is built using vanilla HTML, CSS, and JS, making it extremely easy to host.

### Option 1: Netlify (Fastest - 1 Minute)
1.  Go to [Netlify](https://www.netlify.com/).
2.  Log in and go to the **"Sites"** tab.
3.  Drag and drop the entire `town-planning-ogun` folder into the deployment box.
4.  Your site is now live!

### Option 2: GitHub Pages (Best for Version Control)
1.  Create a new repository on [GitHub](https://github.com/).
2.  Upload the files: `index.html`, `requirements.html`, `style.css`, and `script.js`.
3.  Go to **Settings > Pages**.
4.  Under **Branch**, select `main` and click **Save**.
5.  GitHub will give you a link (e.g., `https://username.github.io/repo-name/`).

### Option 3: Firebase Hosting
Since the app is already configured with Firebase SDKs:
1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Run `firebase login` and `firebase init hosting`.
3.  Select your project: `town-planning-offices-in-ogun`.
4.  Set the public directory to `.` (current directory).
5.  Run `firebase deploy`.

---

## 💻 Local Development

To run this project on your machine:
1.  Navigate to the `town-planning-ogun` folder.
2.  Double-click `index.html` to open it in any web browser.
3.  *Note: To ensure all Firebase features and PDF exports work perfectly, it is recommended to open the folder using the "Live Server" extension in VS Code.*

---

## 🛠️ Built With
-   **HTML5 / CSS3**: Custom grid layouts and animations.
-   **JavaScript (ES6)**: Dynamic filtering and Google Maps API query generation.
-   **Firebase SDK**: Ready for Analytics and backend scaling.
-   **html2pdf.js**: Client-side PDF generation.

---

**© 2026 Ogun State Government • Ministry of Physical Planning and Urban Development**
