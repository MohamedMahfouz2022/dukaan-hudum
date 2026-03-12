"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, Search } from "lucide-react"
import { products } from "@/data/products"
import { categories } from "@/data/categories"
import { ProductCard } from "@/components/product/ProductCard"
import { Button } from "@/components/ui/Button"
import { Select } from "@/components/ui/Select"
import { Input } from "@/components/ui/Input"
import { cn } from "@/lib/utils"

const PRICE_RANGES = [
  { label: "أقل من 100 جنية", min: 0, max: 100 },
  { label: "100 - 200 جنية", min: 100, max: 200 },
  { label: "أكثر من 200 جنية", min: 200, max: Infinity },
]

const SIZES = ["S", "M", "L", "XL", "XXL"]

// استخراج الألوان الفريدة من كل المنتجات
const ALL_COLORS = Array.from(
  new Map(
    products.flatMap(p => p.colors).map(c => [c.hex, c])
  ).values()
)

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // فلتير الفئة
    if (activeCategory === "new-arrivals") {
      result = result.filter(p => p.badge === "جديد")
    } else if (activeCategory === "sale") {
      result = result.filter(p => p.badge === "تخفيض")
    } else if (activeCategory !== "all") {
      result = result.filter(p => p.category === activeCategory)
    }

    // فلتير البحث
    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // فلتير المقاس
    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize))
    }

    // فلتير اللون
    if (selectedColor) {
      result = result.filter(p => p.colors.some(c => c.hex === selectedColor))
    }

    // فلتير السعر
    if (selectedPriceRange) {
      result = result.filter(p =>
        p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      )
    }

    // الترتيب
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => b.id.localeCompare(a.id))
    }

    return result
  }, [activeCategory, searchQuery, sortBy, selectedSize, selectedColor, selectedPriceRange])

  const resetFilters = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setSelectedSize(null)
    setSelectedColor(null)
    setSelectedPriceRange(null)
  }

  const hasActiveFilters = selectedSize || selectedColor || selectedPriceRange

  return (
    <div className="luxury-container pt-10 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0 text-right">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-4">المجموعة الكاملة</h1>
          <div className="flex items-center space-x-2 text-[10px] font-bold tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-black transition-colors">الرئيسية</Link>
            <span>/</span>
            <span>كل المنتجات</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground tracking-widest">
          عرض {filteredProducts.length} من أصل {products.length} منتج
        </p>
      </div>

      {/* Toolbar */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-y py-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] hover:opacity-60 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>الفلاتر</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-black inline-block" />
              )}
            </button>
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveCategory("all")}
                className={cn(
                  "text-[10px] font-bold tracking-[0.2em] transition-colors",
                  activeCategory === "all" ? "text-black underline underline-offset-8" : "text-muted-foreground"
                )}
              >
                الكل
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "text-[10px] font-bold tracking-[0.2em] transition-colors",
                    activeCategory === cat.id ? "text-black underline underline-offset-8" : "text-muted-foreground"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative md:block hidden">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="h-10 pr-10 pl-8 w-48 text-[10px] tracking-widest border-transparent focus:border-border"
                placeholder="بحث..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-black transition-colors" />
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="w-32 md:w-40">
              <Select
                className="h-10 text-[10px] font-bold tracking-widest border-transparent focus:border-border"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">ترتيب حسب: الأحدث</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="rating">الأفضل تقييماً</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b mb-8"
          >
            <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-right">
              {/* فلتير الفئات */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4">الفئات</h4>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setActiveCategory("all")}
                    className={cn("text-[10px] text-right transition-colors", activeCategory === "all" ? "text-black font-bold" : "hover:text-black")}
                  >
                    كل القطع
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn("text-[10px] text-right transition-colors", activeCategory === cat.id ? "text-black font-bold" : "hover:text-black")}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* فلتير السعر */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4">نطاق السعر</h4>
                <div className="flex flex-col space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => setSelectedPriceRange(
                        selectedPriceRange?.label === range.label ? null : range
                      )}
                      className={cn(
                        "text-[10px] text-right transition-colors",
                        selectedPriceRange?.label === range.label ? "text-black font-bold" : "hover:text-black"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* فلتير المقاسات */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4">المقاسات</h4>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(size => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={cn(
                        "h-8 w-8 p-0 text-[10px] transition-colors",
                        selectedSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"
                      )}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* فلتير الألوان */}
              <div>
                <h4 className="text-[10px] font-bold tracking-[0.2em] mb-4">الألوان</h4>
                <div className="flex flex-wrap gap-2">
                  {ALL_COLORS.map(color => (
                    <button
                      key={color.hex}
                      title={color.name}
                      onClick={() => setSelectedColor(selectedColor === color.hex ? null : color.hex)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-all",
                        selectedColor === color.hex ? "border-black scale-110" : "border-border hover:border-black"
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* زرار مسح الفلاتر */}
            {hasActiveFilters && (
              <div className="pb-6 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-[10px] tracking-widest text-muted-foreground hover:text-black transition-colors underline underline-offset-4"
                >
                  مسح كل الفلاتر
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center">
          <p className="text-muted-foreground tracking-widest mb-6">لم يتم العثور على منتجات تطابق اختيارك.</p>
          <Button onClick={resetFilters} variant="outline">إعادة تعيين الفلاتر</Button>
        </div>
      )}
    </div>
  )
}