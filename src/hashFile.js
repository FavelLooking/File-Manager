import * as path from "path";
import * as fs from "fs";
import { createHash } from "crypto";

export const hashFile = async (currentDir, targetFile) => {
  if (!targetFile || targetFile.length === 0) {
    console.error("No file provided for hashing.");
    return;
  }
  const filePath = path.join(currentDir, targetFile[0]);
  try {
    await fs.promises.access(filePath);
    const fileHash = createHash("sha256");
    const fileStream = fs.createReadStream(filePath);
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
    console.log(`Operation failed: ${err}`);
  }
};
