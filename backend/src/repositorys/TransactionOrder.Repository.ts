import { DataSource, Repository, ObjectLiteral } from "typeorm";
import TransactionOrderMigration from "../migration/TransactionOrder.Migration";

export default class TransactionOrderRepository {
    private Repository: Repository<TransactionOrderMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(TransactionOrderMigration);
    }

    async all(): Promise<TransactionOrderMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async getCheck(id: string): Promise<TransactionOrderMigration> {
        return this.Repository.findOne({ where: { _tid: id, is_delete: false } });
    }

    async getBalance(id: string): Promise<TransactionOrderMigration> {
        return this.Repository.findOne({ select:['balance'] ,where: { _tid: id, is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async insert(request: { [key: string]: string | boolean | any }): Promise<TransactionOrderMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean | string[] }): Promise<TransactionOrderMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: TransactionOrderMigration): Promise<TransactionOrderMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: TransactionOrderMigration): Promise<TransactionOrderMigration> {
        return this.Repository.delete(request);
    }
}