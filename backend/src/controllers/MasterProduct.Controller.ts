import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import MasterProductRepository from "../repositorys/MasterProduct.Repository"

import RandomId from "../plugins/RandomId"

export default {
    name: 'MasterProductController',
    export: class MasterProductController {
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

        async getLists(): Promise<void> {
            const currentData = await new MasterProductRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async insert(): Promise<void> {
            try {
                if (this.body._mpid) this.body._mpid = `${RandomId.generateid('base62', 15)}`
                await new MasterProductRepository(dataSource).insert(this.body)
                const message = { message: 'Insert Master Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Master Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new MasterProductRepository(dataSource).update(this.body)
                const message = { message: 'Update Master Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Master Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async updateStock(): Promise<void> {
            try {
                await new MasterProductRepository(dataSource).update(this.body)
                const message = { message: 'Update Master Stock Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Master Stock Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new MasterProductRepository(dataSource).update({ _mpid: this.parame._mpid, is_delete: true })
                const message = { message: 'Delete Master Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Master Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}