import React from 'react'
import { AiFillInstagram, AiOutlineFacebook } from 'react-icons/ai';
import { FaFacebookMessenger } from 'react-icons/fa';
import Link from 'next/link'


const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 3BM Corporation All rights reserved</p>
      <div className="icon-container">
        <div className="icons">
          <Link href={`https://www.instagram.com/`}>
            <AiFillInstagram />
          </Link>
        </div>
        <div className='icons'>
          <Link href={`https://www.facebook.com/`}>
            <AiOutlineFacebook />
          </Link>
        </div>
        <div className='icons'>
          <Link href={`https://www.facebook.com/`}  target="_blank">
            <FaFacebookMessenger />
          </Link>
        </div>
      </div>
    </div>


  )
}

export default Footer