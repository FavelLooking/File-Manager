import os from "os";
import * as path from "path";

export const goUp = (currentDir) => {
  console.log(currentDir);
  const rootDir = os.homedir();
  const parentDir = path.join(currentDir, "..");
  if (currentDir === rootDir) {
    return;
  }
  return parentDir;
};
