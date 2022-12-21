const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	startSharing,
	stopSharing,
	getUuid,
});

function getUuid() {
	ipcRenderer.on('uuid', (event, data) => {
		document.getElementById('code').innerHTML = data;
	});
}

const startBtn = document.getElementById('start'),
	stopBtn = document.getElementById('stop');

function startSharing() {
	ipcRenderer.send('start-share', {});
	startBtn.style.display = 'none';
	stopBtn.style.display = 'block';
}

function stopSharing() {
	ipcRenderer.send('stop-share', {});
	startBtn.style.display = 'none';
	stopBtn.style.display = 'block';
}
