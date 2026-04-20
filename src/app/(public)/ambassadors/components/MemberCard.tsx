import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface MemberCardProps {
  full_name: string;
  role: string;
  image_url?: string;
  linkedIn_url?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function MemberCard({ full_name, role, image_url: image_url, linkedIn_url }: MemberCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 shadow-sm flex flex-col">
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">

        {/* Shadcn Avatar acting as the main profile picture */}
        <Avatar className="w-32 h-32 border border-zinc-100 shadow-sm">
          <AvatarImage
            src={image_url}
            alt={`Headshot of ${full_name}`}
            className="object-cover"
          />
          <AvatarFallback className="bg-zinc-100 text-zinc-500 text-2xl font-medium">
            {getInitials(full_name)}
          </AvatarFallback>
        </Avatar>

        {/* Text Content */}
        <div>
          <h4 className="text-lg font-bold text-zinc-900">{full_name}</h4>
          <p className="text-sm text-zinc-500 mt-1">{role}</p>
        </div>

      </CardContent>
    </Card >
  );
}
