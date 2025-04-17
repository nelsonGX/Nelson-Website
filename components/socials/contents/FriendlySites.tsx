import Image from "next/image";
import Link from "next/link";

export default function FriendlySiteContent() {
  const FriendlySitesData = [
  {
    "name": "Yimang",
    "content": "一個高中生",
    "icon": <Image src="/assets/images/socials/friendsites/yimang.png" alt="" width={64} height={64} />,
    "link": "https://yimang.tw/",
    "color": "bg-gray-600"
  },
  {
    "name": "BC",
    "content": "分享酷東西的高品質網站",
    "icon": <Image src="/assets/images/socials/friendsites/bc.png" alt="" width={64} height={64} />,
    "link": "https://bcxy.me/",
    "color": "bg-gray-700"
  },
]
  return (
    <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
      <h1 className="text-lg font-semibold text-white mb-4">Friendly Sites</h1>
      <div className="grid grid-cols-2 gap-4">
        {FriendlySitesData.map((site, index) => (
          <Link key={index} href={site.link} target="_blank" className={`flex items-center p-3 rounded-lg ${site.color}`}>
            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
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