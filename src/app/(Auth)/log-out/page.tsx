"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Logout() {
   const route = useRouter()

    useEffect(() => {
        const logout = async()=>{
            const resp = await axios.get("/api/auth/login")
            console.log(resp)
            if(resp.data.message === "success"){
                route.push("/login")
            }
        }
        logout()
    }, [])

    // console.log(JSON.parse(cookie.get("user")?.value || ""))
    return (
        <div className='hidden text-3xl font-semibold'>Sign Out</div>
    )
}
