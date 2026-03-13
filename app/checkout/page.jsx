"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { ShieldCheck, CreditCard, Truck } from "lucide-react"
import { formatPrice } from "@/lib/utils"

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
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            شكراً لاختيارك دوكان هدوم. جاري معالجة طلبك.
          </p>
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

        {/* نموذج الشحن والدفع */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-12 text-right">

          {/* ١. معلومات الشحن */}
          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">
              ١. معلومات الشحن
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="الاسم الأول *" required className="uppercase h-14" aria-label="الاسم الأول" />
              <Input placeholder="اسم العائلة *" required className="uppercase h-14" aria-label="اسم العائلة" />
              <Input placeholder="البريد الإلكتروني *" type="email" required className="md:col-span-2 uppercase h-14 text-right" aria-label="البريد الإلكتروني" />
              <Input placeholder="عنوان الشحن *" required className="md:col-span-2 uppercase h-14" aria-label="عنوان الشحن" />
              <Input placeholder="المدينة *" required className="uppercase h-14" aria-label="المدينة" />
              <Input placeholder="الرمز البريدي *" required className="uppercase h-14" aria-label="الرمز البريدي" />
              <Select className="md:col-span-2 uppercase h-14" aria-label="اختر الدولة">
                <option value="EG">مصر</option>
                <option value="SA">المملكة العربية السعودية</option>
                <option value="AE">الإمارات العربية المتحدة</option>
                <option value="KW">الكويت</option>
                <option value="QA">قطر</option>
                <option value="BH">البحرين</option>
                <option value="OM">عُمان</option>
                <option value="JO">الأردن</option>
                <option value="LB">لبنان</option>
              </Select>
            </div>
          </section>

          {/* ٢. طريقة التوصيل */}
          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">
              ٢. طريقة التوصيل
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-6 border bg-secondary/50 cursor-pointer has-[:checked]:border-black transition-colors">
                <div className="flex items-center space-x-4 ">
                  <input type="radio" name="shipping" defaultChecked className="w-4 h-4 accent-black" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">شحن قياسي</h4>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">٣–٥ أيام عمل</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">مجاني</span>
              </label>
              <label className="flex items-center justify-between p-6 border cursor-pointer has-[:checked]:border-black transition-colors">
                <div className="flex items-center space-x-4 ">
                  <input type="radio" name="shipping" className="w-4 h-4 accent-black" />
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">توصيل سريع</h4>
                    <p className="text-[10px] text-muted-foreground uppercase mt-1">١–٢ يوم عمل</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">{formatPrice(25)}</span>
              </label>
            </div>
          </section>

          {/* ٣. معلومات الدفع */}
          <section>
            <h2 className="text-xl font-bold tracking-widest uppercase mb-8 pb-4 border-b">
              ٣. معلومات الدفع
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-2  mb-4">
                <CreditCard className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest">بطاقة ائتمان أو مدى</span>
              </div>
              <Input placeholder="رقم البطاقة *" required className="h-14 tracking-[0.2em]" aria-label="رقم البطاقة" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="تاريخ الانتهاء (MM/YY) *" required className="h-14 tracking-[0.2em]" aria-label="تاريخ انتهاء البطاقة" />
                <Input placeholder="رمز التحقق (CVC) *" required className="h-14 tracking-[0.2em]" aria-label="رمز التحقق" />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase leading-relaxed max-w-lg">
                عملية الدفع آمنة ومشفرة. بالنقر على &ldquo;إتمام الطلب&rdquo;، فإنك توافق على الشروط والأحكام.
              </p>
              <Button size="lg" className="w-full h-16 text-base" type="submit">
                إتمام الطلب
              </Button>
            </div>
          </section>
        </form>

        {/* ملخص الطلب */}
        <div className="lg:col-span-5 text-right">
          <div className="sticky top-32 bg-secondary/30 p-8 border">
            <h3 className="text-lg font-bold tracking-widest uppercase mb-8 pb-4 border-b border-black/10">
              ملخص الطلب
            </h3>

            <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 pl-2">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                  className="flex space-x-4"
                >
                  <div className="relative w-20 aspect-[3/4] bg-neutral-100 shrink-0 overflow-hidden">
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
                    <p className="text-[9px] text-muted-foreground uppercase italic tracking-widest">
                      المقاس: {item.selectedSize} / {item.selectedColor?.name}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] uppercase font-medium">الكمية: {item.quantity}</span>
                      <span className="text-xs font-bold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4 border-t border-black/10">
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>المجموع الفرعي</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>الشحن</span>
                <span>مجاني</span>
              </div>
              <div className="flex justify-between text-[11px] uppercase tracking-widest">
                <span>الضريبة</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between text-base font-bold uppercase tracking-[0.2em] pt-4 border-t border-black">
                <span>الإجمالي</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}