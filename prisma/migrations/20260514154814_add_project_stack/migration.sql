-- CreateTable
CREATE TABLE "ProjectStack" (
    "id" SERIAL NOT NULL,
    "stackName" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectStack" ADD CONSTRAINT "ProjectStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
