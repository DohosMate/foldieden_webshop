import React from 'react'
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <Link href={`/product/${slug.current}`}>

        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            className="product-image"
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>{price} Ft</p>
        </div>

    </Link>
  )
}

export default Product