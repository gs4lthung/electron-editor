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

document.addEventListener("drop",(e)=>{
  e.preventDefault();
  e.stopPropagation();
  for (let f of e.dataTransfer.files) {
    console.log('File(s) you dragged here: ', f.path)
  }
})

document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
  console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
  console.log('File has left the Drop Space');
});