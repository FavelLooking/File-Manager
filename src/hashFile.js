import * as path from "path";
import * as fs from "fs";
import { createHash } from "crypto";
import { handleInvalidData } from "./index.js";

export const hashFile = async (currentDir, args) => {
  if (args.length !== 1) {
    handleInvalidData();
    return;
  }
  const pathToFile = args[0];
  const sourceFilePath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.join(currentDir, pathToFile);
  try {
    await fs.promises.access(sourceFilePath);
    const fileHash = createHash("sha256");
    const fileStream = fs.createReadStream(sourceFilePath);
    fileStream.on("data", (chunk) => {
      fileHash.update(chunk);
    });

    fileStream.on("end", () => {
      const resultHash = fileHash.digest("hex");
      console.log(`Result file hash: ${resultHash}`);
    });

    fileStream.on("error", (err) => {
      console.error(`Error reading:, ${err}`);
    });
  } catch (err) {
    console.error(`Operation failed: ${err}`);
  }
};
