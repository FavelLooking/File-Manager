import * as path from "path";
import { showCurrentDir } from "./index.js";
import { stdin as input, stdout as output } from "node:process";

export const goToFolder = (currentDir, folder) => {
  if (!folder.length) {
    output.write(`Invalid input\n`);
    return;
  }
  const folderName = folder[0];
  const targetDir = path.join(currentDir, folderName);

  showCurrentDir(targetDir);
  return targetDir;
};
