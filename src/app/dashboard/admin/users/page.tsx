"use client";

import LoadingPage from "@/components/loading-page";
import React from "react";
import { TableUsers } from "./components/user-table";
import { User } from "@prisma/client";
import { getAllUsers } from "../_actions";

export default function Page() {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<User[]>([]);

  const fetchUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      if (res) {
        setUsers(res);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return <LoadingPage />;
  }

  return <TableUsers users={users} update={fetchUsers} />;
}
