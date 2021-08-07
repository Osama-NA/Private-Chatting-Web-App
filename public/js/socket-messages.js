const socket = io();

socket.on("connect", () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});