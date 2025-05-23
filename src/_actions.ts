"use server"

import { cookies } from "next/headers"

export const loginUser = async(body:any) =>{
    const cookie =  cookies()
    const res = await fetch("https://9sxeaygjo0.execute-api.eu-north-1.amazonaws.com/admin/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const data = await res.json();
    console.log(data,res)

    const user = {
        _id:data.data.user._id,
        token:data.data.token
      }
      console.log(user)
  
      cookie.set({
        name: 'user',
        value: JSON.stringify(user),
        secure:  true,
      })

    return data.data
}