import os from "os";

export const getEol = () => {
  console.log(os.EOL);
};
export const getCpus = () => {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);
  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
  });
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
