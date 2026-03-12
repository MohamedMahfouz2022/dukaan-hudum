"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { User, Package, Settings, LogOut, ChevronRight, MapPin, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders")

  const mockOrders = [
    { id: "LX-90124", date: "١٠ مارس ٢٠٢٦", total: 110.00, status: "تم التوصيل" },
    { id: "LX-88912", date: "١٥ فبراير ٢٠٢٦", total: 89.00, status: "تم الشحن" },
  ]

  const SidebarLink = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center space-x-4 space-x-reverse w-full p-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
        activeTab === id ? "bg-black text-white" : "hover:bg-accent"
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )

  return (
    <div className="luxury-container pt-32 pb-20 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-2">
          <div className="p-8 bg-secondary/30 border mb-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">مستخدم لوكس</h3>
            <p className="text-[10px] text-muted-foreground mt-1 lowercase text-center">user@luxemen.com</p>
          </div>

          <div className="space-y-1">
            <SidebarLink id="orders" icon={Package} label="سجل الطلبات" />
            <SidebarLink id="profile" icon={User} label="بيانات الملف الشخصي" />
            <SidebarLink id="address" icon={MapPin} label="العناوين" />
            <SidebarLink id="payment" icon={CreditCard} label="طرق الدفع" />
            <SidebarLink id="settings" icon={Settings} label="الإعدادات" />
            <button className="flex items-center space-x-4 space-x-reverse w-full p-4 text-[10px] font-bold uppercase tracking-[0.3em] text-destructive hover:bg-destructive/10 transition-colors mt-8">
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="lg:w-3/4 animate-in fade-in slide-in-from-left-4 duration-500 text-right">
          <AnimatePresence mode="wait">
            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end border-b pb-8">
                  <h2 className="text-2xl font-bold tracking-widest uppercase">سجل الطلبات</h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">عرض {mockOrders.length} طلبات حديثة</p>
                </div>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-8 border bg-background group hover:border-black transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-12">
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
                            <p className="text-xs font-bold tracking-widest">{order.total.toFixed(2)}  ج م</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-8 space-x-reverse">
                          <Badge variant={order.status === "تم التوصيل" ? "secondary" : "default"}>
                            {order.status}
                          </Badge>
                          <Link href={`/account/order/${order.id}`} className="p-2 hover:bg-accent transition-colors">
                            <ChevronRight className="w-5 h-5 shrink-0 rotate-180" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-bold tracking-widest uppercase border-b pb-8">بيانات الملف الشخصي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">الاسم الأول</label>
                    <p className="text-sm font-bold border-b py-2 uppercase tracking-wider">لوكس</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">اسم العائلة</label>
                    <p className="text-sm font-bold border-b py-2 uppercase tracking-wider">مستخدم</p>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest">البريد الإلكتروني</label>
                    <p className="text-sm font-bold border-b py-2 lowercase tracking-wider text-right">user@luxemen.com</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-8">تعديل الملف الشخصي</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
