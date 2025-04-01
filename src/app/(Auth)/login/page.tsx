"use client"

import {signIn} from "next-auth/react"
import { Loader, VentisLogo } from '@/components/reuseable';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import admin from "./../../../assets/images/admin-panel.png";



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [email, setEmail] = useState("adisa.adeolu@gmail.com")
  const [password, setPassword] = useState("Z;x|)yJJ")
  // const [email,setEmail] = useState("mynextgmail@gmail.com")
  // const [password,setPassword] = useState("attendee1")
  const route = useRouter()


  const logIn = async () => {

    try {
      setIsLoggingIn(true)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(result)
 
      if (result?.ok) {
        setIsLoggingIn(false)
        route.push("/")
      }
    } catch (error) {
      console.log(error)
      setIsLoggingIn(false)
    }
  }

  const handleInputEmail = (e: any) => {
    setEmail(e.target.value);
  }
  const handleInputPass = (e: any) => {
    setPassword(e.target.value);
  }

  return (
    <div className="w-full max-w-[46rem] mx-auto h-[44.4rem] p-8 pt-[3.2rem] rounded-[1.6rem] border border-[#D0D5DD] ">
      <div className="flex flex-col gap-8">
        <div className='flex items-start justify-between'>
          <div className="flex flex-col gap-12">
            <VentisLogo />
            <div>
              <p style={{ fontFamily: "General Sans" }} className="text-[2.4rem] font-medium ">Admin Login</p>
              <p className="xs-text w-[28.9rem]">
                Sign in to manage events, monitor ticketing, and oversee platform activity
              </p>
            </div>
          </div>
          <Image src={admin} width={100} height={100} alt='admin-panel-settings' />
        </div>

        <form className="space-y-4">
          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <label className="auth-label">Email address</label>
              <div className="auth-input-container">
                <Mail className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="Please enter your email address"
                  className="auth-input"
                  value={email}
                  onChange={handleInputEmail}
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <label className="auth-label">Password</label>
              <div className="auth-input-container !w-full">
                <Mail className="auth-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="auth-input"
                  value={password}
                  onChange={handleInputPass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=""
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button
              type='button'
              onClick={() => logIn()}
              disabled={isLoggingIn}
              className='bg-[#98A2B3] rounded-[.8rem] px-4 py-[.8rem] h-[3.2rem] w-full auth-label !font-semibold !text-[#D0D5DD]'
            >
              {isLoggingIn ? <span className='flex items-center justify-center gap-8 !text-[#D0D5DD]' >Signing in <Loader color='!text-[#D0D5DD]' /></span> : "Login"}
            </Button>
          </div>
        </form>

        {/* <p className="text-center xs-text">
          Do not have an admin account?{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            Create one
          </Link>
        </p> */}
      </div>
    </div >
  );
};
