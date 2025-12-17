"use client"
import React, { useEffect } from 'react'
import CategoryPage from './components/category/page'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/productReducer';
import { add } from './store/cartReducer';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from './footer/page';

const Home = () => {
  const dispatch = useDispatch()
    useEffect(() => {
  dispatch(fetchProducts())

  }, []);

  const {data:products,status}= useSelector((state)=> state.product)
if (status === "loading") {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
    </div>
  )
}

if (status === "error") return <h1 style={{display:'flex', justifyContent:'center'}}> Server Error</h1>
  const addToCart = (p) => {
dispatch(add(p))
toast.success("Product added to cart")

  };
  return (
    <div>
      <CategoryPage/>
   <div className="shop-page">
    <h1 className="top-title">Top Orders</h1>
 <ToastContainer position="top-center" autoClose={1000} />
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p._id}>
              <div className="product-image">
                <img
                  src={p.images && p.images[0] ? p.images[0].url : "/png.png"}
                  alt={p.name}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">₹{p.price}</p>
                <p className="product-category">{p.category}</p>
                <button className="add-cart-btn" onClick={() => addToCart(p)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='no-products'>Loading Products..
    </div>
        )}
      </div>
    </div>
    <Footer/>
      </div>
  )
}

export default Home