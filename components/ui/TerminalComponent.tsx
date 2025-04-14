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
  ]);
  const [history, setHistory] = useState<string[]>([]); 
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const outputRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fileSystem = {
    'about-me': 'Hi, I\'m a simulated user in this React terminal.\nI enjoy coding and learning new technologies!',
    'my-working-experience': 'React Developer | 2020 - Present\n- Built interactive web applications\n- Implemented state management solutions\n- Collaborated with cross-functional teams'
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

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
        response = 'Available commands:\n- help: Show this help message\n- whoami: Display current user\n- clear: Clear the terminal screen\n- ls: List files\n- cat <filename>: Display file contents';
        break;
      case 'whoami':
        response = 'root';
        break;
      case 'clear':
        setOutput([]);
        return;
      case 'ls':
        response = Object.keys(fileSystem).join('\n');
        break;
      case 'cat':
        if (args.length === 0) {
          response = 'Usage: cat <filename>';
        } else {
          const filename = args[0] as keyof typeof fileSystem;
          response = fileSystem[filename] || `File not found: ${filename}`;
        }
        break;
      case '':
        response = '';
        break;
      default:
        response = `Command not found: ${command}. Type 'help' for available commands.`;
    }

    setOutput((prevOutput) => [...prevOutput, `root@nelsongx.com~# ${cmd}`, response]);
  };

  return (
    <div className="bg-zinc-900 text-green-500 p-4 font-mono flex flex-col w-full h-full">
      <div ref={outputRef} className="flex-grow overflow-y-auto mb-2">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span>root@nelsongx.com~#&nbsp;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-grow ml-1"
        />
      </div>
    </div>
  );
};

export default Terminal;