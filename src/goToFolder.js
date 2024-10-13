import * as path from "path";
import { stdout as output } from "node:process";

export const goToFolder = (currentDir, folder) => {
  if (!folder.length) {
    output.write(`Invalid input\n`);
    return;
  }
  const folderName = folder[0];
  const targetDir = path.join(currentDir, folderName);

  return targetDir;
};
