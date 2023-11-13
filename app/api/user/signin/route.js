import User from "@/model/user";
import { serialize } from "cookie";
import { connectToDB } from "@/utils/database";
import { extractFields } from "@/utils/helper";
import { AUTH_TOKEN, MAX_AGE } from "@/utils/constant";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
    });
  }

  try {
    await connectToDB();

    //   Find if user email exist
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Incorrect Email or Password" }),
        { status: 400 }
      );
    }

    // Compare password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return new Response(
        JSON.stringify({ error: "Incorrect Email or Password" }),
        { status: 400 }
      );
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
      path: "/",
    });

    // Return the user id with token
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      // Handle unique constraint violation (duplicate key error)
      const field = Object.keys(error.keyPattern)[0];
      const message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } already taken!`;
      console.error({ error: message });
      return new Response(JSON.stringify({ error: message }), { status: 400 });
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
      return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
      });
    }
  }
};
