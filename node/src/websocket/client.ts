import { Socket } from "socket.io";

import { io } from "../http";

io.on("connect", (socket: Socket) => {
  socket.on("client_first_session", (params) => {
    // quando clicar em iniciar chat
    console.log("params", params);
  });
});
