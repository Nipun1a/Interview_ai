import { cn } from '@/lib/utils';
import React from 'react'

// Define the types for the props and tech icon
type TechIcon = {
  tech: string;
  url: string;
};

type TechIconProps = {
  techStack: string[];
};

// Dummy implementation for getTechLogos, replace with your actual import if needed
async function getTechLogos(techStack: string[]): Promise<TechIcon[]> {
  // Replace this with your actual logic
  return techStack.map((tech) => ({
    tech,
    url: `/icons/${tech}.png`,
  }));
}

const DisplayTechicons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className='flex flex-row gap-2'>
      {techIcons.slice(0, 3).map(
        ({ tech, url }: TechIcon, index: number) => (
          <div
            key={tech}
            className={cn('relative group bg-dark-300 rounded-full p-2 flex-center')}
          >
            <span className='tech-tooltip'>{tech}</span>
            <img
              src={url}
              alt={tech}
              title={tech}
              width={100}
              height={100}
              className='size-5'
            />
          </div>
        )
      )}
    </div>
  );
};

export default DisplayTechicons
