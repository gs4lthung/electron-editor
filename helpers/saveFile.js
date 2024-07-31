const { dialog } = require("electron");
const fs = require("fs");

async function saveFile(e, data) {
  const { filePath } = await dialog.showSaveDialog({
    title: "Save file",
    defaultPath: "electron.txt",
    filters: [{ name: "Text Files", extensions: ["txt"] }],
  });
  if (filePath) {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    return filePath;
  }
}
module.exports = saveFile;
