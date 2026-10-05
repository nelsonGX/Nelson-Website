import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Virtual filesystem                                                  */
/* ------------------------------------------------------------------ */

type FsNode = { type: 'file'; content: string } | { type: 'dir'; children: Record<string, FsNode> };

const file = (content: string): FsNode => ({ type: 'file', content });
const dir = (children: Record<string, FsNode>): FsNode => ({ type: 'dir', children });

const USER = 'nelson';
const HOST = 'nelsongx';
const HOME = '/home/nelson';

const LINKS: Record<string, string> = {
  cheapserver: 'https://cheapserver.tw',
  freeserver: 'https://freeserver.tw',
  'freeserver-network': 'https://freeserver.network',
  github: 'https://github.com/nelsongx',
  email: 'mailto:hi@nelsongx.com',
};

const ROOT = dir({
  home: dir({
    nelson: dir({
      'about.txt': file(
        "Hello! My name is Nelson, aka nelsonGX. I'm a student from Taiwan, and I have a passion for anything computer related.\n\n" +
        'I currently own Very Fast Network LTD, a company based in Taiwan that operates CheapServer hosting services under AS152619. ' +
        'Alongside this main business, I run FreeServer, a free hosting service community. I also manage a Minecraft server called ' +
        'FreeServer Network, which focuses on map sharing for creators.\n\n' +
        "I'm actively involved in tech communities, attending conferences like SITCON, HITCON, and COSCUP to learn and network with fellow enthusiasts."
      ),
      'contact.txt': file('Email:   hi@nelsongx.com\nGitHub:  https://github.com/nelsongx\nDiscord: @nelsongx'),
      'skills.txt': file(
        'Python          Pretty confident\nJava            I do minecraft plugins\nJavaScript      Not bad\nNext.JS         Pretty confident\n' +
        "React           It's just inside nextjs\nMongoDB         I use it\nLinux           I can read commands\nNetworking      Not bad\nInfrastructure  Not bad"
      ),
      projects: dir({
        'cheapserver.md': file('# CheapServer (2022 - now)\nA hosting service for game servers based in Taiwan.\nhttps://cheapserver.tw'),
        'freeserver.md': file('# FreeServer v3 (2023 - now)\nA free hosting service community.\nhttps://freeserver.tw'),
        'freeserver-network.md': file('# FreeServer Network (2024 - now)\nA Minecraft server focusing on map sharing for creators.\nhttps://freeserver.network'),
      }),
      '.secret': file('You found it! 🎉\nThere is no secret. But thanks for poking around.'),
      '.bashrc': file('alias ll="ls -la"\nalias github="open github"\nexport PS1="\\u@\\h:\\w\\$ "'),
    }),
  }),
  etc: dir({
    hostname: file('nelsongx.com'),
    'os-release': file('NAME="Nelson Linux"\nVERSION="1.0 LTS"\nID=nelson\nPRETTY_NAME="Nelson Linux 1.0 LTS"\nHOME_URL="https://nelsongx.com"'),
    motd: file('Be nice. Have fun.'),
  }),
  bin: dir({}),
  tmp: dir({}),
});

const normalize = (cwd: string, path: string) => {
  const expanded = path === '~' || path.startsWith('~/') ? HOME + path.slice(1) : path;
  const parts = (expanded.startsWith('/') ? expanded : `${cwd}/${expanded}`).split('/');
  const stack: string[] = [];
  for (const part of parts) {
    if (part === '' || part === '.') continue;
    if (part === '..') stack.pop();
    else stack.push(part);
  }
  return '/' + stack.join('/');
};

const getNode = (abs: string): FsNode | null => {
  let node: FsNode = ROOT;
  for (const part of abs.split('/').filter(Boolean)) {
    if (node.type !== 'dir' || !(part in node.children)) return null;
    node = node.children[part];
  }
  return node;
};

const displayPath = (abs: string) => (abs === HOME ? '~' : abs.startsWith(HOME + '/') ? '~' + abs.slice(HOME.length) : abs);

const tokenize = (s: string) =>
  (s.match(/"[^"]*"|'[^']*'|\S+/g) ?? []).map((t) => t.replace(/^(["'])(.*)\1$/, '$2'));

/* ------------------------------------------------------------------ */
/* Presentational helpers                                              */
/* ------------------------------------------------------------------ */

const LINK_RE = /(https?:\/\/[^\s]+|[\w.-]+@[\w-]+\.[\w.]+)/g;

const Linkify = ({ text }: { text: string }) => (
  <>
    {text.split(LINK_RE).map((part, i) =>
      i % 2 === 1 ? (
        <a
          key={i}
          href={part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:decoration-sky-300"
        >
          {part}
        </a>
      ) : (
        part
      )
    )}
  </>
);

const Prompt = ({ cwd }: { cwd: string }) => (
  <span className="shrink-0">
    <span className="font-semibold text-emerald-400">{USER}@{HOST}</span>
    <span className="text-zinc-500">:</span>
    <span className="font-semibold text-sky-400">{displayPath(cwd)}</span>
    <span className="text-zinc-500">$ </span>
  </span>
);

const Err = ({ children }: { children: React.ReactNode }) => <span className="text-red-400">{children}</span>;
const Dim = ({ children }: { children: React.ReactNode }) => <span className="text-zinc-500">{children}</span>;

const BANNER = String.raw`
 _   _      _                    ______  __
| \ | | ___| |___  ___  _ __    / ___\ \/ /
|  \| |/ _ \ / __|/ _ \| '_ \  | |  _ \  /
| |\  |  __/ \__ \ (_) | | | | | |_| |/  \
|_| \_|\___|_|___/\___/|_| |_|  \____/_/\_\
`.slice(1);

const LOGO = String.raw`
 ███╗   ██╗
 ████╗  ██║
 ██╔██╗ ██║
 ██║╚██╗██║
 ██║ ╚████║
 ╚═╝  ╚═══╝
`.slice(1);

const COMMANDS: Record<string, string> = {
  help: 'show this help',
  ls: 'list directory contents  [-a] [-l]',
  cd: 'change directory',
  pwd: 'print working directory',
  cat: 'print file contents',
  tree: 'show directory tree',
  open: 'open a link  (github, cheapserver, ...)',
  neofetch: 'system info, but cooler',
  whoami: 'print current user',
  who: 'show who is logged on',
  history: 'show command history',
  echo: 'print text',
  date: 'print current date',
  uname: 'print system info  [-a]',
  uptime: 'how long the system has been up',
  ping: 'ping a host  (Ctrl+C to stop)',
  cowsay: 'a talking cow',
  sl: 'choo choo',
  sudo: 'run as root (good luck)',
  clear: 'clear the screen  (Ctrl+L)',
  exit: 'log out (back to GUI mode)',
};
const ALIASES: Record<string, string> = {
  about: 'cat ~/about.txt',
  contact: 'cat ~/contact.txt',
  skills: 'cat ~/skills.txt',
  projects: 'ls ~/projects',
  ll: 'ls -la',
  dir: 'ls',
  gui: 'exit',
  logout: 'exit',
  github: 'open github',
};
const COMMAND_NAMES = [...Object.keys(COMMANDS), ...Object.keys(ALIASES)].sort();

/* ------------------------------------------------------------------ */
/* Terminal                                                            */
/* ------------------------------------------------------------------ */

type Line = { id: number; node: React.ReactNode };
type Pending = { kind: 'sudo'; args: string[] } | null;

interface TerminalProps {
  onExit?: () => void;
}

const formatDate = (d: Date) =>
  d.toLocaleString('en-US', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'UTC',
  }) + ' UTC';

const welcome = (lastLogin: Date, from: string) => (
  <div className="pb-2 pt-1">
    <div className="text-zinc-400">Welcome to Nelson Linux 1.0 LTS (GNU/Linux 6.9.8-generic x86_64)</div>
    <pre className="my-3 overflow-x-auto text-[10px] leading-tight text-orange-300 sm:text-xs">{BANNER}</pre>
    <div className="text-zinc-500">
      {'  '}System information as of {formatDate(new Date())}
      {'\n\n'}
      {'  '}Usage of /:   69.0% of 2GB      IPv4 address for eth0: {SERVER_IP}{'\n'}
      {'  '}Memory usage: 69%               Temperature:           69.0 C
    </div>
    <div className="mt-3 text-zinc-400">Last login: {formatDate(lastLogin)} from {from}</div>
    <div>
      Type <span className="text-orange-300">help</span> to see available commands. <Dim>Tab completes, ↑/↓ browse history.</Dim>
    </div>
  </div>
);

const SERVER_IP = '203.0.113.69';
const jitter = (min: number, max: number) => min + Math.random() * (max - min);
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const randomHex = (bytes: number) =>
  Array.from(crypto.getRandomValues(new Uint8Array(bytes)), (b) => b.toString(16).padStart(2, '0')).join('');

// Calls the static stand-in "SSH gateway" (app/api/term/[action]/route.ts) so the session
// shows real traffic in the network tab. Resolves with the round trip in ms, or null on failure.
const gateway = async (action: string, query: Record<string, string | number>) => {
  const t0 = performance.now();
  try {
    const params = new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)]));
    const res = await fetch(`/api/term/${action}?${params}`, { cache: 'no-store', keepalive: action === 'close' });
    await res.arrayBuffer();
    return res.ok ? performance.now() - t0 : null;
  } catch {
    return null;
  }
};

type Phase = 'connecting' | 'ready' | 'closed';

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
  const nextId = useRef(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [cwd, setCwd] = useState(HOME);
  const [input, setInput] = useState('');
  const [caret, setCaret] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [focused, setFocused] = useState(false);
  const [pending, setPending] = useState<Pending>(null);
  const [running, setRunning] = useState(false);

  // Fake SSH session
  const [phase, setPhase] = useState<Phase>('connecting');
  const [busy, setBusy] = useState(false); // waiting on the "server" to answer
  const [view, setView] = useState({ text: '', caret: 0 }); // what the server has echoed back so far
  const [rtt, setRtt] = useState(48);
  const [session] = useState(() => ({
    sid: randomHex(8),
    clientIp: `198.51.100.${Math.floor(jitter(2, 250))}`,
    lastLogin: new Date(Date.now() - jitter(2, 72) * 3_600_000),
  }));

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const jobRef = useRef<{ stop: () => void } | null>(null);
  // Mirrors `cwd` synchronously so chained commands (`cd x && ls`) see the update.
  const cwdRef = useRef(HOME);
  const baseRtt = useRef(48);
  const lastDelivery = useRef(0);
  const timers = useRef(new Set<number>());
  const seq = useRef(0);
  const connected = useRef(false);

  const print = useCallback(
    (...nodes: React.ReactNode[]) =>
      setLines((prev) => [...prev, ...nodes.map((node) => ({ id: nextId.current++, node }))]),
    []
  );

  // Runs `fn` after a simulated network round trip. Deliveries never overtake each
  // other (like a TCP stream), so a lag spike stalls everything queued behind it.
  const remote = useCallback((fn: () => void, extra = 0) => {
    const spike = Math.random() < 0.04;
    const latency = (spike ? jitter(400, 1100) : baseRtt.current * jitter(0.7, 1.4)) + extra;
    if (spike) setRtt(Math.round(latency));
    const now = performance.now();
    const at = Math.max(lastDelivery.current, now + latency);
    lastDelivery.current = at;
    const t = window.setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, at - now);
    timers.current.add(t);
  }, []);

  useEffect(() => {
    const pendingTimers = timers.current;
    inputRef.current?.focus({ preventScroll: true });
    return () => {
      jobRef.current?.stop();
      pendingTimers.forEach(clearTimeout);
    };
  }, []);

  const send = useCallback(
    (action: string, query: Record<string, string | number> = {}) =>
      gateway(action, { sid: session.sid, seq: ++seq.current, ...query }),
    [session.sid]
  );

  // Fake connection handshake: wait for the session request and a believable delay.
  useEffect(() => {
    let cancelled = false;
    Promise.all([send('session', { host: `${HOST}.com`, port: 22 }), sleep(jitter(1400, 2400))]).then(() => {
      if (cancelled) return;
      connected.current = true;
      print(welcome(session.lastLogin, session.clientIp));
      setPhase('ready');
    });
    return () => {
      cancelled = true;
      if (connected.current) {
        connected.current = false;
        send('close');
      }
    };
  }, [print, send, session]);

  // Keepalive pings; their real round trip drives the latency meter and the simulated lag.
  useEffect(() => {
    if (phase !== 'ready') return;
    const id = setInterval(async () => {
      if (document.visibilityState !== 'visible') return;
      const measured = await send('ping');
      baseRtt.current =
        measured === null
          ? Math.min(140, Math.max(25, baseRtt.current + jitter(-12, 12)))
          : Math.min(160, Math.max(28, measured + jitter(15, 30)));
      setRtt(Math.round(baseRtt.current));
    }, 4000);
    return () => clearInterval(id);
  }, [phase, send]);

  // Keystrokes only show up once the server has echoed them back.
  const shown = pending ? '' : input;
  useEffect(() => {
    const snapshot = { text: shown, caret };
    remote(() => setView(snapshot));
  }, [shown, caret, remote]);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, view, phase, pending, running]);

  const echoCommand = (text: string, at = cwdRef.current) =>
    print(
      <div className="flex flex-wrap">
        <Prompt cwd={at} />
        <span className="whitespace-pre-wrap break-all">{text}</span>
      </div>
    );

  const setInputValue = (value: string) => {
    setInput(value);
    setCaret(value.length);
  };

  const disconnect = () => {
    print('logout', <Dim>Connection to nelsongx.com closed.</Dim>);
    setPhase('closed');
    connected.current = false;
    send('close');
    if (onExit) remote(onExit, 700);
  };

  /* ---------------- commands ---------------- */

  const listDir = (abs: string, flags: string) => {
    const node = getNode(abs);
    if (!node) return null;
    if (node.type === 'file') return [abs.split('/').pop()!];
    const names = Object.keys(node.children).sort();
    return flags.includes('a') ? ['.', '..', ...names] : names.filter((n) => !n.startsWith('.'));
  };

  const renderName = (name: string, node: FsNode | null) =>
    node?.type === 'dir' || name === '.' || name === '..' ? (
      <span className="font-semibold text-sky-400">{name}/</span>
    ) : (
      <span className={name.startsWith('.') ? 'text-zinc-500' : 'text-zinc-200'}>{name}</span>
    );

  const renderTree = (node: FsNode, prefix: string, out: React.ReactNode[], all: boolean) => {
    if (node.type !== 'dir') return;
    const entries = Object.entries(node.children)
      .filter(([n]) => all || !n.startsWith('.'))
      .sort(([a], [b]) => a.localeCompare(b));
    entries.forEach(([name, child], i) => {
      const last = i === entries.length - 1;
      out.push(
        <div key={out.length}>
          <Dim>{prefix}{last ? '└── ' : '├── '}</Dim>
          {renderName(name, child)}
        </div>
      );
      renderTree(child, prefix + (last ? '    ' : '│   '), out, all);
    });
  };

  const startPing = (host: string) => {
    let seq = 0;
    const times: number[] = [];
    const stats = () =>
      print(
        <div className="mt-2">
          {`--- ${host} ping statistics ---\n${seq} packets transmitted, ${seq} received, 0% packet loss`}
          {times.length > 0 &&
            `\nrtt min/avg/max = ${Math.min(...times).toFixed(3)}/${(times.reduce((a, b) => a + b, 0) / times.length).toFixed(3)}/${Math.max(...times).toFixed(3)} ms`}
        </div>
      );
    print(`PING ${host} (127.0.0.1) 56(84) bytes of data.`);
    const tick = () => {
      seq++;
      const t = 0.02 + Math.random() * 0.08;
      times.push(t);
      print(`64 bytes from ${host} (127.0.0.1): icmp_seq=${seq} ttl=64 time=${t.toFixed(3)} ms`);
      if (seq >= 5) {
        clearInterval(interval);
        jobRef.current = null;
        setRunning(false);
        stats();
      }
    };
    const interval = setInterval(tick, 1000);
    setRunning(true);
    jobRef.current = {
      stop: () => {
        clearInterval(interval);
        jobRef.current = null;
        setRunning(false);
        stats();
      },
    };
  };

  const run = (raw: string, depth = 0): void => {
    const cwd = cwdRef.current;
    const [name = '', ...args] = tokenize(raw);
    if (!name) return;
    if (ALIASES[name] && depth < 3) return run([ALIASES[name], ...args].join(' '), depth + 1);

    const flags = args.filter((a) => a.startsWith('-')).join('');
    const operands = args.filter((a) => !a.startsWith('-'));

    switch (name) {
      case 'help':
        print(
          <div className="py-1">
            <div className="mb-1 text-zinc-400">Available commands:</div>
            {Object.entries(COMMANDS).map(([cmd, desc]) => (
              <div key={cmd} className="flex">
                <span className="w-24 shrink-0 text-orange-300">{cmd}</span>
                <Dim>{desc}</Dim>
              </div>
            ))}
            <div className="mt-2 text-zinc-400">
              Shortcuts: <span className="text-orange-300">about</span>, <span className="text-orange-300">projects</span>,{' '}
              <span className="text-orange-300">skills</span>, <span className="text-orange-300">contact</span>
            </div>
          </div>
        );
        return;

      case 'ls': {
        const targets = operands.length ? operands : ['.'];
        targets.forEach((target) => {
          const abs = normalize(cwd, target);
          const names = listDir(abs, flags);
          if (!names) return print(<Err>ls: cannot access &apos;{target}&apos;: No such file or directory</Err>);
          if (targets.length > 1) print(<span className="text-zinc-400">{target}:</span>);
          const base = getNode(abs)?.type === 'dir' ? abs : normalize(abs, '..');
          if (flags.includes('l')) {
            print(
              <div>
                {names.map((n) => {
                  const node = getNode(normalize(base, n));
                  const size = node?.type === 'file' ? node.content.length : 4096;
                  return (
                    <div key={n} className="whitespace-pre">
                      <Dim>{node?.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--'} 1 {USER} {USER} {String(size).padStart(5)} Oct  5 13:37 </Dim>
                      {renderName(n, node)}
                    </div>
                  );
                })}
              </div>
            );
          } else if (names.length) {
            print(
              <div className="flex flex-wrap gap-x-6">
                {names.map((n) => (
                  <span key={n}>{renderName(n, getNode(normalize(base, n)))}</span>
                ))}
              </div>
            );
          }
        });
        return;
      }

      case 'cd': {
        const target = operands[0] ?? '~';
        const abs = normalize(cwd, target);
        const node = getNode(abs);
        if (!node) return print(<Err>cd: {target}: No such file or directory</Err>);
        if (node.type !== 'dir') return print(<Err>cd: {target}: Not a directory</Err>);
        cwdRef.current = abs;
        setCwd(abs);
        return;
      }

      case 'pwd':
        print(cwd);
        return;

      case 'cat':
        if (!operands.length) return print(<Dim>usage: cat &lt;file&gt;</Dim>);
        operands.forEach((target) => {
          const node = getNode(normalize(cwd, target));
          if (!node) print(<Err>cat: {target}: No such file or directory</Err>);
          else if (node.type === 'dir') print(<Err>cat: {target}: Is a directory</Err>);
          else
            print(
              <div className="whitespace-pre-wrap">
                <Linkify text={node.content} />
              </div>
            );
        });
        return;

      case 'tree': {
        const target = operands[0] ?? '.';
        const node = getNode(normalize(cwd, target));
        if (!node || node.type !== 'dir') return print(<Err>tree: {target}: not a directory</Err>);
        const out: React.ReactNode[] = [];
        renderTree(node, '', out, flags.includes('a'));
        print(
          <div className="whitespace-pre">
            <span className="font-semibold text-sky-400">{target}</span>
            {out}
          </div>
        );
        return;
      }

      case 'open': {
        const target = operands[0];
        if (!target) return print(<Dim>usage: open &lt;{Object.keys(LINKS).join('|')}|url&gt;</Dim>);
        const url = LINKS[target.toLowerCase()] ?? (/^https?:\/\//.test(target) ? target : null);
        if (!url) return print(<Err>open: unknown target &apos;{target}&apos;</Err>);
        print(<span>Opening <Linkify text={url.replace(/^mailto:/, '')} /> ...</span>);
        window.open(url, '_blank', 'noopener,noreferrer');
        return;
      }

      case 'neofetch': {
        const info: [string, string][] = [
          ['OS', 'Nelson Linux 1.0 LTS x86_64'],
          ['Host', 'nelsongx.com'],
          ['Kernel', '6.9.8-generic'],
          ['Uptime', '69 days, 4 hours, 20 mins'],
          ['Shell', 'bash 5.2.21'],
          ['Terminal', 'nelsongx-web'],
          ['CPU', 'AMD Ryzen 9 5950X (32) @ 4.9GHz'],
          ['GPU', 'NVIDIA GeForce RTX 6090'],
          ['Memory', '88473MiB / 128222MiB'],
        ];
        print(
          <div className="flex flex-wrap items-start gap-x-6 gap-y-2 py-1">
            <pre className="leading-none text-orange-300">{LOGO}</pre>
            <div>
              <div>
                <span className="font-semibold text-orange-300">{USER}</span>@<span className="font-semibold text-orange-300">{HOST}</span>
              </div>
              <Dim>{'-'.repeat(USER.length + HOST.length + 1)}</Dim>
              {info.map(([k, v]) => (
                <div key={k}>
                  <span className="font-semibold text-orange-300">{k}</span>: {v}
                </div>
              ))}
              <div className="mt-2 flex">
                {['bg-zinc-800', 'bg-red-500', 'bg-emerald-500', 'bg-yellow-400', 'bg-sky-500', 'bg-fuchsia-500', 'bg-cyan-400', 'bg-zinc-200'].map((c) => (
                  <span key={c} className={`inline-block h-4 w-6 ${c}`} />
                ))}
              </div>
            </div>
          </div>
        );
        return;
      }

      case 'whoami':
        print(USER);
        return;

      case 'history':
        print(
          <div className="whitespace-pre">
            {history.map((cmd, i) => (
              <div key={i}>
                <Dim>{String(i + 1).padStart(4)}  </Dim>
                {cmd}
              </div>
            ))}
          </div>
        );
        return;

      case 'echo':
        print(<span className="whitespace-pre-wrap">{args.join(' ')}</span>);
        return;

      case 'date':
        print(formatDate(new Date()));
        return;

      case 'uname':
        print(
          flags.includes('a')
            ? 'Linux nelsongx.com 6.9.8-generic #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'
            : 'Linux'
        );
        return;

      case 'uptime':
        print(` ${new Date().toISOString().slice(11, 19)} up 69 days,  4:20,  1 user,  load average: 4.20, 6.90, 4.20`);
        return;

      case 'ping':
        if (!operands[0]) return print(<Dim>usage: ping &lt;host&gt;</Dim>);
        startPing(operands[0]);
        return;

      case 'cowsay': {
        const msg = args.join(' ') || 'Moo!';
        print(
          <pre>{` ${'_'.repeat(msg.length + 2)}\n< ${msg} >\n ${'-'.repeat(msg.length + 2)}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`}</pre>
        );
        return;
      }

      case 'sl':
        print(
          <pre className="overflow-x-auto text-[10px] leading-tight sm:text-xs">{String.raw`      ====        ________                ___________
  _D _|  |_______/        \__I_I_____===__|_______|
   |(_)---  |   H\________/ |   |        =|___ ___|      _________________
   /     |  |   H  |  |     |   |         ||_| |_||     _|                \_____A
  |      |  |   H  |__--------------------| [___] |   =|                        |
  | ________|___H__/__|_____/[][]~\_______|       |   -|                        |
  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__|________________________|
 |/-=|___|=    ||    ||    ||    |_____/~\___/          |_D__D__D_|  |_D__D__D_|
  \_/      \O=====O=====O=====O_/      \_/               \_/   \_/    \_/   \_/`}</pre>
        );
        return;

      case 'sudo':
        if (!args.length) return print(<Dim>usage: sudo &lt;command&gt;</Dim>);
        setPending({ kind: 'sudo', args });
        return;

      case 'man':
        if (!operands[0]) return print('What manual page do you want?\nFor example, try \'man ls\'.');
        if (COMMANDS[operands[0]]) return print(<span><span className="text-orange-300">{operands[0]}</span> - {COMMANDS[operands[0]]}</span>);
        print(<Err>No manual entry for {operands[0]}</Err>);
        return;

      case 'alias':
        print(
          <div className="whitespace-pre">
            {Object.entries(ALIASES).map(([k, v]) => `alias ${k}='${v}'`).join('\n')}
          </div>
        );
        return;

      case 'clear':
        setLines([]);
        return;

      case 'exit':
        disconnect();
        return;

      case 'who':
        print(`${USER}   pts/0        ${new Date().toISOString().slice(0, 16).replace('T', ' ')} (${session.clientIp})`);
        return;

      case 'rm':
        print(<Err>rm: cannot remove: Read-only file system</Err>);
        return;

      case 'vim':
      case 'vi':
      case 'nano':
      case 'emacs':
        print(<Dim>{name}: editors are disabled here. (You would never get out of vim anyway.)</Dim>);
        return;

      default:
        print(<Err>{name}: command not found</Err>);
    }
  };

  /* ---------------- input handling ---------------- */

  const submit = () => {
    if (pending?.kind === 'sudo') {
      const cmd = pending.args.join(' ');
      setInputValue('');
      setBusy(true);
      send('exec', { t: 'auth', d: randomHex(32) }); // never send what was typed here
      // sudo makes you wait before rejecting a password
      remote(() => {
        print(<Dim>[sudo] password for {USER}:</Dim>);
        if (/^rm\s+-[a-z]*r[a-z]*f?\s+\/(\*)?$/.test(cmd)) print(<Err>Nice try! But this system is protected.</Err>);
        else if (cmd.startsWith('apt') && cmd.includes('girlfriend')) print('E: Unable to locate package girlfriend');
        else print(<Err>{USER} is not in the sudoers file. This incident will be reported.</Err>);
        setPending(null);
        setBusy(false);
      }, jitter(900, 1600));
      return;
    }

    let cmd = input;
    let notFound = false;
    if (cmd.trim() === '!!') {
      cmd = history[history.length - 1] ?? '';
      notFound = !cmd;
    }
    const typedText = input;

    setBusy(true);
    setHistoryIndex(null);
    // Payload is random "ciphertext" sized like the command; visitors' input is never sent.
    send('exec', { d: randomHex(Math.min(cmd.length, 200) + 16) });
    if (cmd.trim()) setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));

    remote(() => {
      setInputValue('');
      setView({ text: '', caret: 0 });
      setBusy(false);
      if (notFound) {
        echoCommand(typedText);
        print(<Err>!!: event not found</Err>);
        return;
      }
      echoCommand(cmd);
      if (cmd.trim()) cmd.split(/\s*(?:&&|;)\s*/).forEach((part) => run(part));
    });
  };

  const complete = () => {
    const before = input.slice(0, caret);
    const tokens = before.split(/\s+/);
    const current = tokens[tokens.length - 1];
    let candidates: string[];
    let replaceFrom: number;

    if (tokens.length === 1) {
      candidates = COMMAND_NAMES.filter((c) => c.startsWith(current)).map((c) => c + ' ');
      replaceFrom = before.length - current.length;
    } else {
      const slash = current.lastIndexOf('/');
      const dirPart = slash >= 0 ? current.slice(0, slash + 1) : '';
      const base = current.slice(slash + 1);
      const node = getNode(normalize(cwd, dirPart || '.'));
      if (!node || node.type !== 'dir') return;
      candidates = Object.entries(node.children)
        .filter(([n]) => n.startsWith(base) && (base.startsWith('.') || !n.startsWith('.')))
        .map(([n, child]) => n + (child.type === 'dir' ? '/' : ' '));
      replaceFrom = before.length - base.length;
    }

    if (!candidates.length) return;
    let common = candidates[0];
    for (const c of candidates) while (!c.startsWith(common)) common = common.slice(0, -1);

    const prefixLen = before.length - replaceFrom;
    if (candidates.length > 1 && common.length <= prefixLen) {
      const text = input;
      remote(() => {
        echoCommand(text);
        print(
          <div className="flex flex-wrap gap-x-6">
            {candidates.map((c) => (
              <span key={c} className={c.endsWith('/') ? 'font-semibold text-sky-400' : 'text-zinc-300'}>
                {c.trim()}
              </span>
            ))}
          </div>
        );
      });
      return;
    }
    const next = input.slice(0, replaceFrom) + common + input.slice(caret);
    setInput(next);
    setCaret(replaceFrom + common.length);
  };

  const browseHistory = (direction: -1 | 1) => {
    if (!history.length) return;
    if (historyIndex === null) {
      if (direction === 1) return;
      setDraft(input);
      setHistoryIndex(history.length - 1);
      setInputValue(history[history.length - 1]);
      return;
    }
    const next = historyIndex + direction;
    if (next < 0) return;
    if (next >= history.length) {
      setHistoryIndex(null);
      setInputValue(draft);
      return;
    }
    setHistoryIndex(next);
    setInputValue(history[next]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const ctrl = (key: string) => e.ctrlKey && e.key.toLowerCase() === key;

    if (phase !== 'ready' || busy) {
      e.preventDefault();
      return;
    }
    if (ctrl('c')) {
      e.preventDefault();
      if (running) {
        send('exec', { t: 'sig', d: randomHex(4) });
        remote(() => {
          print(<Dim>^C</Dim>);
          jobRef.current?.stop();
        });
      } else if (pending) {
        setPending(null);
        setInputValue('');
        remote(() => print(<Dim>[sudo] password for {USER}: ^C</Dim>));
      } else {
        const text = input;
        setInputValue('');
        setHistoryIndex(null);
        remote(() => {
          echoCommand(text + '^C');
          setView({ text: '', caret: 0 });
        });
      }
      return;
    }
    if (running) {
      e.preventDefault();
      return;
    }
    if (ctrl('l')) {
      e.preventDefault();
      remote(() => setLines([]));
      return;
    }
    if (ctrl('u')) {
      e.preventDefault();
      setInput(input.slice(caret));
      setCaret(0);
      return;
    }
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        submit();
        break;
      case 'Tab':
        e.preventDefault();
        if (!pending) complete();
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!pending) browseHistory(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!pending) browseHistory(1);
        break;
    }
  };

  // Keep the hidden input's caret in sync with our rendered cursor.
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (el && el.selectionStart !== caret) el.setSelectionRange(caret, caret);
  }, [caret, input]);

  const syncCaret = (e: React.SyntheticEvent<HTMLInputElement>) => setCaret(e.currentTarget.selectionStart ?? 0);

  const focusInput = () => {
    if (window.getSelection()?.toString()) return; // let people copy text
    inputRef.current?.focus({ preventScroll: true });
  };

  const display = phase === 'ready' ? view : { text: '', caret: 0 };
  const cursor = (
    <span
      key={`${display.text}-${display.caret}`}
      className={`term-cursor ${focused ? 'term-cursor-active' : 'outline outline-1 -outline-offset-1 outline-zinc-400'}`}
    >
      {display.text[display.caret] ?? ' '}
    </span>
  );

  const rowPrefix =
    phase !== 'ready' || running ? null : pending ? (
      <span className="text-zinc-500">[sudo] password for {USER}: </span>
    ) : (
      <Prompt cwd={cwd} />
    );

  const status =
    phase === 'ready'
      ? { dot: rtt < 100 ? 'bg-emerald-400' : rtt < 300 ? 'bg-yellow-400' : 'bg-red-400', label: `ssh · ${rtt} ms` }
      : phase === 'closed'
        ? { dot: 'bg-zinc-600', label: 'disconnected' }
        : { dot: 'animate-pulse bg-yellow-400', label: 'connecting…' };

  return (
    <div className="flex h-full w-full flex-col font-mono text-[13px] leading-6 text-zinc-200 md:text-sm">
      {/* Title bar */}
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-white/[0.08] bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Close terminal"
            onClick={onExit}
            className="size-3 rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
          />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="truncate text-xs text-zinc-400">
          {phase === 'ready' ? `${USER}@${HOST}: ${displayPath(cwd)}` : `${HOST}.com`}
        </div>
        <div className="flex items-center gap-2 justify-self-end text-xs tabular-nums text-zinc-500">
          <span className={`size-1.5 rounded-full ${status.dot}`} />
          <span className="hidden sm:inline">{status.label}</span>
        </div>
      </div>

      {/* Screen */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence>
          {phase === 'connecting' && (
            <motion.div
              key="connecting"
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              role="status"
            >
              <span className="size-8 animate-spin rounded-full border-2 border-white/10 border-t-orange-300" />
              <div className="text-center">
                <div className="text-zinc-200">Connecting to {HOST}.com</div>
                <div className="text-xs text-zinc-500">establishing secure session…</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          ref={scrollRef}
          onClick={focusInput}
          className="term-scroll h-full cursor-text overflow-y-auto overflow-x-hidden px-4 py-3 md:px-5"
        >
          {lines.map((l) => (
            <div key={l.id} className="whitespace-pre-wrap break-words">
              {l.node}
            </div>
          ))}

          <div className="relative flex flex-wrap whitespace-pre-wrap">
            {rowPrefix}
            <span className={`whitespace-pre-wrap break-all ${phase === 'connecting' ? 'invisible' : ''}`}>
              {display.text.slice(0, display.caret)}
              {cursor}
              {display.text.slice(display.caret + 1)}
            </span>
            <input
              ref={inputRef}
              type={pending ? 'password' : 'text'}
              value={input}
              onChange={(e) => {
                if (phase !== 'ready' || busy) return;
                setInput(e.target.value);
                setCaret(e.target.selectionStart ?? e.target.value.length);
              }}
              onKeyDown={handleKeyDown}
              onKeyUp={syncCaret}
              onSelect={syncCaret}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              aria-label="Terminal input"
              className="pointer-events-none absolute inset-0 h-full w-full text-base opacity-0"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
