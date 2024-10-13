import os from "os";
import * as path from "path";
import { showCurrentDir } from "./index.js";

export const goUp = (currentDir) => {
  const rootDir = os.homedir();
  const parentDir = path.join(currentDir, "..");
  if (currentDir === rootDir) {
    showCurrentDir(rootDir);
    return;
  }
  showCurrentDir(parentDir);
  return parentDir;
};
