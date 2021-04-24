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
      const setting = await settingsRepository.store({ username, chat });

      if (setting) return res.json(setting);
    } catch (error) {
      return res.status(400).json({ message: error?.message });
    }
  }
}

export default SettingsController;
