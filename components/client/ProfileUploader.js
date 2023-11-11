"use client";
import { useEffect, useRef, useState } from "react";
import { IconButton, Spinner } from "@/components/client";
import { UploadButton } from "@uploadthing/react";
import Image from "next/image";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import profilePlaceholder from "@/assets/img/profile-placeholder.png";
import classNames from "classnames";
import { extractFields } from "@/utils/helper";
import { deleteFile } from "@/services/api";

const ProfileUploader = ({
  handleFile = () => {},
  onError = () => {},
  onChange = () => {},
  onDelete = () => {},
  className,
}) => {
  const [hiddenInput, setHiddenInput] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const hiddenElem = useRef(null);

  if (hiddenInput) {
    hiddenInput.addEventListener("change", (event) => {
      setIsLoading(true);
      onChange(event.target.files);
    });
  }

  const handleClick = () => {
    hiddenInput?.click();
  };

  const handleDelete = () => {
    if (!photo) return;

    deleteFile({
      fileId: photo?.key,
      onSubmit: () => {
        setIsLoading(true);
      },
      onSuccess: () => {
        setIsLoading(false);
        onDelete(photo.key);
        setPhoto(null);
      },
      onFailed: ({ data }) => {
        setIsLoading(false);
        onError(data.error);
      },
    });
  };

  useEffect(() => {
    if (hiddenElem.current) {
      setHiddenInput(hiddenElem.current?.querySelector("input[type=file]"));
    }
  }, [hiddenElem]);

  return (
    <>
      <section className={classNames("relative flex w-28 h-28", className)}>
        <Image
          fill
          sizes="(max-width: 112px) 100vw, 50vw, 33vw"
          src={photo?.url || profilePlaceholder.src}
          placeholder="blur"
          blurDataURL={profilePlaceholder.src}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            onError("Error rendering image");
          }}
          style={{ objectFit: "cover" }}
          alt="profile picture"
          className="border rounded-full"
        />
        {isLoading ? (
          <section className="absolute inset-0 flex justify-center items-center pb-1">
            <Spinner className="h-8 w-8" />
          </section>
        ) : (
          <section className="absolute -right-2 -top-2">
            <IconButton
              variant="text"
              color="blue-gray"
              title={photo ? "Remove photo" : "Add photo"}
              onClick={photo ? handleDelete : handleClick}
            >
              <span>
                {photo ? (
                  <DisabledByDefaultIcon className="hover:text-red-900" />
                ) : (
                  <AddAPhotoIcon />
                )}
              </span>
            </IconButton>
          </section>
        )}
      </section>
      <section ref={hiddenElem} className="hidden">
        <UploadButton
          endpoint="profile"
          onClientUploadComplete={(res) => {
            const file = extractFields(res[0], "name url size key");
            setPhoto(file);
            handleFile(file);
          }}
          onUploadError={(error) => {
            setIsLoading(false);
            onError(error.message);
          }}
        />
      </section>
    </>
  );
};

export default ProfileUploader;
