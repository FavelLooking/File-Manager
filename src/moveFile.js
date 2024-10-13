import * as path from "path";
import * as fs from "fs";

export const moveFile = async (currentDir, args) => {
  const [pathToFile, newDirectoryPath] = args;
  const folderPath = path.dirname(newDirectoryPath);

  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(newDirectoryPath);

    readStream.pipe(writeStream);

    writeStream.on("finish", async () => {
      try {
        await fs.promises.rm(pathToFile);
        console.log("File moved successfully!");
      } catch (err) {
        console.error("Error:", err);
      }
    });
    writeStream.on("error", (err) => {
      console.error("Error writing file:", err);
      readStream.destroy();
    });
    readStream.on("error", (err) => {
      console.error("Error reading file:", err);
      writeStream.end();
    });
  } catch (err) {
    console.error(err);
  }
};
