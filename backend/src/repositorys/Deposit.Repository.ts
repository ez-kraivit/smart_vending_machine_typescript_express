import { DataSource, Repository, ObjectLiteral } from "typeorm";
import DepositMigration from "../migration/Deposit.Migration";

export default class DepositRepository {
    private Repository: Repository<DepositMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(DepositMigration);
    }
    
    async all(): Promise<DepositMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<DepositMigration> {
        return this.Repository.findOne({ where: { _did: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<DepositMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<DepositMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async updateAll(_tid:string): Promise<DepositMigration> {
        return this.Repository.createQueryBuilder().update(DepositMigration)
        .set({ is_return: true }).where("_tid = :id", { id:_tid })
        .andWhere("is_return = :is_return", { is_return:false }).execute()
    }

    async softDelete(request: DepositMigration): Promise<DepositMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: DepositMigration): Promise<DepositMigration> {
        return this.Repository.delete(request);
    }
}