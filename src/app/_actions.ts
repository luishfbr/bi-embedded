"use server";

import { auth, signIn, signOut } from "@/services/auth";

export const LoginWithMagicLink = async (email: string) => {
  await signIn("nodemailer", {
    email,
    redirectTo: "/dashboard",
  });
};

export const Logout = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const GetSession = async () => {
  const res = await auth();
  if (res) {
    return true;
  }
  return null;
};
