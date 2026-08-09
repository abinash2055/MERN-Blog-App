import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getEvn } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useDispatch, useSelector } from 'react-redux'
import { Textarea } from "@/components/ui/textarea"
import { useFetch } from '@/hooks/useFetch'


const Profile = () => {

  const user = useSelector((state) => state.user);

  const { data: userData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/user/get-user/${user.user._id}`, { method: 'get', credentials: 'include' })

  const dispatch = useDispatch()

  const formSchema = z.object({
    name: z.string().min(3, "Name must be minimum 3 character long...."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be minimum 3 character long...."),
    password: z.string(),
  })

  const form = useForm({
    resolver: zodResolver(formSchema), defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  })

  if (!userData.success) return <div>Loading....</div>

  async function onSubmit(values) {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/login`, {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        credentials: "include",
        body: JSON.stringify(values)
      })

      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }

      dispatch(setUser(data.user))
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <Card className="max-w-screen-md mx-auto">

      <CardContent>
        <div className='flex justify-center items-center mt-10'>
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

        </div>
        <div>
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
              {/* Email  */}
              <div className='mb-3'>
                <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your Bio" {...field} />
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

              <Button type="submit" className="w-full">Save Changes</Button>

            </form>
          </Form>
        </div>
      </CardContent>

    </Card>
  )
}

export default Profile