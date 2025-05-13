import { useTranslations } from 'next-intl';

export default function Minecraft() {
  const t = useTranslations('home.projects.windows.minecraft');
  
  return (
    <>
      <div className="space-y-4">
        {t('content')}
      </div>
    </>
  )
}