import { Request, Response, NextFunction } from 'express'

import { dataSource } from '../utils/ExpressServer';
import EmployeeRepository from "../repositorys/Employee.Repository"

import RandomId from "../plugins/RandomId"
import Bcrypt from "../plugins/Bcrypt"

export default {
    name: 'EmployeeController',
    export: class EmployeeController {
        req: Request;
        res: Response;
        next:NextFunction;

        body: { [I: string]: string } | { password?: string, _eid?: string };
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
            const currentData = await new EmployeeRepository(dataSource).getLists(<number>this.query.page)
            this.res.json(currentData)
        }

        async insert(): Promise<void> {
            try {
                if (this.body._eid) this.body._eid = `${RandomId.generateid('base62', 15)}`
                if (this.body.password) this.body.password = <any>Bcrypt.genPassword(this.body.password)
                await new EmployeeRepository(dataSource).insert(this.body)
                const message = { message: 'Insert Employee Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Insert Employee Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async update(): Promise<void> {
            try {
                if (this.body.password) this.body.password = <any>Bcrypt.genPassword(this.body.password)
                await new EmployeeRepository(dataSource).update(this.body)
                const message = { message: 'Update Employee Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Update Employee Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

        async delete(): Promise<void> {
            try {
                await new EmployeeRepository(dataSource).update({ _eid: this.parame._eid, is_delete: true })
                const message = { message: 'Delete Employee Success!', error: null }
                this.res.json(message)
            } catch (error) {
                console.info(error)
                const message = { message: 'Delete Employee Fail!', error: `${error}` }
                this.res.json(message)
            }
        }

    }
}