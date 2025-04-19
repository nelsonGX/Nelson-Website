import Image from "next/image"

export default function ServerManager() {
  return (
    <>
    <h1 className="text-4xl py-10 text-center font-bold">Server Hosting I&apos;ve made</h1>
    {[
      { date: 'Mar 2022', title: 'FreeServer', imageSrc: "/assets/images/freeserver.png", description: 
      <>
        <div>
          <span>
            FreeServer was a project started by me and Mayboy. Initially, I saw my friend Mayboy using Google Cloud Platform (GCP){"'"}s free 300 USD plan, and I wondered if we could use that as free hosting. Thus, we found another friend, Windless, to join the project.
            <br/><br/>
            The FreeServer provided free hosting for Minecraft servers and Discord bots. The free specs included 1 vCPU, 4 GB RAM, and 10 GB of disk space. The server was located in Taiwan. These specs were quite generous for free hosting in Asia.
            <br/><br/>
            The server received a lot of DDoS traffic when it started, until we met Fast-Line{"'"}s owner Alger Huang. He offered free anti-DDoS service for us. About 4 months later, we faced both GCP{"'"}s policy changes and the end of Fast-Line{"'"}s free anti-DDoS service. Finally, we decided to shut down FreeServer in August 2022.
          </span>
        </div>
      </>
      },
      { date: 'Aug 2022', title: 'CheapServer', imageSrc: "/assets/images/CheapServer_white.png", description: 
      <>
        <div>
          <span>
            As we had earned some money from FreeServer, we decided to open a paid server hosting service called CheapServer. We added another friend, CH, this time to start the business.
            <br/><br/>
            When CheapServer started, there was no hosting service in Taiwan that could provide the same low prices as we did (as we believed). We were selling when we started.
            <br/><br/>
            CheapServer is still running until now. We have many customers, and we are still providing the best service to our customers, constantly trying to improve our service.
          </span>
        </div>
      </>
      },
      { date: 'Jan 2023', title: 'FreeServer v2', imageSrc: "/assets/images/freeserver.png", description: 
      <>
        <div>
          <span>
            After CheapServer, we missed the good old days of operating FreeServer. Thus, we spent some money from CheapServer instead of getting free trials from GCP this time to operate FreeServer v2.
            <br/><br/>
            First, we bought a VPS from Taipei 101 (one of my friends), then started the hosting. We reused the website components from FreeServer v1. We had some cooperation issues, so we changed the server provider to Hetzner.
            <br/><br/>
            However, we ran out of money and were getting tired. Thus, we decided to shut down FreeServer v2 in July 2023.
          </span>
        </div>
      </>
      },
      { date: 'Nov 2023', title: 'FreeServer v3', imageSrc: "/assets/images/freeserverv3.png", description: 
      <>
        <div>
          <span>
            One of my friends, Ricky aka Smitug, mentioned reopening FreeServer when we were in our Discord VC.
            <br/><br/>
            I was thinking about that too. So we decided to reopen it again. This time, we used server infrastructure built by ourselves. We are trying to make it better than before.
            <br/><br/>
            FreeServer v3 is still operating today. We have acquired over 7,000 users and 1,700+ servers running so far, and the numbers are still growing.
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