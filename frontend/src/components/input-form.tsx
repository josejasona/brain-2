"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(5, { 
    message: "Enter a valid email",
    }),
  password: z.string().min(8, {
    message: " Password must be at least 8 characters",
}),
})

export function InputForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })



  const onSubmit = async(data: z.infer<typeof FormSchema>)  => {
    console.log("OnSubmit Triggered");
    // Send this data to the api route
    const res = await fetch("/api/create-account" , {
       method: 'POST',
       headers: {"Content-Type": "application/json" },
       body : JSON.stringify(data),});
       

    const resData = await res.json();
       if(res.ok) {
          console.log(resData.user.id);
          router.push(`main-page/${resData.user.id}`);
       } else { console.log("Data failed"); }
    }
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="JDoe123" {...field} />
              </FormControl>
              <FormDescription>
                This is your login credential.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Jdoe123@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the email you will use for verification.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              </FormControl>
                <Input placeholder="*******" {...field} />
              <FormDescription> Must be at least 8 characters  </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

