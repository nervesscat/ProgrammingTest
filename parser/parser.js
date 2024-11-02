import { InvalidFormatError, MissingDependencyError } from './errors.js';

/**
 * Author: Enrique Madrid
 * Email: contact@nervess.cat
 * Date: 2024-11-02
 */

/**
 * From a string it create a table, iterate on them to retrieve the dependencies resolved
 * @param {string} str
 * @returns {string} The string with the dependencies resolved
 */
export function resolveDependencies(str) {
    let dependenciesTable = createDependeciesTable(str);
    traverseLibraries(dependenciesTable);
    sortDependenciesAlphabetically(dependenciesTable);
    return convertObjectToString(dependenciesTable);
}

/**
 * Traverse into the keys of a literal object, and then it iterates recursevely in each element of the key set
 * @param {Object} dependenciesTable
 */
function traverseLibraries(dependenciesTable) {
    for (let library in dependenciesTable) {
        let newPath = new Set();
        findAllLibraries(library, dependenciesTable, newPath, library);
        dependenciesTable[library] = newPath;
    }
}

/**
 * Creates a dependencies table from a string of dependencies.
 * @param {string} str - The string of dependencies.
 * @returns {Object} The dependencies table object.
 */
function createDependeciesTable(str) {
    let dependenciesTable = {};
    let lines = str.split('\n');
    for (let line of lines) {
        try {
            let [library, dependencies] = validateAndExtractValues(line);
            dependenciesTable[library] = new Set(dependencies.split(' '));
        } catch (error) {
            if (error instanceof InvalidFormatError) {
                console.error(`Skipping invalid format: ${line}`);
            } else if (error instanceof MissingDependencyError) {
                console.error(`Skipping missing dependency: ${error.message}`);
            } else {
                console.error(`Unknown error: ${error.message}`);
            }
            continue;
        }
    }
    return dependenciesTable;
}

/**
 * Validates and extracts values from a dependency string.
 * @param {string} str - The dependency string to validate and extract.
 * @returns {Array} An array containing the library and its dependencies.
 * @throws {InvalidFormatError} If the format of the string is invalid.
 */
function validateAndExtractValues(str) {
    //* Using this characters a-zA-Z0-9_$ because its a valid name in Javascript identifiers
    let linePattern = /[a-zA-Z0-9_$]+ depends on [a-zA-Z0-9_$ ]*/;

    if (!linePattern.test(str)) {
        throw new InvalidFormatError(`Invalid format: ${str}`);
    }

    let separator = ' depends on ';
    let match = str.split(separator);
    let library = match[0];
    let dependencies = match[1];

    if (!dependencies) {
        dependencies = '';
    }

    return [library, dependencies];
}

/**
 * Finds all libraries and their dependencies recursively.
 * @param {string} key - The current library key.
 * @param {Object} obj - The dependencies table object.
 * @param {Set} path - The set of dependencies for the current library.
 * @param {string} origin - The original library key.
 */
function findAllLibraries(key, obj, path, origin) {
    if (!(key in obj)) {
        return;
    }

    for (let k of obj[key]) {
        if (k === origin || path.has(k)) continue;
        path.add(k);
        findAllLibraries(k, obj, path, origin);
    }
}

/**
 * Sorts the dependencies of each library alphabetically.
 * @param {Object} obj - The dependencies table object.
 */
function sortDependenciesAlphabetically(obj) {
    // * This makes the tests more easy to make
    for (let library in obj) {
        let dependenciesArray = Array.from(obj[library]);
        dependenciesArray.sort();
        obj[library] = dependenciesArray;
    }
}

/**
 * Create the toString of the object containing the libraries and their dependencies
 * @param {Object} obj
 * @returns
 */
function convertObjectToString(obj) {
    let str = '';
    for (let library in obj) {
        str += library;
        str += ' depends on ';
        for (let dependencies of obj[library]) {
            str += dependencies + ' ';
        }
        str += '\n';
    }
    return str;
}
