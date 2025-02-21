let users = [];
const userEvents = (io, socket) => {
  socket.on("online", (data) => {
    console.log("online", data,data?.length);
    let sameId = users.filter((user) => user.userId === data);
    if (data && sameId.length === 0) {
      users.push({ userId: data, id: socket.id });
    }

    io.emit("getOnlineUsers", [...new Set(users)]);
  });

  socket.on("offline", (data) => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("getOnlineUsers", [...new Set(users)]);
  });

  socket.on("disconnect", function () {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("getOnlineUsers", [...new Set(users)]);
    console.log("user disconnected");
  });
};

module.exports = userEvents;
