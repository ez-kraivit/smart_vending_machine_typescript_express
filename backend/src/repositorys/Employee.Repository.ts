import { DataSource, Repository, ObjectLiteral } from "typeorm";
import EmployeeMigration from "../migration/Employee.Migration";

export default class EmployeeRepository {
    private Repository: Repository<EmployeeMigration> | ObjectLiteral;

    private manager: DataSource;

    constructor(dataSource: DataSource) {        
        this.manager = dataSource;      
        this.Repository = this.manager.getRepository(EmployeeMigration);
    }
    
    async all(): Promise<EmployeeMigration[]> {
        return await this.Repository.find({ where: { is_delete: false } });
    }

    async getLists(page: number = 0, limit: number = 50): Promise<Object> {
        const [list, count] = await Promise.all([
            this.Repository.find({ where: { is_delete:false }, take: limit, skip: page > 1 ? (page - 1) * limit : 0, order: { updated_at: "DESC" } }),
            this.Repository.count({ where: { is_delete:false }, order: { updated_at: "DESC" } }),
        ]);
        return { list, count, page, pageSize: limit };
    }

    async get(id: string): Promise<EmployeeMigration> {
        return this.Repository.findOne({ where: { id: id, is_delete: false } });
    }

    async insert(request: { [key: string]: string | boolean }): Promise<EmployeeMigration> {
        return this.Repository.insert(request);
    }

    async update(request: {[I:string]:string|boolean|number}): Promise<EmployeeMigration> {
        if (Array.isArray(request)) request.map((element: { updated_at: Date | string }) => {
            element.updated_at = new Date()
        })        
        return this.Repository.save(request);
    }

    async softDelete(request: EmployeeMigration): Promise<EmployeeMigration> {
        return this.Repository.save(request);
    }

    async hardDelete(request: EmployeeMigration): Promise<EmployeeMigration> {
        return this.Repository.delete(request);
    }
}