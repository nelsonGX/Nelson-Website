import React, { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { App } from './types';
import Link from 'next/link';

import DiscordContent from './contents/Discord';
import FriendlySiteContent from './contents/FriendlySites';
import { MusicContent } from './contents/DockContents';

interface AppContentProps {
  app: App;
}

function getAppContent(appName: string) {
  switch (appName) {
    case 'Discord':
      return <DiscordContent />;
    case 'Friendly Sites':
      return <FriendlySiteContent />;
    case 'Music':
      return <MusicContent />;
    default:
      return null;
  }
}

const AppContentComponent = ({ app }: AppContentProps) => {
  const appContent = getAppContent(app.name);

  if (appContent) {
    return (
      <div className="flex flex-col h-full">
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{app.name}</h3>
        </div>
        {appContent}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col h-full">
        <div className={`${app.color} text-white p-4 flex justify-between items-center`}>
          <h3 className="text-lg font-semibold">{app.name}</h3>
        </div>
        <div className="flex-1 bg-zinc-900 p-4 flex flex-col items-center justify-center pb-8">
          <div className="w-20 h-20 flex items-center justify-center">
            {app.icon}
          </div>
          <p className="font-semibold text-white text-xl">{app.name}</p>
          <p className="text-sm text-gray-300">{app.content}</p>
          {app.link && (
            <Link href={app.link} target="_blank"
              className="flex mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              View My {app.name} &nbsp; <ExternalLink />
            </Link>
          )}
        </div>
      </div>
    );
  }
};

export const AppContent = memo(AppContentComponent);