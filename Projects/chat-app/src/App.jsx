import { ChatEngine } from 'react-chat-engine'

import ChatFeed from './components/ChatFeed'
import LoginForm from './components/LoginForm';

import notif from './../src/assets/notif.mp3'
import './App.css'

function App() {
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <div className="App">
      <ChatEngine
        height="100vh"
        projectID={import.meta.env.VITE_CHAT_ENGINE_ID}
        userName={import.meta.env.VITE_CHAT_ENGINE_USERNAME}
        userSecret={import.meta.env.VITE_CHAT_ENGINE_PASSWORD}
        renderChatFeed={(chatProps) => <ChatFeed {...chatProps} />}
        onNewMessage={() => new Audio(notif).play()}
      />
    </div>
  )
}

export default App
