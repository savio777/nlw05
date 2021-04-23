import { Router } from "express";

const routes = Router();

import SettingsController from "./controller/SettingsController";

const settingsController = new SettingsController();

routes.post("/settings", settingsController.store);

export default routes;
