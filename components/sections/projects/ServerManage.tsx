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
            FreeServer was a project started by me and Mayboy. Initially, I saw my friend Mayboy was using Google Cloud Platform (GCP)&apos;s free 300 USD plan, and I was wondering if we can use that as a free hosting. Thus, we found another friend, Windless, to join the project.
            <br/><br/>
            The FreeServer provides free hosting for Minecraft servers and discord bots. The free specs include 1 vCPU, 4 GB RAM, and 10 GB Disks. The server located in Taiwan. The specs is pretty a lot for a free hosting in Asia.
            <br/><br/>
            The server got a lot of DDoS traffic when started, until we met Fast-Line&apos;s owner Alger Huang. He offers free anti-DDoS service for us. After about 4 months later, we met both GCP&apos;s policy change and EOS of Fast-Line&apos;s free anti-DDoS service. Finally, We decided to shut down the FreeServer at August 2022.
          </span>
        </div>
      </>
      },
      { date: 'Aug 2022', title: 'CheapServer', imageSrc: "/assets/images/CheapServer_white.png", description: 
      <>
        <div>
          <span>
            As we&apos;ve earnt some money from FreeServer, thus we decided to open a paid server hosting service called CheapServer. We added our another friend CH this time, to start the business.
            <br/><br/>
            When CheapServer started, there were no such hosting in Taiwan that can provide the same low price as us (as we believed). We was selling when started.
            <br/><br/>
            CheapServer is still running until now. We have a lot of customers, and we are still providing the best service to our customers, trying to improve our service.
          </span>
        </div>
      </>
      },
      { date: 'Jan 2023', title: 'FreeServer v2', imageSrc: "/assets/images/freeserver.png", description: 
      <>
        <div>
          <span>
            After CheapServer, we missed the good old days while operating FreeServer. Thus, we spent some money from CheapServer instead of getting free trials from GCP this time, to operate the FreeServer v2.
            <br/><br/>
            Firstly, we bought a VPS from Taipei 101 (one of my friend), then started the hosting. We re-used the website components from FreeServer v1. We had some cooperate issues, so we changed the server provider to Hetzner.
            <br/><br/>
            However, we had no more money and was getting tired. Thus, we decided to shut down the FreeServer v2 at July 2023.
          </span>
        </div>
      </>
      },
      { date: 'Nov 2023', title: 'FreeServer v3', imageSrc: "/assets/images/freeserverv3.png", description: 
      <>
        <div>
          <span>
            One of my friend, Ricky aka Smitug mentioned re-open of FreeServer when we were in our Discord VC.
            <br/><br/>
            I was thinking about that too. So we decided to re-open it again. This time, we use server infrastructures built by ourselves. We are trying to make it better than before.
            <br/><br/>
            The FreeServer v3 is still operating to now. We got 7000+ user and 1700+ servers running so far, and still counting. 
          </span>
        </div>
      </>
      },
    ].map((data, idx) => (
      <div className="mb-8 md:flex space-y-4 items-center space-x-6 justify-center" key={idx}>
        <div className="relative flex bg-zinc-600 shadow-xl w-24 h-12 rounded-lg">
          <h1 className="mx-auto my-auto font-semibold text-lg text-white">{data.date}</h1>
        </div>
        <div className="md:flex bg-zinc-800 rounded-lg shadow-xl md:max-w-2/3 px-6 py-4">
          <Image src={data.imageSrc} alt={'Image'} width={100} height={10} className="object-cover h-20 w-auto my-auto" />
          <div className="relative px-4">
              <h3 className="mb-3 font-bold text-white text-xl">{data.title}</h3>
              <p className="text-sm leading-snug tracking-wide text-zinc-300 text-opacity-100">{data.description}</p>
          </div>
        </div>
      </div>
    ))}

    <h1 className="text-4xl py-10 text-center font-bold">Server Infrastructure & Homelab</h1> 
    </>
  )
}