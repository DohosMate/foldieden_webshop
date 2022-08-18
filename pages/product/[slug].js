import React, { useState, Component } from 'react'
import { client, urlFor } from '../../lib/client';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsFillBagPlusFill, BsStackOverflow } from 'react-icons/bs';
import { BiMinusCircle } from 'react-icons/bi';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
// import required modules
import { Autoplay, EffectCube, Pagination } from "swiper";

import ReactImageMagnify from 'react-image-magnify';



const ProductDetails = ({ products, product }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
        setQty(1);
    }

    return (
        <div>
            <div
                className="product-detail-container">
                <div>
                    <div>
                    <div className="image-container">
                    <ReactImageMagnify {...{
                        className: "product-detail-image",
                            smallImage: {
                                isFluidWidth: true,
                                src: urlFor(image && image[index]),

                            },
                            largeImage: {
                                src: urlFor(image && image[index]),
                                width: 800,
                                height: 800
                            }
                        }} />
                    </div> 
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ?
                                    'small-image selected-image' :
                                    'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                    </div>
                
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Részletek: </h4>
                    <p>{details}</p>
                    <p className='price'>{price}Ft</p>
                    <div className="quantity">
                        <h3>Mennyiség:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decQty}>
                                <BiMinusCircle />
                            </span>
                            <span className='num'>
                                {qty}
                            </span>
                            <span className='plus' onClick={incQty}>
                                <BsFillBagPlusFill />
                            </span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type='button' className='add-to-cart' onClick={() => { onAdd(product, qty), setQty(1) }}>Hozzáadás a kosárhoz</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Vásárlás most</button>
                    </div>
                </div>
            </div>
            {/*             <div className="maylike-products-wrapper">
                <h2>Kóstold meg ezeket is!</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <Product key={item._id}
                                product={item} />
                        ))}
                    </div>
                </div>
            </div > */}



            <div className="maylike-products-wrapper">
                <h2>Kóstold meg ezeket is!</h2>
                <Swiper
                    effect={"cube"}
                    grabCursor={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[Autoplay, EffectCube, Pagination]}
                    className="mySwiper"
                >
                    <div className="maylike-products-container track">
                        {products.map((item) => (
                            <SwiperSlide>
                                <Product key={item._id}
                                    product={item} />
                            </SwiperSlide>
                        ))}
                    </div>


                </Swiper>
            </div>


        </div >


    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    return {
        props: { products, product }
    }
}

export default ProductDetails