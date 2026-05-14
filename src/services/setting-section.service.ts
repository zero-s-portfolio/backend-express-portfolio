import { prisma } from "../config/prisma";
import {
  CreateSettingSectionInput,
  UpdateSettingSectionInput,
} from "../validations/setting-section.validation";

export const getAllSettingSections = async () => {
  return prisma.settingSection.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSettingSectionById = async (id: number) => {
  return prisma.settingSection.findUnique({
    where: { id },
  });
};

export const getSettingSectionByKey = async (key: string) => {
  return prisma.settingSection.findUnique({
    where: { key },
  });
};

export const createSettingSection = async (
  payload: CreateSettingSectionInput & { icon?: string }
) => {
  return prisma.settingSection.create({
    data: payload,
  });
};

export const updateSettingSection = async (
  id: number,
  payload: UpdateSettingSectionInput & { icon?: string }
) => {
  return prisma.settingSection.update({
    where: { id },
    data: payload,
  });
};

export const deleteSettingSection = async (id: number) => {
  return prisma.settingSection.delete({
    where: { id },
  });
};