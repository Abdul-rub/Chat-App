

import './App.css'


import { Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';

export const BASE_URL = "https://chatapp-backend-eqkr.onrender.com";



function App() {



  return (
    <Routes>
           <Route path="/" element={<Homepage />} />
           
           <Route path="/chats" element={<ChatPage />} />
          

    </Routes>
  )
}

export default App
