import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import TransactionOrderRepository from "../repositorys/TransactionOrder.Repository"

import RandomId from "../plugins/RandomId"

export interface ITransactionOrderController {
    getLists():Promise<void>;
    insert():Promise<void>;
    update():Promise<void>;
    delete():Promise<void>;
}

export default {
    name: 'TransactionOrderController',
    export: class TransactionOrderController implements ITransactionOrderController  {

        req: Request;
        res: Response;
        next:NextFunction;

        body: { [I: string]: string } | { is_payment?: boolean, _tid?: string };
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
            const currentData = await new TransactionOrderRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async getBalance(): Promise<void> {
            const currentData = await new TransactionOrderRepository(dataSource).getBalance(<string>this.query.id)
            this.res.json({data: currentData || 0})
        }

        async insert(): Promise<void> {
            try {
                this.body.is_payment = false;
                this.body._tid = `${RandomId.generateid('base62', 15)}`
                await new TransactionOrderRepository(dataSource).insert(this.body)
                const message = { data:this.body._tid , message: 'Insert TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new TransactionOrderRepository(dataSource).update(this.body)
                const message = { message: 'Update TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new TransactionOrderRepository(dataSource).update({ _tid: this.parame._tid, is_delete: true })
                const message = { message: 'Delete TransactionOrder Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete TransactionOrder Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}