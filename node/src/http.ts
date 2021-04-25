import "reflect-metadata";

import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database";
import routes from "./routes";

const app = express();
const http = createServer(app);
export const io = new Server(http);

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (req, res) => res.render("html/client.html"));

io.on("connection", (socket: Socket) => {
  console.log("socket.io connected: ", socket.id);
});

app.use(express.json());
app.use(routes);

export default http;
