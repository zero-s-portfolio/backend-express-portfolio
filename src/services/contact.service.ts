import { prisma } from "../config/prisma";

export class ContactService {
  static async create(data: {
    name?: string;
    email: string;
    subject?: string;
    message: string;
    category?: "GENERAL" | "FREELANCE" | "COLLABORATION" | "CONSULTATION" | "BUG";
    ipAddress?: string;
    userAgent?: string;
  }) {
    return prisma.contactMessage.create({
      data: {
        name: data.name || "Anonymous",
        email: data.email,
        subject: data.subject,
        message: data.message,
        category: data.category || "GENERAL",
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }

  static async getAll() {
    return prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getById(id: number) {
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  }

  static async updateStatus(id: number, status: any) {
    return prisma.contactMessage.update({
      where: { id },
      data: { status },
    });
  }

  static async reply(id: number, replyMessage: string) {
    return prisma.contactMessage.update({
      where: { id },
      data: {
        replyMessage,
        status: "REPLIED",
        repliedAt: new Date(),
      },
    });
  }

  static async toggleStar(id: number) {
    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      throw new Error("Contact message not found");
    }

    return prisma.contactMessage.update({
      where: { id },
      data: {
        isStarred: !message.isStarred,
      },
    });
  }

  static async delete(id: number) {
    return prisma.contactMessage.delete({
      where: { id },
    });
  }
}