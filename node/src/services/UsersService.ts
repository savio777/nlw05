import { getCustomRepository, Repository } from "typeorm";

import UsersRepository from "../repositories/UsersRepository";
import Users from "../entities/Users";

class UsersService {
  private userRepository: Repository<Users>;

  constructor() {
    this.userRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string): Promise<Users> {
    const userExist = await this.userRepository.findOne({ email });

    if (userExist) {
      return userExist;
    }

    const user = this.userRepository.create({ email });

    await this.userRepository.save(user);

    return user;
  }
}

export default UsersService;
