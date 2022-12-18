const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	startSharing,
	stopSharing,
});

function startSharing() {
	ipcRenderer.send('start-share', {});
	document.getElementById('start').style.display = 'none';
	document.getElementById('stop').style.display = 'block';
}

function stopSharing() {
	ipcRenderer.send('stop-share', {});
	document.getElementById('stop').style.display = 'none';
	document.getElementById('start').style.display = 'block';
}
