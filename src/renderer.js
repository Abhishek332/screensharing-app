//const { ipcRenderer } = require('electron');

// window.onload = function () {
// 	ipcRenderer.on('uuid', (event, data) => {
// 		document.getElementById('code').innerHTML = data;
// 	});
// };

const startShareBtn = document.getElementById('start');
const stopShareBtn = document.getElementById('stop');

startShareBtn.addEventListener('click', () => {
	window.electronAPI.startSharing();
});

stopShareBtn.addEventListener('click', () => {
	window.electronAPI.stopSharing();
});
