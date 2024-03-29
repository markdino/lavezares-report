import { createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { UPLOAD_FILES } from "@/utils/constant";

export const utapi = new UTApi();

const { imageUploader, mediaPost, profile } = UPLOAD_FILES;
const f = createUploadthing();

const auth = (req) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: imageUploader.image.maxFileSize,
      maxFileCount: imageUploader.image.maxFileCount,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  profile: f({
    image: {
      maxFileSize: profile.image.maxFileSize,
      maxFileCount: profile.image.maxFileCount,
    },
  })
    .middleware((req) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
  mediaPost: f({
    image: {
      maxFileSize: mediaPost.image.maxFileSize,
      maxFileCount: mediaPost.image.maxFileCount,
    },
    video: {
      maxFileSize: mediaPost.video.maxFileSize,
      maxFileCount: mediaPost.video.maxFileCount,
    },
  })
    .middleware((req) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
};
