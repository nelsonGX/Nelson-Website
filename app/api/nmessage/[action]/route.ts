// Static stand-ins for an iMessage-style relay, used by components/socials/contents/DockMessageContent.tsx.
// The site is a static export, so these are rendered once at build time and served as
// plain files; the chat calls them so its traffic shows up in the network tab.

export const dynamic = 'force-static';

const responses: Record<string, object> = {
  send: { status: 'ok', delivered: true, service: 'nMessage', encryption: 'e2ee' },
  typing: { status: 'ok', typing: true, from: 'nelson' },
  receive: { status: 'ok', from: 'nelson', read: true },
};

export function generateStaticParams() {
  return Object.keys(responses).map((action) => ({ action }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  return Response.json(responses[action] ?? { status: 'error' });
}
