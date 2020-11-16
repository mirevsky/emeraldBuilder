var http = require('http');
var fs = require('fs');
const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
    width: 1024,
    height: 764,
    frame: true,
    webPreferences: {
        nodeIntegration: true
        }
    })
    win.loadURL('http://localhost:8003/');
    win.webContents.openDevTools();
}

class App
{
    constructor(request, response){
        this.url = request.url;
        this.request = request;
        this.response = response;
    }

    mimeType(file){
        var mime_type = null;

        if (file.indexOf(".html") > 0){
            mime_type = 'text/html';
        }
        if (file.indexOf(".css") > 0){
            mime_type = 'text/css';
        }
        if(file.indexOf(".js") > 0) {
            mime_type = 'application/javascript';
        }
        if(file.indexOf(".jpg") > 0 || file.indexOf(".jpeg") > 0) {
            mime_type='image/jpeg';
        }
        if(file.indexOf(".png") > 0) {
            mime_type='image/png';
        }
        if(file.indexOf(".gif") > 0) {
            mime_type='image/gif';
        }
        if(file.indexOf(".ico") > 0) {
            mime_type='image/ico';
        }
        if(file.indexOf(".svg") > 0) {
            mime_type='image/svg+xml';
        }
        return mime_type;
    }

    loadFile(file){
        let mime_type = this.mimeType(file);
        let response = this.response;
        if(fs.existsSync(file)) {
            fs.readFile(file, function(err, data) {
                if (mime_type) {
                    response.writeHead(200, {'Content-Type': mime_type});
                }
                return response.end(data);
            });
        }
        return null;
    }

    run(){
        if (this.url === "/") {
            return this.loadFile("index.html");
        }

        /** Default Load Routes **/
        return this.loadFile(this.url.substr(1, this.url.length));
    }
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

http.createServer(function (req, res) {
    let application = new App(req, res);
    return application.run();
}).listen(8003);