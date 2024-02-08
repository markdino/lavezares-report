import Report from "@/model/report";
import { connectToDB } from "@/utils/database";
import { utapi } from "../../uploadthing/core";
import { AUTH_TOKEN } from "@/utils/constant";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const secret = process.env.JWT_KEY || "";

export const GET = async (req, { params }) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  const { id } = params;

  try {
    await connectToDB();

    const report = await Report.findById(id).select("-__v");
    if (!report)
      return new Response(JSON.stringify({ error: "Report Not Found" }), {
        status: 404,
      });

    const { isAdmin, _id } = verify(authToken, secret);

    if (report.creator && !isAdmin) {
      if (report.creator.toString() !== _id)
        return new Response(
          JSON.stringify({
            error: "Access limited to data owner or admin users only",
          }),
          {
            status: 403,
          }
        );
    }

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
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  const { id } = params;

  try {
    await connectToDB();

    const report = await Report.findById(id);

    if (!report)
      return new Response(JSON.stringify({ error: "Report Not Found" }), {
        status: 404,
      });

    const { _id } = verify(authToken, secret);

    if (!report.creator || report.creator?.toString() !== _id)
      return new Response(
        JSON.stringify({
          error: "Access limited to data owner only",
        }),
        {
          status: 403,
        }
      );

    const updateData = await req.json();

    report.overwrite(updateData);
    await report.save();

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
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  const { id } = params;

  try {
    await connectToDB();

    const report = await Report.findById(id).select("files");
    if (!report)
      return new Response(
        JSON.stringify({ error: "Report Not Found! No File Deleted" }),
        {
          status: 404,
        }
      );

    const { isAdmin, _id } = verify(authToken, secret);

    if (report.creator && !isAdmin) {
      if (report.creator.toString() !== _id)
        return new Response(
          JSON.stringify({
            error: "Access limited to data owner or admin users only",
          }),
          {
            status: 403,
          }
        );
    }

    // If report has a file(s), delete it from UTAPI server
    if (report.files?.length > 0) {
      await utapi.deleteFiles(report.files.map((file) => file.key));
    }

    const deletedReport = await Report.deleteOne({ _id: id });
    // {"acknowledged":true,"deletedCount":1}

    if (deletedReport.deletedCount <= 0)
      return new Response(
        JSON.stringify({
          error: "Sorry, Something Went Wrong! No File Deleted",
        }),
        {
          status: 404,
        }
      );

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
