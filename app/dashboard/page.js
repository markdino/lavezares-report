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
  Tooltip,
  ManageUsers,
} from "@/components/client";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useRouter } from "next/navigation";
import { getAllReports, getAllUsers } from "@/services/api";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";

const Dashboard = () => {
  const REPORTS = "reports";
  const USERS = "users";
  const GENERIC_ERROR = "Sorry, something went wrong. Please try again.";

  const [reportsData, setReportsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(REPORTS);

  const router = useRouter();
  const { isLogin, isAdmin } = useUserStore();

  const handleGetAllReports = () => {
    getAllReports({
      onSubmit: () => {
        setError(null);
        setIsLoading(true);
      },
      onSuccess: (data) => {
        setIsLoading(false);
        setReportsData(data);
      },
      onFailed: ({ data }) => {
        setIsLoading(false);
        setError(data?.error || GENERIC_ERROR);
      },
    });
  };

  const handleGetAllUsers = () => {
    getAllUsers({
      onSubmit: () => {
        setError(null);
        setIsLoading(true);
      },
      onSuccess: (data) => {
        setIsLoading(false);
        setUsersData(data);
      },
      onFailed: ({ data }) => {
        setIsLoading(false);
        setError(data?.error || GENERIC_ERROR);
      },
    });
  };

  const fetchData = () => {
    if (form === USERS) {
      handleGetAllUsers();
    } else {
      handleGetAllReports();
    }
  };

  useEffect(() => {
    fetchData();
  }, [form]);

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
      return;
    }
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
                  {form === USERS
                    ? "Manage Users"
                    : `List of ${isAdmin ? "All" : "My"} Reports`}
                </Typography>
              </div>
              <section className="flex gap-1">
                {isAdmin &&
                  (form === USERS ? (
                    <Tooltip content="List of reports" placement="bottom">
                      <IconButton
                        variant="text"
                        onClick={() => setForm(REPORTS)}
                        size="lg"
                        color="blue-gray"
                        disabled={isLoading}
                      >
                        <span>
                          <SummarizeIcon />
                        </span>
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip content="Manage Users" placement="bottom">
                      <IconButton
                        variant="text"
                        onClick={() => setForm(USERS)}
                        size="lg"
                        color="blue-gray"
                        disabled={isLoading}
                      >
                        <span>
                          <ManageAccountsIcon />
                        </span>
                      </IconButton>
                    </Tooltip>
                  ))}
                <Tooltip content="Refresh" placement="bottom">
                  <IconButton
                    variant="text"
                    onClick={fetchData}
                    size="lg"
                    color="blue-gray"
                    disabled={isLoading}
                  >
                    <span>
                      <AutorenewRoundedIcon />
                    </span>
                  </IconButton>
                </Tooltip>
                {form === REPORTS && (
                  <Link href="/report/create">
                    <Button color="green" className="flex items-center gap-1">
                      <span className="hidden sm:block">Create New</span>
                      <NoteAddIcon />
                    </Button>
                  </Link>
                )}
              </section>
            </CardHeader>
            <CardBody className="overflow-auto px-0">
              {form === USERS ? (
                <ManageUsers
                  data={usersData}
                  setData={setUsersData}
                  isLoading={isLoading}
                  error={error}
                />
              ) : (
                <ReportsTable
                  data={reportsData}
                  setData={setReportsData}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </section>
      </main>
    );
};

export default Dashboard;
