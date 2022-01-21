import { useChat } from "./chat-hook";

function App() {
  const { messages, sendMessage } = useChat();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div>
      <div>
        {messages.map(({ id, body }) => {
          return <p key={id}>{body}</p>;
        })}
      </div>
      <input onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
