"use client";
import Image from "next/image";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import imagePlaceholder from "@/assets/img/image-placeholder.png";
import videoPlaceholder from "@/assets/img/video-placeholder.png";
import { isVideo } from "@/utils/validation";
import { Spinner } from "@/components/client";
import { useState } from "react";
import { deleteFile } from "@/services/api";

const MediaFile = ({
  filePath,
  fileName,
  fileId,
  alt,
  onClose = () => {},
  readOnly,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    deleteFile({
      fileId,
      onSubmit: () => {
        setIsLoading(true);
        setError(null);
      },
      onSuccess: () => {
        setIsLoading(false);
        onClose();
      },
      onFailed: ({ status, data }) => {
        setIsLoading(false);
        setError({ status, message: data.error });
      },
    });
  };

  return (
    <section className="w-36 max-h-40 flex flex-col justify-end relative overflow-hidden p-3">
      {!readOnly && !isLoading && (
        <DisabledByDefaultIcon
          className="absolute top-0 right-0 lg:text-gray-900/10 hover:text-red-800 text-red-800 cursor-pointer"
          onClick={handleDelete}
        />
      )}
      {isLoading ? (
        <section className="absolute inset-0 flex justify-center items-center pb-1">
          <Spinner className="h-8 w-8" />
        </section>
      ) : (
        error && (
          <section className="absolute inset-0 flex flex-col gap-2 justify-center items-center pb-1">
            <section className="bg-red-500/30 text-red-900 p-2 rounded-full">
              <WarningRoundedIcon />
            </section>
            <section className="bg-red-100/50 px-2 py-1 rounded-full">
              <p className="text-red-900 text-xs text-center">
                {error.message || "Something went wrong"}
              </p>
            </section>
          </section>
        )
      )}
      <a className="flex flex-col items-center" href={filePath} target="_blank">
        <Image
          src={isVideo(fileName) ? videoPlaceholder.src : filePath}
          placeholder="blur"
          blurDataURL={
            isVideo(fileName) ? videoPlaceholder.src : imagePlaceholder.src
          }
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError({ message: "Error rendering image" });
          }}
          width={100}
          height={100}
          alt={alt || fileName}
          className="max-h-full max-w-full h-28 w-28"
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
        <p className="text-gray-600 truncate text-xs w-36 text-center">
          {fileName}
        </p>
      </a>
    </section>
  );
};

export default MediaFile;
