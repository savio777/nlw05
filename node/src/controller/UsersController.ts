import { Request, Response } from "express";

import UsersService from "../services/UsersService";

interface BodyPostDTO {
  email: string;
}

class UsersController {
  async store(req: Request, res: Response): Promise<Response> {
    try {
      const { email }: BodyPostDTO = req.body;

      const userService = new UsersService();

      const user = await userService.create(email);

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error?.message });
    }
  }
}

export default UsersController;
