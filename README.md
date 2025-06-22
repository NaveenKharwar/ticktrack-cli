# TickTrack CLI

A lightweight CLI tool for logging support tickets and daily activities directly into Google Sheets — designed for support engineers, developers, and technical teams who prefer a terminal-first workflow.

---

## Features

- Log support ticket URLs with tags and optional comments
- Add optional daily tasks (e.g., meetings, documentation)
- Automatically creates a new sheet for each day
- Writes entries to Google Sheets in real-time
- Tracks total valid entries (excluding headers and breaks)
- Appends a `BREAK` row when you end a session
- Keyboard-friendly interface, no mouse required

---

## Example Output

```

🚀 Welcome to TickTrack CLI

Today: Sunday, June 22, 2025
Entries Logged: 3

Initializing your workspace...

````

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/naveenkharwar/ticktrack-cli.git
cd ticktrack-cli
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Google Sheets API

To connect with Google Sheets, follow this [detailed setup guide](./docs/GOOGLE_SHEETS_SETUP.md) or:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Google Sheets API**
3. Create a **Service Account**
4. Generate a **JSON key**, rename it to `credentials.json`, and place it in the project root
5. Share your target Google Sheet with the service account email (Editor access)

### 4. Add Environment Variable

Create a `.env` file in your project root:

```env
GOOGLE_SHEET_ID=your_google_sheet_id_here
```

> You can find the Sheet ID in your Google Sheet URL:
> `https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_ID/edit`

---

## Usage

Run the CLI:

```bash
npm run start
```

You’ll be prompted to:

* Enter a ticket URL
* Select relevant tags
* Add optional comments or additional tasks
* Repeat for more entries or exit the session

Ending the session logs a `BREAK` row to separate the session in the sheet.

---

## Supported Tags

Available tags for tickets:

* `new`
* `follow-up`
* `rating`
* `escalated`
* `long`
* `quick`

You can customize these in `src/prompts.ts`.

---

## Keyboard Shortcuts

| Key        | Action                          |
| ---------- | ------------------------------- |
| `Space`    | Select/deselect tags            |
| `Enter`    | Confirm input                   |
| `Esc`      | Cancel prompt                   |
| `exit`     | Type to exit from ticket prompt |
| `Ctrl + C` | Force quit the application      |

---

## Project Structure

```
ticktrack-cli/
├── src/
│   ├── index.ts       // Entry point
│   ├── prompts.ts     // User input logic
│   ├── sheets.ts      // Google Sheets integration
│   └── types.ts       // Shared TypeScript types
├── credentials.json   // Google service account key (not committed)
├── .env               // Environment variables
└── README.md
```

---

## Git Ignore Recommendation

Be sure to include sensitive files in `.gitignore`:

```
.env
credentials.json
```

---

## Optional: Use as a Global CLI

To use `ticktrack` from anywhere in your terminal:

1. Add the following shebang at the top of `src/index.ts`:

   ```ts
   #!/usr/bin/env node
   ```

2. Then:

   ```bash
   chmod +x src/index.ts
   npm link
   ```

Now you can run:

```bash
ticktrack
```

---

## License

MIT License
© 2025 Naveen Kharwar

---

## Built With

* [chalk](https://www.npmjs.com/package/chalk) – CLI text styling
* [boxen](https://www.npmjs.com/package/boxen) – Banner formatting
* [ora](https://www.npmjs.com/package/ora) – Terminal spinners
* [inquirer](https://www.npmjs.com/package/inquirer) – Interactive prompts
* [googleapis](https://www.npmjs.com/package/googleapis) – Google Sheets integration
* [dotenv](https://www.npmjs.com/package/dotenv) – Environment variable loader
* [dayjs](https://www.npmjs.com/package/dayjs) – Date/time formatting

---

For help or feedback, feel free to open an issue or contact the maintainer.
