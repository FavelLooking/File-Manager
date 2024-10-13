import os from "os";
import { stdout as output } from "node:process";
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
import { removeFile } from "./removeFile.js";
import { hashFile } from "./hashFile.js";
import { compressFile } from "./compressFile.js";
import { decompressFile } from "./decompressFile.js";
import {
  getEol,
  getCpus,
  getHomeDir,
  getUserName,
  getArchitecture,
} from "./osInfo.js";

function parseArgs() {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  if (!usernameArg) {
    throw new Error("Error");
  }

  return usernameArg.split("=")[1];
}

export const handleInvalidData = () => {
  const yellow = "\x1b[33m";
  const reset = "\x1b[0m";
  output.write(`${yellow}Invalid input\n${reset}`);
};

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

  readLine.on("line", async (input) => {
    const [command, ...args] = input.trim().split(" ");

    if (command === "os") {
      switch (args[0]) {
        case "--EOL":
          getEol();
          break;
        case "--cpus":
          getCpus();
          break;
        case "--homedir":
          getHomeDir();
          break;
        case "--username":
          getUserName();
          break;
        case "--architecture":
          getArchitecture();
          break;
        default:
          handleInvalidData();
      }
    } else
      switch (command) {
        case ".exit":
          sayBye(userName, readLine);
          return;
        case "up":
          currentDir = goUp(currentDir, args);
          break;
        case "cd":
          currentDir = await goToFolder(currentDir, args);
          break;
        case "ls":
          await showList(currentDir, args);
          break;
        case "cat":
          readFile(currentDir, args);
          break;
        case "add":
          createFile(currentDir, args);
          break;
        case "rn":
          await renameFile(currentDir, args);
          break;
        case "cp":
          await copyFile(currentDir, args);
          break;
        case "mv":
          await moveFile(currentDir, args);
          break;
        case "rm":
          await removeFile(currentDir, args);
          break;
        case "hash":
          await hashFile(currentDir, args);
          break;
        case "compress":
          await compressFile(currentDir, args);
          break;
        case "decompress":
          await decompressFile(currentDir, args);
          break;

        default:
          handleInvalidData();
      }
    showCurrentDir(currentDir);
  });
  showCurrentDir(currentDir);

  readLine.on("SIGINT", () => sayBye(userName, readLine));
};

initializeProgram();
