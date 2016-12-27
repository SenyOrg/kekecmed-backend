
/**
 * QueryParameter
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
class QueryParameter {
    name = 'QueryParameter';
    message = '';
    code = 1001;
    status = 400;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(message) {
        this.message = message;
    }

    /**
     * toString
     *
     * @returns {string}
     */
    toString() {
        return `Invalid Query Parameter: ${this.message}`;
    }
}

export default QueryParameter;