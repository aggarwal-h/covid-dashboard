import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    // const result = await prisma.$queryRaw`
    //   SELECT
    //     date,
    //     cumulative_cases as cumulative_cases,
    //     cumulative_deaths as cumulative_deaths,
    //     new_cases as new_cases,
    //     new_deaths as new_deaths
    //   FROM covid_country_aggregated_view
    //   WHERE country = 'World'
    //   ORDER BY date ASC
    // `;

    const result = await prisma.$queryRaw`
    SELECT
    date,
    total_cases as cumulative_cases,
    total_deaths as cumulative_deaths,
    new_cases,
    new_deaths
  FROM covid_timeseries_by_country
  WHERE country = 'World'
  ORDER BY date ASC
  `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
