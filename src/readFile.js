import * as path from "path";
import fs from "fs";
import { stdout as output } from "node:process";

export const readFile = (currentDir, targetFile) => {
  const filePath = path.join(currentDir, targetFile[0]);
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  fileStream.on("data", (chunk) => {
    output.write(`${chunk}\n`);
  });
};
