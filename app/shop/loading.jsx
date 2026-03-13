import { ProductCardSkeleton } from "@/components/product/ProductCardSkeleton"

export default function ShopLoading() {
    return (
        <div className="luxury-container pt-10 pb-20">
            <div className="mb-12">
                <div className="h-9 bg-secondary animate-pulse w-56 mb-4" />
                <div className="h-3 bg-secondary animate-pulse w-32" />
            </div>
            <div className="h-14 bg-secondary/50 animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}