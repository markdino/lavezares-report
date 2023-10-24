import Report from "@/model/report"
import { connectToDB } from "@/utils/database"

export const POST = async (req) => {
  const reportData = await req.json();

  try {
    await connectToDB();

    // Create report
    const newReport = new Report(reportData);
    await newReport.save();
    const { _id } = newReport;

    // Return the report id
    return new Response(JSON.stringify({ reportId: _id }), { status: 201 });
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ error: "Server error! Failed to create report" }),
      {
        status: 500,
      }
    );
  }
};
