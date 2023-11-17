import User from "@/model/user";
import { serialize } from "cookie";
import { connectToDB } from "@/utils/database";
import { AUTH_TOKEN, MAX_AGE } from "@/utils/constant";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const GET = async () => {
  const secret = process.env.JWT_KEY || "";
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN).value;

  if (!authToken) {
    return new Response("Already signout", {
      status: 200,
    });
  }

  try {
    const decoded = verify(authToken, secret);

    try {
      await connectToDB();

      //   Find if user exist
      const user = await User.findById(decoded._id);
      if (!user) {
        return new Response("Already signout. User doesn't exist", {
          status: 200,
        });
      }

      const token = user.generateAuthToken();
      const serialized = serialize(AUTH_TOKEN, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE * -1,
        path: "/",
      });

      // Signout user by returnning expired token
      return new Response("User signout successfully", {
        status: 200,
        headers: { "Set-Cookie": serialized },
      });
    } catch (error) {
      return new Response("Already signout", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(`Already singout. ${error.message}`, {
      status: 200,
    });
  }
};
