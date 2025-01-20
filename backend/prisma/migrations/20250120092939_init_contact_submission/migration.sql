-- CreateTable
CREATE TABLE "ContactUsSubmission" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "subject" VARCHAR(200) NOT NULL,
    "message" TEXT NOT NULL,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactUsSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactUsSubmission_email_subject_idx" ON "ContactUsSubmission"("email", "subject");

-- CreateIndex
CREATE INDEX "ContactUsSubmission_createdAt_idx" ON "ContactUsSubmission"("createdAt");
