import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
 
    useEffect(() =>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, [])

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className='icon'>
                    <BsBagCheckFill />
                </p>
                <h2>Köszönjük a vásárlást!</h2>
                <p className='email-msg'> A rendelésével kapcsolatos információkat emailben elküldtük önnek.</p>
                <p className='description'>
                    Amennyiben kérdése lenne, a következő email címen tud velünk kapcsolatba lépni:
                    <a className='email' href="mailto:foldieden@gmail.com">foldieden@gmail.com</a>
                </p>
                <Link href="/">
                    <button type='button' width="300px" className='btn'>
                        Vásárlás folytatása
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Success