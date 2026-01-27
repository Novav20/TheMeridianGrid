import { PrismaClient, AssetState } from "@tmg/shared";

export async function seedTestData(prisma: PrismaClient) {
  console.log("Starting test data seeding...");

  // 1. Create a Test Asset (Industrial Pump)
  const asset = await prisma.asset.upsert({
    where: { name: "Pump-01" },
    update: {},
    create: {
      name: "Pump-01",
      state: AssetState.ACTIVE,
      model: {
        manufacturer: "Grundfos",
        type: "Centrifugal",
        power: "5.5kW"
      },
      metadata: {
        location: "Sector A",
        site: "Main Plant"
      },
      heartbeatTimeout: 60
    }
  });

  // 2. Generate Sample Telemetry (Last 10 minutes)
  const now = new Date();
  const telemetryPoints = [];

  for (let i = 0; i < 10; i++) {
    const time = new Date(now.getTime() - i * 60000); // 1 point per minute
    telemetryPoints.push({
      time,
      assetId: asset.id,
      propertyName: "temperature",
      value: 40 + Math.random() * 10 // Random temp between 40-50
    });
  }

  // Use createMany for efficiency
  await prisma.telemetry.createMany({
    data: telemetryPoints,
    skipDuplicates: true
  });

  console.log(`Test data seeding completed. Created asset ${asset.name} with 10 telemetry points.`);
}
