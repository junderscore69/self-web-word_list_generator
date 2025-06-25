# 🧠 Word List Generator

A modern, flexible web app for generating and manipulating word lists with powerful options and a slick, responsive UI.

---

### 💡 Why This Exists

I forgot my crypto wallet password. I made it by interlacing multiple words to make it “secure,” but forgot which words — only the pattern stuck. This tool helped me turn a wild pile of word lists into real guesses.

---

### 🤖 Project Attribution

All features and UI logic for this project were created with help from [ChatGPT](https://openai.com/chatgpt) by OpenAI.

---

## 📦 Features

- Upload multiple `.txt` files with word lists
- Combine words using different methods:
  - Simple Combination
  - Interweave
  - Capitalization Variation
  - Character Insertion
  - Reverse Caps (invert case)
- Include original words in output (optional)
- Estimate output size before generating
- Download final list as a `.txt` file
- Responsive modern UI

---

## 🚀 Setup

Get started in a few steps:

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/word-list-generator.git
cd word-list-generator
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Run the App

- On Windows: double-click `start-app.bat`
- Or run:

```sh
npm run dev
```

### 4️⃣ Open in Your Browser

Visit [http://localhost:5173](http://localhost:5173)

---

## 📋 How to Use

1. Upload one or more `.txt` files (one word per line)
2. Choose a combination method
3. (Optional) Add a character for insertion or check "Include original words"
4. Click the big “Generate # Words” button
5. Download your new word list

---

## ⚙️ Combination Methods

- **Simple Combination**: Join words from each file
- **Interweave**: Alternate characters from multiple words
- **Capitalization Variation**: Generate every case variation of words
- **Character Insertion**: Insert a character at every position in each word
- **Reverse Caps**: Invert the case of each letter

---

## 📁 Project Files

- `src/components/`: UI components
- `src/utils/`: Utility functions
- `App.tsx`: Main application logic
- `start-app.bat`: Easy start script (Windows)
- `package.json`: Project config and dependencies
- `README.md`: You're reading it!

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for full details.
