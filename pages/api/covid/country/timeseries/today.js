import { PrismaClient } from "@prisma/client";
import moment from "moment";

export default async function (req, res) {
  const prisma = new PrismaClient({ errorFormat: "pretty" });
  try {
    const cases = await prisma.covid_daily_timeseries_by_country.findMany({
      where: {
        date: moment().subtract(1, "days").startOf("day").toDate(),
      },
    });
    let transformedCases = {};
    for (let i = 0; i < cases.length; i++) {
      const current_case = cases[i];
      transformedCases[current_case.country] = current_case;
    }
    res.status(200).json(transformedCases);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
