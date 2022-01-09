import { prisma } from "../../../../../prisma/db";
import moment from "moment";

export default async function (req, res) {
  try {
    const cases = await prisma.covidtimeseriesworldwide.findMany({
      where: {
        date: moment().subtract(1, "days").startOf("day").toDate(),
      },
    });
    res.status(200);
    res.json(cases);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch all cases." });
  } finally {
    await prisma.$disconnect();
  }
}
