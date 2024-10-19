/*
  Warnings:

  - You are about to drop the column `goal_id` on the `habits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "habits" DROP CONSTRAINT "habits_goal_id_fkey";

-- AlterTable
ALTER TABLE "habits" DROP COLUMN "goal_id";

-- CreateTable
CREATE TABLE "habits_goals" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "habit_id" INTEGER NOT NULL,
    "goal_id" INTEGER NOT NULL,

    CONSTRAINT "habits_goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "habits_goals" ADD CONSTRAINT "habits_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habits_goals" ADD CONSTRAINT "habits_goals_habit_id_fkey" FOREIGN KEY ("habit_id") REFERENCES "habits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "habits_goals" ADD CONSTRAINT "habits_goals_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
