# AGENTS.md

## Repository expectations

- This is a Vite + React + TypeScript project.
- Prefer minimal, targeted changes.
- Preserve current file structure and naming style unless the task requires otherwise.

## File conventions

- SKILL.md, YAML, TOML, and JSON files must be saved as UTF-8 without BOM.

## Validation

- For TypeScript / React changes, run:
  - npm run build
- If practical, also run:
  - npm run lint

## Reporting

- List changed files.
- Explain what each file changed.
- State what was verified.
- Call out remaining risks or follow-up items.

## Command conventions

- On Windows, prefer `npm.cmd` instead of `npm` when running validation commands from Codex or PowerShell-based environments.
