import { prisma } from "../config/prisma";
import {
  CreateSkillInput,
  UpdateSkillInput,
} from "../validations/skill.validation";

export const getAllSkills = async () => {
  return prisma.skill.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSkillById = async (id: number) => {
  return prisma.skill.findUnique({
    where: { id },
  });
};

export const createSkill = async (
  payload: CreateSkillInput & { image?: string }
) => {
  return prisma.skill.create({
    data: payload,
  });
};

export const updateSkill = async (
  id: number,
  payload: UpdateSkillInput & { image?: string }
) => {
  return prisma.skill.update({
    where: { id },
    data: payload,
  });
};

export const deleteSkill = async (id: number) => {
  return prisma.skill.delete({
    where: { id },
  });
};