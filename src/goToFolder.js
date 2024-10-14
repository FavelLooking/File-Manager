import * as path from "path";
import { handleInvalidData } from "./index.js";
import * as fs from "fs";

export const goToFolder = async (currentDir, args) => {
  if (args.length !== 1 || args[0] === "..") {
    handleInvalidData();
    return currentDir;
  }
  const folderName = args[0];
  const targetDir = path.isAbsolute(folderName)
    ? folderName
    : path.join(currentDir, folderName);

  try {
    await fs.promises.access(targetDir);
  } catch (err) {
    console.error(`Operation failed`);
    return currentDir;
  }

  return targetDir;
};
