import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import usefetchData from '../../../customHooks/usefetchData';
import style from './Product.module.css'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { IoStarSharp } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa";


export default function Product() {


  const { productId } = useParams();
  console.log(productId);







  /*const getprooduct1=async()=>{
  const {data}=await axios.get(`https://ecommerce-node4.onrender.com/products/${productId}`)
  console.log(data.Product)
  setproducts(data.product)
  setimage(data.product.subImages);
  console.log(productsimage);
  
  
  }
  
  useEffect(()=>{
  getprooduct1();
  
  
  },[])*/

  const { data, loading, error } = usefetchData(`https://ecommerce-node4.onrender.com/products/${productId}`);
  console.log(data);


  if (loading) {
    return (
      <div className={`${style.loader}`}>
        <ClipLoader
          color={'##000000'}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    )
  }

  if (error) {
    return <h2 className='alert-danger'>{error}</h2>
  }

  const addToCart = async () => {
    const token = localStorage.getItem("userToken");

    const { data } = await axios.post(`https://ecommerce-node4.onrender.com/cart/`, { productId },
      {
        headers: {
          Authorization: `Tariq__${token}`

        }
      }
    )



  }



  return (
    <>
      <section className={`${style.product} container`} >
        <div className={`${style.parent}`}>
          <div className={`${style.child}`}>
            <div className={`${style.images_dflex}`}>
              {data.product.subImages.map(image =>
                <div key={image.public_id} >
                  <img src={image.secure_url} />

                </div>

              )
              }

            </div>

          </div>

          <div className={`${style.child}`}>
            <h1 className={`text-center ${style.changecolor}`}>Product Name</h1>
            <h2 className={`${style.changewid} ${style.changecolor}`}>{data.product.name}</h2>
            <h2 className={`${style.changewid} ${style.changecolor} text-center`}>Deatils About The Product</h2>
            <p className={`text-center ${style.changecolor}`}>{data.product.description.split(' ').slice(0, 40).join(' ')}...</p>
            <div className={`${style.addcart}`}>
              <span className={`${style.changecolor}`}>${data.product.price}</span>
              <button className={`${style.changecolor_btn}`} onClick={addToCart}>Add To Cart</button>
              <Link className={`${style.changecolor_btn_L}`} to={`/comment/${productId}`} >Add Your Comment</Link>
            </div>
          </div>

        </div>






      </section>
    </>
  )
}



