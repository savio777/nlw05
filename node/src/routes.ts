import { Router } from "express";

const routes = Router();

import SettingsController from "./controller/SettingsController";
import UsersController from "./controller/UsersController";
import MessagesController from "./controller/MessagesController";

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

// settings
routes.post("/settings", settingsController.store);

// users
routes.post("/users", usersController.store);

// messages
routes.post("/messages", messagesController.store);
routes.get("/messages/:id", messagesController.show);

export default routes;
