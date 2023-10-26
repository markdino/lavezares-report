"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "@/components/client";
import { UploadButton } from "@uploadthing/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

const FileCloudUploader = ({
  handleFile = () => {},
  onError = () => {},
  onChange = () => {},
  children,
  endpoint = "mediaPost",
  ...props
}) => {
  const [hiddenInput, setHiddenInput] = useState(null);
  const [uploadState, setUploadState] = useState("");

  const hiddenElem = useRef(null);

  if (hiddenInput) {
    hiddenInput.addEventListener("change", (event) => {
      setUploadState("uploading");
      onChange(event.target.files);
    });
  }

  const handleClick = () => {
    hiddenInput?.click();
  };

  useEffect(() => {
    if (hiddenElem.current) {
      setHiddenInput(hiddenElem.current?.querySelector("input[type=file]"));
    }
  }, [hiddenElem]);

  return (
    <>
      <Button
        onClick={uploadState !== "uploading" ? handleClick : () => {}}
        {...props}
        className="flex items-center"
      >
        {uploadState === "completed" ? (
          <CloudDoneIcon className="mr-2" />
        ) : uploadState === "uploading" ? (
          <Spinner className="mr-2" />
        ) : (
          <CloudUploadIcon className="mr-2" />
        )}
        {children}
      </Button>
      <section ref={hiddenElem} className="hidden">
        <UploadButton
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setUploadState("completed");
            handleFile(res);
          }}
          onUploadError={(error) => {
            setUploadState("error");
            onError(error.message);
          }}
        />
      </section>
    </>
  );
};

export default FileCloudUploader;
