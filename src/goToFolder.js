import * as path from "path";
import { handleInvalidData } from "./index.js";
import * as fs from "fs";

export const goToFolder = async (currentDir, args) => {
  if (args.length !== 1) {
    handleInvalidData();
    return currentDir;
  }
  const folderName = args[0];
  const targetDir = path.join(currentDir, folderName);
  console.log(targetDir);

  try {
    await fs.promises.access(targetDir);
  } catch (err) {
    console.log(`Operation failed`);
    return currentDir;
  }

  return targetDir;
};
