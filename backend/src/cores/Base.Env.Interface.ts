const _config : IConFig = {
    port: Number(process.env.PORT?.toString().trim()) || 5570,
    cors : (process.env.CORS?.toString().trim() == 'true') ? true : { origin:process.env.CORS?.split(',') } || true ,
    apiPrefix : process.env.APIPREFIX?.toString().trim() ,
    dataBase:{
        "connectTimeoutMS" : Number(String(process.env.POSTGRES__CONNECTTIMEOUTMS).trim()) || 10000,
        "database" : process.env.POSTGRES__DATABASE?.toString().trim() || 'postgres',
        "host" : process.env.POSTGRES__HOST?.toString().trim() ,
        "name" : process.env.POSTGRES__NAME?.toString().trim() || 'Kraivit',
        "schema" : process.env.POSTGRES__SCHEMA?.toString().trim() || 'public',
        "username" : process.env.POSTGRES__USERNAME?.toString().trim() ,
        "password" : process.env.POSTGRES__PASSWORD?.toString().trim() ,
        "port" : Number(process.env.POSTGRES__PORT?.toString().trim()) ,
        "synchronize" : (process.env.POSTGRES__SYNCHRONIZE?.toString().trim() == 'true') ? true : false || true,
        "entities" : true,
        "logging" : (process.env.POSTGRES__LOGING?.toString().trim() == 'true') ? true : false || false,
        "migrationsRun" : (process.env.POSTGRES__MIGRATION_RUN?.toString().trim() == 'true') ? true : false || true,
        "type" : process.env.POSTGRES__TYPE?.toString().trim() || 'postgres',    
    }
}
export default _config
export interface IConFig {
    port: number | undefined;
    apiPrefix: string | undefined;
    cors: any;
    dataBase: IDataBase;
}
export interface IDataBase {
    connectTimeoutMS  : number;
    database  : string | undefined;
    host  : string | undefined | number;
    name  : string | undefined; 
    schema  : string | undefined;
    username  : string | undefined;
    password  : string | undefined;
    port  : number | undefined;
    synchronize: string | undefined | boolean ;
    entities?  : boolean ;
    logging: string | undefined | boolean ;
    migrationsRun : string | undefined | boolean ;
    type  : string | undefined;
}
