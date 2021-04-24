import { Router } from "express";

const routes = Router();

import SettingsController from "./controller/SettingsController";
import UsersController from "./controller/UsersController";

const settingsController = new SettingsController();
const usersController = new UsersController();

// settings
routes.post("/settings", settingsController.store);

// users
routes.post("/users", usersController.store);

export default routes;
