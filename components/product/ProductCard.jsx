"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { useCartStore } from "@/store/cartStore"
import { useWishlistStore } from "@/store/wishlistStore"
import { toast } from "react-hot-toast"
import { cn, formatPrice } from "@/lib/utils"

export function ProductCard({ product }) {
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const addItem = useCartStore((state) => state.addItem)
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, product.sizes[0], product.colors[0])
    toast.success("تم الإضافة إلى السلة")
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    toast.success(isWishlisted ? "تمت الإزالة من المفضلة" : "تم الإضافة إلى المفضلة")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col"
    >
      <Link href={`/product/${product.slug}`} className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} - صورة بديلة`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {product.badge && (
          <Badge className="absolute top-4 right-4 z-10">{product.badge}</Badge>
        )}
        <button
          onClick={handleWishlist}
          aria-label={isWishlisted ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} إلى المفضلة`}
          className={cn(
            "absolute top-4 left-4 z-10 p-2 bg-background/80 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100",
            isWishlisted && "opacity-100 text-red-500"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 md:block hidden">
          <Button onClick={handleAddToCart} className="w-full" aria-label={`إضافة ${product.name} إلى السلة`}>
            أضف بسرعة
          </Button>
        </div>
      </Link>
      <div className="mt-4 flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xs font-bold uppercase tracking-wider leading-relaxed max-w-[80%]">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.subCategory}</p>
        <button
          onClick={handleAddToCart}
          aria-label={`إضافة ${product.name} إلى السلة`}
          className="md:hidden mt-2 text-[10px] font-bold uppercase tracking-widest border-b border-black w-fit pb-1"
        >
          أضف إلى السلة
        </button>
      </div>
    </motion.div>
  )
}