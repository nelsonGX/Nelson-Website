import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="absolute flex min-w-screen top-0 backdrop-blur-md px-8 py-4 justify-between">
      <div>
        <Link href="/">
          <div className="flex items-center justify-center space-x-4">
            <Image src={"/assets/nelsongx.png"} alt="" height={32} width={32} />
            <div className="flex text-xl font-bold"><p className="text-orange-300">Nelson</p><p className="text-zinc-200">&apos;s Website</p></div>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-6">
        <Link href="/about">
          <p className="text-zinc-200">About</p>
        </Link>
        <Link href="/contact">
          <p className="text-zinc-200">Contact</p>
        </Link>
      </div>
    </header>
  )
}