-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "linkedIn" TEXT NOT NULL DEFAULT '',
    "mobile" TEXT NOT NULL DEFAULT '',
    "emailId" TEXT NOT NULL,
    "currentPost" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Student" ("currentPost", "emailId", "firstName", "id", "lastName", "linkedIn", "mobile") SELECT "currentPost", "emailId", "firstName", "id", "lastName", "linkedIn", "mobile" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
CREATE UNIQUE INDEX "Student_emailId_key" ON "Student"("emailId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
