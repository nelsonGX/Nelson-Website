import Image from "next/image"

export default function ServerManager() {
  return (
    <>
    <h1 className="text-4xl py-10 text-center font-bold">Server Hosting I&apos;ve made</h1>
    {[
      { 
        date: 'Mar 2022', 
        title: 'FreeServer', 
        imageSrc: "/assets/images/freeserver.png", 
        description: 
        <>
          <div>
            <span>
              FreeServer was a project started by me and Mayboy. Initially, I noticed my friend Mayboy using Google Cloud Platform (GCP)'s free 300 USD plan, and I wondered if we could use it for free hosting. So, we invited our friend Windless to join the project.
              <br/><br/>
              FreeServer provided free hosting for Minecraft servers and Discord bots. The free specs included 1 vCPU, 4 GB RAM, and 10 GB of disk space. The server was located in Taiwan. These specs were quite generous for free hosting in Asia.
              <br/><br/>
              The server faced a lot of DDoS traffic initially, until we met Alger Huang, the owner of Fast-Line, who offered free anti-DDoS service for us. After about 4 months, we encountered policy changes from GCP and the end of Fast-Line's free anti-DDoS service. Eventually, we decided to shut down FreeServer in August 2022.
            </span>
          </div>
        </>
      },
      { 
        date: 'Aug 2022', 
        title: 'CheapServer', 
        imageSrc: "/assets/images/CheapServer_white.png", 
        description: 
        <>
          <div>
            <span>
              With the earnings from FreeServer, we decided to launch a paid server hosting service called CheapServer. This time, we brought in our friend CH to join the business.
              <br/><br/>
              When CheapServer started, there were no hosting services in Taiwan that could match our low prices (as we believed). We gained customers from the beginning.
              <br/><br/>
              CheapServer is still operational today. We have a growing customer base and continuously strive to improve our service.
            </span>
          </div>
        </>
      },
      { 
        date: 'Jan 2023', 
        title: 'FreeServer v2', 
        imageSrc: "/assets/images/freeserver.png", 
        description: 
        <>
          <div>
            <span>
              After CheapServer, we missed the good old days of operating FreeServer. So, this time, we invested some money from CheapServer instead of relying on free trials from GCP to run FreeServer v2.
              <br/><br/>
              First, we purchased a VPS from Taipei 101 (one of my friends) and started the hosting. We reused the website components from FreeServer v1. However, we encountered some collaboration issues, so we switched to Hetzner as the server provider.
              <br/><br/>
              Unfortunately, we ran out of funds and became exhausted. As a result, we made the decision to shut down FreeServer v2 in July 2023.
            </span>
          </div>
        </>
      },
      { 
        date: 'Nov 2023', 
        title: 'FreeServer v3', 
        imageSrc: "/assets/images/freeserverv3.png", 
        description: 
        <>
          <div>
            <span>
              During a Discord voice chat, my friend Ricky (aka Smitug) suggested reopening FreeServer. I had been considering it as well. So, we decided to relaunch it, this time using our own server infrastructure. Our goal is to make it even better than before.
              <br/><br/>
              FreeServer v3 is still in operation today. We have acquired over 7,000 users and 1,700+ active servers, and the numbers continue to grow.
            </span>
          </div>
        </>
      },
    ].map((data, idx) => (
      <div className="mb-8 md:flex md:space-x-6 space-y-4 md:space-y-0 items-center justify-center" key={idx}>
        <div className="relative flex bg-zinc-800 shadow-xl w-24 h-12 rounded-lg">
          <h1 className="mx-auto my-auto font-semibold text-lg text-white">{data.date}</h1>
        </div>
        <div className="md:flex bg-zinc-800 rounded-lg shadow-xl md:max-w-[66%] px-6 py-4">
          <Image src={data.imageSrc} alt={'Image'} width={100} height={10} className="object-cover h-20 w-auto mx-auto md:mx-0 my-4 md:my-auto" />
          <div className="relative px-4">
              <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
              <div className="text-sm leading-snug tracking-wide text-zinc-300 text-opacity-100">{data.description}</div>
          </div>
        </div>
      </div>
    ))}

    <h1 className="text-4xl py-10 text-center font-bold">Server Infrastructure & Homelab</h1> 
    </>
  )
}