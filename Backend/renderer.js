const ipcRenderer = require('electron').ipcRenderer;

const executeCode = (codeNum) => {
    if (codeNum != 2) {
        ipcRenderer.send('executeCode', [
            document.querySelector('.inputvalue' + codeNum).value,
            codeNum
        ])
    } else {
        ipcRenderer.send('executeCode', [
            null,
            codeNum
        ])
    }
};

ipcRenderer.on('response1',(e , data) => {
    document.querySelector('.result1').innerText = `Var = ${data[0]} : Frequenza = ${data[1]}`;
});

ipcRenderer.on('response2',(e , data) => { 
    res = '';

    data.forEach(element => {
        res += '{ ';
        for( const [key,value] of Object.entries(element)){
            res += `${key}: ${value},`;
        } 
        res += '}\n';
    });

    document.querySelector('.result2').innerText = res;
});

ipcRenderer.on('response3',(e , data) => {
    document.querySelector('.result3').innerText = data
});

