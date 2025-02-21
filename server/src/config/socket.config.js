const chatEvents = require("../events/chat.events");
const userEvents = require("../events/user.events.js");

const initializeSocket = (io) => {
 io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);
    const count2 = io.of("/").sockets.size;
    console.log("user connected", socket.id, count2,);

    // events
    userEvents(io, socket);
    chatEvents(io, socket);
  

    io.engine.on("connection_error", (err) => {
      console.log(err.req); // the request object
      console.log(err.code); // the error code, for example 1
      console.log(err.message); // the error message, for example "Session ID unknown"
      console.log(err.context); // some additional error context
    });
  });
};

module.exports = initializeSocket;
