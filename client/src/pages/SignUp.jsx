import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteSignIn } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'

const SignUp = () => {

  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be atleast 3 character long...."),
    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 character long...."),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Password and Confirm Password must match....",
    path: ["confirmPassword"]
  })

  const form = useForm({
    resolver: zodResolver(formSchema), defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/register`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      navigate(RouteSignIn)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">Create Your Account</h1>

        <div>
          <GoogleLogin />
          <div className="border mt-10 mb-5 flex justify-center items-center">
            <span className="absolute bg-white text-sm font-bold">OR</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name  */}
            <div className='mb-3'>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            {/* Email  */}
            <div className='mb-3'>
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            {/* Password */}
            <div className='mb-3'>
              <FormField control={form.control} name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            {/* Confirm Password */}
            <div className='mb-3'>
              <FormField control={form.control} name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your Password again" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
            </div>
            <div className="mt-5">
              <Button type="submit" className="w-full">Sign Up</Button>
              <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                <p>Already have an Account?</p>
                <Link className='text-blue-500 hover:underline' to={RouteSignIn}>Sign In</Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignUp