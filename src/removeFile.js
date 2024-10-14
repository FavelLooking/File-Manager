import * as path from "path";
import * as fs from "fs";
import { handleInvalidData } from "./index.js";

export const removeFile = async (currentDir, args) => {
  if (args.length !== 1) {
    handleInvalidData();
    return;
  }
  const pathToFile = args[0];
  const sourceFilePath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.join(currentDir, pathToFile);
  try {
    const sourceStats = await fs.promises.stat(sourceFilePath);

    if (!sourceStats.isFile()) {
      console.error("Operation failed: It's not a file.");
      return;
    } else await fs.promises.rm(sourceFilePath);
    console.log("File removed successfully!");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error("Operation failed: File does not exist.");
    } else {
      console.error("Operation failed:", err.message);
    }
  }
};
