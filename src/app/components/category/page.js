"use client"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef } from "react"

export default function CategoryPage() {
  const router = useRouter()
  const scrollRef = useRef(null)

  const categories = [
    { name: "Chips", img: "Unclechips.jpg" },
    { name: "Namkeen", img: "Haldiram-all-in-one.jpg" },
    { name: "ColdDrink", img: "Thumsup.jpg" },
    { name: "Tea", img: "Tata-tea.jpg" },
    { name: "Coffee", img: "Nescafe.jpg" },
    { name: "Soap", img: "Soap.jpg" },
    { name: "Shampoo", img: "Shampoo.jpg" },
    { name: "Dal", img: "Dal.jpg" },
    { name: "Atta", img: "Atta.jpg" },
    { name: "Rice", img: "Rice.jpg" },
  ]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    let direction = 1 
    const speed = 2
    let animationId

    const step = () => {
      if (!container) return

      container.scrollLeft += direction * speed

      const maxScroll = container.scrollWidth - container.clientWidth

      if (direction === 1 && container.scrollLeft >= maxScroll) {
        direction = -1
      } else if (direction === -1 && container.scrollLeft <= 0) {
        cancelAnimationFrame(animationId) 
        return
      }

      animationId = requestAnimationFrame(step)
    }

    animationId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="category-page">
      <h1 className="page-title">Shop by Category</h1>
      <div
        ref={scrollRef}
        className="category-scroll"
      >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="category-card"
            onClick={() => router.push(`/components/category/${cat.name}`)}
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="category-img"
            />
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
