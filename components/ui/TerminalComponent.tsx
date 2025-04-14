import React, { useState } from 'react';

const TerminalComponent: React.FC = () => {
  const [terminalLines] = useState([
    { text: "nelson@portfolio:~$ whoami", type: "command" },
    { text: "Nelson - Student & Developer from Taiwan", type: "output" },
    { text: "nelson@portfolio:~$ ls -la skills/", type: "command" },
    { text: "total 8", type: "output" },
    { text: "drwxr-xr-x 2 nelson users 4096 Apr 14 2025 server-management/", type: "output" },
    { text: "drwxr-xr-x 2 nelson users 4096 Apr 14 2025 web-development/", type: "output" },
    { text: "drwxr-xr-x 2 nelson users 4096 Apr 14 2025 coding/", type: "output" },
    { text: "nelson@portfolio:~$ cat about.txt", type: "command" },
    { text: "Hello! My name is Nelson. I'm a student from Taiwan with a passion for all things computer-related.", type: "output" },
    { text: "I love exploring new technologies and participating in tech events and conferences.", type: "output" },
    { text: "nelson@portfolio:~$ _", type: "cursor" }
  ]);
  
  return (
    <div className="font-mono text-sm text-green-400 bg-black/80 p-4 rounded-md h-full overflow-y-auto">
      {terminalLines.map((line, index) => (
        <div key={index} className={`mb-1 ${line.type === 'command' ? 'text-white' : ''}`}>
          {line.text}
          {line.type === 'cursor' && <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>}
        </div>
      ))}
    </div>
  );
};

export default TerminalComponent;