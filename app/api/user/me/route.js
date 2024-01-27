import User from "@/model/user";
import { serialize } from "cookie";
import { connectToDB } from "@/utils/database";
import { extractFields } from "@/utils/helper";
import { AUTH_TOKEN, MAX_AGE } from "@/utils/constant";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

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
    const decoded = verify(authToken, secret);

    try {
      await connectToDB();

      //   Find if user exist
      const user = await User.findById(decoded._id);
      if (!user) {
        return new Response(JSON.stringify({ error: "User Not Found" }), {
          status: 404,
        });
      }

      const responseData = extractFields(
        user,
        "_id position firstName middleName lastName image isAdmin"
      );

      const token = user.generateAuthToken();
      const serialized = serialize(AUTH_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        path: "/",
      });

      // Return the user id with token
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { "Set-Cookie": serialized },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
};
