import * as Glob from 'glob'
import * as path from 'path'
import { Application } from 'express'

type Class = { new(...args: any[]): any; };

export default class Register {

    static path(server:Application):Promise<Application> {
        return new Promise((resolve)=>{
            const expressArrayPathsRouter : Array<string> = Glob.sync(`${path.resolve(__dirname, '../../routes')}/*.@(js|ts)`);
            const data = expressArrayPathsRouter.map((ts:string) => require(`${ts}`));
            resolve(server.use(data.map(item=>item.default)));
        })
    }
    
    static app(name:string):Promise<Class> {
        return new Promise((resolve)=>{
            const expressArrayPathsRouter : Array<string> = Glob.sync(`${path.resolve(__dirname, '../../controllers')}/*.@(js|ts)`);                        
            const register = expressArrayPathsRouter.map((ts:string) => require(`${ts}`));     
            let response;
            for (let index = 0; index < register.length; index++) {                                
                if(register[index].default.name == name){                    
                    response = register[index].default.export
                    break;
                }
            }                        
            resolve(response);
        })
    }
}
