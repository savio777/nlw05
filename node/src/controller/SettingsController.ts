import { Request, Response } from "express";

import SettingService from "../services/SettingsService";

interface BodyPostDTO {
  chat?: boolean;
  username: string;
}

class SettingsController {
  async store(req: Request, res: Response): Promise<Response> {
    const { username, chat }: BodyPostDTO = req.body;

    const settingsRepository = new SettingService();

    try {
      const setting = await settingsRepository.create({ username, chat });

      if (setting) return res.json(setting);
    } catch (error) {
      return res.status(400).json({ message: error?.message });
    }
  }

  async findByUserName(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;

    const settingsRepository = new SettingService();

    const setting = await settingsRepository.findByUserName(username);

    return res.json(setting);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { username } = req.params;
    const { chat } = req.body;

    const settingService = new SettingService();

    await settingService.update({ chat, username });

    return res.json({ username, chat });
  }
}

export default SettingsController;
