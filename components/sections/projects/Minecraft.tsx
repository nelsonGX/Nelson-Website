import { useTranslations } from 'next-intl';
import Stack from '@/components/Stack';
import Image from 'next/image';

export default function Minecraft() {
  const t = useTranslations('projects.minecraft');
  
  return (
    <>
      <div className="pt-8 p-2 md:p-16 space-y-12">
        <h2 className="text-3xl font-bold text-white mb-4">{t('serversIHosted')}</h2>
        <p className="text-gray-300 mb-6">{t('servverDescription')}</p>

        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative lg:flex">
              <div>
                <div className="flex items-center space-x-4">
                  <h3 className="text-2xl font-semibold text-orange-300">{t('servers.nelsonSMPv1.title')}</h3>
                  <p className="bg-zinc-700 py-1 px-2 rounded-md text-sm">{t('servers.nelsonSMPv1.date')}</p>
                </div>
                <p className="text-gray-300 mt-2 max-w-4xl">{t('servers.nelsonSMPv1.description')}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[300px] h-[225px] sm:w-[450px] sm:h-[300px] mt-4 md:mt-0 flex-shrink-0">
                  <Stack
                    randomRotation
                    sensitivity={170}
                    sendToBackOnClick={true}
                    cards={[
                        "/assets/images/minecraft/smpv1_1.png",
                        "/assets/images/minecraft/smpv1_2.png",
                        "/assets/images/minecraft/smpv1_3.png",
                        "/assets/images/minecraft/smpv1_4.png",
                      ].map((src, i) => (
                      <div key={i} className="relative w-full h-full">
                        <Image
                          src={src}
                          alt={`card-${i + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                          draggable={false}
                        />
                      </div>
                    ))}
                    autoplay
                    autoplayDelay={2000}
                    pauseOnHover
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}