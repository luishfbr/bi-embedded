import type { Session, User } from "@prisma/client";

export interface SessionProps {
  user: User;
  session: Session;
}
