// import { PrismaClient } from "../generated/client/deno/index.d.ts";
import { seedUsers } from "./seeds/users.ts";
import { seedCommunities } from "./seeds/communities.ts";
import { seedPosts } from "./seeds/posts.ts";
import { seedComments } from "./seeds/comments.ts";
import { seedVotes } from "./seeds/votes.ts";
import prisma from "./prisma.ts";

async function main() {
  try {
    console.log("Starting seed...");

    // Order matters due to relationships
    await seedUsers(prisma);
    await seedCommunities(prisma);
    await seedPosts(prisma);
    await seedComments(prisma);
    await seedVotes(prisma);

    console.log("Seed completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed
if (import.meta.main) {
  main()
    .then(() => {
      console.log("Seeding complete!");
      Deno.exit(0);
    })
    .catch((error) => {
      console.error(error);
      Deno.exit(1);
    });
}
