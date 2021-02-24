import { log } from "./util.ts"
import { exec, OutputMode } from "https://deno.land/x/exec@0.0.5/mod.ts"
import { isGit as isGitRepo } from "https://deno.land/x/is_git@v0.1.1/mod.ts";

const args = Deno.args.slice(1, Deno.args.length)
const subComand = Deno.args[0]

switch (subComand) {
	case "add": {
		if (!await isGitRepo()) {
			log("NOT_GIT_REPO")
			break
		}
		if (args.length > 1) {
			await exec("git add " + args.join(" "), {
				output: OutputMode.Tee
			})
		} else {
			const out = await exec("git add -Av", {
				output: OutputMode.Capture
			})
			const added = out.output.split("\n").map(l => {
				const match = l.match(/add '(?<path>.+)'/)
				if (match?.groups) return match.groups.path
				else return null
			}).filter(l => l !== null)

			if (added.length < 1) {
				log("ADDED_NO_FILES")
			} else {
				log("ADD_FILES_SUCCESS", {
					fileCount: String(added.length)
				})
			}
			
		}
		break
	}
	case "commit": {
		if (!await isGitRepo()) {
			log("NOT_GIT_REPO")
			break
		}
		if (!args[0]) {
			log("NO_COMMIT_MESSAGE")
			break
		}
		const untracked = await exec("git ls-files --other --directory --exclude-standard", {
			output: OutputMode.Capture
		})
		if (untracked.output !== "") {
			log("ADDING_UNTRACKED_FILES")
			const out = await exec("git add -Av", {
				output: OutputMode.Capture
			})
			const added = out.output.split("\n").map(l => {
				const match = l.match(/add '(?<path>.+)'/)
				if (match?.groups) return match.groups.path
				else return null
			}).filter(l => l !== null)
			log("ADD_FILES_SUCCESS", {
				fileCount: String(added.length)
			})
		}
		const commitMessage = args.length > 1 ? args.join(" ") : args[0]
		log("COMMITTING_CHANGES", {
			commitMessage: commitMessage
		})
		const out = await exec(`git commit -m "${commitMessage.replaceAll("\"", "\\\"")}"`, {
			output: OutputMode.Capture
		})
		if (out.status.code === 1 && out.output.split("\n")[1] === "nothing to commit, working tree clean") {
			log("NOTHING_TO_COMMIT")
		} else if (!out.status.success) {
			log("UNKNOWN_ERROR", {
				cmdOutput: out.output
			})
		} else {
			log("COMMIT_SUCCESS", {
				commitMessage: commitMessage
			})
		}
		
		break
	}
	case "help": {
		log("HELP_MESSAGE")
		break
	}
	default: {
		log("HELP_MESSAGE")
		break
	}
}