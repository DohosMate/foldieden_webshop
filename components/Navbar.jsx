import React from 'react'
import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart'
import { useStateContext } from '../context/StateContext';
import {GiCherry, GiGrapes, GiTomato} from 'react-icons/gi';
import {FaAppleAlt, FaPepperHot} from 'react-icons/fa';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/"> Földi Éden</Link>
      </p>
      <div className='fruit-icons'>
        <GiCherry />
        <FaAppleAlt />
        <GiGrapes />
        <FaPepperHot />
        <GiTomato />
      </div>
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar