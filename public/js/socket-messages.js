const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector("#messages");
const clear = document.querySelector("#clear-chat");
const save = document.querySelector("#save-chat");

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

  const message = Event.target.elements.message.value;

  //Emit Message To Server
  socket.emit("chat-message", message);

  //Clear and focus input field
  Event.target.elements.message.value= '';
  Event.target.elements.message.focus();
});

//Clear Chat
clear.addEventListener("click", () => {
  chatMessages.innerHTML = "";
  window.alert("Chat messages cleared");
})

//Save Chat
save.addEventListener("click", () => {
  socket.emit("save-chat");
  window.alert("Chat has been saved");
})

//Output Message To DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.setAttribute("id","message");
  div.innerHTML = `<b id="name">${message.username}</b><b id="time">${message.time}</b><br>
    <div id="text">${message.message}</div>`;

  chatMessages.appendChild(div);
}