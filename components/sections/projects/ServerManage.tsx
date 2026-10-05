import Image from "next/image"
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl'

export default function ServerManager() {
  const t = useTranslations('projects.serverManage');
  return (
    <>
    <h3 className="mt-12 mb-6 text-2xl font-semibold text-zinc-50">{t('hosting.title')}</h3>
    {[
      { 
        date: t('hosting.freeserver.date'), 
        title: 'FreeServer', 
        imageSrc: "/assets/images/freeserver.webp", 
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
        imageSrc: "/assets/images/CheapServer_white.webp", 
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
        imageSrc: "/assets/images/freeserver.webp", 
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
        imageSrc: "/assets/images/freeserverv3.webp", 
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
    ].map((data) => (
      <div className="relative mb-4 grid grid-cols-1 gap-3 md:grid-cols-[200px_1fr] md:gap-8" key={data.title}>
        <p className="font-mono text-sm text-orange-300 md:pt-5">{data.date}</p>
        <div className="md:flex md:items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-6 py-5">
          <Image src={data.imageSrc} alt="" width={100} height={10} className="object-contain h-16 w-24 shrink-0 mb-4 md:mb-0 md:mt-1" />
          <div className="relative min-w-0 flex-1 md:px-4 space-y-3">
            <h4 className="font-semibold text-zinc-50 text-xl">{data.title}</h4>
            <div className="text-sm leading-relaxed text-zinc-400">{data.description}</div>
            {data.links &&
              <div className="flex flex-wrap gap-4">
                {data.links.map((link, linkIdx) => (
                  <Link key={linkIdx} href={link.url} target="_blank" className="items-center flex text-sm text-orange-300 hover:text-orange-200 transition-all duration-150">
                    {link.name} <ExternalLink className="inline-block size-4 ml-1" />
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