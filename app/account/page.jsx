"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { cn, formatPrice } from "@/lib/utils"

const TABS = [
  { id: "orders", icon: Package, label: "سجل الطلبات" },
  { id: "profile", icon: User, label: "الملف الشخصي" },
  { id: "address", icon: MapPin, label: "العناوين" },
  { id: "payment", icon: CreditCard, label: "طرق الدفع" },
  { id: "settings", icon: Settings, label: "الإعدادات" },
]

const mockOrders = [
  { id: "DH-90124", date: "١٠ مارس ٢٠٢٦", total: 110.00, status: "تم التوصيل" },
  { id: "DH-88912", date: "١٥ فبراير ٢٠٢٦", total: 89.00, status: "تم الشحن" },
]

function ComingSoon({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
        <Clock className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold uppercase tracking-widest">{title}</h3>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest max-w-xs leading-relaxed">
          هذه الخاصية قيد التطوير وستكون متاحة قريباً.
        </p>
      </div>
    </div>
  )
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="luxury-container pt-32 pb-20 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* الشريط الجانبي */}
        <aside className="lg:w-1/4 space-y-2" aria-label="قائمة الحساب">
          <div className="p-8 bg-secondary/30 border mb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">مستخدم دوكان هدوم</h3>
            <p className="text-[10px] text-muted-foreground mt-1 lowercase text-center">user@dokkanhudoom.com</p>
          </div>

          <nav className="space-y-1">
            {TABS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-current={activeTab === id ? "page" : undefined}
                className={cn(
                  "flex items-center space-x-4  w-full p-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  activeTab === id ? "bg-black text-white" : "hover:bg-accent"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}

            <button className="flex items-center space-x-4  w-full p-4 text-[10px] font-bold uppercase tracking-[0.3em] text-destructive hover:bg-destructive/10 transition-colors mt-4">
              <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>تسجيل الخروج</span>
            </button>
          </nav>
        </aside>

        {/* منطقة المحتوى */}
        <main className="lg:w-3/4 text-right" aria-live="polite">
          <AnimatePresence mode="wait">

            {/* سجل الطلبات */}
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end border-b pb-8">
                  <h2 className="text-2xl font-bold tracking-widest uppercase">سجل الطلبات</h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                    {mockOrders.length} طلبات حديثة
                  </p>
                </div>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-8 border group hover:border-black transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-8">
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">رقم الطلب</p>
                            <p className="text-xs font-bold tracking-widest">{order.id}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">التاريخ</p>
                            <p className="text-xs font-bold tracking-widest">{order.date}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">الإجمالي</p>
                            <p className="text-xs font-bold tracking-widest">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 ">
                          <Badge variant={order.status === "تم التوصيل" ? "secondary" : "default"}>
                            {order.status}
                          </Badge>
                          <Link
                            href={`/account/order/${order.id}`}
                            aria-label={`تفاصيل الطلب ${order.id}`}
                            className="p-2 hover:bg-accent transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 shrink-0 rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* الملف الشخصي */}
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold tracking-widest uppercase border-b pb-8">الملف الشخصي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest block">الاسم الأول</label>
                    <Input defaultValue="دوكان" className="h-12 uppercase tracking-wider" aria-label="الاسم الأول" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest block">اسم العائلة</label>
                    <Input defaultValue="مستخدم" className="h-12 uppercase tracking-wider" aria-label="اسم العائلة" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest block">البريد الإلكتروني</label>
                    <Input defaultValue="user@dokkanhudoom.com" type="email" className="h-12 lowercase tracking-wider text-right" aria-label="البريد الإلكتروني" />
                  </div>
                </div>
                <Button className="mt-4">حفظ التغييرات</Button>
              </motion.div>
            )}

            {/* العناوين */}
            {activeTab === "address" && (
              <motion.div
                key="address"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold tracking-widest uppercase border-b pb-8 mb-0">العناوين</h2>
                <ComingSoon title="إدارة العناوين" />
              </motion.div>
            )}

            {/* طرق الدفع */}
            {activeTab === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold tracking-widest uppercase border-b pb-8 mb-0">طرق الدفع</h2>
                <ComingSoon title="إدارة طرق الدفع" />
              </motion.div>
            )}

            {/* الإعدادات */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-bold tracking-widest uppercase border-b pb-8 mb-0">الإعدادات</h2>
                <ComingSoon title="إعدادات الحساب" />
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}