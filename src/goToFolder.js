import * as path from "path";
import { showCurrentDir } from "./index.js";

export const goToFolder = (currentDir, folder) => {
  const folderName = folder[0];
  const targetDir = path.join(currentDir, folderName);

  showCurrentDir(targetDir);
  return targetDir;
};
