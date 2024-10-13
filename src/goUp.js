import os from "os";
import * as path from "path";
import { handleInvalidData } from "./index.js";

export const goUp = (currentDir, args) => {
  if (args.length) {
    handleInvalidData();

    return currentDir;
  }
  const rootDir = os.homedir();
  if (currentDir === rootDir) {
    console.log("You are already in the root directory.");
    return rootDir;
  }
  currentDir = path.join(currentDir, "..");
  return currentDir;
};
