import { getCustomRepository } from "typeorm";

import Messages from "../entities/Messages";

import MessagesRepository from "../repositories/MessagesRepository";

interface MessagesCreateDTO {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessagesService {
  async create({
    admin_id,
    text,
    user_id,
  }: MessagesCreateDTO): Promise<Messages> {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const message = messagesRepository.create({ admin_id, text, user_id });

    await messagesRepository.save(message);

    return message;
  }

  async listByUser(user_id: string): Promise<Messages[]> {
    const messagesRepository = getCustomRepository(MessagesRepository);

    const list = await messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });

    return list;
  }
}

export default MessagesService;
