import { Request, Response, NextFunction } from 'express'

export default {
    name: 'GeneralController',
    export: class GeneralController {
        req: Request;
        res: Response;
        next:NextFunction;

        body: unknown;
        query: unknown;
        parame: unknown;

        constructor(req: Request, res: Response,next:NextFunction) {
            this.res = res;
            this.req = req;
            this.body = req.body;
            this.query = req.query;
            this.parame = req.params;
            this.next = next;
        }

        login(): void {
            this.res.send([])
        }

        register(): void {
            console.log(this.body);
            this.res.send('Hello General!')
        }

    }
}