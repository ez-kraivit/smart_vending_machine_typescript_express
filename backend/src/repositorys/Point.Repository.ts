import { DataSource, Repository, ObjectLiteral } from "typeorm";
import PointMigration from "../migration/Point.Migration";

export default class PointRepository {
    private Repository: Repository<PointMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource; 
        this.Repository = this.manager.getRepository(PointMigration);
    }

    async all(): Promise<PointMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async get(id: string): Promise<PointMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<PointMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<PointMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: PointMigration): Promise<PointMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: PointMigration): Promise<PointMigration> {
        return this.Repository.delete(request);
    }
}