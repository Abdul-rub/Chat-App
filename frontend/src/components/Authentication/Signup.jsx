import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../App"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [show,setShow]=useState(false)
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password, setPassword]= useState()
  const [confirmpassword, setConfirmpassword]= useState()
  const [pic,setPic]=useState()
  const [ loading, setLoading]=useState(false)
  const toast = useToast()
  const navigate = useNavigate()


 const handleClick=()=>{
  setShow(!show)
 }

 const postDetails=(pics)=>{
  setLoading(true)
  if(pics === undefined){
     toast({
      title:"Please select an Image!",
      status:"Warning",
      duration: 5000,
      isCLosable: true,
      position: "top",
     })
     return;
  }
  if(pics.type==="image/jpeg" || pics.type === "image/png"){
    const data = new FormData()
    data.append('file', pics);
    data.append('upload_preset', 'chat-app')
    data.append('cloud_name','abdulcloud')
    fetch("https://api.cloudinary.com/v1_1/abdulcloud/image/upload",{
      method: "post",
      body: data,
    }).then((res)=>res.json())
    .then(data=>{
      setPic(data.url.toString());
      console.log(data.url.toString())
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }else{
    toast({
      title:"Please select an Image!",
      status:"Warning",
      duration: 5000,
      isCLosable: true,
      position: "top",
     })
     return;

  }
 }

 const submitHandler= async()=>{
    setLoading(true)
    if(!name || !email || !password || !confirmpassword){
      toast({
        title:"Please fill all the field",
        status:"Warning",
        duration: 5000,
        isCLosable: true,
        position: "top",
       })

 }
 try {
  const config = {
    headers:{
      "Content-type" : "application/json",
    },
  }
  const {data} = await axios.post(
    `${BASE_URL}/api/user/register`,
    {name,email,password,pic},
  config
  );
  toast({
    title:"Registration Successfull !!",
    status:"Warning",
    duration: 5000,
    isCLosable: true,
    position: "top",
   })
   localStorage.setItem('userInfo', JSON.stringify(data))
   setLoading(false)
   navigate('/chats')
   window.location.reload();

 } catch (error) {
  console.log(error)
  toast({
    title:"Error Occured",
    description:error.response.data.message,
    status:"error",
    duration: 5000,
    isCLosable: true,
    position: "top",
   })
   return;

  
 }
}


  return (
    <VStack spacing='5px' color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input 
         placeholder="Enter your Name"
         onChange={(e)=>setName(e.target.value)}
         />
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Email</FormLabel>
        <Input 
         placeholder="Enter your email"
         onChange={(e)=>setEmail(e.target.value)}
         />
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
        
        <Input
         type={show? "text" : "password" }
         placeholder="Enter your Password"
         onChange={(e)=>setPassword(e.target.value)}
         />
         <InputRightElement width="4.5rem">
         <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
         </Button>
         </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="first-name" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
        
        <Input
         type={show? "text" : "password" }
         placeholder="Enter your Password"
         onChange={(e)=>setConfirmpassword(e.target.value)}
         />
         <InputRightElement width="4.5rem">
         <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
         </Button>
         </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e)=> postDetails(e.target.files[0])}
        />

      </FormControl>

      <Button colorScheme="blue"
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup