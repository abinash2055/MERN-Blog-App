import React from 'react'
import logo from '@/assets/images/logo-white.png'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
import SearchBox from './SearchBox';
import { RouteSignIn } from '@/helpers/RouteName';

const Topbar = () => {
  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
      <div>
        <img src={logo} className='md:w-auto w-48' />
      </div>

      <div className='w-[500px]'>
        <SearchBox />
      </div>

      <div>
        <Button asChild className="rounded-full">
          <Link to={RouteSignIn} className="flex items-center gap-2 ">
            <MdLogin />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Topbar