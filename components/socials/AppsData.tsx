import { FaEnvelope, FaDiscord, FaTelegram, FaTwitter, FaGithub, FaInstagram, FaFacebook, FaReddit, FaSlack, FaTwitch, FaYoutube, FaPhone, FaSafari, FaComment, FaMusic } from 'react-icons/fa';
import { App } from './types';

export const apps: App[] = [
  { name: 'Email', color: 'bg-zinc-700', icon: <FaEnvelope size={32} />, content: "hi@nelsongx.com", link: "mailto:hi@nelsongx.com" },
  { name: 'Discord', color: 'bg-indigo-500', icon: <FaDiscord size={40} />, content: "nelsongx", link: "https://discord.com/users/490731820552290324" },
  { name: 'Telegram', color: 'bg-blue-500', icon: <FaTelegram size={40} />, content: "@nelsonGX", link: "https://t.me/nelsongx" },
  { name: 'Twitter (X)', color: 'bg-blue-400', icon: <FaTwitter size={36} />, content: "@nelsonGX_com", link: "https://twitter.com/nelsonGX_com" },
  { name: 'Github', color: 'bg-zinc-800', icon: <FaGithub size={36} />, content: "nelsonGX", link: "https://github.com/nelsonGX" },
  { name: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaInstagram size={40} />, content: "@nelsongxliketoplayminecraft", link: "https://instagram.com/nelsongxliketoplayminecraft" },
  { name: 'YouTube', color: 'bg-red-600', icon: <FaYoutube size={36} />, content: "@nelsonGX", link: "https://youtube.com/@nelsonGX" },
  { name: 'Reddit', color: 'bg-orange-600', icon: <FaReddit size={36} />, content: "u/nelsonGX", link: "https://reddit.com/user/nelsonGX" },
  { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebook size={36} />, content: "Nelson Lin", link: "https://www.facebook.com/nelson.lin.52438" },
  { name: 'Slack', color: 'bg-purple-600', icon: <FaSlack size={36} />, content: "@nelsonGX", link: "https://slack.com" },
  { name: 'Twitch', color: 'bg-purple-700', icon: <FaTwitch size={36} />, content: "nelsonGX_", link: "https://twitch.tv/nelsonGX_" },
];

export const dockApps: App[] = [
  { name: 'Phone', color: 'bg-green-500', icon: <FaPhone size={32} className="rotate-90" /> },
  { name: 'Safari', color: 'bg-white', icon: <FaSafari size={40} className="text-blue-400" /> },
  { name: 'Message', color: 'bg-green-500', icon: <FaComment size={32} /> },
  { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaMusic size={32}/> },
];
