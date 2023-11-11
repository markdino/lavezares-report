import User from "@/model/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email)
    return new Response(JSON.stringify({ error: "Incorrect query" }), {
      status: 400,
    });

  try {
    await connectToDB();
    const users = await User.exists({ email });

    if (!users) {
      return new Response(JSON.stringify({ error: "Email not found" }), {
        status: 404,
      });
    }

    return new Response("Email is registered", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
