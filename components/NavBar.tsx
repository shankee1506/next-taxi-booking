import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
      <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-sm'>
          <div className='flex gap-10 items-center'>
              <Image src='/taxi.png' alt='logo' height={140} width={80} />
          </div>
          <div className='hidden md:flex gap-8'>  
              <h2 className='hover:bg-orange-300 p-2 rounded-md cursor-pointer transition-all'>Home</h2>
              <h2 className='hover:bg-orange-300 p-2 rounded-md cursor-pointer transition-all' >History</h2>
              <h2 className='hover:bg-orange-300 p-2 rounded-md cursor-pointer transition-all'>Help</h2>
      </div>
      <div>
      <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
  )
}

export default NavBar