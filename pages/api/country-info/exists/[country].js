import { prisma } from "../../../../prisma/db";

export default async function (req, res) {
  const { country } = req.query;
  try {
    const result = await prisma.$queryRaw`
    SELECT EXISTS 
      (SELECT country_name 
        FROM countries 
        WHERE LOWER(country_name) = LOWER(${country})
      )`;
    res.status(200).json(result[0].exists);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases.", e });
  } finally {
    await prisma.$disconnect();
  }
}
