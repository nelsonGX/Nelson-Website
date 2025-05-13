import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

export default function FriendlySiteContent() {
  const t = useTranslations('socials.friendlySites');
  const FriendlySitesData = [
  {
    "name": "Yimang",
    "content": t('sites.yimang'),
    "icon": <Image src="/assets/images/socials/friendsites/yimang.png" alt="" width={64} height={64} />,
    "link": "https://yimang.tw/",
    "color": "bg-gray-600"
  },
  {
    "name": "BC",
    "content": t('sites.bc'),
    "icon": <Image src="/assets/images/socials/friendsites/bc.png" alt="" width={64} height={64} />,
    "link": "https://bcxy.me/",
    "color": "bg-gray-700"
  },
  {
    "name": "Qian",
    "content": t('sites.qian'),
    "icon": <Image src="/assets/images/socials/friendsites/qian.png" alt="" width={64} height={64} />,
    "link": "https://blog.qian30.net/",
    "color": "bg-zinc-800"
  },
  {
    "name": "n1cat",
    "content": t('sites.n1cat'),
    "icon": <Image src="/assets/images/socials/friendsites/n1cat.jpg" alt="" width={64} height={64} />,
    "link":"https://blog.nlcat.dpdns.org/",
    "color": "bg-zinc-900"
  },
  {
    "name": "Kason",
    "content": t('sites.kason'),
    "icon": <Image src="/assets/images/socials/friendsites/kang.png" alt="" width={64} height={64} />,
    "link":"https://kangjw.me/",
    "color": "bg-zinc-800"
  }
]

  // Custom CSS for RGB border
  const rgbBorderStyle = `
    @keyframes rgbBorderAnimation {
      0% { border-color: #ff0000; }
      16.666% { border-color: #ffff00; }
      33.333% { border-color: #00ff00; }
      50% { border-color: #00ffff; }
      66.666% { border-color: #0000ff; }
      83.333% { border-color: #ff00ff; }
      100% { border-color: #ff0000; }
    }
    .rgb-border-hover:hover {
      border: 2px solid #ff0000;
      animation: rgbBorderAnimation 2s linear infinite;
    }
  `;

  return (
    <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
      <style jsx>{rgbBorderStyle}</style>
      <h1 className="text-lg font-semibold text-white mb-4">{t('title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FriendlySitesData.map((site, index) => (
          <Link 
            key={index} 
            href={site.link} 
            target="_blank" 
            className={`flex items-center p-3 hover:scale-[102%] transition-all duration-150 rounded-lg ${site.color} rgb-border-hover`}
          >
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