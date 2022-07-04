import React from 'react'
import { AiFillInstagram, AiOutlineFacebook} from 'react-icons/ai';
import {FaFacebookMessenger} from 'react-icons/fa'


const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 3BM Corporation All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineFacebook />
        <FaFacebookMessenger />
      </p>
    </div>
  )
}

export default Footer