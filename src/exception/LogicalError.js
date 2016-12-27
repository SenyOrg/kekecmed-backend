
/**
 * LogicalError
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
class LogicalError {

    errorMessage = '';
    status = 400;
    name = 'LogicalErrorException';
    message = 'Validation failed: ';
    code = 1001;
    type = 'LogicalError';
    properties = [];

    /**
     * Constructor
     *
     * @param id
     */
    constructor(errorMessage, properties) {
        this.properties = properties;
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

export default LogicalError;