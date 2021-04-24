import { getCustomRepository, Repository } from "typeorm";

import Messages from "../entities/Messages";
import MessagesRepository from "../repositories/MessagesRepository";

interface MessagesCreateDTO {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessagesService {
  private messagesRepository: Repository<Messages>;

  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }

  async create({
    admin_id,
    text,
    user_id,
  }: MessagesCreateDTO): Promise<Messages> {
    const message = this.messagesRepository.create({ admin_id, text, user_id });

    await this.messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string): Promise<Messages[]> {
    const list = await this.messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export default MessagesService;
