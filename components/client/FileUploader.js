"use client";
import { useRef } from "react";
import { Button } from "@/components/client";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUploader = ({ handleFile = () => {}, children, accept, ...props }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick} {...props}><CloudUploadIcon className="mr-2" />{children}</Button>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        ref={hiddenFileInput}
        className="hidden"
      />
    </>
  );
};

export default FileUploader;
