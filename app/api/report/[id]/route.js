import Report from "@/model/report";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const report = await Report.findById(id).select("-__v");
    if (!report)
      return new Response(JSON.stringify({ error: "Report Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(report), { status: 201 });
  } catch (error) {
    console.log(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(JSON.stringify({ error: "Invalid Report ID" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PUT = async (req, { params }) => {
  const updateData = await req.json();
  const { id } = params;
console.log({updateData})
  try {
    await connectToDB();

    const report = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-__v");

    if (!report)
      return new Response(JSON.stringify({ error: "Report Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(report), { status: 200 });
  } catch (error) {
    console.error(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(JSON.stringify({ error: "Invalid Report ID" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const report = await Report.deleteOne({ _id: id});
    // {"acknowledged":true,"deletedCount":1}

    if (!report || report.deletedCount <= 0)
      return new Response(JSON.stringify({ error: "No File Deleted! Report Not Found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(report), { status: 200 });
  } catch (error) {
    console.log(error.message);
    if (error.name === "CastError" && error.path === "_id") {
      return new Response(JSON.stringify({ error: "Invalid Report ID" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
