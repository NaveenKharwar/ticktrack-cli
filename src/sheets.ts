import { google } from "googleapis";
import { TicketLogEntry } from "./types";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!SHEET_ID) throw new Error("❌ Missing GOOGLE_SHEET_ID in .env");

const CREDENTIALS_PATH = path.resolve("credentials.json");
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));

const auth = new google.auth.GoogleAuth({
	credentials,
	scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

/**
 * Ensure today's sheet exists; if not, create it with headers
 */
async function ensureTodaySheet(): Promise<string> {
	const todayTitle = dayjs().format("YYYY-MM-DD");

	const response = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
	const existingSheets = response.data.sheets || [];

	const sheetExists = existingSheets.some(
		(s) => s.properties?.title === todayTitle
	);

	if (!sheetExists) {
		console.log(chalk.yellow(`📄 Creating new sheet: ${todayTitle}`));

		await sheets.spreadsheets.batchUpdate({
			spreadsheetId: SHEET_ID,
			requestBody: {
				requests: [
					{
						addSheet: {
							properties: {
								title: todayTitle,
							},
						},
					},
				],
			},
		});

		// Add header row
		await sheets.spreadsheets.values.append({
			spreadsheetId: SHEET_ID,
			range: `${todayTitle}!A1`,
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [["Time", "Ticket URL", "Tags", "Comment", "Other Tasks"]],
			},
		});
	}

	return todayTitle;
}

/**
 * Count valid entries (excluding header and "Break" rows)
 */
async function getTodayEntryCount(sheetTitle: string): Promise<number> {
	const res = await sheets.spreadsheets.values.get({
		spreadsheetId: SHEET_ID!,
		range: `${sheetTitle}!A2:E`, // ✅ full row
	});

	const rows = res.data.values || [];

	// ✅ Count only rows where first column is a time like 12:30
	const validEntries = rows.filter((row) =>
		/^\d{2}:\d{2}$/.test(row[0]?.trim())
	);

	return validEntries.length;
}

/**
 * Log a new ticket entry
 */
export async function logTicket(entry: TicketLogEntry): Promise<void> {
	const sheetTitle = await ensureTodaySheet();
	const now = dayjs().format("HH:mm");

	const row = [
		now,
		entry.ticketUrl,
		entry.tags.join(", "),
		entry.comment || "",
		entry.otherTasks?.trim() || "",
	];

	await sheets.spreadsheets.values.append({
		spreadsheetId: SHEET_ID,
		range: `${sheetTitle}!A1`,
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [row],
		},
	});

	const count = await getTodayEntryCount(sheetTitle);

	console.log(chalk.green(`\n✅ Logged at ${now}`));
	console.log(`${chalk.cyan("📎 Ticket:")} ${entry.ticketUrl}`);
	console.log(
		`${chalk.magenta("🏷️ Tags:")} ${entry.tags
			.map((tag) => chalk.bold(tag))
			.join(", ")}`
	);
	if (entry.comment) {
		console.log(`${chalk.blue("💬 Comment:")} ${entry.comment}`);
	}
	if (entry.otherTasks) {
		console.log(`${chalk.gray("🛠️ Other Tasks:")} ${entry.otherTasks}`);
	}
	console.log(chalk.yellow(`🧮 Total valid entries today: ${count}`));
}

/**
 * Log a break row to indicate end of session
 */
export async function logBreakRow(): Promise<void> {
	const sheetTitle = await ensureTodaySheet();

	await sheets.spreadsheets.values.append({
		spreadsheetId: SHEET_ID,
		range: `${sheetTitle}!A1`,
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [["BREAK", "", "", "", ""]],
		},
	});

	console.log(chalk.gray("⏸️  Logged a 'Break' row in the sheet.\n"));
}

/**
 * Public wrapper for today's entry count — used in index.ts
 */
export async function getTodayEntryCountPublic(): Promise<number> {
	const sheetTitle = await ensureTodaySheet();
	return await getTodayEntryCount(sheetTitle);
}
