import { FaEnvelope, FaDiscord, FaTelegram, FaTwitter, FaGithub, FaInstagram, FaFacebook, FaReddit, FaTwitch, FaYoutube, FaPhone, FaSafari, FaComment, FaMusic } from 'react-icons/fa';
import { App } from './types';

export const apps: App[] = [
  { name: 'Email', color: 'bg-zinc-700', icon: <FaEnvelope size={32} className="text-white" />, content: "hi@nelsongx.com", link: "mailto:hi@nelsongx.com" },
  { name: 'Discord', color: 'bg-indigo-500', icon: <FaDiscord size={40} className="text-white" />, content: "nelsongx", link: "https://discord.com/users/490731820552290324" },
  { name: 'Telegram', color: 'bg-blue-500', icon: <FaTelegram size={40} className="text-white" />, content: "@nelsonGX", link: "https://t.me/nelsongx" },
  { name: 'Twitter (X)', color: 'bg-blue-400', icon: <FaTwitter size={36} className="text-white" />, content: "@nelsonGX_com", link: "https://twitter.com/nelsonGX_com" },
  { name: 'Github', color: 'bg-zinc-800', icon: <FaGithub size={36} className="text-white" />, content: "nelsonGX", link: "https://github.com/nelsonGX" },
  { name: 'Instagram', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaInstagram size={40} className="text-white" />, content: "@nelsongxliketoplayminecraft", link: "https://instagram.com/nelsongxliketoplayminecraft" },
  { name: 'YouTube', color: 'bg-red-600', icon: <FaYoutube size={36} className="text-white" />, content: "@nelsonGX", link: "https://youtube.com/@nelsonGX" },
  { name: 'Reddit', color: 'bg-orange-600', icon: <FaReddit size={36} className="text-white" />, content: "u/nelsonGX", link: "https://reddit.com/user/nelsonGX" },
  { name: 'Facebook', color: 'bg-blue-600', icon: <FaFacebook size={36} className="text-white" />, content: "Nelson Lin", link: "https://www.facebook.com/nelson.lin.52438" },
  { name: 'Slack', color: 'bg-white', icon: <svg viewBox="0 0 24 24" width="36" height="36"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E23A3A" /><path   d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"   fill="#2B72CB" /><path   d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"   fill="#37A245" /><path   d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#F3B73E" /></svg>, content: "hi@nelsongx.com", link: "https://join.slack.com/shareDM/zt-33q5lekhj-8X5KcL9VTO1HVbkRDeJUog" },
  { name: 'Twitch', color: 'bg-purple-700', icon: <FaTwitch size={36} className="text-white" />, content: "nelsonGX_", link: "https://twitch.tv/nelsonGX_" },
];

export const dockApps: App[] = [
  { name: 'Phone', color: 'bg-green-500', icon: <FaPhone size={32} className="rotate-90 text-white" /> },
  { name: 'Safari', color: 'bg-white', icon: <FaSafari size={40} className="text-blue-400" /> },
  { name: 'Message', color: 'bg-green-500', icon: <FaComment size={32} className="text-white" /> },
  { name: 'Music', color: 'bg-gradient-to-br from-pink-500 to-purple-500', icon: <FaMusic size={32} className="text-white"/> },
];
