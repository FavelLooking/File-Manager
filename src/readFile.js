import * as path from "path";
import { promises as fs } from "fs";
import { stdout as output } from "node:process";
import { handleInvalidData } from "./index.js";

export const readFile = async (currentDir, args) => {
  if (args.length !== 1) {
    handleInvalidData();
    return;
  }
  const fileName = args[0];
  const filePath = path.isAbsolute(fileName)
    ? fileName
    : path.join(currentDir, fileName);
  console.log(filePath);
  try {
    await fs.access(filePath);

    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    output.write(`${data}\n`);
  } catch (err) {
    console.log(`Operation failed`);
  }
};
