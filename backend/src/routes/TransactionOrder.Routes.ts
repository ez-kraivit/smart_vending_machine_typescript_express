import { Request, Response, NextFunction } from 'express'
import * as express from "express"

import Register from "../utils/ExpressServer/Register"
import config from "../cores/Base.Env.Interface"

import middlewareSystem from "../utils/Middleware/system"
import { balanceVaildation,listsVaildation, insertVaildation, updateVaildation, deleteVaildation, checkPaymentVaildation } from "../vaildations/TransactionOrder.Vaildation"

const route = express.Router();
const routePath = `/${config.apiPrefix}/transaction-order`
const controllerName = `TransactionOrderController`


/** Transaction Order By Lists */
const OLists = { name: 'general', validate: { query: listsVaildation } }
const MLists = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OLists)
route.get(`${routePath}/lists`,MLists, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).getLists()
})

/** Transaction Order By Balance */
const OBalance = { name: 'general', validate: { query: balanceVaildation } }
const MBalance = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OBalance)
route.get(`${routePath}/balance`,MBalance, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).getBalance()
})

/** Transaction Order Insert */
const OInsert = { name: 'general', validate: { body: insertVaildation } }
const MInsert = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OInsert)
route.post(`${routePath}`,MInsert, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).insert()
})

/** Transaction Order Insert */
const OCheckPayment = { name: 'general', validate: { body: checkPaymentVaildation } }
const MCheckPayment = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OCheckPayment)
route.post(`${routePath}/check`,MCheckPayment, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).checkPayment()
})

/** Transaction Order Update */
const OUpdate = { name: 'general', validate: { body: updateVaildation } }
const MUpdate = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OUpdate)
route.put(`${routePath}`,MUpdate, async   (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).update()
})

/** Transaction Order Delete */
const ODelete = { name: 'general', validate: { parame: deleteVaildation } }
const MDelete = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, ODelete)
route.delete(`${routePath}/:_tid`,MDelete, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).delete()
})


export default route; 

