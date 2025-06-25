# Word List Generator

A modern, flexible web app for generating and manipulating word lists with advanced options and a beautiful, modern UI.

---

## ✨ Features
- **Upload multiple .txt files** with word lists
- **Combination methods:**
  - Simple Combination
  - Interweave
  - Capitalization Variation
  - Character Insertion
  - Reverse Caps (invert case)
- **Include original words** in output (optional)
- **Estimate output size** before generating
- **Download results** as a text file
- **Beautiful, responsive UI**

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/yourusername/word-list-generator.git
cd word-list-generator
```

### 2. Install dependencies
```sh
npm install
```

### 3. Start the app
- **Recommended:** Double-click `start-app.bat` (Windows)
- **Or:**
  ```sh
  npm run dev
  ```

### 4. Open in your browser
Go to [http://localhost:5173](http://localhost:5173)

---

## 📝 Usage
1. **Upload** one or more `.txt` files (one word per line; spaces are preserved)
2. **Choose a combination method**
3. **(Optional)** Enter a character for insertion or check "Include original words"
4. **Click** the big "Generate N Words" button
5. **Download** your generated word list

---

## 🛠️ Combination Methods
- **Simple Combination:** Concatenates words from each file
- **Interweave:** Alternates characters from each word
- **Capitalization Variation:** Capitalizes each letter position in each word
- **Character Insertion:** Inserts a character at every position in each word
- **Reverse Caps:** Inverts the case of every letter in each word

---

## 📦 Project Structure
```
word-list-generator/
├── src/
│   ├── components/
│   ├── utils/
│   ├── App.tsx
│   └── ...
├── public/
├── package.json
├── start-app.bat
├── .gitignore
└── README.md
```

---

## 📄 License
[MIT](LICENSE)

---

## 🙌 Credits
- UI/UX: [Your Name]
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Material UI](https://mui.com/)
