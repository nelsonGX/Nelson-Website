// Static stand-ins for a web SSH gateway, used by components/ui/TerminalComponent.tsx.
// The site is a static export, so these are rendered once at build time and served as
// plain files; the terminal calls them so its traffic shows up in the network tab.

export const dynamic = 'force-static';

const responses: Record<string, object> = {
  session: {
    status: 'ok',
    host: 'nelsongx.com',
    port: 22,
    proto: 'ssh-2.0',
    kex: 'sntrup761x25519-sha512@openssh.com',
    hostkey: 'ssh-ed25519',
    cipher: 'chacha20-poly1305@openssh.com',
    keepalive: 5,
  },
  exec: { status: 'ok', channel: 0 },
  ping: { status: 'ok', pong: true },
  close: { status: 'ok', reason: 'client_disconnect' },
};

export function generateStaticParams() {
  return Object.keys(responses).map((action) => ({ action }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  return Response.json(responses[action] ?? { status: 'error' });
}
