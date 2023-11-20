import { ChatState } from "../components/Context/ChatProvider"
import { Box } from '@chakra-ui/react'
import SidDrawer from "../components/resuable/SidDrawer"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"


const ChatPage = () => {
 const {user} =ChatState()

//  console.log(user)

  return (
    <div style={{width:"100%"}}>
      {user && <SidDrawer/>}

      <Box
      display={"flex"}
        p={10}
        justifyContent={"space-between"}
        w={"100%"}
        // border={"2px solid red"}
        h={"91.5vh"}
        
     
      >
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatPage