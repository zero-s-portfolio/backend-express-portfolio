import { prisma } from "../config/prisma";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../validations/project.validation";

export const getAllProjects = async () => {
  return prisma.projects.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      stack: true,
    },
  });
};

export const getProjectById = async (id: number) => {
  return prisma.projects.findUnique({
    where: { id },
    include: {
      stack: true,
    },
  });
};

export const createProject = async (
  payload: CreateProjectInput & {
    image?: string;
    hoverImage?: string;
  }
) => {
  const { stacks, ...projectData } = payload;

  return prisma.projects.create({
    data: {
      ...projectData,
      stack: {
        create: stacks?.map((stackName) => ({
          stackName,
        })),
      },
    },
    include: {
      stack: true,
    },
  });
};

export const updateProject = async (
  id: number,
  payload: UpdateProjectInput & {
    image?: string;
    hoverImage?: string;
  }
) => {
  const { stacks, ...projectData } = payload;

  return prisma.$transaction(async (tx) => {
    if (stacks) {
      await tx.projectStack.deleteMany({
        where: {
          projectId: id,
        },
      });
    }

    return tx.projects.update({
      where: { id },
      data: {
        ...projectData,
        ...(stacks && {
          stack: {
            create: stacks.map((stackName) => ({
              stackName,
            })),
          },
        }),
      },
      include: {
        stack: true,
      },
    });
  });
};

export const deleteProject = async (id: number) => {
  return prisma.projects.delete({
    where: { id },
  });
};