import { getCustomRepository, Repository } from "typeorm";

import Settings from "../entities/Settings";
import SettingsRepository from "../repositories/SettingsRepository";

interface SettingCreateDTO {
  chat?: boolean;
  username: string;
}

interface SettingUpdateDTO {
  username: string;
  chat: boolean;
}

class SettingService {
  private settingsRepository: Repository<Settings>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: SettingCreateDTO): Promise<Settings> {
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

  async findByUserName(username: string): Promise<Settings> {
    const setting = await this.settingsRepository.findOne({ username });

    return setting;
  }

  async update({ chat, username }: SettingUpdateDTO): Promise<void> {
    const setting = await this.settingsRepository
      .createQueryBuilder()
      .update(Settings)
      .set({ chat })
      .where("username = :username", { username })
      .execute();
  }
}

export default SettingService;
