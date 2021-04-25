const port = 3333;

import server from "./http";
import "./websocket/client";

server.listen(port, () => {
  console.log(`Server is running in~> http://localhost:${port}🚀`);
  console.log(`and frontend~> http://localhost:${port}/pages/client`);
});
