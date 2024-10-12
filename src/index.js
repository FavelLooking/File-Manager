import { promises as fs } from "fs";
import path from "path";
import * as url from "url";

const parseArg = () => {
  const arg = process.argv[3];
  const trimmedArg = arg.replace("--", "");
  let equalIndex = trimmedArg.indexOf("=");
  return trimmedArg.slice(equalIndex + 1);
};

const initializeProgram = () => {
  let userName = parseArg();
  process.stdout.write(`Welcome to the File Manager, ${userName}!`);
};

initializeProgram();
