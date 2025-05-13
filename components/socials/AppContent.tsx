import React, { memo } from 'react';
import { App } from './types';

import DiscordContent from './contents/Discord';
import FriendlySiteContent from './contents/FriendlySites';
import { MusicContent, MessageContent, PhoneContent } from './contents/DockContents';
import ViewMyButton from './ViewMyButton';

interface AppContentProps {
  app: App;
}

function getAppContent(appName: string) {
  switch (appName) {
    case 'Discord':
      return <DiscordContent />;
    case 'Safari':
      return <FriendlySiteContent />;
    case 'Music':
      return <MusicContent />;
    case 'Phone':
      return <PhoneContent />;
    case 'Message':
      return <MessageContent />;
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
        <div className={`${app.color} ${app.name === "Slack" ? "text-zinc-800" : "text-white"} p-4 flex justify-between items-center`}>
          <h3 className="text-lg font-semibold">{app.name}</h3>
        </div>
        <div className="flex-1 bg-zinc-900 p-4 flex flex-col items-center justify-center pb-8">
          <div className="w-20 h-20 flex items-center justify-center">
            {app.icon}
          </div>
          <div className="text-center mb-6">
            <p className={`font-semibold text-white text-xl`}>{app.name}</p>
            <p className="text-sm text-gray-300">{app.content}</p>
          </div>
          <ViewMyButton name={app.name} link={app.link} bgColor={app.name === "Slack" ? "bg-zinc-500" : app.color} />
        </div>
      </div>
    );
  }
};

export const AppContent = memo(AppContentComponent);