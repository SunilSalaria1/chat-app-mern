const axios = require("axios");
const chatEvents = (io, socket) => {
  socket.on("send_message", async (data) => {
    try {
      console.log(data, "message");
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
       console.log(savedMessage,'parnet')
      if (savedMessage?.parentMessage) {
        console.log('api')
        const response = await axios.get(
          "http://localhost:3100/api/message" + savedMessage._id,
          {
            headers: { Authorization: `Bearer ${socket.user.token}` },
          }
        );
        console.log(response.data, 'response')
        savedMessage = response.data;
        console.log("parent called")
        io.to(data.room).emit("receive_message", savedMessage);
      }else{
        console.log(savedMessage)
        io.to(data.room).emit("receive_message", savedMessage);
      }
      console.log(savedMessage,data.room,'callled');
      // broadcast message to the room
     
    } catch (error) {
      //   console.error("Message saving failed:", error);
      socket.emit("errorMessage", { error: "Could not send message" });
    }
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("start_typing", (data) => {
    socket.broadcast.emit("end_typing", true);
  });
};

module.exports = chatEvents;
