import { Router } from "express";

const routes = Router();

import SettingsController from "./controller/SettingsController";
import UsersController from "./controller/UsersController";
import MessagesController from "./controller/MessagesController";
import ConnectionsController from "./controller/ConnectionsController";

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();
const connectionsController = new ConnectionsController();

// connections
routes.get("/connections/get/:id", connectionsController.show);
routes.get("/connections/whitoutadmin", connectionsController.showWhitoutAdmin);

// settings
routes.post("/settings", settingsController.store);
routes.get("/settings/:username", settingsController.findByUserName);
routes.put("/settings/:username", settingsController.update); // change admin: true or false

// users
routes.post("/users", usersController.store);

// messages
routes.post("/messages", messagesController.store);
routes.get("/messages/:id", messagesController.show);

export default routes;
