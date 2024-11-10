class Result {
    ok;
    message;
    data;

    constructor(ok, data, message) {
        this.ok = ok;
        this.message = message;
        this.data = data;
    }
}

class ResponseFactory {
    static success (data) {
        return new Result(true, data, "");
    }
    static fail (message) {
        return new Result(false, null, message);
    }
}

module.exports = ResponseFactory;