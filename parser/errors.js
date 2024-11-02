export class InvalidFormatError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidFormatError';
    }
}

export class MissingDependencyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingDependencyError';
    }
}
