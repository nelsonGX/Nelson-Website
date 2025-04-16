"use client"

import Image from "next/image"
import Link from "next/link"
import { User, Link as LLink } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

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
      
      <div className="flex items-center border-1 rounded-2xl border-zinc-600">
        <Link 
          href="/" 
          className={`flex items-center space-x-1 cursor-pointer hover:bg-zinc-800 px-3 py-2 transition-all duration-200 rounded-lg rounded-l-3xl ${isHomePage ? "text-zinc-100" : "text-zinc-400"}`}
        >
          <User />
          <p>About</p>
        </Link>
        <Link 
          href="/socials" 
          className={`flex items-center space-x-1 cursor-pointer hover:bg-zinc-800 px-3 py-2 transition-all duration-200 rounded-lg rounded-r-3xl ${!isHomePage ? "text-zinc-100" : "text-zinc-400"}`}
        >
          <LLink />
          <p>Socials</p>
        </Link>
      </div>
    </header>
  )
}