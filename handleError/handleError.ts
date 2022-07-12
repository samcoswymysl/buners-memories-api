import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
public code: number
    constructor(message: string, code: number) {
        super(message) ;
        this.code = code
    }
}

export const handleError = (er: Error, _req: Request, res: Response, _next: NextFunction) => {

    res
        .status(er instanceof ValidationError ? er.code : 500)
        .json({
        message: er instanceof ValidationError ? er.message : 'Sorry try later'
    })


}
