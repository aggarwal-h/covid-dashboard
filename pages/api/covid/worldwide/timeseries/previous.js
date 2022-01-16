import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    let days = req.query.days ? parseInt(req.query.days) || 7 : 7;
    days = days + " days";

    const total = await prisma.$queryRaw`
      SELECT 
        total_cases, 
        total_deaths,
        new_cases,
        new_deaths
      FROM covid_timeseries_by_country
      WHERE country = 'World' AND date = (SELECT MAX(date) FROM covid_timeseries_by_country)
    `;

    const cases = await prisma.$queryRaw`
      SELECT date, SUM(new_cases) as total_cases, SUM(new_deaths) as total_deaths 
      FROM covid_timeseries_by_country
      WHERE date > CURRENT_DATE - ${days}::TEXT::INTERVAL
      GROUP BY date
      ORDER BY date ASC
    `;

    res.status(200).json({ ...total[0], cases });
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
