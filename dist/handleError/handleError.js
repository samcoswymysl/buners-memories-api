"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ValidationError = void 0;
class ValidationError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.ValidationError = ValidationError;
const handleError = (er, _req, res, _next) => {
    res
        .status(er instanceof ValidationError ? er.code : 500)
        .json({
        message: er instanceof ValidationError ? er.message : 'Sorry try later'
    });
};
exports.handleError = handleError;
//# sourceMappingURL=handleError.js.map