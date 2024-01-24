import { API } from "../axios"

export const LoginCall= (data)=> API.post("/login",data)

  export const ProfileCall= async (data)=>{
    let res = await  API.get("/profile",data)
    return res
  }
