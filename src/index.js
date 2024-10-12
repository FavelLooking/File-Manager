import { promises as fs } from "fs";
import path from "path";
import * as url from "url";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { sayBye } from "./sayBye.js";

const parseArg = () => {
  const arg = process.argv[3];
  const trimmedArg = arg.replace("--", "");
  let equalIndex = trimmedArg.indexOf("=");
  return trimmedArg.slice(equalIndex + 1);
};

const initializeProgram = async () => {
  let userName = parseArg();
  output.write(`Welcome to the File Manager, ${userName}!`);

  const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readLine.on("line", (input) => {
    const [command, ...args] = input.trim().split(" ");
  });

  readLine.on("SIGINT", () => sayBye(userName, readLine));
};

initializeProgram();
