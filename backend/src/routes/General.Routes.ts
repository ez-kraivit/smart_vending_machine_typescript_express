import { Request, Response, NextFunction } from 'express'
import * as express from "express"

import Register from "../utils/ExpressServer/Register"
import config from "../cores/Base.Env.Interface"

import middlewareSystem from "../utils/Middleware/system"
import { loginVaildation, registerVaildation } from "../vaildations/General.Vaildation"

const route = express.Router();
const routePath = `/${config.apiPrefix}`
const controllerName = `GeneralController`

/** Login Customer */
const OLogin = { name: 'general', validate: { body: loginVaildation } }
const MLogin = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, OLogin)
route.post(`${routePath}/login`, MLogin, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).login()
})

/** Register Customer */
const ORegister = { name: 'general', validate: { body: registerVaildation } }
const MRegister = (req: Request, res: Response, next: NextFunction) => middlewareSystem({ req, res, next }, ORegister)
route.post(`${routePath}/register`, MRegister, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).register()
})


export default route;
