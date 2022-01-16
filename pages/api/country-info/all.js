import { prisma } from "../../../prisma/db";

export default async function (req, res) {
  try {
    const result = await prisma.$queryRaw`
      SELECT country
      FROM countries
      ORDER BY country ASC
    `;
    res.status(200).json(result?.map((country) => country.country));
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
