// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

process.once('loaded', () => {
  window.addEventListener('message', function(evt) {
    console.log('hola');
    if (evt.data.type === 'select-dir') {
      ipcRenderer.send('select', {
        id: evt.data.value,
        type: 'dir'
      });
    }
    if (evt.data.type === 'select-file') {
      ipcRenderer.send('select', {
        id: evt.data.value,
        type: 'file'
      });
    }
    if (evt.data.type === 'process') {
      ipcRenderer.send('process', evt.data.value);
    }
  })
})

contextBridge.exposeInMainWorld('electron', {
    onUpdateButtonText: (callback) => ipcRenderer.on('update-button-text', (event, id, newText) => callback(id, newText))
});
