const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector("#messages");

//Get room id and user's name from query string in search bar
const {id: id, username: username} = Qs.parse(location.search, {ignoreQueryPrefix: true});

//Send to server room id and user's name
socket.emit("join-room", {id, username});

//Message from server
socket.on("message", (message) => {
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
})

//Message Submit
chatForm.addEventListener("submit", (Event) => {
  Event.preventDefault();

  //Get Message Text
  const message = Event.target.elements.message.value;

  //Emit Message To Server
  socket.emit("chatMessage", message);

  //Clear Input
  Event.target.elements.message.value= '';
  Event.target.elements.message.focus();
});

//Output Message To DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.setAttribute("id","message");
  div.innerHTML = `<b id="name">${message.username}</b><b id="time">${message.time}</b><br>
    <div id="text">${message.message}</div>`;

  chatMessages.appendChild(div);
}