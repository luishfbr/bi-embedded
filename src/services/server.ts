"use server";

import { signIn } from "./auth";

export const MagicLink = async (email: string) => {
  await signIn("nodemailer", { email: email, redirect: false });
};
