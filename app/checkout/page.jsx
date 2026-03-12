"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { ShieldCheck, CreditCard, Truck, ExternalLink } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore()
  const [isOrdered, setIsOrdered] = useState(false)

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setIsOrdered(true)
    clearCart()
  }

  if (isOrdered) {
    return (
      <div className="luxury-container py-40 text-center space-y-8">
        <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.2em] uppercase">تم تأكيد الطلب</h1>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">شكراً لاختيارك لوكس مين. جاري معالجة طلبك.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/account">عرض سجل الطلبات</Link>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="luxury-container py-40 text-center space-y-8">
        <h1 className="text-2xl uppercase tracking-widest font-bold">سلة المشتريات فارغة</h1>
        <Button asChild>
          <Link href="/shop">الذهاب للمتجر</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="luxury-container pt-32 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Shipping & Payment Info */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-12 text-right">
          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">1. معلومات الشحن</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="الاسم الأول *" required className="uppercase h-14" />
              <Input placeholder="اسم العائلة *" required className="uppercase h-14" />
              <Input placeholder="البريد الإلكتروني *" type="email" required className="lg:col-span-2 uppercase h-14 text-right" />
              <Input placeholder="عنوان الشحن *" required className="lg:col-span-2 uppercase h-14" />
              <Input placeholder="المدينة *" required className="uppercase h-14" />
              <Input placeholder="الرمز البريدي *" required className="uppercase h-14" />
              <Select className="lg:col-span-2 uppercase h-14">
                <option value="SA">المملكة العربية السعودية</option>
                <option value="AE">الإمارات العربية المتحدة</option>
                <option value="KW">الكويت</option>
                <option value="QA">قطر</option>
              </Select>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">2. طريقة التوصيل</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 border bg-secondary/50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-4 h-4 rounded-full border-4 border-black" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">شحن قياسي</h4>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">3-5 أيام عمل</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">مجاني</span>
              </div>
              <div className="flex items-center justify-between p-6 border opacity-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-4 h-4 rounded-full border" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">توصيل سريع</h4>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">1-2 يوم عمل</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">25.00  ج م</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">3. معلومات الدفع</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">بطاقة ائتمان أو مدى</span>
                </div>
                <Input placeholder="رقم البطاقة *" required className="h-14 tracking-[0.2em]" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="تاريخ الانتهاء (MM/YY) *" required className="h-14 tracking-[0.2em]" />
                  <Input placeholder="رمز التحقق (CVC) *" required className="h-14 tracking-[0.2em]" />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase leading-relaxed max-w-lg">
                عملية الدفع آمنة ومشفرة. بالنقر على "إتمام الطلب"، فإنك توافق على الشروط والأحكام الخاصة بنا.
              </p>
              <Button size="lg" className="w-full h-16 text-base" type="submit">
                إتمام الطلب
              </Button>
            </div>
          </section>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-5 text-right">
          <div className="sticky top-32 bg-secondary/30 p-8 border">
            <h3 className="text-lg font-bold tracking-widest uppercase mb-8 pb-4 border-b border-black/10">ملخص الطلب</h3>
            <div className="space-y-6 max-h-[400px] overflow-y-auto pl-4 mb-8">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`} className="flex space-x-4 space-x-reverse">
                  <div className="relative w-20 aspect-3/4 bg-neutral-100 shrink-0 overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest line-clamp-1">{item.name}</h4>
                    <p className="text-[9px] text-muted-foreground uppercase italic tracking-widest">المقاس: {item.selectedSize} / {item.selectedColor?.name}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] uppercase font-medium">الكمية: {item.quantity}</span>
                      <span className="text-xs font-bold">{(item.price * item.quantity).toFixed(2)}  ج م</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>المجموع الفرعي</span>
                <span>{subtotal.toFixed(2)}  ج م</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>الشحن</span>
                <span>مجاني</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>الضريبة</span>
                <span>0.00  ج م</span>
              </div>
              <div className="flex justify-between text-base font-bold uppercase tracking-[0.2em] pt-4 border-t border-black">
                <span>الإجمالي</span>
                <span>{subtotal.toFixed(2)}  ج م</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
