import { Request, Response, NextFunction } from 'express'

export default {
    name: 'DemoController',
    export: class DemoController {
        req: Request;
        res: Response;
        next:NextFunction;

        body: { [I: string]: string };
        query: { [I: string]: string | number | undefined | null | never | Object };
        parame: { [I: string]: string };

        constructor(req: Request, res: Response,next:NextFunction) {
            this.res = res;
            this.req = req;
            this.body = req.body;
            this.query = req.query;
            this.parame = req.params;
            this.next = next;
        }

        get(): void {
            this.res.send('Hello Test Demo!')
        }

    }
}