# 🕓 TickTrack CLI

> A simple CLI tool to log support tickets and daily tasks straight into Google Sheets.

TickTrack helps support engineers and developers record their work—ticket by ticket—with speed, structure, and simplicity, all from your terminal.

## ✨ Features

- 🔗 Log tickets by URL, with tags and comments
- 🛠️ Add optional daily tasks (like documentation, meetings)
- 📊 Automatically writes data to a connected Google Sheet
- 🗓️ Creates a new sheet each day automatically
- ➕ Adds a `BREAK` row at end of session
- 🧮 Displays total valid entries for the day
- ⌨️ Terminal-based workflow — no mouse needed!

## 📸 Screenshot

```bash
🚀 Welcome to TickTrack CLI

🗓️  Today: Sunday, June 22, 2025
🧮 Entries Logged: 3

Initializing your workspace...
````

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ticktrack-cli.git
cd ticktrack-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Google Sheets API

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Google Sheets API**
4. Create a **Service Account**
5. Download the credentials as a `.json` file and rename it to `credentials.json`
6. Share your Google Sheet with the **service account email** (read/write access)

Place the `credentials.json` file in the root of the project.

### 4. Create a `.env` file

```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

> 🔍 You can find your Sheet ID in the URL:
> `https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit#gid=0`

## 🛠️ Usage

```bash
npm run start
```

* Answer the prompts
* Enter ticket URL, select tags, and add comments
* Optionally add other tasks (opens your default editor)
* After each entry, you'll be asked if you'd like to log another
* Exiting the session adds a `BREAK` row

## 🎯 Supported Tags

You can choose from:

* `new`
* `follow-up`
* `rating`
* `escalated`
* `long`
* `quick`

These can be customized in `prompts.ts`.

## ⌨️ Keyboard Shortcuts

* `Space` to select a tag
* `Enter` to continue
* `Esc` to cancel a prompt
* Type `exit` in ticket prompt to quit
* `Ctrl + C` to exit immediately

## 📁 Project Structure

```
ticktrack-cli/
├── src/
│   ├── index.ts       # Main CLI logic
│   ├── prompts.ts     # Inquirer questions
│   ├── sheets.ts      # Google Sheets API logic
│   └── types.ts       # Shared types
├── credentials.json   # Your Google credentials (not tracked)
├── .env               # Your environment variables
└── README.md
```

## 🧼 .gitignore Tip

Add the following to `.gitignore`:

```
.env
credentials.json
```

## 📦 Local CLI Setup (Optional)

To run `ticktrack` globally from your terminal:

1. Add this at the top of `src/index.ts`:

   ```ts
   #!/usr/bin/env node
   ```

2. Make it executable:

   ```bash
   chmod +x src/index.ts
   npm link
   ```

Now you can use:

```bash
ticktrack
```

## 📄 License

MIT — © 2025 Naveen Kharwar

## 🙌 Built With

* [`chalk`](https://www.npmjs.com/package/chalk) – CLI colors
* [`boxen`](https://www.npmjs.com/package/boxen) – Welcome banners
* [`ora`](https://www.npmjs.com/package/ora) – Terminal loaders
* [`inquirer`](https://www.npmjs.com/package/inquirer) – Interactive prompts
* [`googleapis`](https://www.npmjs.com/package/googleapis) – Sheets API
* [`dotenv`](https://www.npmjs.com/package/dotenv) – Environment variables
* [`dayjs`](https://www.npmjs.com/package/dayjs) – Time formatting
