import { DataSource,Repository,ObjectLiteral } from "typeorm";
import DrawerMigration from "../migration/Drawer.Migration";

export default class DrawerRepository {
    private Repository: Repository<DrawerMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(DrawerMigration);
    }

    async all():Promise<DrawerMigration[]>  {
        return await this.Repository.find({  where: { is_delete: false } });
    }

    async get(id: string):Promise<DrawerMigration>  {
        return this.Repository.findOne({  where: {  id:id , is_delete: false } });
    }
    
    async insert(request:{[I:string]:string|boolean}): Promise<DrawerMigration> { 
        return this.Repository.insert(request);
    }

    async update(request: {[I:string]:string|boolean}):Promise<DrawerMigration>  {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: DrawerMigration):Promise<DrawerMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: DrawerMigration):Promise<DrawerMigration> {
        return this.Repository.delete(request);
    }   
}