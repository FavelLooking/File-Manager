import * as path from "path";
import { stdout as output } from "node:process";
import { promises as fs } from "fs";

// const makeFolderPath = (path) => {
//   console.log(path);
//   const indexSeparator = path.lastIndexOf("/" || "\\");
//   console.log(`indexSeparator: ${indexSeparator}`);
//   const folderPath = path.slice(indexSeparator);
//   console.log(`folderPath: ${folderPath}`);
//   return folderPath;
// };
export const copyFile = async (currentDir, args) => {
  const [pathToFile, newDirectoryPath] = args;
  const folderPath = path.dirname(newDirectoryPath);
  console.log(folderPath);
  // console.log(pathToFile);
  // console.log(folderPath);
  // const readStream = fs.createReadStream(pathToFile);
  // const writeStream = fs.createWriteStream(newDirectoryPath);
  // readStream.pipe(writeStream);

  try {
    await fs.mkdir(folderPath, { recursive: true });
    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(newDirectoryPath);
    writeStream.end();
  } catch (err) {
    console.error(err);
  }
};
