import * as path from "path";
import * as fs from "fs";
import zlib from "zlib";

export const decompressFile = async (currentDir, args) => {
  const [pathToFile, newDirectoryPath] = args;
  const outputFileName = `${newDirectoryPath}/${path.basename(
    pathToFile,
    ".br",
  )}`;

  try {
    await fs.promises.mkdir(newDirectoryPath, { recursive: true });
    const input = fs.createReadStream(pathToFile);
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
