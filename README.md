# SENYAS - Filipino Sign Language (FSL) Learning Platform

Mobile and web application for learning Filipino Sign Language with real-time gesture recognition.

---

## 🚀 Quick Start (Web)

### Clone the Repository

```bash
git clone https://github.com/v-thee/SENYAS.git
cd SENYAS
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

---

# 📱 Mobile App Setup

## Android Setup

Install Capacitor Android support:

```bash
npm install @capacitor/android
```

Add Android platform:

```bash
npx cap add android
```

Sync Capacitor:

```bash
npx cap sync
```

Open Android Studio:

```bash
npx cap open android
```

---

## iOS Setup (Mac Only)

Install Capacitor iOS support:

```bash
npm install @capacitor/ios
```

Add iOS platform:

```bash
npx cap add ios
```

Sync Capacitor:

```bash
npx cap sync
```

Open Xcode:

```bash
npx cap open ios
```

---

# 📷 Camera & Gesture Recognition Setup

## 1. Install Camera Plugin

```bash
npm install @capacitor/camera
npx cap sync
```

---

## 2. Android Camera Permission

Open:

```text
android/app/src/main/AndroidManifest.xml
```

Add inside the `<manifest>` tag:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

---

## 3. iOS Camera Permission

Open:

```text
ios/App/App/Info.plist
```

Add:

```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for gesture recognition practice</string>
```

---

# 🔄 Keeping the Project Updated

## Pull Latest Changes

```bash
git pull
npm install
npx cap sync
```

---

## After Making React Changes

```bash
npm run build
npx cap sync
npx cap open android
```

---

# 📂 Project Structure

| File / Folder | Commit to Git |
|--------------|--------------|
| `src/` | ✅ Yes |
| `GestureRecog.jsx` | ✅ Yes |
| `package.json` | ✅ Yes |
| `README.md` | ✅ Yes |
| `node_modules/` | ❌ No |
| `android/` | ❌ No |
| `ios/` | ❌ No |
| `dist/` | ❌ No |

---

# 👥 Team Roles

| Team Member | Role | Responsibilities |
|------------|------|------------------|
| Theresa | Web Developer | `npm install`, `npm run dev` |
| Danah | Mobile Developer | Capacitor integration, Android Studio setup, device testing |

---

# 🐛 Common Issues & Fixes

## Issue 1: Camera Does Not Work in Android Emulator

### Solution

Use a physical Android device instead. Android emulators have limited camera support.

---

## Issue 2: "No Target Device Found"

### Solution

- Create a virtual device using **AVD Manager**
- OR connect a physical Android device
- Enable **USB Debugging**

---

## Issue 3: `node_modules` Appears in Git Status

### Solution

```bash
echo "node_modules/" >> .gitignore
git rm -r --cached node_modules/
git commit -m "Remove node_modules from git"
```

---

## Issue 4: Permission Denied When Running Vite

### Solution

```bash
chmod +x node_modules/.bin/vite
npm run dev
```

---

## Issue 5: Android Studio Run Button is Disabled

### Solution

1. Click **Sync Project with Gradle Files**
2. Select **app** from the run configuration dropdown
3. Create or connect a device
4. Try running again

---

# 📦 Main Dependencies

| Package | Purpose |
|----------|----------|
| React 18 | UI Framework |
| Vite | Build Tool |
| Capacitor | Mobile App Wrapper |
| @capacitor/camera | Camera Access |

---

# 🚀 Production Build

## Web Build

```bash
npm run build
```

Output:

```text
dist/
```

---

## Android APK Build

```bash
npm run build
npx cap sync
npx cap open android
```

Inside Android Studio:

```text
Build
 └── Build Bundle(s) / APK(s)
      └── Build APK(s)
```

---

## iOS IPA Build (Mac Only)

```bash
npm run build
npx cap sync
npx cap open ios
```

Inside Xcode:

```text
Product
 └── Archive
```

---

# 📝 Development Guidelines

### Always

```text
✓ Run npm install after pulling updates
✓ Sync Capacitor after web changes
✓ Test camera features on real devices
✓ Keep documentation updated
```

### Never

```text
✗ Commit node_modules/
✗ Commit dist/
✗ Commit generated build files
✗ Test camera features only on emulators
```

---

# 🔗 Related Repositories

## Teacher Dashboard

```text
https://github.com/MendozaCPE/Senas_TeacherWebDashboard
```

## Gesture Recognition Repository

```text
Private Repository
```

---

# 📊 Project Progress Tracker

| Task | Status |
|--------|---------|
| React web app running | ✅ Done |
| Android Studio + emulator setup | ✅ Done |
| Camera permission added | ✅ Done |
| Capacitor integrated | ✅ Done |
| Gesture recognition component | ✅ Done |
| Camera working on real device | ⏳ Next |
| Backend API integration | ⏳ Future |
| iOS setup | ⏳ In Progress |

---

## Last Updated

```text
June 7, 2026
```

---

## 🎉 Happy Coding!

Thank you for contributing to SENYAS and helping make Filipino Sign Language learning more accessible.