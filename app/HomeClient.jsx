"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ProductCard } from "@/components/product/ProductCard"
import { products } from "@/data/products"

export function HomeClient() {
    const featuredProducts = products.filter(p => p.badge === "جديد").slice(0, 4)
    const bestsellerProducts = products.filter(p => p.badge === "الأكثر مبيعاً").slice(0, 4)

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-neutral-100">
                <Image
                    src="/hero.jpg"
                    alt="دوكان هدوم - أزياء رجالية فاخرة"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div dir="rtl" className="luxury-container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <span className="text-xs tracking-[0.3em] text-white/70 mb-8 block">
                            مجموعة جديدة 2026
                        </span>
                        <h1 className="flex flex-col gap-10 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] text-white mb-8">
                            <span>فن الرجولة</span>
                            <span className="text-primary">الحديثة</span>
                        </h1>
                        <p className="text-white/80 text-base md:text-lg mb-10 max-w-md leading-relaxed">
                            استكشف مجموعتنا الأخيرة المنسقة من الملابس الرجالية الفاخرة،
                            والمصممة للرجل العصري الباحث عن الأناقة.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" asChild className="border-black text-white hover:text-black hover:bg-white">
                                <Link href="/shop">تسوق المجموعة</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="border-white text-black hover:text-white hover:bg-black">
                                <Link href="/shop?category=new-arrivals">شاهد أحدث القطع</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Bar */}
            <section className="border-b">
                <div className="luxury-container py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center space-x-4">
                            <Truck className="w-5 h-5" aria-hidden="true" />
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-widest">شحن عالمي</h4>
                                <p className="text-[10px] text-muted-foreground uppercase mt-1">مجاني للطلبات فوق 200 جنية</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-widest">دفع آمن</h4>
                                <p className="text-[10px] text-muted-foreground uppercase mt-1">تشفير عبر (Stripe)</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <RotateCcw className="w-5 h-5" aria-hidden="true" />
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-widest">إرجاع سهل</h4>
                                <p className="text-[10px] text-muted-foreground uppercase mt-1">سياسة إرجاع لمدة 30 يوماً</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="py-20">
                <div className="luxury-container">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2 block">اختيارات منسقة</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase">وصلنا حديثاً</h2>
                        </div>
                        <Link href="/shop" className="text-xs font-bold tracking-[0.2em] uppercase border-b border-black pb-1 hover:opacity-60 transition-opacity">
                            تسوق الكل &larr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-20 bg-secondary">
                <div className="luxury-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative aspect-[16/9] group overflow-hidden bg-neutral-100">
                            <Image
                                src="/category-clothing.jpg"
                                alt="ملابس رجالية"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center text-white">
                                <h3 className="text-3xl font-bold tracking-tight mb-4 drop-shadow-lg">ملابس رجالية</h3>
                                <Link href="/shop?category=clothing" className="text-xs font-bold tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity">استكشف الآن</Link>
                            </div>
                        </div>
                        <div className="relative aspect-[16/9] group overflow-hidden bg-neutral-100">
                            <Image
                                src="/category-accessories.jpeg"
                                alt="إكسسوارات رجالية"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 text-center text-white">
                                <h3 className="text-3xl font-bold tracking-tight mb-4 drop-shadow-lg">إكسسوارات</h3>
                                <Link href="/shop?category=accessories" className="text-xs font-bold tracking-[0.2em] uppercase border-b border-white pb-1 hover:opacity-80 transition-opacity">استكشف الآن</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bestsellers */}
            <section className="py-20">
                <div className="luxury-container">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">القطع الأكثر طلباً</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4">الأكثر مبيعاً</h2>
                        <div className="h-px w-20 bg-black" />
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
                        {bestsellerProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Brand Ethos */}
            <section className="py-40 bg-black text-white overflow-hidden relative">
                <div className="luxury-container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl font-serif italic mb-10 tracking-tight leading-tight">
                            &ldquo;نصوغ مستقبل الأناقة الرجالية من خلال التراث والابتكار.&rdquo;
                        </h2>
                        <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase">تأسست عام 2026 / ملتزمون بالجودة</p>
                    </div>
                </div>
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-neutral-900/50"
                />
            </section>
        </div>
    )
}