import { getCustomRepository, Repository } from "typeorm";

import Connections from "../entities/Connections";
import ConnectionsRepository from "../repositories/ConnectionsRepository";

interface ConnectionCreateDTO {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connections>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: ConnectionCreateDTO) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({ user_id });

    return connection;
  }
}

export default ConnectionsService;
