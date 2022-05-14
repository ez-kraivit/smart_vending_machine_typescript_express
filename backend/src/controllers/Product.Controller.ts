import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import ProductRepository from "../repositorys/Product.Repository"

import RandomId from "../plugins/RandomId"

export default {
    name: 'ProductController',
    export: class ProductController {
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
            const currentData = await new ProductRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async insert(): Promise<void> {
            try {
                if (this.body._pid) this.body._pid = `${RandomId.generateid('base62', 15)}`
                await new ProductRepository(dataSource).insert(this.body)
                const message = { message: 'Insert Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new ProductRepository(dataSource).update(this.body)
                const message = { message: 'Update Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async updateStock(): Promise<void> {
            try {
                await new ProductRepository(dataSource).update(this.body)
                const message = { message: 'Update Stock Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Stock Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new ProductRepository(dataSource).update({ _pid: this.parame._pid, is_delete: true })
                const message = { message: 'Delete Product Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Product Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}