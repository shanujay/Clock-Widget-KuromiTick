const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getBasePath: () => ipcRenderer.invoke('getBasePath')
});
