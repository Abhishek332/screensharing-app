window.onload = () => window.electronAPI.getUuid();

const startShareBtn = document.getElementById('start');
const stopShareBtn = document.getElementById('stop');

startShareBtn.addEventListener('click', () => {
	window.electronAPI.startSharing();
});

stopShareBtn.addEventListener('click', () => {
	window.electronAPI.stopSharing();
});
