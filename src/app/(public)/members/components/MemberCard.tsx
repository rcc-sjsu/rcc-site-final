import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

interface MemberCardProps {
  full_name: string;
  role: string;
  imageUrl?: string;
}

export default function MemberCard({ full_name, role, imageUrl }: MemberCardProps) {
  return (
    <Card className="overflow-hidden border-zinc-200 shadow-sm">
      <CardContent className="p-0">
        {/* Placeholder Image Box */}
        <div className="aspect-square bg-zinc-100 flex items-center justify-center border-b border-zinc-100">
          <ImageIcon className="w-12 h-12 text-zinc-300" />
        </div>
        <div className="p-4">
          <h4 className="text-lg font-bold text-zinc-900">{full_name}</h4>
          <p className="text-base text-zinc-500 mt-1">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
}
