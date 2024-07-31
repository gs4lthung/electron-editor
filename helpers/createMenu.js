const { app, Menu } = require("electron");
const openFile = require("./openFile");
const createAboutWindow = require("./createAboutWindow");
function createMenu(mainWindow) {
  const isWindows = process.platform === "darwin";
  const menu = Menu.buildFromTemplate([
    ...(isWindows
      ? [
          {
            label: app.name,
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideothers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" },
            ],
          },
        ]
      : []),
    {
      label: "File",
      submenu: [
        isWindows ? { role: "close" } : { role: "quit" },
        {
          label: "Open file",
          accelerator: "CmdOrCtrl+O",
          click: () => openFile(mainWindow),
        },
        {
          label: "Save file",
          accelerator: "CmdOrCtrl+S",
          click: () => console.log("Save file"),
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isWindows
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
              },
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "Window",
      submenu: [
        { role: "minimize" },
        { role: "zoom" },
        ...(isWindows
          ? [{ type: "separator" }, { role: "front" }]
          : [{ role: "close" }]),
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "About",
          click: createAboutWindow,
        },
        {
          label: "Build more",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://www.electronjs.org/docs");
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}
module.exports = createMenu;
