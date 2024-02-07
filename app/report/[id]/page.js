"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Typography,
  ReportForm,
  Alert,
  Spinner,
} from "@/components/client";
import { getReport } from "@/services/api";
import { useParams } from "next/navigation";

import ReportRoundedIcon from "@mui/icons-material/ReportRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import BackgroundImage from "@/components/BackgroundImage";

const ViewReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    getReport({
      reportId: params.id,
      onSubmit: () => setIsLoading(true),
      onSuccess: (data) => {
        setIsLoading(false);
        setError(null);
        setData(data);
      },
      onFailed: ({ status, data }) => {
        setIsLoading(false);
        setError({ status, message: data.error });
      },
    });
  }, [params.id]);

  return (
    <main className="min-h-screen lg:pt-20 pt-16 pb-4 relative">
      <BackgroundImage />
      <Card className="p-10 max-w-xl sm:mx-auto mx-2">
        <Typography variant="h4" color="blue-gray">
          Crime and Incident Report
        </Typography>
        <hr className="mt-8" />
        {isLoading ? (
          <Alert color="blue-gray" variant="ghost" className="mt-4">
            <section className="flex gap-2">
              <Spinner />
              <Typography>Loading...</Typography>
            </section>
          </Alert>
        ) : error ? (
          <Alert
            color={error.status !== 404 && "red"}
            variant={error.status === 404 ? "gradient" : "ghost"}
            className="mt-4"
          >
            <section className="flex gap-2">
              {error.status === 404 ? (
                <ReportRoundedIcon />
              ) : (
                <WarningRoundedIcon />
              )}
              <Typography>{error.message}</Typography>
            </section>
          </Alert>
        ) : (
          data && <ReportForm defaultFormData={data} readOnly />
        )}
      </Card>
    </main>
  );
};

export default ViewReport;
