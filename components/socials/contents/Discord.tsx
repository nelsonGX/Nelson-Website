import { Clock, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord, FaSpotify } from "react-icons/fa";
import Image from "next/image";
import { LanyardResponse, LanyardData } from "../types";

function getStatusColor(status: string) {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'idle': return 'bg-yellow-500';
    case 'dnd': return 'bg-red-500';
    default: return 'bg-zinc-500';
  }
}

function getActivityDuration(startTimestamp?: number) {
  if (!startTimestamp) return '';
  const duration = Date.now() - startTimestamp;
  const minutes = Math.floor(duration / 60000);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

function DefaultDiscordContent() {
  return (
    <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
      <div className="flex items-center mb-4">
        <div className="relative">
          <div className="size-12 rounded-full mr-3 border-2 border-violet-700 bg-zinc-800 flex items-center justify-center">
            <FaDiscord className="text-violet-500" size={24} />
          </div>
          <div className="absolute bottom-0 right-0 size-4 rounded-full bg-zinc-500 border-2 border-violet-900"></div>
        </div>
        <div>
          <p className="font-semibold text-white">nelsongx</p>
          <p className="text-xs text-zinc-300">@nelsongx</p>
        </div>
      </div>

      <div className="bg-violet-800 rounded-lg p-3 mb-4">
        <div className="flex items-center">
          <span className="mr-2" role="img" aria-label="emoji">👋</span>
          <p className="text-sm text-zinc-200">Loading status…</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase text-zinc-400 font-semibold">Activities</p>
        <div className="bg-zinc-800 rounded-lg p-3">
          <div className="flex items-center">
            <Gamepad2 size={18} className="text-violet-400 mr-2" />
            <p className="font-medium text-white text-sm">Loading activity…</p>
          </div>
          <div className="flex items-center text-xs text-zinc-400 mt-2">
            <Clock size={14} className="mr-1" />
            <span>--m</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-center text-zinc-500">Connecting to Discord…</div>

      <div className="mt-4 flex justify-center">
        <div className="size-8 rounded-full border-t-2 border-violet-500 animate-spin"></div>
      </div>
    </div>
  );
}

interface DiscordProfileProps {
  userData: LanyardData | null;
  error: string | null;
  loading: boolean;
  lastUpdated: string;
}

function DiscordProfile({ userData, error, loading, lastUpdated }: DiscordProfileProps) {
  if (loading) return <DefaultDiscordContent />;

  if (error || !userData) {
    return (
      <div className="flex-1 bg-violet-900 p-4">
        <div className="bg-red-600 text-white p-3 rounded-lg">
          {error || 'Failed to load Discord data'}
        </div>
        <div className="flex items-center mb-4 mt-4">
          <div className="size-10 rounded-full bg-violet-700 flex items-center justify-center mr-3">
            <FaDiscord size={24} />
          </div>
          <div>
            <p className="font-semibold text-white">Username: nelsongx</p>
            <p className="text-xs text-zinc-300">Status unknown</p>
          </div>
        </div>
      </div>
    );
  }

  const { discord_user, activities, discord_status, listening_to_spotify, spotify } = userData;
  const avatarUrl = discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.webp?size=128`
    : 'https://cdn.discordapp.com/embed/avatars/0.webp';

  const nonCustomActivities = activities.filter(activity => activity.type !== 4);
  const customStatus = activities.find(activity => activity.type === 4);

  return (
    <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
      <div className="flex items-center mb-4">
        <div className="relative">
          <Image
            src={avatarUrl}
            alt="Discord Avatar"
            className="size-12 rounded-full mr-3 border-2 border-violet-700"
            width={48}
            height={48}
          />
          <div className={`absolute bottom-0 right-0 size-4 rounded-full ${getStatusColor(discord_status)} border-2 border-violet-900`}></div>
        </div>
        <div>
          <p className="font-semibold text-white">{discord_user.display_name || discord_user.global_name || discord_user.username}</p>
          <p className="text-xs text-zinc-300">@{discord_user.username}</p>
        </div>
      </div>

      {customStatus && (
        <div className="bg-violet-800 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            {customStatus.emoji && (
              <span className="mr-2" role="img" aria-label={customStatus.emoji.name}>
                {customStatus.emoji.id ?
                  <Image
                    src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`}
                    alt={customStatus.emoji.name}
                    className="size-5 inline-block"
                    width={20}
                    height={20}
                  /> :
                  customStatus.emoji.name
                }
              </span>
            )}
            <p className="text-sm text-zinc-200">{customStatus.state || "Custom Status"}</p>
          </div>
        </div>
      )}

      {listening_to_spotify && spotify && (
        <div className="bg-green-800 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <FaSpotify size={20} className="text-green-400 mr-2" />
            <div>
              <p className="font-medium text-white text-sm">{spotify.song}</p>
              <p className="text-xs text-zinc-300">by {spotify.artist}</p>
              <p className="text-xs text-zinc-400">on {spotify.album}</p>
            </div>
          </div>
        </div>
      )}

      {nonCustomActivities.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase text-zinc-400 font-semibold">Activities</p>
          {nonCustomActivities.map((activity) => (
            <div key={activity.id} className="bg-zinc-800 rounded-lg p-3">
              <div className="flex items-center">
                <Gamepad2 size={18} className="text-violet-400 mr-2" />
                <p className="font-medium text-white text-sm">{activity.name}</p>
              </div>
              {activity.state && (
                <p className="text-xs text-zinc-300 mt-1">{activity.state}</p>
              )}
              {activity.timestamps?.start && (
                <div className="flex items-center text-xs text-zinc-400 mt-2">
                  <Clock size={14} className="mr-1" />
                  <span>{getActivityDuration(activity.timestamps.start)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-xs text-center text-zinc-500">
        {lastUpdated && `Last updated: ${lastUpdated}`}
      </div>
    </div>
  );
}

export default function DiscordContent() {
  const [userData, setUserData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.lanyard.rest/v1/users/490731820552290324');
        const data: LanyardResponse = await response.json();

        if (data.success) {
          setUserData(data.data);
        } else {
          setError('Failed to load user data');
        }
      } catch (err) {
        setError('Error fetching user data');
        console.error(err);
      } finally {
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return <DiscordProfile userData={userData} error={error} loading={loading} lastUpdated={lastUpdated} />;
}
