import { singleton } from "tsyringe";
import { AppDataSource } from "../utils/data-source";
import { User } from "../model/user.model";
import { Repository } from "typeorm";
import { QueryFailedError } from "typeorm";

@singleton()
export default class UserRepository {
    dbSet: Repository<User>;
    constructor() {
        this.dbSet = AppDataSource.getRepository(User);
    }

    async create(user: User) {
        return await this.dbSet.save(user);
    }

    async getByUsername(username: string): Promise<User | null> {
        return await this.dbSet.findOneBy({
            username: username,
        });
    }

    async getAll(): Promise<User[]> {
        return await this.dbSet.find();
    }
}
