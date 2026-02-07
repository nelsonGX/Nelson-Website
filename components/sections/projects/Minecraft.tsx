import { useTranslations } from 'next-intl';
import Stack from '@/components/Stack';
import Image from 'next/image';

interface ServerCardProps {
  translationKey: string;
  images: string[];
  autoplayDelay: number;
  imageFirst?: boolean;
  t: ReturnType<typeof useTranslations>;
}

function ServerCard({ translationKey, images, autoplayDelay, imageFirst = false, t }: ServerCardProps) {
  const textContent = (
    <div>
      <div className="flex items-center space-x-4">
        <h3 className="text-2xl font-semibold text-orange-300">{t(`servers.${translationKey}.title`)}</h3>
        <p className="bg-zinc-700 py-1 px-2 rounded-md text-sm">{t(`servers.${translationKey}.date`)}</p>
      </div>
      <p className="text-gray-300 mt-2 max-w-4xl">{t(`servers.${translationKey}.description`)}</p>
    </div>
  );

  const imageContent = (
    <div className={`flex flex-col items-center justify-center ${imageFirst ? 'order-1 lg:order-none' : ''}`}>
      <div className="w-[300px] h-[225px] sm:w-[450px] sm:h-[300px] mt-4 lg:mt-0 flex-shrink-0">
        <Stack
          randomRotation
          sensitivity={170}
          sendToBackOnClick={true}
          cards={images.map((src, i) => (
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
          autoplayDelay={autoplayDelay}
          pauseOnHover
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative flex flex-col lg:flex-row`}>
        {imageFirst ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  );
}

const servers = [
  {
    translationKey: 'nelsonSMPv1',
    images: Array.from({ length: 5 }, (_, i) => `/assets/images/minecraft/smpv1/${i + 1}.png`),
    autoplayDelay: 3000,
    imageFirst: false,
  },
  {
    translationKey: 'nelsonSMPv2',
    images: Array.from({ length: 7 }, (_, i) => `/assets/images/minecraft/smpv2/${i + 1}.png`),
    autoplayDelay: 2800,
    imageFirst: true,
  },
  {
    translationKey: 'MLGRush',
    images: Array.from({ length: 2 }, (_, i) => `/assets/images/minecraft/mlgrush/${i + 1}.png`),
    autoplayDelay: 3200,
    imageFirst: false,
  },
];

export default function Minecraft() {
  const t = useTranslations('projects.minecraft');

  return (
    <>
      <div className="pt-8 p-2 md:p-16 space-y-12">
        <h2 className="text-3xl font-bold text-white mb-4">{t('serversIHosted')}</h2>
        <p className="text-gray-300 mb-6">{t('servverDescription')}</p>

        <div className="space-y-8">
          {servers.map((server) => (
            <ServerCard
              key={server.translationKey}
              translationKey={server.translationKey}
              images={server.images}
              autoplayDelay={server.autoplayDelay}
              imageFirst={server.imageFirst}
              t={t}
            />
          ))}
        </div>
      </div>
    </>
  )
}