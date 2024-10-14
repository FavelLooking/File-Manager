export const sayBye = (userName, readLine) => {
  process.stdout.write(
    `\nThank you for using File Manager, ${userName}, goodbye!\n`,
  );
  readLine.close();
  setTimeout(() => {
    process.exit(0);
  }, 2000);
};
