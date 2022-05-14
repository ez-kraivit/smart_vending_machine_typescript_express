import { Request, Response, NextFunction } from 'express'

export type T = string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer | any

export default class Middleware {
    query:  { [I: string]: string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer  };
    body: { [I: string]: string | number | boolean | undefined | null | Object | Array<Object> | Date | Buffer };
    req: Request;
    res: Response;
    next: NextFunction;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.res = res;
        this.query = req.query;
        this.body = req.body;
        this.req = req;
        this.next = next;
    }

    general() {
        this.next();
    }

    auth(): void {
        if (this.req.headers.authorization != undefined) {
            console.log('มี Token');
            this.next();
        } else {
            this.res.statusCode = 415;
            this.next(`${new Error('415 Unsupported Media Type')}`);
        }
    }
}