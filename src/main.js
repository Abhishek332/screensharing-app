const { app, BrowserWindow, ipcMain } = require('electron');
const { v4: uuidv4 } = require('uuid');
const screenshot = require('screenshot-desktop');
const path = require('path');
const socket = require('socket.io-client')('http://127.0.0.1:5000');

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

//Listening events trigered from process.js
//here event is an object contain information of browserWindow from which event triggered
ipcMain.on('start-share', (event, arg) => {
	let uuid = uuidv4();
	socket.emit('join-message', uuid);
	event.reply('uuid', uuid);
	console.log('Starting Sharing');

	//taking screenshots and broadcasting
	interval = setInterval(() => {
		screenshot.then((img) => {
			let imgStr = new BufferEncoding(img).toString('base64');
			let obj = {
				room: uuid,
				image: imgStr,
			};
			socket.emit('screen-data', JSON.stringify(obj));
		});
	}, 100);
});

ipcMain.on('stop-share', (event, arg) => {
	//stop share
	console.log('Starting Sharing');
});
