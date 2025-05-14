"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

const buttons = [
  { label: "Início", path: "/dashboard/admin" },
  { label: "Usuários", path: "/dashboard/admin/users" },
  { label: "Grupos", path: "/dashboard/admin/groups" },
  { label: "Painéis", path: "/dashboard/admin/panels" },
];

export default function TopBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-2 items-center justify-center w-full border-b pb-2">
      {buttons.map(({ label, path }) => {
        const isActive = pathname === path;

        return (
          <Button
            key={path}
            variant={isActive ? "secondary" : "outline"}
            disabled={isActive}
            onClick={() => router.push(path)}
            className="cursor-pointer"
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
