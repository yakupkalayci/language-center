-- CreateTable
CREATE TABLE "LearnedWord" (
    "id" TEXT NOT NULL,
    "learnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,

    CONSTRAINT "LearnedWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailySession" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,

    CONSTRAINT "DailySession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LearnedWord_userId_idx" ON "LearnedWord"("userId");

-- CreateIndex
CREATE INDEX "LearnedWord_wordId_idx" ON "LearnedWord"("wordId");

-- CreateIndex
CREATE UNIQUE INDEX "LearnedWord_userId_wordId_key" ON "LearnedWord"("userId", "wordId");

-- CreateIndex
CREATE INDEX "DailySession_userId_date_idx" ON "DailySession"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailySession_userId_wordId_date_key" ON "DailySession"("userId", "wordId", "date");

-- CreateIndex
CREATE INDEX "Word_userId_idx" ON "Word"("userId");

-- AddForeignKey
ALTER TABLE "LearnedWord" ADD CONSTRAINT "LearnedWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnedWord" ADD CONSTRAINT "LearnedWord_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailySession" ADD CONSTRAINT "DailySession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailySession" ADD CONSTRAINT "DailySession_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
