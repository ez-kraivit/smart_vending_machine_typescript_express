import * as express from 'express'
import * as path from 'path'
import * as cors from "cors"
import { Application } from 'express'
import * as bodyParser from 'body-parser'
import * as multer from 'multer'
import { DataSource } from "typeorm";

import Typeorm from "../../plugins/TypeOrmConnection"
import Register from "./Register"
import config from "../../cores/Base.Env.Interface"

export let dataSource:DataSource

export default class ExpressServer {
    static async connect(){
        dataSource = await Typeorm(config.dataBase)
        await (dataSource).initialize()
    }
    static start(): Promise<Application> {
        return new Promise(async (resolve, _) => {
            const server:Application = express();
            const forms:{[I:string]:any} = multer(); 
                       
            server.use(cors())
            server.use(bodyParser.json());
            server.use(forms.array());
            server.use(bodyParser.urlencoded({ extended: true }));
            server.use('/image', express.static(`${path.resolve(__dirname, '../../public')}`))

            await Register.path(server); 

            server.listen(config.port); 
            console.info(`Server run on localhost:${config.port}`);
            
            return resolve(server);
        })
    }
}

