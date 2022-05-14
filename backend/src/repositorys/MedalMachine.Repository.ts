import { DataSource, Repository, ObjectLiteral } from "typeorm";
import MedalMachineMigration from "../migration/MedalMachine.Migration";

export default class MedalMachineRepository {
    private Repository: Repository<MedalMachineMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {  
        this.manager = dataSource;
        this.Repository = this.manager.getRepository(MedalMachineMigration);
    }

    async all(): Promise<MedalMachineMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async get(id: string): Promise<MedalMachineMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<MedalMachineMigration> {
        return this.Repository.insert(request);
    }

    async update(request: { [key: string]: string | boolean }): Promise<MedalMachineMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date }) => {
            element.updated_at = new Date();
        })
        return this.Repository.save(request);
    }

    async softDelete(request: MedalMachineMigration): Promise<MedalMachineMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: MedalMachineMigration): Promise<MedalMachineMigration> {
        return this.Repository.delete(request);
    }
}