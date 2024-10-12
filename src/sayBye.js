export const sayBye = (userName, readLine) => {
  process.stdout.write(
    `\nThank you for using File Manager, ${userName}, goodbye!`,
  );
  readLine.close();
  process.exit(0);
};
