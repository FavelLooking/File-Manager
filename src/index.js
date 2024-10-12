import { promises as fs } from "fs";
import path from "path";
import * as url from "url";
import os from "os";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { sayBye } from "./sayBye.js";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const parseArg = () => {
  const arg = process.argv[3];
  const trimmedArg = arg.replace("--", "");
  let equalIndex = trimmedArg.indexOf("=");
  return trimmedArg.slice(equalIndex + 1);
};

const initializeProgram = async () => {
  let userName = parseArg();
  output.write(`Welcome to the File Manager, ${userName}!\n`);

  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  output.write(`You are currently in  ${String(os.homedir())}\n`);

  readLine.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");
    if (command === ".exit") {
      sayBye(userName, readLine);
    }
  });

  readLine.on("SIGINT", () => sayBye(userName, readLine));
};

initializeProgram();
