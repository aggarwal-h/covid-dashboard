import { prisma } from "../../../../../prisma/db";

export default async function (req, res) {
  try {
    // TODO: Fix below aggregated view for China's data
    const result = await prisma.$queryRaw`
        SELECT * 
        FROM covid_timeseries_by_country NATURAL JOIN countries 
        WHERE 
          date = (
            SELECT MAX(date) 
            FROM covid_timeseries_by_country
          )
        ORDER BY total_cases DESC
      `;
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
