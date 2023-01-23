-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "linkedIn" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "currentPost" TEXT NOT NULL
);
INSERT INTO "new_Student" ("currentPost", "emailId", "firstName", "id", "lastName", "linkedIn", "mobile") SELECT "currentPost", "emailId", "firstName", "id", "lastName", "linkedIn", "mobile" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_emailId_key" ON "Student"("emailId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
