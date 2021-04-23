import "reflect-metadata";

import express, { Response, Request } from "express";

import "./database";

const port = 3333;

const app = express();

app.get("/", (req: Request, res: Response) => res.json({ test: req.method }));
app.post("/", (req: Request, res: Response) => res.json({ test: req.method }));
app.put("/", (req: Request, res: Response) => res.json({ test: req.method }));
app.delete("/", (req: Request, res: Response) =>
  res.json({ test: req.method })
);

app.listen(port, () =>
  console.log(`Server is running in http://localhost:${port}🚀`)
);
