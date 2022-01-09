import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    // TODO: Fix below query for China's data
    const result = await prisma.$queryRaw`
      SELECT
        country_name as country,
        country_alpha_2_code as country_code,
        date,
        SUM(cumulative_cases) as cumulative_cases,
        SUM(cumulative_deaths) as cumulative_deaths,
        SUM(new_cases) as new_cases,
        SUM(new_deaths) as new_deaths
      FROM covid_timeseries NATURAL JOIN countries
      WHERE date = CURRENT_DATE - INTERVAL '1 days'
      GROUP BY country_name, country_alpha_2_code, date
      ORDER BY cumulative_cases DESC
    `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
