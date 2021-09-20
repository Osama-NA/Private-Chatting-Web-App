const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const pagesRoutes = require("./routes/pages");
const databaseRoutes = require("./routes/db");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, saveMessage, saveChat } = require("./utils/room-users");

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "./public");
const chatBot = "Seguro Bot";

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Setting view engine to hbs to handle hbs files
app.set("view engine", "hbs");

//Setting routes
app.use("/", pagesRoutes);
app.use("/db", databaseRoutes);

//When a user connects to chat room
io.on("connection", (socket) => {

  //When a user joins chat room
  socket.on("join-room", ({ id, username }) => {
    const user = userJoin(socket.id, username, id);

    socket.join(user.room);

    socket.emit("message", formatMessage(chatBot, "Welcome to Seguro Chatting!"));

    socket.broadcast.to(user.room).emit("message", formatMessage(chatBot, `${user.name} has joined the chat`));
  });

  //Listen For Chat Messages
  socket.on("chat-message", (message) => {
    const user = getCurrentUser(socket.id);
    saveMessage(user.room, formatMessage(user.name, message));
    io.to(user.room).emit("message", formatMessage(user.name, message));
  });

  //Runs when a user clicks save chat
  socket.on("save-chat", () => {
    saveChat(socket.id);
  });

  //Runs When Client Disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if(user) io.to(user.room).emit("message", formatMessage(chatBot, `${user.name} has left the chat`)); 
  });

});

//Setting server to listen on port 'PORT'
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});