import Report from "@/model/report";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    // Find all reports
    const reports = await Report.find().select("-__v -reporterContact -files");
    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch reports", { status: 500 });
  }
};
