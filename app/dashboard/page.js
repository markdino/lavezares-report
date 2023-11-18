"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  IconButton,
  Button,
  ReportsTable,
} from "@/components/client";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useRouter } from "next/navigation";
import { getAllReports } from "@/services/api";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { isLogin, isAdmin } = useUserStore();

  const handleGetAllReport = () => {
    getAllReports({
      onSubmit: () => setIsLoading(true),
      onSuccess: (data) => {
        setIsLoading(false);
        setData(data);
      },
      onFailed: ({ data }) => {
        setIsLoading(false);
        setError(
          data?.error || "Sorry, something went wrong. Please try again."
        );
      },
    });
  };

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
    handleGetAllReport();
  }, [isLogin]);

  if (isLogin)
    return (
      <main className="min-h-screen w-full px-2">
        <section className="lg:pt-20 pt-16">
          <Card className="h-full max-w-fit  mx-auto">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none flex justify-between"
            >
              <div className="mb-4">
                <Typography variant="h5" color="blue-gray">
                  {`List of ${isAdmin ? "All" : "My"} Reports`}
                </Typography>
              </div>
              <section className="flex gap-2">
                <IconButton
                  variant="text"
                  onClick={handleGetAllReport}
                  size="lg"
                  color="blue-gray"
                  disabled={isLoading}
                >
                  <span>
                    <AutorenewRoundedIcon />
                  </span>
                </IconButton>
                <Link href="/report/create">
                  <Button color="green" className="flex items-center gap-1">
                    <span className="hidden sm:block">Create New</span>
                    <NoteAddIcon />
                  </Button>
                </Link>
              </section>
            </CardHeader>
            <CardBody className="overflow-auto px-0">
              <ReportsTable
                data={data}
                setData={setData}
                isLoading={isLoading}
                error={error}
              />
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </section>
      </main>
    );
};

export default Dashboard;
