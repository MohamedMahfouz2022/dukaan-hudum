"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { useUIStore } from "@/store/uiStore"
import { Drawer } from "@/components/ui/Drawer"
import { Button } from "@/components/ui/Button"

export function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore()
  const { items, removeItem, updateQuantity, subtotal } = useCartStore()

  return (
    <Drawer isOpen={isCartOpen} onClose={closeCart} title="سلة المشتريات">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-muted-foreground uppercase tracking-widest">سلة المشتريات فارغة</p>
              <Button onClick={closeCart} variant="outline" size="sm">
                ابدأ التسوق
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`} className="flex space-x-4 ">
                  <div className="relative aspect-3/4 w-24 bg-secondary shrink-0 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold uppercase tracking-wider line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor?.name)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase mt-1">
                        المقاس: {item.selectedSize} / اللون: {item.selectedColor?.name}
                      </p>
                      <p className="text-sm font-medium mt-1">{item.price.toFixed(2)}  ج م</p>
                    </div>
                    <div className="flex items-center space-x-3 ">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor?.name, item.quantity - 1)}
                        className="p-1 border border-border hover:bg-accent transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor?.name, item.quantity + 1)}
                        className="p-1 border border-border hover:bg-accent transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t space-y-4">
            <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest">
              <span>المجموع الفرعي</span>
              <span>{subtotal.toFixed(2)}  ج م</span>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              يتم حساب الشحن والضرائب عند إتمام الشراء.
            </p>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout" onClick={closeCart}>
                إتمام الشراء الآن
              </Link>
            </Button>
            <Button className="w-full" variant="outline" onClick={closeCart}>
              متابعة التسوق
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  )
}
