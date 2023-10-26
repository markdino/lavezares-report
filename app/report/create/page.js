"use client";
import { useState, useRef } from "react";
import {
  Card,
  Typography,
  Input,
  Textarea,
  Button,
  DemoContainer,
  AdapterDayjs,
  LocalizationProvider,
  TimePicker,
  DatePicker,
  FileCloudUploader,
  Spinner,
  Alert,
} from "@/components/client";
import MediaFile from "@/components/MediaFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import dayjs from "dayjs";
import { createReport } from "@/services/api";
import { UPLOAD_FILES } from "@/utils/constant";

const CreateReport = () => {
  const defaultDate = dayjs(new Date());
  const defaultFormData = {
    reportDate: defaultDate,
    reportTime: defaultDate,
    crimeDate: defaultDate,
    crimeTime: defaultDate,
  };
  const reporterPositionRef = useRef(null);
  const reporterFirstNameRef = useRef(null);
  const reporterMiddletNameRef = useRef(null);
  const reporterLastNameRef = useRef(null);
  const incidentLocationRef = useRef(null);
  const incidentDetailsRef = useRef(null);
  const suspectChargesRef = useRef(null);
  const reportArrestedRef = useRef(null);
  const suspectFirstNameRef = useRef(null);
  const suspectLastNameRef = useRef(null);
  const reporterContactRef = useRef(null);

  const [formData, setFormData] = useState(defaultFormData);
  const [certify, setCertify] = useState(false);
  const [status, setStatus] = useState("");
  const [uploadError, setUploadError] = useState("");

  const handleResetForm = () => {
    setFormData(defaultFormData);
    setCertify(false);
    reporterPositionRef.current.value = "";
    reporterFirstNameRef.current.value = "";
    reporterMiddletNameRef.current.value = "";
    reporterLastNameRef.current.value = "";
    incidentLocationRef.current.querySelector("textarea").value = "";
    incidentDetailsRef.current.querySelector("textarea").value = "";
    suspectChargesRef.current.querySelector("textarea").value = "";
    reportArrestedRef.current.querySelector("textarea").value = "";
    suspectFirstNameRef.current.value = "";
    suspectLastNameRef.current.value = "";
    reporterContactRef.current.querySelector("textarea").value = "";
  };

  const handleFormData = (newData) => {
    setFormData((prevState) => ({ ...prevState, ...newData }));
    setStatus("");
  };

  const handleUploadData = (rawFiles) => {
    const files = rawFiles.map(({ name, url, size, key }) => ({
      name,
      url,
      size,
      key,
    }));
    setFormData((prevState) => {
      if (prevState.files) {
        return { ...prevState, files: [...prevState.files, ...files] };
      }

      return { ...prevState, files };
    });
  };

  const handleRemoveUpload = (fileKey) => {
    setFormData((prevState) => {
      const remainFiles = prevState.files.filter(
        (file) => file.key !== fileKey
      );
      return { ...prevState, files: remainFiles };
    });
  };

  const handleSubmit = () => {
    createReport({
      reportData: formData,
      onSubmit: () => setStatus("loading"),
      onSuccess: (data) => {
        setStatus("success");
        handleResetForm();
      },
      onFailed: (response) => {
        setStatus("failed");
      },
    });
  };

  return (
    <main className="min-h-screen">
      <Card className="lg:mt-20 mt-16 mb-4 p-10 max-w-xl sm:mx-auto mx-2">
        <Typography variant="h4" color="blue-gray">
          Create Crime and Incident Report
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          To report and incident, please provide the following
          information&apos;s
        </Typography>
        <form className="mt-8 mb-2 w-auto">
          <hr className="mb-5" />
          <section className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Report date and time
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <section className="flex gap-4 md:flex-row flex-col">
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={formData.reportDate}
                    onChange={(newDate) =>
                      handleFormData({ reportDate: newDate })
                    }
                  />
                </DemoContainer>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Time"
                    value={formData.reportTime}
                    onChange={(newTime) =>
                      handleFormData({ reportTime: newTime })
                    }
                  />
                </DemoContainer>
              </section>
            </LocalizationProvider>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Date and time when incident occurred:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <section className="flex gap-4 md:flex-row flex-col">
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date"
                    value={formData.crimeDate}
                    onChange={(newDate) =>
                      handleFormData({ crimeDate: newDate })
                    }
                  />
                </DemoContainer>
                <DemoContainer components={["TimePicker"]}>
                  <TimePicker
                    label="Time"
                    value={formData.crimeTime}
                    onChange={(newTime) =>
                      handleFormData({ crimeTime: newTime })
                    }
                  />
                </DemoContainer>
              </section>
            </LocalizationProvider>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Incident report issued by:
            </Typography>
            <section className="flex flex-col gap-2">
              <section className="flex justify-between gap-2 sm:flex-row flex-col">
                <section className="w-3/12">
                  <Input
                    label="Position"
                    inputRef={reporterPositionRef}
                    value={formData.reporterPosition}
                    onChange={(e) =>
                      handleFormData({ reporterPosition: e.target.value })
                    }
                  />
                </section>
                <section className="sm:w-7/12">
                  <Input
                    label="First Name"
                    inputRef={reporterFirstNameRef}
                    value={formData.reporterFirstName}
                    onChange={(e) =>
                      handleFormData({ reporterFirstName: e.target.value })
                    }
                  />
                </section>
              </section>
              <section className="flex justify-between gap-2 sm:flex-row flex-col">
                <Input
                  label="Middle Name"
                  inputRef={reporterMiddletNameRef}
                  value={formData.reporterMiddletName}
                  onChange={(e) =>
                    handleFormData({ reporterMiddletName: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
                  inputRef={reporterLastNameRef}
                  value={formData.reporterLastName}
                  onChange={(e) =>
                    handleFormData({ reporterLastName: e.target.value })
                  }
                />
              </section>
            </section>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Incident Location:
            </Typography>
            <Textarea
              placeholder="Please provide specific location details"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={incidentLocationRef}
              value={formData.incidentLocation}
              onChange={(e) =>
                handleFormData({ incidentLocation: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Incident details:
            </Typography>
            <Textarea
              placeholder="Incident details"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={incidentDetailsRef}
              value={formData.incidentDetails}
              onChange={(e) =>
                handleFormData({ incidentDetails: e.target.value })
              }
            />
            <section></section>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Was the suspect of the report of the incident wanted/have or had
              any charges on him/her? If so what?
            </Typography>
            <Textarea
              placeholder="Message"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={suspectChargesRef}
              value={formData.suspectCharges}
              onChange={(e) =>
                handleFormData({ suspectCharges: e.target.value })
              }
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Has anyone been arrested so far in relation to the incident?
            </Typography>
            <Textarea
              placeholder="Message"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={reportArrestedRef}
              value={formData.reportArrested}
              onChange={(e) =>
                handleFormData({ reportArrested: e.target.value })
              }
            />
            <hr />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Suspect&apos;s Full Name
            </Typography>
            <section className="flex justify-between gap-2 sm:flex-row flex-col">
              <Input
                label="First Name"
                inputRef={suspectFirstNameRef}
                value={formData.suspectFirstName}
                onChange={(e) =>
                  handleFormData({ suspectFirstName: e.target.value })
                }
              />
              <Input
                label="Last Name"
                inputRef={suspectLastNameRef}
                value={formData.suspectLastName}
                onChange={(e) =>
                  handleFormData({ suspectLastName: e.target.value })
                }
              />
            </section>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              If you want to receive an update, please input your contact
              number, email or facebook link below:
            </Typography>
            <Textarea
              placeholder="Contact Info"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              ref={reporterContactRef}
              value={formData.reporterContact}
              onChange={(e) =>
                handleFormData({ reporterContact: e.target.value })
              }
            />
            <section>
              <Typography variant="h6" color="blue-gray" className="-mb-2">
                You may also upload files here:
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Note: {UPLOAD_FILES.mediaPost.getMessage()}
              </Typography>
              <section className="flex gap-3 flex-wrap">
                {formData.files?.map((file) => (
                  <MediaFile
                    fileName={file.name}
                    filePath={file.url}
                    onClose={() => handleRemoveUpload(file.key)}
                    key={file.key}
                  />
                ))}
              </section>
              <FileCloudUploader
                size="sm"
                fullWidth={false}
                variant="gradient"
                color="light-blue"
                handleFile={(files) => handleUploadData(files)}
                onError={(message) => setUploadError(message)}
                onChange={() => setUploadError("")}
              >
                Upload media files
              </FileCloudUploader>
              {uploadError && (
                <Typography variant="small" color="red" className="font-normal">
                  {uploadError}
                </Typography>
              )}
            </section>
            <hr />
          </section>
          <Typography
            variant="small"
            color="gray"
            className="font-normal cursor-pointer"
            onClick={() => setCertify((prevState) => !prevState)}
          >
            {certify ? (
              <CheckBoxIcon className="mr-3" />
            ) : (
              <CheckBoxOutlineBlankIcon className="mr-3" />
            )}
            I certify that the above information is true and correct.
            <span className="text-red-800 font-black text-xl">*</span>
          </Typography>
          <Button
            className="mt-6 flex justify-center gap-2 items-center"
            color="light-blue"
            variant="gradient"
            size="lg"
            fullWidth
            disabled={!certify || status === "loading"}
            onClick={handleSubmit}
          >
            {status === "loading" && <Spinner className="-ml-7" />}
            Submit
          </Button>
          {status === "success" ? (
            <Alert color="green" variant="ghost" className="mt-3">
              <section className="flex items-center gap-1">
                <CheckCircleIcon />
                Report successfully sumitted
              </section>
            </Alert>
          ) : (
            status === "failed" && (
              <Alert color="red" variant="ghost" className="mt-3">
                <section className="flex items-center gap-1">
                  <ErrorIcon />
                  Report failed to submit
                </section>
              </Alert>
            )
          )}
        </form>
      </Card>
    </main>
  );
};

export default CreateReport;
