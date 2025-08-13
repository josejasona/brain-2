"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function MainPage() {
const [query, setQuery] = useState("")
const handleSubmit = async () => {
   console.log(query)
}
return (
    <main className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 border-4 border-red-500">
      <div className="flex flex-col gap-[32px] row-start-2 items-center flex-grow border-4 border-gray-500">
        <div className=" w-full">
           <p className="text-center text-3xl font-bold"> Start Creating your Brain  </p>
        </div>
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full max-w-xl px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:border-gray-8000 focus:shadow-md transition"
         /> 
         <Button onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
         </Button>
         <div className="item align-left border-3 border-red-500 mr-auto"> 
         <p> Database </p>
         </div>
       </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </main>
  );
}

