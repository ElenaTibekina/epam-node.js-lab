const path = require('path');
const fs = require('fs');
const { program } = require('commander');

program
    .requiredOption('-n, --name <filename>', 'filename in output directory')
    .requiredOption('-f, --file <filename>', 'filename in input directory')
    .requiredOption('-l, --length', 'max input file length', parseFloat)
    .parse(process.argv);
let inputFilePath = path.join('./input', program.file);
let outputFilePath = path.join('./output', program.name);
let stats = fs.statSync(inputFilePath);
if (stats.size > program.length) {
    throw new Error('File is too big')
}
let inputData = fs.readFileSync(inputFilePath, 'utf8');
let rows = inputData.split('\n');
let names = rows[0].split(',');
rows.splice(0,1);
let outputData = rows.map(row => {
    let tokens = row.split(',');
    let output = {};
    for (let i = 0; i < rows.length; i++) {
        output[names[i]] = tokens[i];
    }
    return output;
});

fs.writeFileSync(outputFilePath, JSON.stringify(outputData));

