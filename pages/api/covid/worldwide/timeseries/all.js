import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient({ errorFormat: "pretty" });
  try {
    const result = await prisma.$queryRaw`
      SELECT date, SUM(new_cases) as new_cases 
      FROM covid_daily_timeseries_by_country 
      GROUP BY date 
      ORDER BY date ASC`;

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
