import Image from "next/image"
import Link from "next/link"
import { User, Link as LLink, Languages } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [showLanguageHint, setShowLanguageHint] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    const timer = setTimeout(() => {
      setIsExiting(true)
      
      const hideTimer = setTimeout(() => {
        setShowLanguageHint(false)
      }, 500)
      
      return () => clearTimeout(hideTimer)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <header className="absolute flex w-full top-0 backdrop-blur-md px-8 py-2 md:py-4 justify-between z-50">
      <div>
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center justify-center space-x-4">
            <Image src={"/assets/images/nelsongx.png"} alt="" height={32} width={32} />
            <div className="relative text-xl font-bold md:hidden"><div className="flex"><p className="text-orange-300">Nelson</p><p className="text-zinc-300">&apos;s</p></div><p className="text-zinc-400">Website</p></div>
            <div className="md:flex text-xl font-bold hidden"><p className="text-orange-300">Nelson</p><p className="text-zinc-200">&apos;s Website</p></div>
          </div>
        </Link>
      </div>
      
      <div className="flex space-x-4">
        <div className="h-12 md:h-auto flex border-zinc-700 border px-3 rounded-2xl items-center space-x-2 text-orange-200/80 hover:text-orange-300 transition-all duration-150 cursor-pointer relative">
          <Languages size={20} />
            {showLanguageHint && (
            <div 
              className={`absolute top-full mt-2 right-0 whitespace-nowrap transition-all duration-500 ${isExiting ? 'animate-slideOutDown opacity-0' : ''} ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} 
              style={{
              transform: isExiting ? 'translateY(10px)' : 'translateY(0)', 
              zIndex: 50,
              transition: 'opacity 0.5s, transform 0.5s, scale 0.5s',
              animation: isLoaded && !isExiting ? 'bounce 0.2s' : 'none'
              }}
            >
              <div className="bg-zinc-800 px-3 py-1 rounded-lg text-sm text-white">
              Also available in Chinese
              <div className="absolute -top-2 right-4 transform border-b-8 border-b-zinc-800 border-x-8 border-x-transparent"></div>
              </div>
            </div>
            )}
        </div>
        <div className="flex items-center border-1 rounded-2xl border-zinc-600 h-12 md:h-auto">
          <Link 
            href="/" 
            className={`flex items-center space-x-1 cursor-pointer hover:bg-zinc-800 px-3 md:py-2 transition-all duration-200 rounded-lg rounded-l-3xl ${isHomePage ? "text-zinc-100" : "text-zinc-400"}`}
          >
            <User />
            <p className={isHomePage ? "hidden md:block" : ""}>About</p>
          </Link>
          <Link 
            href="/socials" 
            className={`flex items-center space-x-1 cursor-pointer hover:bg-zinc-800 px-3 md:py-2 transition-all duration-200 rounded-lg rounded-r-3xl ${!isHomePage ? "text-zinc-100" : "text-zinc-400"}`}
          >
            <LLink />
            <p className={isHomePage ? "" : "hidden md:block"}>Socials</p>
          </Link>
        </div>  
      </div>
    </header>
  )
}