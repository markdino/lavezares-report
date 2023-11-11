import User from "@/model/user";
import { connectToDB } from "@/utils/database";
import { extractFields } from "@/utils/helper";

export const POST = async (req) => {
  const IS_ADMIN = false;
  const payload = await req.json();
  const userPayload = extractFields(
    payload,
    "email password position firstName lastName middleName image isAdmin"
  );

  //   Prevent none admin user to create admin user
  if (userPayload?.isAdmin && !IS_ADMIN) {
    delete userPayload.isAdmin;
  }

  try {
    await connectToDB();

    // Create user
    const newUser = new User(userPayload);
    await newUser.save();
    const { _id } = newUser;

    // Return the user id
    return new Response(JSON.stringify({ userId: _id }), { status: 201 });
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
