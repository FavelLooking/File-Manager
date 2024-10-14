import * as path from "path";
import * as fs from "fs";
import { createReadStream, createWriteStream } from "fs";
import { handleInvalidData } from "./index.js";

export const copyFile = async (currentDir, args) => {
  if (args.length !== 2) {
    handleInvalidData();
    return;
  }
  const [pathToFile, targetDirectory] = args;
  const sourceFilePath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.join(currentDir, pathToFile);

  const destinationDirectory = path.isAbsolute(targetDirectory)
    ? targetDirectory
    : path.join(currentDir, targetDirectory);

  try {
    const sourceStats = await fs.promises.stat(sourceFilePath);

    if (!sourceStats.isFile()) {
      console.error("Operation failed: It's not a file.");
      return;
    }

    try {
      const targetStats = await fs.promises.stat(destinationDirectory);
      if (!targetStats.isDirectory()) {
        console.error("Operation failed: Target is not a directory.");
        return;
      }
    } catch (error) {
      console.error("Operation failed: Target directory does not exist.");
      return;
    }

    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.join(destinationDirectory, fileName);

    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(destinationFilePath);

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("File copied successfully!");
    });

    writeStream.on("error", () => {
      console.error("Operation failed");
      readStream.destroy();
    });

    readStream.on("error", () => {
      console.error("Operation failed");
      writeStream.end();
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`Operation failed: The file does not exist`);
    } else {
      console.error("Operation failed:", err.message);
    }
  }
};
