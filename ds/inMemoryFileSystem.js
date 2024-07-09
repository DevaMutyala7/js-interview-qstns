class FileSystem {
  constructor() {
    this.directory = { root: {} };
    this.currentDir = this.directory["root"];
    this.currentPath = "root";
  }

  createDirectory(name) {
    this.currentDir[name] = {};
  }

  changeDirectory(path) {
    const paths = path.split("-");
    let current = this.directory;
    paths.forEach((path) => {
      current = current[path];
    });
    this.currentDir = current;
    this.currentPath = path;
  }

  addFile(file) {
    if (this.currentDir["files"]) {
      this.currentDir.files.push(file);
    } else {
      this.currentDir["files"] = [file];
    }
  }

  deleteFile(file) {
    this.currentDir.files = this.currentDir.files.filter(
      (item) => item != file
    );
  }

  deleteDirectory(name) {
    delete this.currentDir[name];
  }

  getRootDirectory() {
    return this.directory;
  }

  getCurrDirectory() {
    return this.currentDir;
  }

  getCurrDirectoryPath() {
    return this.currentPath;
  }
}

const React = new FileSystem();
React.createDirectory("src");
React.createDirectory("public");
console.log(
  "root directory after adding directories",
  React.getRootDirectory()
);
React.changeDirectory("root-public");
React.addFile("index.html");
console.log("root directory after adding file", React.getRootDirectory());
React.changeDirectory("root");
React.deleteDirectory("src");
console.log("root directory after deleting src", React.getRootDirectory());
