import { prisma } from "../config/prisma";
import {
  CreateWorkExperienceInput,
  UpdateWorkExperienceInput,
} from "../validations/work-experience.validation";

export const getAllWorkExperiences = async () => {
  return prisma.workExperience.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      skill: true,
    },
  });
};

export const getWorkExperienceById = async (id: number) => {
  return prisma.workExperience.findUnique({
    where: { id },
    include: {
      skill: true,
    },
  });
};

export const createWorkExperience = async (
  payload: CreateWorkExperienceInput
) => {
  const { skills, ...workExperienceData } = payload;

  return prisma.workExperience.create({
    data: {
      ...workExperienceData,
      skill: {
        create: skills?.map((skillName) => ({
          skillName,
        })),
      },
    },
    include: {
      skill: true,
    },
  });
};

export const updateWorkExperience = async (
  id: number,
  payload: UpdateWorkExperienceInput
) => {
  const { skills, ...workExperienceData } = payload;

  return prisma.$transaction(async (tx) => {
    if (skills) {
      await tx.skillWorkExperience.deleteMany({
        where: {
          workId: id,
        },
      });
    }

    return tx.workExperience.update({
      where: { id },
      data: {
        ...workExperienceData,
        ...(skills && {
          skill: {
            create: skills.map((skillName) => ({
              skillName,
            })),
          },
        }),
      },
      include: {
        skill: true,
      },
    });
  });
};

export const deleteWorkExperience = async (id: number) => {
  return prisma.workExperience.delete({
    where: { id },
  });
};