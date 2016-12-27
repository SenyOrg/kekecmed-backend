
/**
 * ValidationError
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
class ValidationError {

    errorMessage = '';
    status = 400;
    name = 'ValidationErrorException';
    message = 'Validation failed: ';
    code = 1000;
    type = 'ValidationError';

    /**
     * Constructor
     *
     * @param id
     */
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
        this.message = `${this.message} - ${this.errorMessage}`
    }

    /**
     * toString
     *
     * @returns {string}
     */
    toString() {
        return this.message;
    }
}

export default ValidationError;