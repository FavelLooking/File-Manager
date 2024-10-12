import * as path from "path";
import fs from "fs";

export const createFile = (currentDir, targetFile) => {
  const filePath = path.join(currentDir, targetFile[0]);
  const writeStream = fs.createWriteStream(filePath);
  writeStream.end();
};
