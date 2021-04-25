const port = 3333;

import server from "./http";
import "./websocket/client";
import "./websocket/admin";

server.listen(port, () => {
  console.log(`Server is running in~> http://localhost:${port}🚀`);
  console.log(`Client~> http://localhost:${port}/pages/client`);
  console.log(`Admin~> http://localhost:${port}/pages/admin`);
});
