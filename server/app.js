const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./src/config/db.config.js");
const PORT = dotenv.PORT || 3100;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const messageRoutes = require("./src/routes/message.routes");
const roomRoutes = require("./src/routes/rooms.routes");
const contactRoutes = require("./src/routes/contact.routes");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//# region middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth',authRoutes)
app.use("/api", userRoutes);
app.use("/api", messageRoutes);
app.use("/api", roomRoutes);
app.use('/api',contactRoutes);

//# end region
let users = [];

io.on("connection", (socket) => {

  socket.on("online", (data) => {
    console.log('online', data);
   let sameId =  users.filter(user=> user.userId === data)
    if(data && sameId.length  === 0) {
      users.push({ userId: data, id: socket.id });
    }
    
    io.emit("getOnlineUsers", [...new Set(users)]);
  });

  socket.on("offline", (data) => { 
    users = users.filter(user => user.id !== socket.id);
    io.emit("getOnlineUsers", [...new Set(users)]);
  });

  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });


  const count2 = io.of("/").sockets.size;
  console.log("user connected", socket.id, count2);

  socket.on("disconnect", function () {
    users = users.filter(user => user.id !== socket.id);
    io.emit("getOnlineUsers", [...new Set(users)]);
    console.log("user disconnected");
  });

  io.engine.on("connection_error", (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
});

// server-side

server.listen(PORT, function () {
  console.log("listening on port http://localhost:" + PORT + "/api-docs");
});

// app.listen(PORT,()=>console.log('listening on port http://localhost:' +PORT));
