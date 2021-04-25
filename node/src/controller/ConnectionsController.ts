import { Request, Response } from "express";

import ConnectionsService from "../services/ConnectionsService";

class ConnectionController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const connectionsService = new ConnectionsService();

    const connection = await connectionsService.findByUserId(id);

    return res.json(connection);
  }

  async showWhitoutAdmin(req: Request, res: Response): Promise<Response> {
    const connectionsService = new ConnectionsService();

    const connections = await connectionsService.findAllWithoutAdmin();

    return res.json(connections);
  }
}

export default ConnectionController;
