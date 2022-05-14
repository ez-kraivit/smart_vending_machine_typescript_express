import { Request, Response, NextFunction } from 'express'
import * as express from "express"

import Register from "../utils/ExpressServer/Register"
import config from "../cores/Base.Env.Interface"

import middlewareSystem from "../utils/Middleware/system"
import { listsVaildation, insertVaildation, updateVaildation, updateStockVaildation, deleteVaildation } from "../vaildations/MasterProduct.Vaildation"

const route = express.Router();
const routePath = `/${config.apiPrefix}/masterproduct`
const controllerName = `MasterProductController`

/** MasterProduct By Lists */
const OLists = { name: 'general', validate: { query: listsVaildation } }
const MLists = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OLists)
route.get(`${routePath}/lists`,MLists, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)    
    new app(req, res, next).getLists()
})

/** MasterProduct Insert */
const OInsert = { name: 'general', validate: { body: insertVaildation } }
const MInsert = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OInsert)
route.post(`${routePath}`,MInsert, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).insert()
})

/** MasterProduct Update */
const OUpdate = { name: 'general', validate: { body: updateVaildation } }
const MUpdate = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OUpdate)
route.put(`${routePath}`,MUpdate, async   (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).update()
})

/** MasterProduct Update Stock */
const OStock = { name: 'general', validate: { body: updateStockVaildation } }
const MStock = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OStock)
route.put(`${routePath}/stock`,MStock, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).updateStock()
})

/** MasterProduct Delete */
const ODelete = { name: 'general', validate: { parame: deleteVaildation } }
const MDelete = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, ODelete)
route.delete(`${routePath}/:_mpid`,MDelete, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).delete()
})


export default route; 

