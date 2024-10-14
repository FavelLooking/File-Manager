import * as path from "path";
import * as fs from "fs";
import zlib from "zlib";
import { handleInvalidData } from "./index.js";

export const decompressFile = async (currentDir, args) => {
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

  const outputFileName = path.join(
    destinationDirectory,
    path.basename(sourceFilePath, ".br"),
  );

  try {
    await fs.promises.access(sourceFilePath);
    await fs.promises.mkdir(destinationDirectory, { recursive: true });
    const input = fs.createReadStream(sourceFilePath);
    const output = fs.createWriteStream(outputFileName);
    const stream = zlib.createBrotliDecompress();
    input.pipe(stream).pipe(output);

    output.on("finish", () => {
      console.log("Decompression finished");
    });
  } catch (err) {
    console.error("Operation failed");
  }
};
