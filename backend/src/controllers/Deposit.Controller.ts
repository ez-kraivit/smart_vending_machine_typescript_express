import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import DepositRepository from "../repositorys/Deposit.Repository"
import TransactionOrderTransactions from '../transactions/TransactionOrder.Transactions';

export default {
    name: 'DepositController',
    export: class DepositController {
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
            const currentData = await new DepositRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async insert(): Promise<void> {
            try {
                await new TransactionOrderTransactions(dataSource).depositInTransaction(<{[I:string]:string|boolean|number}>this.body)
                const message = { message: 'Insert Deposit Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Deposit Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                await new DepositRepository(dataSource).update(this.body)
                const message = { message: 'Update Deposit Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Deposit Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new DepositRepository(dataSource).update({ _did: this.parame._did, is_delete: true })
                const message = { message: 'Delete Deposit Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Deposit Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}