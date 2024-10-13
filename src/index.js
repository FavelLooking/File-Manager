import { promises as fs } from "fs";
import path from "path";
import * as url from "url";
import os from "os";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { sayBye } from "./sayBye.js";
import { goUp } from "./goUp.js";
import { goToFolder } from "./goToFolder.js";
import { showList } from "./showList.js";
import { readFile } from "./readFile.js";
import { createFile } from "./createFile.js";
import { renameFile } from "./renameFile.js";
import { copyFile } from "./copyFile.js";
import { moveFile } from "./moveFile.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

function parseArgs() {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    throw new Error("Error");
  }

  return usernameArg.split("=")[1];
}

export const showCurrentDir = (currentDir) => {
  output.write(`You are currently in  ${currentDir}\n`);
};

const initializeProgram = async () => {
  let userName = parseArgs();
  output.write(`Welcome to the File Manager, ${userName}!\n`);
  let currentDir = String(os.homedir());

  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");

    switch (command) {
      case ".exit":
        sayBye(userName, readLine);
        break;
      case "up":
        currentDir = goUp(currentDir);
        break;
      case "cd":
        currentDir = goToFolder(currentDir, args);
        break;
      case "ls":
        showList(currentDir);
        break;
      case "cat":
        readFile(currentDir, args);
        break;
      case "add":
        createFile(currentDir, args);
        break;
      case "rn":
        renameFile(currentDir, args);
        break;
      case "cp":
        copyFile(currentDir, args);
        break;
      case "mv":
        moveFile(currentDir, args);
        break;
      default:
        output.write(`Invalid input\n`);
    }
  });
  showCurrentDir(currentDir);

  readLine.on("SIGINT", () => sayBye(userName, readLine));
};

initializeProgram();
