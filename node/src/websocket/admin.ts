import { Socket } from "socket.io";

import { io } from "../http";

import ConnectionsService from "../services/ConnectionsService";
import MessagesService from "../services/MessagesService";

interface AdminSendMessageParams {
  user_id: string;
  text: string;
}

io.on("connect", async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();

  io.emit("admin_list_all_users", allConnectionsWithoutAdmin);

  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;

    const allMessages = await messagesService.listByUser(user_id);

    callback(allMessages);
  });

  socket.on(
    "admin_send_message",
    async ({ user_id, text }: AdminSendMessageParams) => {
      try {
        await messagesService.create({
          user_id,
          text,
          admin_id: socket.id,
        });

        const { socket_id } = await connectionsService.findByUserId(user_id);

        io.to(socket_id).emit("admin_send_to_client", {
          text,
          socket_id: socket.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  );
});
