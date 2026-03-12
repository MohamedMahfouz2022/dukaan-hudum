"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { products } from "@/data/products"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { useUIStore } from "@/store/uiStore"
import { toast } from "react-hot-toast"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product/ProductCard"

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const router = useRouter()
  const product = useMemo(() => products.find(p => p.slug === slug), [slug])

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null)
  const [activeImage, setActiveImage] = useState(0)

  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { openCart } = useUIStore()

  if (!product) {
    return (
      <div className="luxury-container py-40 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">المنتج غير موجود</h1>
        <Button onClick={() => router.push('/shop')}>العودة للمتجر</Button>
      </div>
    )
  }

  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor)
    toast.success("تم الإضافة إلى السلة")
    openCart()
  }

  return (
    <div className="luxury-container pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-3/4 bg-neutral-100 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {product.badge && (
              <Badge className="absolute top-6 right-6 z-10 px-4 py-1.5 text-sm">
                {product.badge}
              </Badge>
            )}

            <button
              onClick={() => toggleWishlist(product)}
              className={cn(
                "absolute top-6 left-6 z-10 p-3 bg-background/80 backdrop-blur-sm transition-all duration-300",
                isWishlisted ? "text-red-500" : "hover:text-red-500"
              )}
            >
              <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "relative aspect-3/4 bg-neutral-100 border transition-all duration-300 overflow-hidden",
                  activeImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5 flex flex-col text-right">
          <div className="mb-8">
            <div className="flex items-center space-x-2 space-x-reverse text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
              <Link href="/shop" className="hover:text-black">ملابس</Link>
              <span>/</span>
              <span>{product.subCategory}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold tracking-widest uppercase mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 space-x-reverse mb-6">
              <span className="text-2xl font-bold">{product.price.toFixed(2)}  ج م</span>
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">{product.oldPrice.toFixed(2)}  ج م</span>
              )}
            </div>

            <div className="flex items-center space-x-2 space-x-reverse mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < Math.floor(product.rating) ? "fill-black" : "text-neutral-300")} />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pt-0.5">
                ({product.reviews} تقييم)
              </span>
            </div>
          </div>

          {/* Selections */}
          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">اللون: {selectedColor?.name}</h4>
              <div className="flex gap-4">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 p-1 transition-all duration-300",
                      selectedColor?.name === color.name ? "border-black" : "border-transparent"
                    )}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]">اختر المقاس</h4>
                <button className="text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 hover:opacity-60">دليل المقاسات</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-12 border text-xs font-bold uppercase tracking-widest transition-all duration-300",
                      selectedSize === size ? "bg-black text-white border-black" : "hover:border-black"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mb-12">
            <Button size="lg" className="w-full h-16 text-base" onClick={handleAddToCart}>
              <ShoppingBag className="w-5 h-5 ms-3" />
              أضف إلى السلة
            </Button>
            <Button variant="outline" size="lg" className="w-full h-16 text-base" onClick={() => toggleWishlist(product)}>
              <Heart className={cn("w-5 h-5 ms-3", isWishlisted && "fill-current")} />
              {isWishlisted ? "في المفضلة" : "أضف للمفضلة"}
            </Button>
          </div>

          {/* Product Details Accordion/List */}
          <div className="border-t pt-8 space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest">الوصف</h4>
              <p className="text-sm text-muted-foreground leading-relaxed uppercase tracking-wider italic">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Truck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">توصيل في اليوم التالي</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">ضمان مدى الحياة</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RotateCcw className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">إرجاع مجاني خلال 30 يوماً</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-40 border-t pt-20">
        <h2 className="text-2xl font-bold tracking-widest uppercase mb-12">قد يعجبك أيضاً</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.id !== product.id).slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
