import os from "os";
import * as path from "path";

export const goUp = (currentDir) => {
  const rootDir = os.homedir();
  if (currentDir === rootDir) {
    return rootDir;
  }
  currentDir = path.join(currentDir, "..");
  return currentDir;
};
