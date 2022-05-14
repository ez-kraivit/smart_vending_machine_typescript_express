import { Request, Response, NextFunction } from 'express'
import * as express from "express"

import Register from "../utils/ExpressServer/Register"
import config from "../cores/Base.Env.Interface"

const route = express.Router();
const routePath = `/${config.apiPrefix}/demo`
const controllerName = `DemoController`

/** Demo */
route.get(`${routePath}/test`, async (req: Request, res: Response, next: NextFunction) => {
    const app = await Register.app(`${controllerName}`)
    new app(req, res, next).get()
})


export default route;
