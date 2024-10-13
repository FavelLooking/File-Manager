import * as path from "path";
import * as fs from "fs";

export const removeFile = async (currentDir, targetFile) => {
  const filePath = path.join(currentDir, targetFile[0]);
  try {
    await fs.promises.rm(filePath);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
