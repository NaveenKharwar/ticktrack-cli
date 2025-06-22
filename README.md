
# TickTrack CLI

> A simple CLI tool to track your support tickets, tasks, and sessions — directly into Google Sheets.

TickTrack helps support engineers and developers log their daily tickets and tasks with speed and precision, without ever leaving the terminal.

---

## ✨ Features

- 🔗 Log tickets by URL, with tags and comments
- 🛠️ Record additional daily tasks (like writing docs, attending calls)
- 📊 Automatically saves data to a Google Sheet
- 📁 Creates a new sheet for each day
- ➕ Adds a `BREAK` row when you end the session
- 🧮 Shows total entries (excluding breaks)
- 🧠 All via a terminal-first, keyboard-friendly CLI

---

## 📸 Screenshot

```bash
🚀 Welcome to TickTrack CLI

🗓️  Today: Sunday, June 22, 2025
🧮 Entries Logged: 3

Initializing your workspace...
````

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/naveenkharwar/ticktrack-cli.git
cd ticktrack-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Google Sheets API

* Go to [Google Cloud Console](https://console.cloud.google.com/)
* Create a new project
* Enable **Google Sheets API**
* Create a **Service Account**, then:

  * Download the `JSON` file and rename it to `credentials.json`
  * Share your Google Sheet with the service account email

Place `credentials.json` in the root of the project.

### 4. Create a `.env` file

```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

> 🧠 You can find the Sheet ID in the URL:
> `https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit#gid=0`

---

## 🛠️ Usage

```bash
npm run start
```

* Answer the prompts
* Add ticket URLs, tags, and comments
* Record optional "Other Tasks"
* After each entry, you'll be asked if you want to log another ticket
* On exit, a `BREAK` row will be added automatically

---

## 🎯 Supported Tags

When prompted, you can select any of:

* `new`
* `follow-up`
* `rating`
* `escalated`
* `long`
* `quick`

Feel free to customize them in `prompts.ts`.

---

## ⌨️ Keyboard Tips

* **Space** to select tags
* **Enter** to confirm
* **ESC** to cancel a prompt
* Type `exit` as the ticket URL to quit
* Press `Ctrl + C` anytime to exit

---

## 📁 Project Structure

```
src/
├── index.ts         # Entry point
├── prompts.ts       # Inquirer prompts
├── sheets.ts        # Google Sheets integration
└── types.ts         # Type definitions
```

---

## 🔒 .gitignore Tip

Make sure your `.gitignore` includes:

```
credentials.json
.env
```

---

## 📄 License

MIT — © 2025 Naveen Kharwar

---

## 🙌 Credits

Thanks to:

* [`chalk`](https://www.npmjs.com/package/chalk)
* [`boxen`](https://www.npmjs.com/package/boxen)
* [`inquirer`](https://www.npmjs.com/package/inquirer)
* [`googleapis`](https://www.npmjs.com/package/googleapis)

---
