import * as path from "path";
import * as fs from "fs";
import zlib from "zlib";
import { handleInvalidData } from "./index.js";

export const compressFile = async (currentDir, args) => {
  if (args.length !== 2) {
    handleInvalidData();
    return;
  }

  const [pathToFile, newDirectoryPath] = args;

  const sourceFilePath = path.isAbsolute(pathToFile)
    ? pathToFile
    : path.join(currentDir, pathToFile);

  const destinationDirectory = path.isAbsolute(newDirectoryPath)
    ? newDirectoryPath
    : path.join(currentDir, newDirectoryPath);

  const outputFileName = `${destinationDirectory}/${path.basename(
    pathToFile,
  )}.br`;

  try {
    await fs.promises.access(sourceFilePath);
    await fs.promises.mkdir(destinationDirectory, { recursive: true });
    const input = fs.createReadStream(sourceFilePath);
    const output = fs.createWriteStream(outputFileName);
    const stream = zlib.createBrotliCompress();
    input.pipe(stream).pipe(output);

    output.on("finish", () => {
      console.log("Compression finished");
    });
  } catch (err) {
    console.error("Operation failed");
  }
};
