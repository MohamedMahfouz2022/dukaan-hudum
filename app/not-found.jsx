import Link from "next/link"
import { Button } from "@/components/ui/Button"

export const metadata = {
    title: "٤٠٤ - الصفحة غير موجودة | دوكان هدوم",
}

export default function NotFound() {
    return (
        <div className="luxury-container min-h-[80vh] flex flex-col items-center justify-center text-center py-40">
            <span className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground mb-6 block uppercase">
                خطأ ٤٠٤
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-[0.15em] mb-6">
                لم يُعثر على الصفحة
            </h1>
            <div className="h-px w-20 bg-black mx-auto mb-8" />
            <p className="text-xs text-muted-foreground tracking-widest mb-12 max-w-sm leading-relaxed uppercase">
                الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/">الصفحة الرئيسية</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/shop">تصفح المتجر</Link>
                </Button>
            </div>
        </div>
    )
}