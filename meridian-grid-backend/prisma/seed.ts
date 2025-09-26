import { PrismaClient, Role, MachineType } from "@prisma/client";
import bcrypt from "bcrypt";
import "dotenv/config";

const prisma = new PrismaClient();
const adminEmail = process.env.ADMIN_APP_USER;
const adminPassword = process.env.ADMIN_APP_PASSWORD;

async function main(): Promise<void> {
  try {
    if (!adminEmail || !adminPassword) {
      throw new Error(
        "ADMIN_APP_USER and ADMIN_APP_PASSWORD must be set in your .env file"
      );
    }

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        role: Role.ADMIN,
      },
    });

    await prisma.user.create({
      data: {
        email: "operator1@meridian.grid.com",
        password: await bcrypt.hash("IAmOperator@123", 10),
        role: Role.OPERATOR,
      },
    });

    await prisma.machine.create({
      data: {
        name: "Simulator Alpha",
        type: MachineType.SIMULATOR,
        user: {
          connect: {
            id: adminUser.id,
          },
        },
      },
    });

    return await Promise.resolve();
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.error("An unexpected error occurred:", e);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
