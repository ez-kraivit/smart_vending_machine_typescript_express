import { DataSource, Repository, ObjectLiteral } from "typeorm";
import DrawerHistoryMigration from "../migration/DrawerHistory.Migration";

export default class DrawerHistoryRepository {
    private Repository: Repository<DrawerHistoryMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(DrawerHistoryMigration);
    }

    async all(): Promise<DrawerHistoryMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async get(id: string): Promise<DrawerHistoryMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<DrawerHistoryMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<DrawerHistoryMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: DrawerHistoryMigration): Promise<DrawerHistoryMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: DrawerHistoryMigration): Promise<DrawerHistoryMigration> {
        return this.Repository.delete(request);
    }
}