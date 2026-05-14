-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillWorkExperience" (
    "id" SERIAL NOT NULL,
    "skillName" TEXT NOT NULL,
    "workId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkillWorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT,
    "hoverImage" TEXT,
    "description" TEXT,
    "hoverDescription" TEXT,
    "period" TEXT,
    "gradient" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SettingSection" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "icon" TEXT,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SettingSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SettingSection_key_key" ON "SettingSection"("key");

-- AddForeignKey
ALTER TABLE "SkillWorkExperience" ADD CONSTRAINT "SkillWorkExperience_workId_fkey" FOREIGN KEY ("workId") REFERENCES "WorkExperience"("id") ON DELETE CASCADE ON UPDATE CASCADE;
