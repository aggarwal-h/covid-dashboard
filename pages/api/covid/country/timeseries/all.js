import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    const cases = await prisma.covid_daily_timeseries_by_country.findMany();
    res.status(200).json(cases);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
