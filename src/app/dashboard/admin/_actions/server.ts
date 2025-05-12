"use server";

import prisma from "@/lib/prisma";

export const createUser = async (data: UserToCreate) => {
  try {
    const res = await prisma.user.create({
      data,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
