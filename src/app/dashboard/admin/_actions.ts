"use server";

import { prisma } from "@/services/prisma";
import type { Panel } from "@prisma/client";

// User management actions

export const setAdmin = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Error setting admin:", error);
  }
};

export const removeAdmin = async (userId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "user",
      },
    });
  } catch (error) {
    console.error("Error removing admin:", error);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const insertUserOnGroup = async (userId: string, groupId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        groups: {
          connect: { id: groupId },
        },
      },
    });
  } catch (error) {
    console.error("Error inserting user on group:", error);
  }
};

export const removeUserFromGroup = async (userId: string, groupId: string) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        groups: {
          disconnect: { id: groupId },
        },
      },
    });
  } catch (error) {
    console.error("Error removing user from group:", error);
  }
};

export const getUserGroups = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { groups: true },
    });
    return user?.groups || [];
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return [];
  }
};

// Group management actions
export const getAllGroups = async () => {
  try {
    const groups = await prisma.group.findMany();
    return groups;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
};

export const getGroupById = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });
    return group;
  } catch (error) {
    console.error("Error fetching group:", error);
    return null;
  }
};

export const createGroup = async (name: string) => {
  try {
    const group = await prisma.group.create({
      data: { name },
    });
    return group;
  } catch (error) {
    console.error("Error creating group:", error);
    return null;
  }
};

export const updateGroup = async (groupId: string, name: string) => {
  try {
    const group = await prisma.group.update({
      where: { id: groupId },
      data: { name },
    });
    return group;
  } catch (error) {
    console.error("Error updating group:", error);
    return null;
  }
};

export const deleteGroup = async (groupId: string) => {
  try {
    await prisma.group.delete({
      where: { id: groupId },
    });
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};

export const getGroupUsers = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { users: true },
    });
    return group?.users || [];
  } catch (error) {
    console.error("Error fetching group users:", error);
    return [];
  }
};

// Panel management actions

export const getAllPanels = async () => {
  try {
    const panels = await prisma.panel.findMany();
    return panels;
  } catch (error) {
    console.error("Error fetching panels:", error);
    return [];
  }
};

export const getPanelById = async (panelId: string) => {
  try {
    const panel = await prisma.panel.findUnique({
      where: { id: panelId },
    });
    return panel;
  } catch (error) {
    console.error("Error fetching panel:", error);
    return null;
  }
};

export const createPanel = async (data: Panel) => {
  try {
    const panel = await prisma.panel.create({
      data: {
        ...data,
        groupId: "none", // Default group ID
      },
    });
    return panel;
  } catch (error) {
    console.error("Error creating panel:", error);
    return null;
  }
};

export const updatePanel = async (panelId: string, data: Partial<Panel>) => {
  try {
    const panel = await prisma.panel.update({
      where: { id: panelId },
      data,
    });
    return panel;
  } catch (error) {
    console.error("Error updating panel:", error);
    return null;
  }
};

export const deletePanel = async (panelId: string) => {
  try {
    await prisma.panel.delete({
      where: { id: panelId },
    });
  } catch (error) {
    console.error("Error deleting panel:", error);
  }
};

export const getPanelByGroupId = async (groupId: string) => {
  try {
    const panels = await prisma.panel.findMany({
      where: { groupId },
    });
    return panels;
  } catch (error) {
    console.error("Error fetching panels by group ID:", error);
    return [];
  }
};

export const insertPanelOnGroup = async (panelId: string, groupId: string) => {
  try {
    await prisma.panel.update({
      where: { id: panelId },
      data: {
        groupId,
      },
    });
  } catch (error) {
    console.error("Error inserting panel on group:", error);
  }
};

export const removePanelFromGroup = async (panelId: string) => {
  try {
    await prisma.panel.update({
      where: { id: panelId },
      data: {
        groupId: "none",
      },
    });
  } catch (error) {
    console.error("Error removing panel from group:", error);
  }
};
