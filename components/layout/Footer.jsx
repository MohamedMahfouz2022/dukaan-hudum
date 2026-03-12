import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary mt-20">
      <div className="luxury-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold tracking-[0.2em] uppercase">دوكان هدوم</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              إعادة تعريف الأناقة العصرية للرجل من خلال الحرفية العالية والتصميم الخالد.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-black/60 transition-colors"><Instagram className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-black/60 transition-colors"><Facebook className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-black/60 transition-colors"><Twitter className="w-5 h-5" /></Link>
              <Link href="#" className="hover:text-black/60 transition-colors"><Youtube className="w-5 h-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium tracking-widest luxury-title mb-6 uppercase">المجموعات</h4>
            <ul className="space-y-4 text-sm text-muted-foreground uppercase tracking-wider">
              <li><Link href="/shop" className="hover:text-black transition-colors">وصلنا حديثاً</Link></li>
              <li><Link href="/shop" className="hover:text-black transition-colors">الأكثر مبيعاً</Link></li>
              <li><Link href="/shop" className="hover:text-black transition-colors">ملابس</Link></li>
              <li><Link href="/shop" className="hover:text-black transition-colors">إكسسوارات</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium tracking-widest luxury-title mb-6 uppercase">الدعم</h4>
            <ul className="space-y-4 text-sm text-muted-foreground uppercase tracking-wider">
              <li><Link href="#" className="hover:text-black transition-colors">اتصل بنا</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">الشحن والمرتجع</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">دليل المقاسات</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-medium tracking-widest luxury-title uppercase">النشرة الإخبارية</h4>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">انضم إلى قائمتنا للحصول على تحديثات حصرية.</p>
            <div className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="عنوان البريد الإلكتروني"
                className="bg-transparent border-b border-black/20 py-2 text-sm focus:outline-none focus:border-black transition-colors uppercase tracking-widest"
              />
              <button className="text-right text-xs font-bold tracking-[0.2em] uppercase hover:opacity-60 transition-opacity pt-2">
                اشتراك &larr;
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <p>&copy; 2026 دوكان هدوم. جميع الحقوق محفوظة.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-black">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-black">شروط الخدمة</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
