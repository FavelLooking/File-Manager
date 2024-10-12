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
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const parseArg = () => {
  const arg = process.argv[3];
  const trimmedArg = arg.replace("--", "");
  let equalIndex = trimmedArg.indexOf("=");
  return trimmedArg.slice(equalIndex + 1);
};

export const showCurrentDir = (currentDir) => {
  output.write(`You are currently in  ${currentDir}\n`);
};

const initializeProgram = async () => {
  let userName = parseArg();
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
      default:
        output.write(`Invalid input\n`);
    }
  });
  showCurrentDir(currentDir);

  readLine.on("SIGINT", () => sayBye(userName, readLine));
};

initializeProgram();
