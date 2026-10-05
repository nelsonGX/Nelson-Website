import Image from "next/image"
import Link from "next/link"
import { User, Link as LLink, Languages } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from "framer-motion"

export default function Header() {
  const t = useTranslations('layout.header');
  const pathname = usePathname()
  const isHomePage = !pathname.includes("/socials")
  const isEnglish = pathname.includes("/en")
  const [showLanguageHint, setShowLanguageHint] = useState(true)
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { push } = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setShowLanguageHint(false), 3500);
    return () => clearTimeout(timer);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      setHasScrolledDown(window.scrollY > 600);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleLanguageChange() {
    if (isEnglish) {
      push(isHomePage ? "/zh" : "/zh/socials")
    } else {
      push(isHomePage ? "/en" : "/en/socials")
    }
  }

  const showWordmark = !isHomePage || hasScrolledDown;
  const navItem = "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors duration-200";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-2.5 py-2 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? "border-white/10 bg-zinc-950/70 shadow-lg shadow-black/30 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href={isEnglish ? "/en" : "/zh"} className="flex items-center gap-3 rounded-xl pr-2">
          <Image src={"/assets/images/nelsongx.png"} alt="" height={32} width={32} className="rounded-lg" />
          <span
            className={`font-minecraft text-base md:text-lg transition-all duration-500 ${
              showWordmark ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            <span className="text-orange-300">Nelson</span>
            <span className="text-zinc-200">&apos;s</span>
            <span className="hidden sm:inline text-zinc-200"> Website</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
            <Link
              href={isEnglish ? "/en" : "/zh"}
              aria-current={isHomePage ? "page" : undefined}
              className={`${navItem} ${isHomePage ? "bg-white/10 text-zinc-50" : "text-zinc-400 hover:text-zinc-100"}`}
            >
              <User size={16} />
              <span className={isHomePage ? "" : "hidden sm:inline"}>{t('about')}</span>
            </Link>
            <Link
              href={isEnglish ? "/en/socials" : "/zh/socials"}
              aria-current={!isHomePage ? "page" : undefined}
              className={`${navItem} ${!isHomePage ? "bg-white/10 text-zinc-50" : "text-zinc-400 hover:text-zinc-100"}`}
            >
              <LLink size={16} />
              <span className={!isHomePage ? "" : "hidden sm:inline"}>{t('socials')}</span>
            </Link>
          </nav>

          <div className="relative">
            <button
              type="button"
              onClick={handleLanguageChange}
              aria-label={t('languageHint')}
              className="flex h-[38px] items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-sm text-zinc-300 transition-colors hover:border-orange-300/40 hover:text-orange-200"
            >
              <Languages size={16} />
              <span className="font-mono text-xs">{isEnglish ? "中" : "EN"}</span>
            </button>
            <AnimatePresence>
              {showLanguageHint && (
                <motion.div
                  className="absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 shadow-lg"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  {t('languageHint')}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
