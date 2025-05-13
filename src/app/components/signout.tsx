"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Logout } from "../_actions";

export default function SignOut() {
  const handleLogout = async () => {
    await Logout();
  };
  return <Button onClick={handleLogout}>Sair</Button>;
}
