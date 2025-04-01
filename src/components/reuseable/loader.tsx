import { Loader2 } from 'lucide-react'
import React from 'react'

type props = {
  color?:string
}

export default function Loader({color="text-zinc-800"}:props) {
  return (
    <div>
        <Loader2 className={`h-12 w-12 animate-spin ${color}`} />
    </div>
  )
}
