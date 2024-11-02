import { resolveDependencies } from './parser/parser.js';
import fs from 'fs';
import readline from 'readline';

/**
 * Author: Enrique Madrid
 * Email: contact@nervess.cat
 * Date: 2024-11-02
 */

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function main() {
    rl.question('Enter the path to the dependencies file: ', handleInput);
}

function handleInput(filePath){
    fs.readFile(filePath, 'utf8', handleFile);
}

function handleFile(err, data){
    if (err) {
        console.error('Error reading file, Maybe it doesn\'t exist, try again');
        rl.close();
        return;
    }

    data = data.replace(/\r/g, '');
    let dependencies = resolveDependencies(data);
    rl.close();
    console.log(dependencies);
}

main();
