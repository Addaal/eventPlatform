import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
   <footer className='border-t'>
      <div className='flex-center flex-between flex flex-col gap-4 p-5 text-center sm:flex-row '>
        <Link href="/">
          <Image src="/assets/images/logo.svg" 
          alt='logo'
          width={128}
          height={38}/>
        </Link>

        <p>2023 Evently. All Rights Reserved.</p>
      </div>
   </footer>
  )
}
