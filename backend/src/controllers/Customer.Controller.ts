import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import CustomerRepository from "../repositorys/Customer.Repository"

import RandomId from "../plugins/RandomId"
import Bcrypt from "../plugins/Bcrypt"

export interface ICustomerController {
    getByPhone():Promise<void>;
    getLists():Promise<void>;
    insert():Promise<void>;
    update():Promise<void>;
    delete():Promise<void>;
}

export default {
    name: 'CustomerController',
    export: class CustomerController implements ICustomerController  {

        req: Request;
        res: Response;
        next:NextFunction;

        body: { [I: string]: string } | { password?: string, _cid?: string };
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

        async getByPhone(): Promise<void> {
            const currentData = await new CustomerRepository(dataSource).getByPhone(this.parame.phone)
            this.res.json(currentData)
        }

        async getLists(): Promise<void> {
            const currentData = await new CustomerRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async insert(): Promise<void> {
            try {
                if (this.body._cid) this.body._cid = `${RandomId.generateid('base62', 15)}`
                if (this.body.password) this.body.password = <any>Bcrypt.genPassword(this.body.password)
                await new CustomerRepository(dataSource).insert(this.body)
                const message = { message: 'Insert Customer Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Customer Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                if (this.body.password) this.body.password = <any>Bcrypt.genPassword(this.body.password)
                await new CustomerRepository(dataSource).update(this.body)
                const message = { message: 'Update Customer Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Customer Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new CustomerRepository(dataSource).update({ _eid: this.parame._eid, is_delete: true })
                const message = { message: 'Delete Customer Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Customer Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}