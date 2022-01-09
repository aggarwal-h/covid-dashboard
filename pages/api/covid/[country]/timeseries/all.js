import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  const { country } = req.query;
  try {
    const result = await prisma.$queryRaw`
      SELECT 
        country_name, 
        date, 
        SUM(cumulative_cases) as cumulative_cases, 
        SUM(cumulative_deaths) as cumulative_deaths, 
        SUM(new_cases) as new_cases, 
        SUM(new_deaths) as new_deaths
      FROM covid_timeseries 
      WHERE LOWER(country_name) = LOWER(${country})
      GROUP BY country_name, date
    `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
