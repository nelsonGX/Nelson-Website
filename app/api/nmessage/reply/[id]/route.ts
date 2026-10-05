// Static "nMessage relay" reply bodies, one file per entry in allReplies, prebuilt at build time.
// DockMessageContent picks a reply id locally and fetches its text from here.

import { allReplies } from '@/components/socials/contents/GenerateSmartReply';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return allReplies.map((_, id) => ({ id: String(id) }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const text = allReplies[Number(id)];
  if (text === undefined) return Response.json({ status: 'error' });
  return Response.json({ status: 'ok', id: Number(id), from: 'nelson', text });
}
