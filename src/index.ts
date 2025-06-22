import dotenv from "dotenv";
import chalk from "chalk";
import boxen from "boxen";
import dayjs from "dayjs";
import inquirer from "inquirer";

import { askTicketDetails } from "./prompts";
import { logTicket, logBreakRow, getTodayEntryCountPublic } from "./sheets";

dotenv.config();

// Graceful exit on Ctrl+C
process.on("SIGINT", () => {
	console.log(chalk.yellow("\n\n👋 Exiting TickTrack (Ctrl+C pressed). Bye!\n"));
	process.exit(0);
});

/**
 * Show welcome banner with today's date and current entry count
 */
async function showWelcomeBox() {
	const today = dayjs().format("dddd, MMMM D, YYYY");
	const entryCount = await getTodayEntryCountPublic();

	const welcomeMessage = boxen(
		`${chalk.bold("🚀 Welcome to TickTrack CLI")}\n\n` +
			`${chalk.gray("🗓️  Today:")} ${today}\n` +
			`${chalk.yellow("🧮 Entries Logged:")} ${entryCount}\n\n` +
			`${chalk.cyan("Initializing your workspace...")}`,
		{
			padding: 1,
			margin: 1,
			borderStyle: "round",
			borderColor: "cyan",
			align: "center",
		}
	);

	console.log(welcomeMessage);
}

/**
 * Main loop
 */
async function main() {
	await showWelcomeBox();

	while (true) {
		const entry = await askTicketDetails();
		await logTicket(entry);

		const { continueLogging } = await inquirer.prompt([
			{
				type: "list",
				name: "continueLogging",
				message: "Do you want to log another ticket?",
				choices: [
					{ name: "📝 Yes, log another", value: true },
					{ name: "🚪 No, end session", value: false },
				],
			},
		]);

		if (!continueLogging) {
			await logBreakRow();
			console.log(chalk.green("\n👋 Session ended. Take a break!\n"));
			break;
		}
	}
}

main().catch((err) => {
	console.error(chalk.red("❌ Error:"), err);
});
