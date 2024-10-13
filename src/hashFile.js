import * as path from "path";
import * as fs from "fs";
import { createHash } from "crypto";

export const hashFile = async (currentDir, targetFile) => {
  const filePath = path.join(currentDir, targetFile[0]);
  try {
    const fileHash = createHash("sha256");
    const fileStream = fs.createReadStream(filePath);
    fileStream.on("data", (chunk) => {
      fileHash.update(chunk);
    });

    fileStream.on("end", () => {
      const resultHash = fileHash.digest("hex");
      console.log("Result file hash:", resultHash);
    });

    fileStream.on("error", (err) => {
      console.error("Error reading:", err);
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
