import { Request, Response, NextFunction } from 'express'

import Middleware from './index'
import Options from "../../declarations/Options.Interface"

export default (express: { req: Request, res: Response, next: NextFunction }, options: Options): Object|void => {
    const query = options.validate?.query
    const body:any = options.validate?.body
    const parame = options.validate?.parame
    const messageError = []
    if ((!!query && express.req.query) && query.validate(express.req.query).error != null) {
        messageError.push(`[query] ${String(query.validate(express.req.query).error)}`)
    }
    if ((!!body && express.req.body) && body.validate(express.req.body).error != null) {        
        messageError.push(`[body] ${String(body.validate(express.req.body).error)}`)
    }
    if ((!!parame && express.req.params) && parame.validate(express.req.params).error != null) {
        messageError.push(`[params] ${String(parame.validate(express.req.params).error)}`)
    }
    if (messageError.length > 0) {
        return express.res.status(400).json(messageError)
    }
    switch (true) {
        case options.name === 'auth':
            return new Middleware(express.req, express.res, express.next).auth();
        default:
            return new Middleware(express.req, express.res, express.next).general();
    }
}