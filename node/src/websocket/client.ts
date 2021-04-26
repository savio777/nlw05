import { Socket } from "socket.io";

import { io } from "../http";

import ConnectionsService from "../services/ConnectionsService";
import UsersService from "../services/UsersService";
import MessagesService from "../services/MessagesService";

interface ParamsFirstSessionDTO {
  text: string;
  email: string;
}

interface ParamsSendAdminDTO {
  text: string;
  socket_admin_id: string;
}

io.on("connect", (socket: Socket) => {
  const connectionService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_session", async (params: ParamsFirstSessionDTO) => {
    //console.log("params", params);

    const { text, email } = params;

    const userExist = await usersService.findByEmail(email);

    let user_id = null;

    if (!userExist) {
      await usersService.create(email);

      // não recebe id ao criar usuário no postgres
      const userCreated = await usersService.findByEmail(email);

      user_id = userCreated.id;

      await connectionService.create({
        socket_id: socket.id,
        user_id: userCreated.id,
      });
    } else {
      user_id = userExist.id;

      const connection = await connectionService.findByUserId(userExist.id);

      if (!connection) {
        await connectionService.create({
          socket_id: socket.id,
          user_id: userExist.id,
        });
      } else {
        connection.socket_id = socket.id;

        await connectionService.create(connection);
      }
    }

    await messagesService.create({ user_id, text });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on(
    "client_send_to_admin",
    async ({ text, socket_admin_id }: ParamsSendAdminDTO) => {
      const { user_id } = await connectionService.findByUserSocketId(socket.id);

      const message = await messagesService.create({ text, user_id });

      io.to(socket_admin_id).emit("admin_receive_message", {
        message,
        socket_id: socket.id,
      });
    }
  );
});
