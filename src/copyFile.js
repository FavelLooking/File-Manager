import * as path from "path";
import * as fs from "fs";

export const copyFile = async (currentDir, args) => {
  const [pathToFile, newDirectoryPath] = args;
  const folderPath = path.dirname(newDirectoryPath);

  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(newDirectoryPath);

    readStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log("File copied successfully!");
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
