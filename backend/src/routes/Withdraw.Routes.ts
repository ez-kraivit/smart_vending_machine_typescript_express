import { Request, Response, NextFunction } from 'express'
import * as express from "express"

import Register from "../utils/ExpressServer/Register"
import config from "../cores/Base.Env.Interface"

import middlewareSystem from "../utils/Middleware/system"
import { refundVaildation,listsVaildation, insertVaildation, updateVaildation, deleteVaildation } from "../vaildations/Withdraw.Vaildation"

const route = express.Router();
const routePath = `/${config.apiPrefix}/withdraw`
const controllerName = `WithdrawController`


/** Withdraw By Lists */
const OLists = { name: 'general', validate: { query: listsVaildation } }
const MLists = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OLists)
route.get(`${routePath}/lists`,MLists, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).getLists()
})

/** Withdraw By Lists */
const OFund = { name: 'general', validate: { body: refundVaildation } }
const MFund = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OFund)
route.post(`${routePath}/refund`,MFund, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).refund()
})

/** Withdraw Insert */
const OInsert = { name: 'general', validate: { body: insertVaildation } }
const MInsert = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OInsert)
route.post(`${routePath}`,MInsert, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).insert()
})

/** Withdraw Update */
const OUpdate = { name: 'general', validate: { body: updateVaildation } }
const MUpdate = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OUpdate)
route.put(`${routePath}`,MUpdate, async   (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).update()
})

/** Withdraw Delete */
const ODelete = { name: 'general', validate: { parame: deleteVaildation } }
const MDelete = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, ODelete)
route.delete(`${routePath}/:_did`,MDelete, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).delete()
})


export default route; 

