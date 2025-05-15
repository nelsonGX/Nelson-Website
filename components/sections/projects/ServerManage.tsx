import Image from "next/image"
import { useTranslations } from 'next-intl'

export default function ServerManager() {
  const t = useTranslations('projects.serverManage');
  return (
    <>
    <h1 className="text-4xl py-10 text-center font-bold">{t('hosting.title')}</h1>
    {[
      { 
        date: t('hosting.freeserver.date'), 
        title: 'FreeServer', 
        imageSrc: "/assets/images/freeserver.png", 
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
        <div className="relative flex bg-zinc-800 shadow-xl w-24 h-12 rounded-lg">
          <h1 className="mx-auto my-auto font-semibold text-lg text-white">{data.date}</h1>
        </div>
        <div className="md:flex bg-zinc-800 rounded-lg shadow-xl md:max-w-[66%] px-6 py-4">
          <Image src={data.imageSrc} alt={'Image'} width={100} height={10} className="object-cover h-20 w-auto mx-auto md:mx-0 my-4 md:my-auto" />
          <div className="relative px-4">
              <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
              <div className="text-sm leading-snug tracking-wide text-zinc-300 text-opacity-100">{data.description}</div>
          </div>
        </div>
      </div>
    ))}

    <h1 className="text-4xl py-10 text-center font-bold">{t('infrastructure.title')}</h1> 
    </>
  )
}