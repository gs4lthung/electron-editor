window.electronAPI.fileOpened((event, data) => {
  const textArea = document.getElementById("text-area");
  textArea.value = data;
});

document.addEventListener("keydown", async (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "s") {
    e.preventDefault();
    const textArea = document.getElementById("text-area");
    const filePath = await window.electronAPI.saveFile(textArea.value);
    if (filePath) alert("File saved at " + filePath);
  }
});
