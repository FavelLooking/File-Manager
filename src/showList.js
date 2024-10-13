import * as path from "path";
import { promises as fs } from "fs";
import { handleInvalidData } from "./index.js";

export const showList = async (currentDir, args) => {
  if (args.length) {
    handleInvalidData();
    return;
  }
  try {
    const directory = await fs.readdir(currentDir);
    const folderContent = await Promise.all(
      directory.map(async (item) => {
        const itemPath = path.join(currentDir, item);
        const stats = await fs.lstat(itemPath);

        return {
          item,
          type: stats.isDirectory() ? "directory" : "file",
        };
      }),
    );

    folderContent.sort((a, b) => {
      if (a.type < b.type) return -1;
      if (a.type > b.type) return 1;
      return 0;
    });

    console.table(folderContent);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Operation failed`);
    }
  }
};
