import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../App"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate()
  

   const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
      window.location.reload()
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  return (
    <VStack spacing='5px' color="black">

    <FormControl id="first-name" isRequired>
      <FormLabel>Email</FormLabel>
      <Input 
       placeholder="Enter your email"
       onChange={(e)=>setEmail(e.target.value)}
       value={email}
       />
    </FormControl>

    <FormControl id="first-name" isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
      
      <Input
       type={show? "text" : "password" }
       placeholder="Enter your Password"
       onChange={(e)=>setPassword(e.target.value)}
       value={password}
       />
       <InputRightElement width="4.5rem">
       <Button h="1.75rem" size="sm" onClick={handleClick}>
        {show ? "Hide" : "Show"}
       </Button>
       </InputRightElement>
      </InputGroup>
    </FormControl>

    <Button colorScheme="blue"
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={loading}
      >
       Login In
      </Button>

      
    <Button colorScheme="red"
      width="100%"
      style={{marginTop:15}}
      onClick={()=>{
        setEmail("guest@gmail.com")
        setPassword("123456")
      }}
      >
        Get Guest User Credentials
      </Button>
 </VStack>
  )
}

export default Login