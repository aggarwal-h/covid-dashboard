import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    let days = req.query.days ? parseInt(req.query.days) || 7 : 7;
    days = days + " days";

    const total = await prisma.$queryRaw`
      SELECT 
        cumulative_cases as total_cases, 
        cumulative_deaths as total_deaths,
        new_cases,
        new_deaths
      FROM covid_country_aggregated_view
      WHERE country = 'World' AND date = (SELECT MAX(date) FROM covid_country_aggregated_view)
    `;

    const cases = await prisma.$queryRaw`
      SELECT date, new_cases as total_cases, new_deaths as total_deaths 
      FROM covid_country_aggregated_view
      WHERE country = 'World' AND date > CURRENT_DATE - ${days}::TEXT::INTERVAL
      ORDER BY date ASC
    `;

    res.status(200).json({ ...total[0], cases });
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
