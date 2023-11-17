import Report from "@/model/report";
import { connectToDB } from "@/utils/database";
import { removeEmptyProperties } from "@/utils/helper";

export const POST = async (req) => {
  const payload = await req.json();
  const reportData = removeEmptyProperties(payload);

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
