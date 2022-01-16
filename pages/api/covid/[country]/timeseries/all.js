import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  const { country } = req.query;
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        date, 
        total_cases as cumulative_cases, 
        total_deaths as cumulative_deaths, 
        new_cases, 
        new_deaths
      FROM covid_timeseries_by_country 
      WHERE LOWER(country) = LOWER(${country})
      ORDER BY date ASC
    `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
