import { autoInjectable } from "tsyringe";
import UserRepository from "../repository/user.repository";
import Result from "../utils/Result";
import config from "config";
import { Role, User } from "../model/user.model";

@autoInjectable()
export default class UserService {
    constructor(private repository: UserRepository) {}

    async create(data: any): Promise<Result> {
        let result: Result = await this.validateNewUsersData(data);
        if (!result.success) {
            return result;
        }

        const user = new User();

        user.username = data.username;
        user.password = data.password;
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.role = Role.Worker;

        try {
            await this.repository.create(user);
            result.success = true;
            result.message = "Successful registration.";
            result.value = user.username;
            return result;
        } catch {
            result.success = false;
            result.message = "Unsuccessful registration.";
            return result;
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        return this.repository.getByUsername(username);
    }

    async validateNewUsersData(data: any): Promise<Result> {
        let result: Result = new Result();
        const list: User[] = (await this.repository?.getAll()) as User[];
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (data.username === "" || !("username" in data)) {
            result.message = "Invalid username.";
            return result;
        } else if (list?.find((x) => x.username === data.username)) {
            result.message = "Username already exists.";
            return result;
        } else if (data.email === "" || !("email" in data)) {
            result.message = "Invalid email.";
            return result;
        } else if (!data.email.match(emailFormat)) {
            result.message = "Invalid email.";
            return result;
        } else if (list?.find((x) => x.email === data.email)) {
            result.message = "Email already exists.";
            return result;
        } else if (data.password === "" || !("password" in data)) {
            result.message = "Invalid password.";
            return result;
        } else if (data.firstName === "" || !("firstName" in data)) {
            result.message = "Invalid first name.";
            return result;
        } else if (data.lastName === "" || !("lastName" in data)) {
            result.message = "Invalid last name.";
            return result;
        }

        result.success = true;
        return result;
    }
}
