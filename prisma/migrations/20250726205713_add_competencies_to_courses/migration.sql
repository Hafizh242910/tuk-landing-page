/*
  Warnings:

  - You are about to drop the column `description` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `courses` table. All the data in the column will be lost.
  - You are about to drop the column `shortTitle` on the `courses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `courses_shortTitle_key` ON `courses`;

-- AlterTable
ALTER TABLE `courses` DROP COLUMN `description`,
    DROP COLUMN `duration`,
    DROP COLUMN `price`,
    DROP COLUMN `shortTitle`,
    ADD COLUMN `competencies` TEXT NULL;
