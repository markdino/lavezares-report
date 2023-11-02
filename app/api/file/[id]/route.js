import { utapi } from "../../uploadthing/core";

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    const response = await utapi.deleteFiles(id);
    console.log(response);
    if (!response?.success) {
      return new Response(
        JSON.stringify({ ...response, error: "Failed to delete file" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error.message);

    return new Response(JSON.stringify({ error: "UploadThing Server Error" }), {
      status: 500,
    });
  }
};
