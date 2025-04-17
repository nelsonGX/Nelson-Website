import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const now = new Date();
  const time = now.toLocaleString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'UTC' });
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    "Welcome to Nelson Linux 1.0 LTS. (GNU/Linux 6.9.8-generic x86_64)",
    " ",
    "_   _      _                  __          __  _         _ _       ",
    "| \\ | |    | |                 \\ \\        / / | |       (_) |      ",
    "|  \\| | ___| |___  ___  _ __    \\ \\  /\\  / /__| |__  ___ _| |_ ___ ",
    "| . ` |/ _ \\ / __|/ _ \\| '_ \\    \\ \\/  \\/ / _ \\ '_ \\/ __| | __/ _ \\",
    "| |\\  |  __/ \\__ \\ (_) | | | |    \\  /\\  /  __/ |_) \\__ \\ | ||  __/",
    "|_| \\_|\\___|_|___/\\___/|_| |_|     \\/  \\/ \\___|_.__/|___/_|\\__\\___|",
    " ",
    "  System information as of " + time + " UTC",
    "  Usage of /:   69.0% of 2GB",
    "  Memory usage: 69%                 IPv4 address for lo:   127.0.0.1",
    "  Swap usage:   0%                 IPv4 address for eth0: nelsongx.com",
    "  Temperature:  69.0 C",
    " ",
    "Type 'help' for available commands.",
    " ",
  ]);
  const [history, setHistory] = useState<string[]>([]); 
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isTyping, setIsTyping] = useState(false);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fileSystem = {
    'about': 'Hello! My name is Nelson, aka nelsonGX. I\'m a student from Taiwan, and I have a passion in field of computer related stuff.\n\nI currently own Very Fast Network LTD, a company based in Taiwan that operates CheapServer hosting services under AS152619. Alongside this main business, I run FreeServer, a free hosting service community. I also manage a Minecraft server called FreeServer Network, which focuses on map sharing for creators.\n\nI\'m actively involved in tech communities, attending conferences like SITCON, HITCON, and COSCUP to learn and network with fellow enthusiasts.',
    'projects': 'CheapServer (2022 - now)\nA hosting service for game servers based in Taiwan.\nhttps://cheapserver.tw\n\nFreeServer v3 (2023 - now)\nA free hosting service community.\nhttps://freeserver.tw\n\nFreeServer Network (2024 - now)\nA Minecraft server focusing on map sharing for creators.\nhttps://freeserver.network',
    'skills': 'Python - Pretty confident\nJava - I do minecraft plugins\nJavaScript - Not bad\nNext.JS - Pretty confident\nReact - It\'s just inside nextjs\nMongoDB - I use it\nLinux - I can read commands\nNetworking - not bad\nInfrastructure - not bad',
    'contact': 'Email: hi@nelsongx.com\nGitHub: github.com/nelsongx\nDiscord: @nelsongx',
    'system': 'System: Nelson Linux 1.0 LTS\nKernel: Linux 6.9.8-generic x86_64\nUptime: 69 days, 4 hours, 20 minutes\nShell: bash 5.1.16\nResolution: 1920x1080\nWM: i3\nTerminal: st\nCPU: AMD Ryzen 9 5950X (32) @ 4.9GHz\nGPU: NVIDIA GeForce RTX 6090\nMemory: 69% of 128GB',
  };

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleClick = () => {
      inputRef.current?.focus();
    };
    
    const container = outputRef.current?.parentElement;
    container?.addEventListener('click', handleClick);
    
    return () => {
      container?.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);
  
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsTyping(prev => !prev);
    }, 500);
    
    return () => clearInterval(blinkInterval);
  }, []);

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory(1);
    }
  };

  const navigateHistory = (direction: number) => {
    const newIndex = historyIndex + direction;
    if (newIndex >= -1 && newIndex < history.length) {
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  const handleSubmit = () => {
    if (input.trim() !== '') {
      processCommand(input);
      setHistory((prevHistory) => [...prevHistory, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const processCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    let response;

    switch (command.toLowerCase()) {
      case 'help':
        response = 'Available commands:\n- help: Show this help message\n- whoami: Display current user\n- clear: Clear the terminal screen\n- ls: List files\n- cat <filename>: Display file contents\n- uname: Display system information\n- pwd: Display current directory\n\nTry `ls` to get files! p.s. not all command listed';
        break;
      case 'whoami':
        response = 'root';
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'ls':
        const flags = args.filter(arg => arg.startsWith('-')).join('');
        if (flags.includes('a')) {
          response = ['.', '..', ...Object.keys(fileSystem)].join('\n');
        } else if (flags.includes('l')) {
          response = Object.keys(fileSystem).map(file => 
            `drwxr-xr-x 1 root root 4096 Apr 15 2025 ${file}`
          ).join('\n');
        } else {
          response = Object.keys(fileSystem).join('\n');
        }
        break;
      case 'cat':
        if (args.length === 0) {
          response = 'Usage: cat <filename>';
        } else {
          const filename = args[0] as keyof typeof fileSystem;
          response = fileSystem[filename] || `File not found: ${filename}`;
        }
        break;
      case 'date':
        response = new Date().toLocaleString('en-US', { 
          weekday: 'short', 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: true,
          timeZone: 'UTC' 
        }) + ' UTC';
        break;
      case 'echo':
        response = args.join(' ');
        break;
      case 'uname':
        if (args.includes('-a')) {
          response = 'Nelson Linux 1.0 LTS (GNU/Linux 6.9.8-generic x86_64) nelsongx.com #1 SMP PREEMPT_DYNAMIC Very Fast Linux 6.9.8';
        } else {
          response = 'Nelson Linux 1.0 LTS';
        }
        break;
      case 'uptime':
        response = '20:42:20 up 69 days, 4:20, 1 user, load average: 4.20, 6.9, 4.2';
        break;
      case 'pwd':
        response = '/home/nelson';
        break;
      case 'contact':
        response = fileSystem['contact'];
        break;
      case 'projects':
        response = fileSystem['projects'];
        break;
      case 'skills':
        response = fileSystem['skills'];
        break;
      case 'sudo':
        if (args.join(' ') === 'rm -rf /') {
          response = 'Nice try! But this system is protected.';
        } else if (args.join(' ') === 'apt-get install girlfriend') {
          response = 'E: Unable to locate package girlfriend';
        } else {
          response = 'sudo: command not permitted: "' + args.join(' ') + '"';
        }
        break;
      case 'cd':
        response = 'No. Where are you going to lol';
        break;
      case 'exit':
      case 'logout':
        response = 'There is no escape from this terminal. Try the GUI mode instead.';
        break;
      case 'sl':
        response = '      ====        ________                ___________\n  _D _|  |_______/        \\__I_I_____===__|_______|\n   |(_)---  |   H\\________/ |   |        =|___ ___|      _________________\n   /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A\n  |      |  |   H  |__--------------------| [___] |   =|                        |\n  | ________|___H__/__|_____/[][]~\\_______|       |   -|                        |\n  |/ |   |-----------I_____I [][] []  D   |=======|____|________________________|\n__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|________________________|\n |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|\n  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/';
        break;
      case 'cowsay':
        const message = args.join(' ') || 'Moo!';
        response = ` ${'_'.repeat(message.length + 2)} \n< ${message} >\n ${'‾'.repeat(message.length + 2)} \n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`;
        break;
      case '':
        response = '';
        break;
      case 'history':
        response = history.map((cmd, index) => `${index + 1}  ${cmd}`).join('\n');
        break;
      case 'man':
        response = 'What manual page do you want?\nFor a list of commands, type "help"';
        break;
      case 'alias':
        response = 'alias ls="ls --color=auto"\nalias ll="ls -la"\nalias grep="grep --color=auto"\nalias github="xdg-open https://github.com/nelsongx"';
        break;
      case 'ping':
        if (args[0]) {
          response = `PING ${args[0]} (127.0.0.1) 56(84) bytes of data.\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.01 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.01 ms\n64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=0.01 ms\n\n--- ${args[0]} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2000ms\nrtt min/avg/max/mdev = 0.01/0.01/0.01/0.00 ms`;
        } else {
          response = 'Usage: ping <hostname>';
        }
        break;
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setOutput((prevOutput) => [...prevOutput, `root@nelsongx.com~# ${cmd}`, response]);
  };

  return (
    <div className="bg-zinc-900 text-green-500 p-4 font-mono flex flex-col w-full h-full">
      <div ref={outputRef} className="flex-grow overflow-y-auto mb-2 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-zinc-800">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line.startsWith('root@nelsongx.com~# ') ? (
              <>
                <span className="text-yellow-400">root</span>
                <span className="text-white">@</span>
                <span className="text-blue-400">nelsongx.com</span>
                <span className="text-white">~# </span>
                <span>{line.substring('root@nelsongx.com~# '.length)}</span>
              </>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-zinc-700 pt-2">
        <span className="text-yellow-400">root</span>
        <span className="text-white">@</span>
        <span className="text-blue-400">nelsongx.com</span>
        <span className="text-white">~#&nbsp;</span>
        <div className="flex flex-grow relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none flex-grow ml-1 text-green-300 w-full"
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            style={{ caretColor: 'transparent' }}
          />
          <span className="absolute left-1" style={{ marginLeft: `${input.length * 0.6}em` }}>
            <span className={`${isTyping ? 'opacity-100' : 'opacity-0'} text-green-500 transition-opacity duration-100`}>▎</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;