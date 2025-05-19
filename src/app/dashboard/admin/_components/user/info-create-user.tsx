import { CalendarIcon, Info } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function InfoUser() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">
          <Info />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-[40%]">
        <div className="flex items-start gap-3">
          <div>
            <p className="font-medium mb-1">Atenção à criação de usuários</p>
            <span className="text-sm text-muted-foreground">
              Novos usuários só podem ser criados após realizarem o primeiro
              login usando o link mágico. Esse processo cadastra automaticamente
              o usuário na plataforma.
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
