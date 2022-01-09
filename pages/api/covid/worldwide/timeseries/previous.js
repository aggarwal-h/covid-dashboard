import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    let days = req.query.days ? parseInt(req.query.days) || 7 : 7;
    days = days + " days";

    const total = await prisma.$queryRaw`
      SELECT SUM(cumulative_cases) as total_cases, SUM(cumulative_deaths) as total_deaths
      FROM covid_timeseries
      WHERE date = (SELECT MAX(date) FROM covid_timeseries)
      GROUP BY date`;

    const cases = await prisma.$queryRaw`
    SELECT date, SUM(new_cases) as new_cases, SUM(new_deaths) as new_deaths 
    FROM covid_timeseries
    WHERE date > CURRENT_DATE - ${days}::TEXT::INTERVAL
    GROUP BY date 
    ORDER BY date ASC`;

    res.status(200).json({ ...total[0], cases });
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
