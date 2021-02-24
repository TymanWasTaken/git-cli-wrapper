import { colors, logText } from "./util.ts"

const version = "v0.0.1"

export const lang = {
	"HELP_MESSAGE": (params: Record<string, string>) => logText`
		${colors.fg.blue}gitw ${colors.fg.green}${version}${colors.fg.blue}
		
		Usage:
		${colors.fg.magenta}gitw [subcommand]${colors.fg.blue}

		Subcommands: ${colors.fg.red}
			add         ${colors.fg.yellow}Adds files to the working tree${colors.fg.red}
			commit      ${colors.fg.yellow}Creates a new commit with git${colors.fg.red}
			help        ${colors.fg.yellow}Shows this help message${colors.reset}
	`,
	"NOT_GIT_REPO": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.red}This isn't a git repo!${colors.reset}
	`,
	"ADD_FILES_SUCCESS": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.green}Successfully added ${params.fileCount} files!${colors.reset}
	`,
	"ADDED_NO_FILES": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.red}No files were added, were there any to add?${colors.reset}
	`,
	"ADDING_UNTRACKED_FILES": (params: Record<string, string>) => logText`
		${colors.fg.yellow}Found untracked files, adding...${colors.reset}
	`,
	"NO_COMMIT_MESSAGE": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.red}You need to provide a commit message!${colors.reset}
	`,
	"COMMITTING_CHANGES": (params: Record<string, string>) => logText`
		${colors.fg.yellow}Committing with message "${params.commitMessage}"...${colors.reset}
	`,
	"COMMIT_SUCCESS": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.green}Successfully committed with message "${params.commitMessage}"!${colors.reset}
	`,
	"NOTHING_TO_COMMIT": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.red}There is nothing to commit!${colors.reset}
	`,
	"UNKNOWN_ERROR": (params: Record<string, string>) => logText`
		${colors.bright}${colors.fg.red}An unknown error occured:
		${params.cmdOutput}${colors.reset}
	`
}