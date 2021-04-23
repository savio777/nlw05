import { Router, Request, Response } from "express";
import { getCustomRepository } from "typeorm";

import SettingsRepository from "./repositories/SettingsRepository";

const routes = Router();

interface bodyPostDTO {
  chat?: boolean;
  username: string;
}

routes.post("/settings", async (req: Request, res: Response) => {
  try {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const { chat, username }: bodyPostDTO = req.body;

    const setting = settingsRepository.create({ chat, username });

    await settingsRepository.save(setting);

    if (setting) {
      if (!setting.chat) setting.chat = true;
      return res.json(setting);
    }
  } catch (error) {
    console.log(error);
    return;
  }
});

export default routes;
