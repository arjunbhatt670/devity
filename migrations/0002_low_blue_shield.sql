-- Step 1: Add the column as nullable first
ALTER TABLE "guestbook" ADD COLUMN "htmlContent" text;

-- Step 2: Update all existing NULL values to empty string (or your preferred default)
UPDATE "guestbook" SET "htmlContent" = '' WHERE "htmlContent" IS NULL;

-- Step 3: Now add the NOT NULL constraint
ALTER TABLE "guestbook" ALTER COLUMN "htmlContent" SET NOT NULL;