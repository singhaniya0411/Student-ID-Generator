# 🎓 Student ID Card Generator

A simple and efficient web application to generate customizable student ID cards with downloadable image output and local storage management—no backend or cloud required.

---

## 🧠 Thought Process

The idea behind this project stemmed from a need for **offline, quick, and secure generation of student ID cards**, especially useful in school environments where:

- Internet connectivity may be unreliable.
- Administrators want a **lightweight tool** to store and generate cards without complex setups.
- There's a need to **download or print** ID cards on the go.

Instead of integrating Google Firebase or NoSQL database, the goal was to **leverage localStorage** and **image compression** to stay within browser limits while still handling photos, QR codes, and user details.

---

## ✨ Features

- 📸 Upload student photo (compressed for localStorage)
- 🧾 Input form for student details: name, class, roll number, rack number, bus route, allergies, etc.
- 🎨 Switch between ID card **templates** (modern and classic)
- 📦 Store multiple ID cards in browser’s `localStorage`
- 📥 Download the card as a PNG image
- 🗑️ Delete specific ID cards
---

## 🛠️ Tech Stack

- ReactJS (Frontend)
- Tailwind CSS (Styling)
- html-to-image (PNG export)
- react-qr-code (QR generation)
- localStorage (Data persistence)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/singhaniya0411/Student-ID-Generator.git
cd Student-ID-Generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

The app will run locally on [http://localhost:5173](http://localhost:5173)

---

## 📂 Folder Structure

```
src/
│
├── components/
│   ├── StudentForm.jsx        # Form to enter student details
│   ├── IDCardPreview.jsx      # ID card design and download/delete logic
│   ├── SavedCard.jsx          # Saved ID Card in localStorage
│
├── App.jsx                    # Main application logic
├── index.js
└── styles.css
```

---

## 💡 How Template Switching Works

Each ID card renders based on a `template` prop. When you toggle the template type, it updates the design by applying different Tailwind classes.

```js
const templateStyles =
    template === "modern"
      ? "bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-700 text-white border border-          white shadow-xl"
      : "border border-gray-400 p-6 bg-white text-gray-900";
```

> Make sure to lift the template state to a shared component (like `App.jsx`) to make it accessible across `StudentForm` and `IDCardPreview`.

---

## 🔐 Notes on LocalStorage

- Photos are resized before storage to avoid `QuotaExceededError`.
- Each ID card is stored as a JSON object in an array under `studentCards`.

---

## 🧹 Future Improvements

- Export all ID cards in bulk as ZIP
- Add class-wise or section-wise filtering
- Integrate simple print layout
- Dark mode support

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
