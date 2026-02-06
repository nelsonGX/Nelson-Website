import { useTranslations } from 'next-intl';

export default function Minecraft() {
  const t = useTranslations('projects.minecraft');
  
  return (
    <>
      <div className="pt-8 p-16 space-y-12">
        <h2 className="text-3xl font-bold text-white mb-4">{t('serversIHosted')}</h2>
        <p className="text-gray-300 mb-6">{t('servverDescription')}</p>

        <div>
          <div className="">
            <div className="flex items-center space-x-4">
              <h3 className="text-2xl font-semibold text-orange-300">{t('servers.nelsonSMPv1.title')}</h3>
              <p className="bg-zinc-700 py-1 px-2 rounded-md text-sm">{t('servers.nelsonSMPv1.date')}</p>
            </div>
            <div className="relative md:flex">
              <p className="text-gray-300 mt-2">{t('servers.nelsonSMPv1.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}