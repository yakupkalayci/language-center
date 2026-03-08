/*
  Warnings:

  - You are about to drop the `ExampleSentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SimilarWord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `examples` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `synonyms` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExampleSentence" DROP CONSTRAINT "ExampleSentence_wordId_fkey";

-- DropForeignKey
ALTER TABLE "SimilarWord" DROP CONSTRAINT "SimilarWord_wordId_fkey";

-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "examples" TEXT NOT NULL,
ADD COLUMN     "synonyms" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExampleSentence";

-- DropTable
DROP TABLE "SimilarWord";
