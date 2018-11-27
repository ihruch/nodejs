var fs = require('fs');
var pathFile = 'data.txt';
/* это синхронное чтение и запись */
// var data = fs.readFileSync('data.txt', 'utf-8');
// console.log(data);
// fs.writeFileSync('data_output.txt', data);

/*ассинхронное чтение и запись*/
fs.readFile(pathFile, 'utf-8', function(err, data) { // объект ошибки и полученные при прочтении данные
    console.log(err);
    console.log(data);
})