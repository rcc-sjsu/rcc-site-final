'use client';

import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MemberCardProps {
  full_name: string;
  role: string;
  image_url?: string;
  linkedin_url?: string | null;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function MemberCard({ full_name, role, image_url, linkedin_url }: MemberCardProps) {
  const [isSelected, setIsSelected] = useState(false);

  function toggleSelected() {
    setIsSelected((selected) => !selected);
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={toggleSelected}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleSelected();
        }
      }}
      className={`cursor-pointer overflow-hidden border shadow-sm transition-all duration-300 ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-lg -translate-y-1'
          : 'border-zinc-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1'
      }`}
    >
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <Avatar
          className={`w-32 h-32 border shadow-sm transition-all duration-300 ${
            isSelected ? 'border-blue-500 scale-105' : 'border-zinc-100'
          }`}
        >
          <AvatarImage src={image_url} alt={`Headshot of ${full_name}`} className="object-cover" />
          <AvatarFallback className="bg-zinc-100 text-zinc-500 text-2xl font-medium">
            {getInitials(full_name)}
          </AvatarFallback>
        </Avatar>

        <div>
          <h4 className="text-lg font-bold text-zinc-900">{full_name}</h4>
          <p className="text-sm text-zinc-500 mt-1">{role}</p>
        </div>

        {isSelected && (
          <a
            href={linkedin_url || 'https://www.linkedin.com'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-md bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#084f96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label={`View ${full_name} on LinkedIn`}
          >
            <FaLinkedin className="h-5 w-5" aria-hidden="true" />
            View LinkedIn
          </a>
        )}
      </CardContent>
    </Card>
  );
}
