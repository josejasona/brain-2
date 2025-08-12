"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CanvasBackground } from "../components/canvas-background.tsx"
import Link from 'next/link'

export default function Home() {
const [query, setQuery] = useState("")
const handleSubmit = async () => {
   console.log(query)
}
return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center bg-gray-50  border-2 border-gray-100 shadow-2xl p-4">   
         <p className="text-center text-3xl font-bold"> Start Creating your Brain  </p>
           <Button asChild>
              <Link href="/sign-up"> Create Account </Link>
           </Button>
       </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
