import {useTranslations} from 'next-intl';

const EventsData = () => {
  const t = useTranslations('eventData');
  
  const events: Record<string, string[]> = {
    "2026": [
      t("2026.sitcon"),
    ],
    "2025": [
      t("2025.sitcon"),
      t("2025.cybersec"),
      t("2025.twnog"),
      t("2025.computex"),
      t("2025.nvidiaKeynote"),
      t("2025.sitconCamp"),
      t("2025.coscup")
    ],
    "2024": [
      t("2024.hitconCtf"),
      t("2024.hitconCmt"),
      t("2024.coscup"),
      t("2024.sitconBof"),
      t("2024.sitconCamp"),
      t("2024.sitcon"),
      t("2024.g0vSummit"),
      t("2024.nvidiaKeynote"),
      t("2024.computex"),
      t("2024.cybersec")
    ],
    "2023": [
      t("2023.coscup"),
      t("2023.sitconBof"),
      t("2023.gamforce"),
      t("2023.g0vHackathon")
    ],
    "2022": [
      t("2022.coscup"),
      t("2022.taiwanAiExpo")
    ]
  };

  return events;
};

export default EventsData;