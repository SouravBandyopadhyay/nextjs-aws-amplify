//@ts-ignore
import Chat from "./chat";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Welcome to AI Chat</h1>
      <p className="text-lg text-gray-700 mb-8">Chat with our AI bot and explore various features.</p>
      <Chat />
    </div>
  );
}
