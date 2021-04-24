import { getCustomRepository } from "typeorm";

import Settings from "../entities/Settings";

import SettingsRepository from "../repositories/SettingsRepository";

interface SettingCreateDTO {
  chat?: boolean;
  username: string;
}

class SettingService {
  async store({ chat, username }: SettingCreateDTO): Promise<Settings> {
    const settingsRepository = getCustomRepository(SettingsRepository);

    const userAlreadyExists = await settingsRepository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const setting = settingsRepository.create({ chat, username });

    await settingsRepository.save(setting);

    if (setting) {
      if (!setting.chat) setting.chat = true;
      return setting;
    }
  }
}

export default SettingService;
