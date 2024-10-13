import * as path from "path";
import { promises as fs } from "fs";
import { handleInvalidData } from "./index.js";

export const createFile = async (currentDir, args) => {
  if (args.length !== 1) {
    handleInvalidData();
    return;
  }

  const filePath = path.join(currentDir, args[0]);
  try {
    await fs.access(filePath);
    console.log(`Operation failed`);
    console.log(`File already exists: ${filePath}`);
    return;
  } catch (err) {
    try {
      await fs.writeFile(filePath, "", { flag: "wx" });
      console.log(`File created: ${filePath}`);
    } catch (error) {
      console.log(`Operation failed`);
    }
  }
};
