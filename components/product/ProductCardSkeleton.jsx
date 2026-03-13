export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col animate-pulse">
            <div className="aspect-[3/4] bg-secondary" />
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="h-3 bg-secondary rounded w-3/4" />
                    <div className="h-3 bg-secondary rounded w-12" />
                </div>
                <div className="h-2.5 bg-secondary rounded w-1/3" />
            </div>
        </div>
    )
}