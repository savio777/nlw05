import { Socket } from "socket.io";

import { io } from "../http";

import ConnectionsService from "../services/ConnectionsService";
import UsersService from "../services/UsersService";
import MessagesService from "../services/MessagesService";

interface ParamsDTO {
  text: string;
  email: string;
}

io.on("connect", (socket: Socket) => {
  const connectionService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_session", async (params: ParamsDTO) => {
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
  });
});
