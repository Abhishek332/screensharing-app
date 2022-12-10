const { app, BrowserWindow } = require('electron');

const createWindow = () => {
	const screen = new BrowserWindow({
		height: 400,
		width: 600,
		backgroundColor: '#030946',
	});

	screen.loadFile(`${__dirname}/index.html`);
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
