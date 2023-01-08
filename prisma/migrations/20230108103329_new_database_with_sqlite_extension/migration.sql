-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "currentPost" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "URLS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "URLS_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_emailId_key" ON "Student"("emailId");
