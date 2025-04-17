import { Clock, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord, FaSpotify } from "react-icons/fa";
import Image from "next/image";

interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

interface LanyardData {
  discord_user: DiscordUser;
  activities: Activity[];
  discord_status: "online" | "idle" | "dnd" | "offline";
  listening_to_spotify: boolean;
  spotify: SpotifyData | null;
}

interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  global_name: string;
  display_name: string;
}

interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  emoji?: {
    id: string;
    name: string;
    animated: boolean;
  };
  timestamps?: {
    start?: number;
    end?: number;
  };
  application_id?: string;
  details?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
  };
}

interface SpotifyData {
  album_art_url: string;
  album: string;
  artist: string;
  song: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export default function DiscordContent() {
  const [userData, setUserData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchUserData();
    
    // Set up polling to refresh data every 30 seconds
    const intervalId = setInterval(fetchUserData, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getActivityDuration = (startTimestamp?: number) => {
    if (!startTimestamp) return '';
    
    const now = Date.now();
    const duration = now - startTimestamp;
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  function renderDiscordContent() {
    if (loading) {
      return (
        <div className="flex-1 bg-zinc-900 flex items-center justify-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      );
    }

    if (error || !userData) {
      return (
        <div className="flex-1 bg-indigo-900 p-4">
          <div className="bg-red-600 text-white p-3 rounded-lg">
            {error || 'Failed to load Discord data'}
          </div>
          <div className="flex items-center mb-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
              <FaDiscord size={24} />
            </div>
            <div>
              <p className="font-semibold text-white">Username: nelsongx</p>
              <p className="text-xs text-gray-300">Status unknown</p>
            </div>
          </div>
        </div>
      );
    }

    const { discord_user, activities, discord_status, listening_to_spotify, spotify } = userData;
    const avatarUrl = discord_user.avatar 
      ? `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=128` 
      : 'https://cdn.discordapp.com/embed/avatars/0.png';

    const nonCustomActivities = activities.filter(activity => activity.type !== 4);
    const customStatus = activities.find(activity => activity.type === 4);

    return (
      <div className="flex-1 bg-zinc-900 p-4 overflow-y-auto">
        <div className="flex items-center mb-4">
          <div className="relative">
            <Image 
              src={avatarUrl} 
              alt="Discord Avatar" 
              className="w-12 h-12 rounded-full mr-3 border-2 border-indigo-700"
              width={48}
              height={48}
            />
            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full ${getStatusColor(discord_status)} border-2 border-indigo-900`}></div>
          </div>
          <div>
            <p className="font-semibold text-white">{discord_user.display_name || discord_user.global_name || discord_user.username}</p>
            <p className="text-xs text-gray-300">@{discord_user.username}</p>
          </div>
        </div>

        {customStatus && (
          <div className="bg-indigo-800 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              {customStatus.emoji && (
                <span className="mr-2" role="img" aria-label={customStatus.emoji.name}>
                  {customStatus.emoji.id ? 
                    <Image 
                      src={`https://cdn.discordapp.com/emojis/${customStatus.emoji.id}.${customStatus.emoji.animated ? 'gif' : 'png'}`} 
                      alt={customStatus.emoji.name}
                      className="w-5 h-5 inline-block"
                      width={20}
                      height={20}
                    /> : 
                    customStatus.emoji.name
                  }
                </span>
              )}
              <p className="text-sm text-gray-200">{customStatus.state || "Custom Status"}</p>
            </div>
          </div>
        )}

        {listening_to_spotify && spotify && (
          <div className="bg-green-800 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <FaSpotify size={20} className="text-green-400 mr-2" />
              <div>
                <p className="font-medium text-white text-sm">{spotify.song}</p>
                <p className="text-xs text-gray-300">by {spotify.artist}</p>
                <p className="text-xs text-gray-400">on {spotify.album}</p>
              </div>
            </div>
          </div>
        )}

        {nonCustomActivities.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs uppercase text-gray-400 font-semibold">Activities</p>
            {nonCustomActivities.map((activity) => (
              <div key={activity.id} className="bg-zinc-800 rounded-lg p-3">
                <div className="flex items-center">
                  <Gamepad2 size={18} className="text-indigo-400 mr-2" />
                  <p className="font-medium text-white text-sm">{activity.name}</p>
                </div>
                {activity.state && (
                  <p className="text-xs text-gray-300 mt-1">{activity.state}</p>
                )}
                {activity.timestamps?.start && (
                  <div className="flex items-center text-xs text-gray-400 mt-2">
                    <Clock size={14} className="mr-1" />
                    <span>{getActivityDuration(activity.timestamps.start)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-xs text-center text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <>
      {renderDiscordContent()}
    </>
  );
}