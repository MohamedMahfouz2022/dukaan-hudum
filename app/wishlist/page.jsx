"use client"

import Link from "next/link"
import { useWishlistStore } from "@/store/wishlistStore"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/Button"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const { items } = useWishlistStore()

  return (
    <div className="luxury-container pt-32 pb-20 min-h-[70vh]">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-6">المفضلة</h1>
        <div className="h-px w-20 bg-black mx-auto mb-8" />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <Heart className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">قائمة المفضلة فارغة حالياً</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground max-w-xs mx-auto leading-relaxed">
              احفظ قطعك المفضلة لوقت لاحق ولا تفوت فرصة الحصول عليها عند توفرها.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/shop">ابدأ التصفح</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
