const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const hostname = "localhost";
const port = 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", socket => {
    console.log("Client connected");

    socket.on("send-location", msg => {
      socket.broadcast.emit("update-location", msg)
    })

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
