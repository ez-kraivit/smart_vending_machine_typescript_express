import { DataSource, Repository, ObjectLiteral } from "typeorm";
import ProductMigration from "../migration/Product.Migration";

export default class ProductRepository {
    private Repository: Repository<ProductMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(ProductMigration);
    }

    async all(): Promise<ProductMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async get(id: string): Promise<ProductMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async insert(request: { [key: string]: string | boolean }): Promise<ProductMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<ProductMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date | string }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: ProductMigration): Promise<ProductMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: ProductMigration): Promise<ProductMigration> {
        return this.Repository.delete(request);
    }
}