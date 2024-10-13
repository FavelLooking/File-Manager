import os from "os";

export const getEol = () => {
  console.log(os.EOL);
};
export const getCpus = () => {
  console.log(...os.cpus());
};
export const getHomeDir = () => {
  console.log(`Home directory: ${os.homedir()}`);
};
export const getUserName = () => {
  console.log(`Username: ${os.userInfo().username}`);
};
export const getArchitecture = () => {
  console.log(`Architecture: ${os.arch()}`);
};
