import User from "@/model/user";
import { AUTH_TOKEN } from "@/utils/constant";
import { connectToDB } from "@/utils/database";
import { extractFields } from "@/utils/helper";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const PATCH = async (req, { params }) => {
  const payload = await req.json();
  const secret = process.env.JWT_KEY || "";
  const cookieStore = cookies();
  const authToken = cookieStore.get(AUTH_TOKEN)?.value;

  if (!authToken) {
    return new Response(JSON.stringify({ error: "Unauthrorized user" }), {
      status: 401,
    });
  }

  try {
    const { isAdmin, _id } = verify(authToken, secret);

    if (!isAdmin && _id !== params.id) {
      return new Response(
        JSON.stringify({
          error: "Access limited to data owner or admin users only",
        }),
        {
          status: 403,
        }
      );
    }

    try {
      await connectToDB();
      
      const updateData = extractFields(
        payload,
        "_id position firstName middleName lastName image isAdmin"
      );

      const user = await User.findByIdAndUpdate(params.id, updateData, {
        new: true,
      }).select("-__v -password");

      if (!user)
        return new Response(JSON.stringify({ error: "User Not Found" }), {
          status: 404,
        });

      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      if (error.name === "MongoServerError" && error.code === 11000) {
        // Handle unique constraint violation (duplicate key error)
        const field = Object.keys(error.keyPattern)[0];
        const message = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already taken!`;
        console.error({ error: message });
        return new Response(JSON.stringify({ error: message }), {
          status: 400,
        });
      } else if (error.name === "ValidationError") {
        // Handle validation errors (e.g., "required" errors)
        const validationErrors = Object.values(error.errors).map(
          (error) => error.message
        );
        console.error({ error: validationErrors });
        return new Response(JSON.stringify({ error: validationErrors }), {
          status: 400,
        });
      } else {
        // Handle other errors
        console.error("Error saving user:", error);
        return new Response(JSON.stringify({ error: "Faild to fetch user" }), {
          status: 500,
        });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
};
