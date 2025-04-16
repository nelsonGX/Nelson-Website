import { FaEnvelope, FaDiscord, FaTelegram, FaTwitter, FaGithub, FaInstagram, FaFacebook, FaReddit, FaSlack, FaTwitch, FaYoutube } from 'react-icons/fa';
import { App, DockApp } from './types';

export const apps: App[] = [
  { name: 'Email', color: 'bg-zinc-700', icon: <FaEnvelope size={32} />, content: "hi@nelsongx.com", link: "mailto:hi@nelsongx.com" },
  { name: 'Discord', color: 'bg-indigo-500', icon: <FaDiscord size={40} />, content: "nelsongx", link: "https://discord.com/users/490731820552290324" },
  { name: 'Telegram', color: 'bg-blue-500', icon: <FaTelegram size={40} />, content: "@nelsonGX", link: "https://t.me/nelsongx" },
  { name: 'Twitter (X)', color: 'bg-blue-400', icon: <FaTwitter size={36} />, content: "@nelsonGX", link: "https://twitter.com/nelsonGX" },
  { name: 'Github', color: 'bg-zinc-800', icon: <FaGithub size={36} />, content: "nelsonGX", link: "https://github.com/nelsonGX" },
  { name: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaInstagram size={40} />, content: "@nelsonGX", link: "https://instagram.com/nelsonGX" },
  { name: 'YouTube', color: 'bg-red-600', icon: <FaYoutube size={36} />, content: "@nelsonGX", link: "https://youtube.com/@nelsonGX" },
  { name: 'Reddit', color: 'bg-orange-600', icon: <FaReddit size={36} />, content: "u/nelsonGX", link: "https://reddit.com/user/nelsonGX" },
  { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebook size={36} />, content: "nelsonGX", link: "https://facebook.com/nelsonGX" },
  { name: 'Slack', color: 'bg-purple-600', icon: <FaSlack size={36} />, content: "@nelsonGX", link: "https://slack.com" },
  { name: 'Twitch', color: 'bg-purple-700', icon: <FaTwitch size={36} />, content: "nelsonGX", link: "https://twitch.tv/nelsonGX" },
];

export const dockApps: DockApp[] = [
  { name: 'Phone', color: 'bg-green-500', icon: '📞' },
  { name: 'Safari', color: 'bg-blue-500', icon: '🧭' },
  { name: 'Mail', color: 'bg-blue-400', icon: '✉️' },
  { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: '🎵' },
];
