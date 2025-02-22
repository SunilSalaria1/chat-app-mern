const axios = require("axios");
const chatEvents = (io, socket) => {
  socket.on("send_message", async (data) => {
    try {
      // Ensure the sender is the authenticated user
      if (data.sender._id !== socket.user._id) {
        return socket.emit("errorMessage", { error: "Unauthorized action" });
      }

      const response = await axios.post(
        "http://localhost:3100/api/message",
        data,
        {
          headers: { Authorization: `Bearer ${socket.user.token}` },
        }
      );

      let savedMessage = response.data;
      if (savedMessage?.parentMessage) {
        const response = await axios.get(
          "http://localhost:3100/api/message/" + savedMessage._id,
          {
            headers: { Authorization: `Bearer ${socket.user.token}` },
          }
        );
        savedMessage = response.data;
        // broadcast message to the room
        io.to(data.room).emit("receive_message", savedMessage);
      } else {
        // broadcast message to the room
        io.to(data.room).emit("receive_message", savedMessage);
      }

      // broadcast message to the room
    } catch (error) {
      //   console.error("Message saving failed:", error);
      socket.emit("errorMessage", { error: "Could not send message" });
    }
    // socket.broadcast.emit("receive_message", data);
  });

  socket.on("deleteMessage", async (data) => {
    try {
      console.log(data)
      // Ensure the sender is the authenticated user
      if (data.sender._id !== socket.user._id) {
        return socket.emit("errorMessage", { error: "Unauthorized action" });
      }

      const response = await axios.delete(
        "http://localhost:3100/api/message/"+data.id,
        {
          headers: { Authorization: `Bearer ${socket.user.token}` },
        }
      );

      let deletedMessageResponse = response.data;
      console.log(deletedMessageResponse)
      // broadcast message to the room
      io.to(data.room).emit("message_deleted", data.id);
    } catch (error) {
    console.error("Message saving failed:", error);
      socket.emit("errorMessage", { error: "Could not send message" });
    }
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("start_typing", (data) => {
    socket.broadcast.emit("end_typing", true);
  });
};

module.exports = chatEvents;
