/**
 * InvalidId
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 */
class InvalidId {

    id      = 0;
    status  = 400;
    name    = 'InvalidIdException';
    message = 'Unable to find a corresponding entity for the given id';
    code    = 1000;

    /**
     * Constructor
     *
     * @param id
     */
    constructor(id) {
        this.id = id;
    }

    /**
     * toString
     *
     * @returns {string}
     */
    toString() {
        return `${this.message} - ${this.id}`;
    }
}

export default InvalidId;