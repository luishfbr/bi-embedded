"use server";

import { auth, signIn, signOut } from "@/services/auth";

export const LoginWithMagicLink = async (email: string) => {
  const res = await signIn("nodemailer", {
    email,
    redirect: false,
  });

  if (res?.error) {
    return false;
  }
};

export const Logout = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const GetSession = async () => {
  const res = await auth();
  if (res) {
    return res;
  }
  return null;
};
