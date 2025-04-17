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
