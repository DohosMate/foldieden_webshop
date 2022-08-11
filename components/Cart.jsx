import React, { useRef } from 'react'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping, AiOutlineRadiusBottomright } from 'react-icons/ai';;
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { BsFillBagPlusFill } from 'react-icons/bs';
import { BiMinusCircle } from 'react-icons/bi';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading('Redirection...');
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className="cart-container">
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Kosár</span>
          <span className='cart-num-items'>({totalQuantities})termék</span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>A bevásárlókosarad üres</h3>
            <Link href="/">
              <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
              >
                Váráslás Folytatása
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])}
                className="cart-product-image" />
              <div className="item-desc">
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h3>{item.price}Ft</h3>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity((item._id), 'dec')}>
                        <BiMinusCircle />
                      </span>
                      <span className='num' onClick="">
                        {item.quantity}
                      </span>
                      <span className='plus' onClick={() => toggleCartItemQuantity((item._id), 'inc')}>
                        <BsFillBagPlusFill />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Összesen:</h3>
              <h3>{totalPrice}Ft</h3>
            </div>
            <div className="btn-container">
              <button type='button' className='btn' onClick={handleCheckout}> Fizetés</button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default Cart