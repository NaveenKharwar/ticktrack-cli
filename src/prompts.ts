import inquirer from "inquirer";
import { TicketLogEntry } from "./types";
import chalk from "chalk";

export async function askTicketDetails(): Promise<TicketLogEntry> {
	const answers = await inquirer.prompt([
		{
			type: "input",
			name: "ticketUrl",
			message: "Enter ticket URL (or type 'exit' to quit):",
			validate: (input) => {
				if (input.trim().toLowerCase() === "exit") {
					console.log(chalk.yellow("\n👋 Exiting TickTrack. See you next time!\n"));
					process.exit(0);
				}
				return input.startsWith("http") ? true : "Please enter a valid URL";
			},
		},
		{
			type: "checkbox",
			name: "tags",
			message: "Select tags (or press Esc to cancel):",
			choices: ["new", "follow-up", "rating", "escalated", "long", "quick"],
		},
		{
			type: "input",
			name: "comment",
			message: "Any comment (optional):",
		},
		{
			type: "confirm",
			name: "addOtherTasks",
			message: "Do you want to add other tasks?",
			default: false,
		},
		{
			type: "editor",
			name: "otherTasks",
			message: "Other tasks (opens your editor):",
			when: (answers) => answers.addOtherTasks,
		},
	]);

	// Force-cast to your type
	return answers as TicketLogEntry;
}
