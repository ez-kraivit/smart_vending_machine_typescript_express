import { DataSource,Repository,ObjectLiteral } from "typeorm";
import WithdrawMigration from "../migration/Withdraw.Migration";

export default class WithdrawRepository {
    private Repository: Repository<WithdrawMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(WithdrawMigration);
    }

    async all():Promise<WithdrawMigration[]>  {
        return await this.Repository.find({  where: { is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string):Promise<WithdrawMigration>  {
        return this.Repository.findOne({  where: {  _wid:id , is_delete: false } });
    }
    
    async insert(request:{[I:string]:string|boolean}): Promise<WithdrawMigration> { 
        return this.Repository.insert(request);
    }

    async update(request: {[I:string]:string|boolean}):Promise<WithdrawMigration>  {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: WithdrawMigration):Promise<WithdrawMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: WithdrawMigration):Promise<WithdrawMigration> {
        return this.Repository.delete(request);
    }   
}