import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MemberCardProps {
  full_name: string;
  role: string;
  image_url?: string;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function MemberCard({ full_name, role, image_url }: MemberCardProps) {
  return (
    <Card className="h-full transition-shadow duration-300 ease-hover hover:shadow-lg hover:shadow-rcc-violet/10">
      <CardContent className="flex flex-col items-center gap-4 p-5 text-center sm:p-6">
        <Avatar className="size-24 ring-4 ring-accent sm:size-28">
          <AvatarImage src={image_url} alt={`Headshot of ${full_name}`} className="object-cover" />
          <AvatarFallback className="bg-accent font-mono text-2xl font-bold text-primary">
            {getInitials(full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="text-base leading-snug font-semibold text-foreground sm:text-lg">{full_name}</h3>
          <span className="text-sm text-muted-foreground">{role}</span>
        </div>
      </CardContent>
    </Card>
  );
}
