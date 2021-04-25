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

  async create({
    socket_id,
    user_id,
    admin_id,
    id,
  }: ConnectionCreateDTO): Promise<Connections> {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionsRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string): Promise<Connections> {
    const connection = await this.connectionsRepository.findOne({ user_id });

    return connection;
  }

  async findAllWithoutAdmin(): Promise<Connections[]> {
    const connections = await this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });

    return connections;
  }
}

export default ConnectionsService;
