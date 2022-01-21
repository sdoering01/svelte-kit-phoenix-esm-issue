import { Socket } from "phoenix";

let socket = new Socket("ws://localhost:4000/socket");

socket.connect();

let channel = socket.channel("room:lobby");
let chatInput = document.querySelector("#chat-input");
let messagesContainer = document.querySelector("#messages");

chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    channel.push("new_msg", { body: chatInput.value });
    chatInput.value = "";
  }
});

channel.on("new_msg", (payload) => {
  let messageItem = document.createElement("p");
  messageItem.innerText = `[${Date()}] ${payload.body}`;
  messagesContainer.appendChild(messageItem);
});

channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });
