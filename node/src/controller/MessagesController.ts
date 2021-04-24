import { Request, Response } from "express";

import MessagesService from "../services/MessagesService";

interface MessagesBodyPostDTO {
  admin_id?: string;
  user_id: string;
  text: string;
}

class MessagesController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const body: MessagesBodyPostDTO = req.body;

      const messagesService = new MessagesService();

      const message = await messagesService.create(body);

      return res.json(message);
    } catch (error) {}
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const messagesService = new MessagesService();

      const list = await messagesService.listByUser(id);

      return res.json(list);
    } catch (error) {}
  }
}

export default MessagesController;
