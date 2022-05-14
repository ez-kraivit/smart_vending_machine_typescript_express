import { DataSource, Repository, ObjectLiteral } from "typeorm";
import HistoryEmailForgotPasswordMigration from "../migration/HistoryEmailForgotPassword.Migration";

export default class HistoryEmailForgotPasswordRepository {
    private Repository: Repository<HistoryEmailForgotPasswordMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {
        this.manager = dataSource;
        this.Repository = this.manager.getRepository(HistoryEmailForgotPasswordMigration);
    }

    async all(): Promise<HistoryEmailForgotPasswordMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async get(id: string): Promise<HistoryEmailForgotPasswordMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<HistoryEmailForgotPasswordMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<HistoryEmailForgotPasswordMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: HistoryEmailForgotPasswordMigration): Promise<HistoryEmailForgotPasswordMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: HistoryEmailForgotPasswordMigration): Promise<HistoryEmailForgotPasswordMigration> {
        return this.Repository.delete(request);
    }
}