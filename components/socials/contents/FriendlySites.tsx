import Image from "next/image";
import Link from "next/link";

export default function FriendlySiteContent() {
  const FriendlySitesData = [
  {
    "name": "Google",
    "content": "Search the web",
    "icon": <Image src="/assets/images/google.png" alt="Google" width={24} height={24} />,
    "link": "https://www.google.com",
    "color": "bg-red-600"
  },
  {
    "name": "Google",
    "content": "Search the web",
    "icon": <Image src="/assets/images/google.png" alt="Google" width={24} height={24} />,
    "link": "https://www.google.com",
    "color": "bg-red-600"
  },
  {
    "name": "Google",
    "content": "Search the web",
    "icon": <Image src="/assets/images/google.png" alt="Google" width={24} height={24} />,
    "link": "https://www.google.com",
    "color": "bg-red-600"
  },
  {
    "name": "Google",
    "content": "Search the web",
    "icon": <Image src="/assets/images/google.png" alt="Google" width={24} height={24} />,
    "link": "https://www.google.com",
    "color": "bg-red-600"
  },
]
  return (
    <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        {FriendlySitesData.map((site, index) => (
          <Link key={index} href={site.link} target="_blank" className={`flex items-center p-3 rounded-lg ${site.color}`}>
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
              {site.icon}
            </div>
            <div>
              <p className="font-semibold text-white">{site.name}</p>
              <p className="text-xs text-gray-300">{site.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}