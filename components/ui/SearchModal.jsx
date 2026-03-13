"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { useUIStore } from "@/store/uiStore"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export function SearchModal() {
    const { isSearchOpen, closeSearch } = useUIStore()
    const [query, setQuery] = useState("")
    const inputRef = useRef(null)

    const results = query.trim().length > 1
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
        : []

    useEffect(() => {
        if (isSearchOpen) {
            setTimeout(() => inputRef.current?.focus(), 100)
        } else {
            setQuery("")
        }
    }, [isSearchOpen])

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") closeSearch() }
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [closeSearch])

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeSearch}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 right-0 z-[100] bg-background border-b shadow-2xl"
                    >
                        <div className="luxury-container py-6">
                            {/* Input */}
                            <div className="flex items-center gap-4">
                                <Search className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ابحث عن منتج..."
                                    className="flex-1 bg-transparent text-base tracking-widest outline-none placeholder:text-muted-foreground text-right"
                                    aria-label="حقل البحث"
                                />
                                <button
                                    onClick={closeSearch}
                                    className="p-2 hover:bg-accent transition-colors"
                                    aria-label="إغلاق البحث"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Results */}
                            {results.length > 0 && (
                                <div className="mt-4 border-t pt-4 space-y-1 max-h-96 overflow-y-auto">
                                    {results.map(product => (
                                        <Link
                                            key={product.id}
                                            href={`/product/${product.slug}`}
                                            onClick={closeSearch}
                                            className="flex items-center gap-4 p-3 hover:bg-accent transition-colors group"
                                        >
                                            <div className="relative w-12 aspect-[3/4] bg-secondary shrink-0 overflow-hidden">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 text-right">
                                                <p className="text-xs font-bold tracking-wider leading-relaxed">{product.name}</p>
                                                <p className="text-[10px] text-muted-foreground tracking-widest mt-0.5">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* No results */}
                            {query.trim().length > 1 && results.length === 0 && (
                                <p className="mt-4 border-t pt-4 text-[11px] text-muted-foreground tracking-widest text-center py-4">
                                    لا توجد نتائج لـ &ldquo;{query}&rdquo;
                                </p>
                            )}

                            {/* Hint */}
                            {query.trim().length === 0 && (
                                <p className="mt-2 text-[10px] text-muted-foreground tracking-widest text-right">
                                    اكتب اسم المنتج أو وصفه للبحث
                                </p>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}