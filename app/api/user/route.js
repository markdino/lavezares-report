import User from "@/model/user";
import { AUTH_TOKEN } from "@/utils/constant";
import { connectToDB } from "@/utils/database";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async () => {
  const secret = process.env.JWT_KEY || "";
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  try {
    const { isAdmin } = verify(authToken, secret);

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: "Access limited to admin users only" }),
        {
          status: 403,
        }
      );
    }

    try {
      await connectToDB();
      // Find all users
      const users = await User.find().select("-__v");

      return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch users", { status: 500 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
};
