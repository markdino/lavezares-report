import Report from "@/model/report";
import User from "@/model/user";
import { AUTH_TOKEN } from "@/utils/constant";
import { connectToDB } from "@/utils/database";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async (req) => {
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN).value;
  const secret = process.env.JWT_KEY || "";

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  try {
    const { _id, isAdmin } = verify(authToken, secret);
    const dataQuery = isAdmin ? {} : { _id };
    try {
      await connectToDB();
      // Find all reports
      const reports = await Report.find(dataQuery)
        .select("-__v -reporterContact -files")
        .populate({
          path: "creator",
          select: "isAdmin",
          model: User,
        });
      return new Response(JSON.stringify(reports), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch reports", { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
};
