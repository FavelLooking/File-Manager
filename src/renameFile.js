import * as path from "path";
import { promises as fs } from "fs";

export const renameFile = async (currentDir, args) => {
  const [oldFileName, newFileName] = args;
  const filePath = path.join(currentDir, oldFileName);
  const newFilePath = path.join(currentDir, newFileName);

  await fs.rename(filePath, newFilePath);
};
