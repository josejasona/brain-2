"use client"
import { useState } from "react"

export default function Home() {
const [query, setQuery] = useState("")

return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className=" w-full">
           <p className="text-center text-3xl font-bold"> Start Creating your Brain  </p>
        </div>
        <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-xl px-4 py-2 rounded-full border border-gray-300 bg-gray-600  shadow-sm focus:border-gray-8000 focus:shadow-md transition"
         />
       
       </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
