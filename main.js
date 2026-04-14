const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 900,
        icon: path.join(__dirname, 'assets', 'icono.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        show: false
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Permitir abrir PDFs locales y enlaces externos
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('file:')) {
            return { action: 'allow' };
        }
        shell.openExternal(url);
        return { action: 'deny' };
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createMenu() {
    const template = [
        {
            label: 'Archivo',
            submenu: [
                {
                    label: 'Inicio',
                    accelerator: 'CmdOrCtrl+H',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.loadFile('index.html');
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Salir',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Ayuda',
            submenu: [
                {
                    label: 'Acerca de',
                    click: () => {
                        // Crear ventana modal para "Acerca de"
                        const aboutWindow = new BrowserWindow({
                            parent: mainWindow,
                            modal: true,
                            width: 450,
                            height: 380,
                            resizable: false,
                            icon: path.join(__dirname, 'assets', 'icono.png'),
                            webPreferences: {
                                nodeIntegration: false,
                                contextIsolation: true
                            },
                            backgroundColor: '#0a0c10'
                        });
                        aboutWindow.loadFile('about.html');
                        aboutWindow.setMenuBarVisibility(false);
                        // Limpiar referencia al cerrar (opcional)
                        aboutWindow.on('closed', () => {
                            // nothing needed
                        });
                    }
                },
                { type: 'separator' },
                {
                    label: 'Documentación',
                    click: () => {
                        shell.openExternal('https://github.com/tu-usuario/medicina-interna-farreras');
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow();
    createMenu();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
