import React from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from "@/assets/images/user.png"
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { getEvn } from '@/helpers/getEnv';
import { showToast } from '@/helpers/showToast';
import { removeUser } from '@/redux/user/user.slice';

const Topbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)

  const handleLogout = async () => {
    try {
      const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/logout`, {
        method: 'get',
        credentials: 'include',
      })
      const data = await response.json()
      if (!response.ok) {
        return showToast('error', data.message)
      }
      dispatch(removeUser())
      navigate(RouteIndex)
      showToast('success', data.message)
    } catch (error) {
      showToast('error', error.message)
    }
  }

  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
      <div>
        <img src={logo} className='md:w-auto w-48' />
      </div>

      <div className='w-[500px]'>
        <SearchBox />
      </div>

      <div>
        {!user.isLoggedIn ?
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn} className="flex items-center gap-2 ">
              <MdLogin />
              Sign In
            </Link>
          </Button>
          :
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} />
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[230px]">
              <DropdownMenuGroup>

                <DropdownMenuLabel>
                  <p>{user.user.name}</p>
                  <p className='text-sm'>{user.user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor pointer">
                  <Link to={RouteProfile} className="flex items-center gap-2 px-2">
                    <FaRegUser />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor pointer">
                  <Link to={RouteBlogAdd} className="flex items-center gap-2 px-2">
                    <FaPlus />
                    Create Blog
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild onClick={handleLogout} className="cursor pointer">
                  <IoLogOutOutline color="red" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }

      </div>
    </div>
  )
}

export default Topbar