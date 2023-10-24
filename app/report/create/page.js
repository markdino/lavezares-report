"use client";
import { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Textarea,
  Button,
  Checkbox,
  DemoContainer,
  AdapterDayjs,
  LocalizationProvider,
  TimePicker,
  DatePicker,
  FileUploader,
  Spinner,
  Alert,
} from "@/components/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";
import { createReport } from "@/services/api";

const CreateReport = () => {
  const defaultDate = dayjs(new Date());

  const [formData, setFormData] = useState({
    reportDate: defaultDate,
    reportTime: defaultDate,
    crimeDate: defaultDate,
    crimeTime: defaultDate,
  });
  const [certify, setCertify] = useState(false);
  const [status, setStatus] = useState("");

  const handleFormData = (newData) => {
    setFormData((prevState) => ({ ...prevState, ...newData }));
    console.log({ formData });
  };

  const handleSubmit = () => {
    createReport({
      reportData: formData,
      onSubmit: () => setStatus("loading"),
      onSuccess: (data) => {
        setStatus("success");
        console.log({ status, data });
      },
      onFailed: (response) => {
        setStatus("failed");
        console.log({ response, data });
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
                    value={formData.reporterPosition}
                    onChange={(e) =>
                      handleFormData({ reporterPosition: e.target.value })
                    }
                  />
                </section>
                <section className="sm:w-7/12">
                  <Input
                    label="First Name"
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
                  value={formData.reporterMiddletName}
                  onChange={(e) =>
                    handleFormData({ reporterMiddletName: e.target.value })
                  }
                />
                <Input
                  label="Last Name"
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
              value={formData.incidentDetails}
              onChange={(e) =>
                handleFormData({ incidentDetails: e.target.value })
              }
            />
            <section>
              <FileUploader
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                fullWidth={false}
                size="sm"
                variant="gradient"
                color="light-blue"
                handleFile={(file) => handleFormData({ imageFile: file })}
              >
                Upload an image
              </FileUploader>
            </section>
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
                value={formData.suspectFirstName}
                onChange={(e) =>
                  handleFormData({ suspectFirstName: e.target.value })
                }
              />
              <Input
                label="Last Name"
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
              value={formData.reporterContact}
              onChange={(e) =>
                handleFormData({ reporterContact: e.target.value })
              }
            />
            <section>
              <Typography variant="h6" color="blue-gray" className="-mb-2">
                You may also upload other files here:
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Note: If multiple file make it in an archive file e.g(.zip)
              </Typography>
              <FileUploader
                size="sm"
                fullWidth={false}
                variant="gradient"
                color="light-blue"
                handleFile={(file) => handleFormData({ otherFile: file })}
              >
                Upload a file
              </FileUploader>
            </section>
            <hr />
          </section>
          <Checkbox
            label={
              <Typography variant="small" color="gray" className="font-normal">
                I certify that the above information is true and correct.
                <span className="text-red-800 font-black text-xl">*</span>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            value={certify}
            onChange={() => setCertify((prevState) => !prevState)}
          />
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
