"use client"
import { add } from "@/app/store/cartReducer.js"
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast, ToastContainer } from "react-toastify";

export default function ShopApp({ params }) {
   const { categoryname:cat } = React.use(params); 
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()

  const fetchProducts = async () => {
    try {
      const url = cat
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/products?category=${cat}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/products`

      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [cat])

  const addToCart = (p) => {
    dispatch(add(p))
    toast.success("Product added to cart")
  }

  return (
    <div className="shop-page">
       <ToastContainer position="top-center" autoClose={1000} />
      <h2 className="shop-title">
        Selected Category:
          {cat ? `${cat.charAt(0).toUpperCase() + cat.slice(1)}` : "All Products"}
      </h2>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="product-card" key={p._id}>
              <div className="product-image">
                <img
                  src={p.images && p.images[0] ? p.images[0].url : "/placeholder.png"}
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
          <p className="no-products">No products found</p>
        )}
      </div>
    </div>
  )
}
