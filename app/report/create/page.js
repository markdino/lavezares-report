"use client"
import BackgroundImage from "@/components/BackgroundImage";
import { Card, Typography, ReportForm } from "@/components/client";
import { useUserStore } from "@/store/userStore";

const CreateReport = () => {
  const { _id, position, firstName, middleName, lastName } = useUserStore();
  const defaultFormData = {
    reportDate: new Date(),
    reportTime: new Date(),
    crimeDate: new Date(),
    crimeTime: new Date(),
    creator: _id,
    reporterPosition: position,
    reporterFirstName: firstName,
    reporterMiddleName: middleName,
    reporterLastName: lastName,
  };

  return (
    <main className="min-h-screen lg:pt-20 pt-16 pb-4  relative">
      <BackgroundImage />
      <Card className="p-10 max-w-xl sm:mx-auto mx-2">
        <Typography variant="h4" color="blue-gray">
          Create Crime and Incident Report
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          To report and incident, please provide the following
          information&apos;s
        </Typography>
        <hr className="mt-8" />
        <ReportForm defaultFormData={defaultFormData} />
      </Card>
    </main>
  );
};

export default CreateReport;
