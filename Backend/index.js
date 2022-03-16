const { reverse } = require('dns');
const electron = require('electron');
const { contextIsolated } = require('process');

const {app, BrowserWindow, ipcMain} = electron;

let mainWindow = null;  

const createWindow = () => {
    mainWindow = new BrowserWindow({
        webPreferences : {
            nodeIntegration : true,
            contextIsolation : false,
        }
    });

    mainWindow.loadFile('./public/index.html');
};

app.whenReady().then(createWindow);

ipcMain.on('executeCode', (e , data) => {
    res = null;

    switch(data[1]){ // in base al numero ricevuto verra effetuato il kata giusto
        case 1 : 
            array = data[0].split(','); // parse da stringa di numeri ad array
            let fn = 0; //variabile piu frequente
            let freq = 0; // frequenza della variabile
            for(let i in array){
                // loop per il conteggio di ogni apparizione della variabile
                let currentFreq = 0;
                for(let j in array){
                    if ( array[i] === array[j] ){
                        currentFreq++; 
                        if(currentFreq > freq){ 
                            freq = currentFreq;
                            fn = array[i]; // assegnazione della variable piu frequente
                        }
                    }
                }
            }

            res = [fn, freq];
            break;

        case 2 :
            
            let library = [
                { autore: 'Romeo J. Graifenberg', titolo: 'Il mio ritorno in cucina', libraryID: 1234},
                { autore: 'Tom H. Marchiori', titolo: 'La mia vita senza acca.', libraryID: 5678},
                { autore: 'Luca Dalessandro', titolo: 'Dove sono le mie ciabatte?', libraryID: 9101}
            ];

            library.sort( (x,y) =>{ // 
                return x.titolo.localeCompare(y.titolo);
            });

            res = library;
            break;

        case 3 : 
            if ( data[0].length == 0 || data[0] == null){
                res = 'Nessuna parolo inserita.';
            } else {
                str = data[0].replace(/ /g,'').toLowerCase();
                reversed = "";
    
                for (let x in str){
                    reversed += str[str.length - 1 - x];
                };
                
                res = (reversed === str) ? 'Palindroma :  ✔' : 'Palindroma : ❌' ;
    
            }
            break;

        default : break;
    } 

    mainWindow.webContents.send('response' + data[1] , res);

});
