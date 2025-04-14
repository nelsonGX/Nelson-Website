export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
}

const projects: Project[] = [
  {
    title: "Server Hosting",
    description: "I am the founder of several server hostings. I have experience in managing servers and hosting websites.",
    tags: ["Linux", "Docker", "Nginx", "AWS"],
    image: "server"
  },
  {
    title: "Web Development",
    description: "Building modern websites with React, Next.js and other cutting-edge technologies.",
    tags: ["React", "Next.js", "TailwindCSS", "TypeScript"],
    image: "webdev"
  },
  {
    title: "Community Projects",
    description: "Active contributor to tech communities and open-source projects.",
    tags: ["Open-Source", "Collaboration", "GitHub"],
    image: "community"
  }
];

export default projects;