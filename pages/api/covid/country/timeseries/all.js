import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient({ errorFormat: "pretty" });
  try {
    const cases = await prisma.covid_daily_timeseries_by_country.findMany();
    res.status(200).json(cases);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
