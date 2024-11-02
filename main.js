import { resolveDependencies } from './parser/parser.js';
import fs from 'fs';
import readline from 'readline';

/**
 * Author: Enrique Madrid
 * Email: contact@nervess.cat
 * Date: 2024-11-02
 */

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('Enter the path to the dependencies file: ', (filePath) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                rl.close();
                return;
            }

            data = data.replace(/\r/g, '');
            let dependencies = resolveDependencies(data);
            rl.close();
            console.log(dependencies);
        });
    });
}

main();
