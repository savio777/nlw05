import { getCustomRepository, Repository } from "typeorm";

import Settings from "../entities/Settings";
import SettingsRepository from "../repositories/SettingsRepository";

interface SettingCreateDTO {
  chat?: boolean;
  username: string;
}

class SettingService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async store({ chat, username }: SettingCreateDTO): Promise<Settings> {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const setting = this.settingsRepository.create({ chat, username });

    await this.settingsRepository.save(setting);

    if (setting) {
      if (!setting.chat) setting.chat = true;
      return setting;
    }
  }
}

export default SettingService;
