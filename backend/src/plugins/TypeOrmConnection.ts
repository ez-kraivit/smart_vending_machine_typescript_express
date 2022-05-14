import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import migration from '../migration/index'

export default async function(conFigDB:PostgresConnectionOptions|any,logging=false):Promise<DataSource>{    
    conFigDB.entities = (conFigDB.entities) ? migration : [] ;    
    conFigDB.logging = logging   
    return new DataSource(<PostgresConnectionOptions>conFigDB);
}
