"use client"
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
    <main className="min-h-screen">
      <Card className="lg:mt-20 mt-16 mb-4 p-10 max-w-xl sm:mx-auto mx-2">
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
