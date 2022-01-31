-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WatchList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "watched" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
