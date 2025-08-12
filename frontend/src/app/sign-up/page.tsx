"use client"

import Link from 'next/link'
import { InputForm } from "../../components/input-form.tsx"

export default function SignUpPage() {
  
  return(
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       <main className="flex flex-col gap-[32px] row-start-2 p-4 items-center border-2 border-red-500">
          <div className=" w-full flex flex-col  gap-4">
             <p className="text-center text-3xl font-bold"> Create your Account </p>
             <InputForm />
          </div>
        </main>
    </div>
  );
}
