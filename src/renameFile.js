import * as path from "path";
import { promises as fs } from "fs";
import { handleInvalidData } from "./index.js";

export const renameFile = async (currentDir, args) => {
  if (args.length !== 2) {
    handleInvalidData();
    return;
  }
  const [oldFileName, newFileName] = args;
  const oldFilePath = path.isAbsolute(oldFileName)
    ? oldFileName
    : path.join(currentDir, oldFileName);

  const newFilePath = path.isAbsolute(newFileName)
    ? newFileName
    : path.join(currentDir, newFileName);

  try {
    await fs.access(oldFilePath);
    await fs.rename(oldFilePath, newFilePath);
    console.log(`File was renamed`);
  } catch (error) {
    console.log("Operation failed");
  }
};
