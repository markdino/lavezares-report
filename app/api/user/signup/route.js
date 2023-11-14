import User from "@/model/user";
import { serialize } from "cookie";
import { connectToDB } from "@/utils/database";
import { extractFields } from "@/utils/helper";
import { AUTH_TOKEN, MAX_AGE } from "@/utils/constant";
import bcrypt from "bcrypt";


export const POST = async (req) => {
  const salt = await bcrypt.genSalt(10);
  const payload = await req.json();
  const userPayload = extractFields(
    payload,
    "email password position firstName lastName middleName image"
  );

  // Encrypt password
  userPayload.password = await bcrypt.hash(userPayload.password, salt);

  try {
    await connectToDB();

    // Create user
    const newUser = new User(userPayload);
    await newUser.save();
    const responseData = extractFields(
      newUser,
      "_id position firstName middleName lastName image"
    );

    const token = newUser.generateAuthToken();

    const serialized = serialize(AUTH_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    // Return the user id with token
    return new Response(JSON.stringify(responseData), {
      status: 201,
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
