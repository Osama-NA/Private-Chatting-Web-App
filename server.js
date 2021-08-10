const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const pagesRoutes = require("./routes/pages");
const databaseRoutes = require("./routes/db");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave
} = require("./utils/room-users");

const chatBot = "Seguro Bot";
const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

//To allow our application to Parse JSON
app.use(express.json());

//Setting view engine to hbs to handle hbs files
app.set("view engine", "hbs");

//Setting routes
app.use("/", pagesRoutes);
app.use("/db", databaseRoutes);

io.on("connection", (socket) => {
  socket.on("join-room", ({ id, username }) => {
    const user = userJoin(socket.id, username, id);

    //Joining room
    socket.join(user.room);

    //Welcome user
    socket.emit(
      "message",
      formatMessage(chatBot, "Welcome to Seguro Chatting!")
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(chatBot, `${user.name} has joined the chat`)
      );
  });

  //Listen For Chat Message
  socket.on("chatMessage", (message) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.name, message));
  });

  //Runs When Client Disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(chatBot, `${user.username} has left the chat`)
      );
    }
  });

});


//Setting server to listen on port 'PORT'
server.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to listen on port " + PORT + ": " + error);
  } else {
    console.log("Listening on port " + PORT);
  }
});
