import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import WithdrawRepository from "../repositorys/Withdraw.Repository"
import TransactionOrderTransactions from '../transactions/TransactionOrder.Transactions';

export default {
    name: 'WithdrawController',
    export: class WithdrawController {
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
            const currentData = await new WithdrawRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async refund(): Promise<void> {
            try {
                await new TransactionOrderTransactions(dataSource).withdrawInTransaction(this.body._tid)
                const message = { message: 'Insert Withdraw Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Withdraw Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async insert(): Promise<void> {
            try {
                await new WithdrawRepository(dataSource).insert(this.body)
                const message = { message: 'Insert Withdraw Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Withdraw Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new WithdrawRepository(dataSource).update(this.body)
                const message = { message: 'Update Withdraw Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Withdraw Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new WithdrawRepository(dataSource).update({ _did: this.parame._did, is_delete: true })
                const message = { message: 'Delete Withdraw Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Withdraw Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}