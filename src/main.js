const { app, BrowserWindow, ipcMain } = require('electron');
const { v4: uuidv4 } = require('uuid');
const screenshot = require('screenshot-desktop');
const path = require('path');
const socket = require('socket.io-client')('http://157.34.221.130:5000');

let interval;

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		height: 400,
		width: 600,
		backgroundColor: '#030946',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	//mainWindow.removeMenu();
	mainWindow.loadFile(`${__dirname}/index.html`);
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

ipcMain.on('start-share', (event, arg) => {
	let uuid = uuidv4();
	socket.emit('join-message', uuid);
	event.reply('uuid', uuid);
	console.log('Starting Sharing');
	//start share
});

ipcMain.on('stop-share', (event, arg) => {
	//stop share
	console.log('Starting Sharing');
});
