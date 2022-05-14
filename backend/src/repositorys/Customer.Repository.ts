import { DataSource, Repository, ObjectLiteral } from "typeorm";
import CustomerMigration from "../migration/Customer.Migration";

export default class CustomerRepository {
    private Repository: Repository<CustomerMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(CustomerMigration);
    }

    async all(): Promise<CustomerMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async getByPhone(phone: string): Promise<CustomerMigration> {
        return this.Repository.findOne({ where: { phone: phone, is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<CustomerMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<CustomerMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<CustomerMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: CustomerMigration): Promise<CustomerMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: CustomerMigration): Promise<CustomerMigration> {
        return this.Repository.delete(request);
    }
}