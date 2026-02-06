import Image from "next/image"
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl'

export default function ServerManager() {
  const t = useTranslations('projects.serverManage');
  return (
    <>
    <h1 className="text-4xl py-10 md:px-16 font-bold text-orange-50">{t('hosting.title')}</h1>
    {[
      { 
        date: t('hosting.freeserver.date'), 
        title: 'FreeServer', 
        imageSrc: "/assets/images/freeserver.png", 
        links: [
          { name: t('hosting.freeserver.internet_archive_website'), url: 'https://web.archive.org/web/20220703070209/https://freeserver.fun/' },
          { name: t('hosting.freeserver.discord'), url: 'https://discord.gg/nNyn7EK9PC' }
        ],
        description: 
        <>
          <div>
            <span>
              {t('hosting.freeserver.part1')}
              <br/><br/>
              {t('hosting.freeserver.part2')}
              <br/><br/>
              {t('hosting.freeserver.part3')}
            </span>
          </div>
        </>
      },
      { 
        date: t('hosting.cheapserver.date'), 
        title: 'CheapServer', 
        imageSrc: "/assets/images/CheapServer_white.png", 
        links: [
          { name: t('hosting.cheapserver.website'), url: 'https://cheapserver.tw/' },
          { name: t('hosting.cheapserver.discord'), url: 'https://discord.gg/cheapserver' }
        ],
        description: 
        <>
          <div>
            <span>
              {t('hosting.cheapserver.part1')}
              <br/><br/>
              {t('hosting.cheapserver.part2')}
              <br/><br/>
              {t('hosting.cheapserver.part3')}
            </span>
          </div>
        </>
      },
      { 
        date: t('hosting.freeserverv2.date'), 
        title: 'FreeServer v2', 
        imageSrc: "/assets/images/freeserver.png", 
        description: 
        <>
          <div>
            <span>
              {t('hosting.freeserverv2.part1')}
              <br/><br/>
              {t('hosting.freeserverv2.part2')}
              <br/><br/>
              {t('hosting.freeserverv2.part3')}
            </span>
          </div>
        </>
      },
      { 
        date: t('hosting.freeserverv3.date'), 
        title: 'FreeServer v3', 
        imageSrc: "/assets/images/freeserverv3.png", 
        links: [
          { name: t('hosting.freeserverv3.website'), url: 'https://freeserver.tw/' },
          { name: t('hosting.freeserverv3.discord'), url: 'https://discord.gg/k5GgFFxN2Q' }
        ],
        description: 
        <>
          <div>
            <span>
              {t('hosting.freeserverv3.part1')}
              <br/><br/>
              {t('hosting.freeserverv3.part2')}
            </span>
          </div>
        </>
      },
    ].map((data, idx) => (
      <div className="mb-8 md:flex md:space-x-6 space-y-4 md:space-y-0 items-center justify-center" key={idx}>
        <div className="relative flex bg-zinc-800 shadow-xl w-fit h-fit rounded-lg">
          <h1 className="p-4 text-lg text-white">{data.date}</h1>
        </div>
        <div className="md:flex bg-zinc-800 rounded-lg shadow-xl w-full md:max-w-[66%] px-6 py-4">
          <Image src={data.imageSrc} alt={'Image'} width={100} height={10} className="object-cover h-20 w-auto mx-auto md:mx-0 my-4 md:my-auto" />
          <div className="relative px-4 space-y-4">
            <h3 className="font-bold text-white text-xl">{data.title}</h3>
            <div className="text-sm leading-snug tracking-wide text-zinc-300 text-opacity-100">{data.description}</div>
            {data.links &&
              <div className="bottom-4 right-6 flex space-x-4">
                {data.links.map((link, linkIdx) => (
                  <Link key={linkIdx} href={link.url} target="_blank" className="items-center flex text-sm text-orange-300 hover:text-orange-400 transition-all duration-150">
                    {link.name} <ExternalLink className="inline-block w-4 h-4 ml-1" />
                  </Link>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    ))}
    </>
  )
}