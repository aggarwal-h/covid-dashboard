import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    const result = await prisma.$queryRaw`
      SELECT
        date,
        SUM(cumulative_cases) as cumulative_cases,
        SUM(cumulative_deaths) as cumulative_deaths,
        SUM(new_cases) as new_cases,
        SUM(new_deaths) as new_deaths
      FROM covid_timeseries
      GROUP BY date
      ORDER BY date ASC
    `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
