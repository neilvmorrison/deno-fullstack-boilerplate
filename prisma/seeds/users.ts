import { PrismaClient } from "../../generated/client/deno/index.d.ts";

const users = [
  {
    email: "poweruser@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm", // "password123"
    username: "GallowBoob",
    biography: "Professional Reddit enthusiast and power user",
  },
  {
    email: "memer@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "PM_ME_YOUR_MEMES",
    biography: "Meme connoisseur and professional lurker",
  },
  {
    email: "f1fan@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "MaxVerstappen33",
    biography: "Formula 1 enthusiast | Red Bull Racing Fan | Dutch GP attendee",
  },
  {
    email: "nascarfan@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "DaleEarnhardtJrFan",
    biography: "NASCAR superfan | Talladega nights are the best nights",
  },
  {
    email: "hockey@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "StanleyCupDreams",
    biography:
      "Hockey is life | Season ticket holder | Fantasy league champion",
  },
  {
    email: "storyteller@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "poem_for_your_sprog",
    biography: "I write poems about random Reddit threads",
  },
  {
    email: "scientist@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "UnidanX",
    biography: "Explaining science one comment at a time",
  },
  {
    email: "moderator@test.com",
    password: "$2a$10$k87L/MF28WMM.2/uFg1GQOKpY.PKio0c.VqbR1FtL.6PXpVFvQYLm",
    username: "AutoModerator_IRL",
    biography: "I moderate 100+ subreddits and haven't seen sunlight in years",
  },
];

export async function seedUsers(prisma: PrismaClient) {
  console.log("Seeding users...");

  for (const userData of users) {
    const { email, password, username, biography } = userData;

    const user = await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        email,
        password,
        updated_at: new Date(),
        user_profiles: {
          create: [
            {
              id: crypto.randomUUID(),
              username,
              biography,
              updated_at: new Date(),
            },
          ],
        },
      },
      include: {
        user_profiles: true,
      },
    });

    console.log(
      `Created user: ${user.email} with profile: ${
        user.user_profiles[0].username
      }`,
    );
  }
}
