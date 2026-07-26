import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = join(root, "dist", "client");
const shellHtml = join(clientDir, "_shell.html");
const indexHtml = join(clientDir, "index.html");
const notFoundHtml = join(clientDir, "404.html");

process.env.GITHUB_PAGES = "true";

const build = spawnSync("npx", ["vite", "build"], {
  cwd: root,
  env: process.env,
  stdio: "inherit",
  shell: true,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (!existsSync(shellHtml)) {
  console.error("Missing dist/client/_shell.html after build.");
  process.exit(1);
}

mkdirSync(clientDir, { recursive: true });
copyFileSync(shellHtml, indexHtml);
copyFileSync(indexHtml, notFoundHtml);
console.log("Prepared index.html and 404.html for GitHub Pages.");
