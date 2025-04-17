import { ReactNode } from 'react';

export interface App {
  name: string;
  color: string;
  icon: ReactNode;
  content?: string;
  link?: string;
}

export interface AppRef {
  app: App;
  rect?: DOMRect;
  x: number;
  y: number;
  width: number;
  height: number;
  containerWidth: number;
  containerHeight: number;
}

export interface LanyardResponse {
  data: LanyardData;
  success: boolean;
}

export interface LanyardData {
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