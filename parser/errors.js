/**
 * Author: Enrique Madrid
 * Email: contact@nervess.cat
 * Date: 2024-11-02
 */

/**
 * Represents an error thrown when the format of a dependency string is invalid.
 * @extends Error
 */
export class InvalidFormatError extends Error {
    /**
     * Creates an instance of InvalidFormatError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'InvalidFormatError';
    }
}

/**
 * Represents an error thrown when a dependency is missing.
 * @extends Error
 */
export class MissingDependencyError extends Error {
    /**
     * Creates an instance of MissingDependencyError.
     * @param {string} message - The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'MissingDependencyError';
    }
}
