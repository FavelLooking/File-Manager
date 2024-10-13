import os from "os";
import * as path from "path";
import { showCurrentDir } from "./index.js";
import { promises as fs } from "fs";

export const showList = async (currentDir) => {
  try {
    //await fs.access(currentDir);
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
      throw new Error("Operation failed");
    }
  }
};
