"use client";
import { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Typography,
  IconButton,
  Spinner,
  Button,
  DeleteModal,
  Chip,
} from "@/components/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { useRouter } from "next/navigation";
import { deleteReport, getAllReports } from "@/services/api";
import dayjs from "dayjs";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import classNames from "classnames";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();
  const { isLogin, isAdmin } = useUserStore();
  const TABLE_HEAD = [
    "Reported by",
    "Location",
    "Details",
    "Charges",
    "Arrested",
    "Suspect",
    "Creator type",
    "Incident date",
    "Report date",
    "",
  ];

  const tdClassName = "p-4 border-b border-blue-gray-50";

  const handleView = (id) => {
    router.push(`/report/${id}`);
  };

  const handleDelete = (event, id) => {
    event.stopPropagation();
    setDeleteId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      console.log(deleteId);
      deleteReport({
        reportId: deleteId,
        onSubmit: () => setModalIsLoading(true),
        onSuccess: () => {
          setModalIsLoading(false);
          setModalError(null);
          setData((prevState) =>
            prevState?.filter((report) => report._id !== deleteId)
          );
          setShowModal(false);
        },
        onFailed: ({ status, data }) => {
          setModalIsLoading(false);
          setModalError({ status, message: data.error });
        },
      });
    }
  };

  const handleModalCancel = () => {
    setModalError(null);
    setDeleteId(null);
    setShowModal(false);
  };

  const handleGetAllReport = () => {
    getAllReports({
      onSubmit: () => setIsLoading(true),
      onSuccess: (data) => {
        setIsLoading(false);
        setData(data);
        console.log(data);
      },
      onFailed: (response) => {
        setIsLoading(false);
        setError(response);
        console.error(response);
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
              <table className="min-w-max table-auto text-left border">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className={classNames(
                          "border-y border-blue-gray-100 bg-blue-gray-50/50 p-4",
                          { hidden: !isAdmin && head === "Creator type" }
                        )}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className={classNames(
                            "font-normal leading-none opacity-70",
                            { "lg:max-w-[160px]": head }
                          )}
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="relative h-24">
                  {isLoading ? (
                    <section className="absolute flex w-full">
                      <Alert
                        color="blue-gray"
                        variant="ghost"
                        className="my-4 mx-3"
                      >
                        <section className="flex gap-2">
                          <Spinner />
                          <Typography>Loading...</Typography>
                        </section>
                      </Alert>
                    </section>
                  ) : error ? (
                    <section className="absolute flex w-full">
                      <Alert color="red" variant="ghost" className="my-4 mx-3">
                        <section className="flex gap-2">
                          <WarningRoundedIcon />
                          <Typography>
                            Sorry, something went wrong please try again.
                          </Typography>
                        </section>
                      </Alert>
                    </section>
                  ) : (
                    data &&
                    (data.length <= 0 ? (
                      <section className="absolute flex w-full">
                        <Alert
                          color="teal"
                          variant="ghost"
                          className="my-4 mx-3"
                        >
                          <section className="flex gap-2">
                            <InfoRoundedIcon />
                            <Typography>Empty report.</Typography>
                          </section>
                        </Alert>
                      </section>
                    ) : (
                      data.map((report) => (
                        <>
                          <tr
                            onClick={() => handleView(report._id)}
                            className="hover:bg-light-blue-50 cursor-pointer"
                          >
                            <td className={tdClassName}>
                              <Typography className="font-bold max-w-[160px] truncate">
                                {report.reporterPosition || ""}{" "}
                                {report.reporterFirstName || ""}{" "}
                                {report.reporterMiddleName || ""}{" "}
                                {report.reporterLastName || ""}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {report.incidentLocation}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {report.incidentDetails}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {report.suspectCharges}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {report.reportArrested}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {report.suspectFirstName || ""}{" "}
                                {report.suspectLastName || ""}
                              </Typography>
                            </td>
                            <td
                              className={classNames(tdClassName, {
                                hidden: !isAdmin,
                              })}
                            >
                              <Chip
                                variant="ghost"
                                color={
                                  !report?.creator
                                    ? "blue-gray"
                                    : report.creator.isAdmin
                                    ? "deep-purple"
                                    : "light-blue"
                                }
                                size="sm"
                                value={
                                  !report?.creator
                                    ? "Guest"
                                    : report.creator.isAdmin
                                    ? "Admin"
                                    : "Regular"
                                }
                                className="rounded-full max-w-fit mx-auto"
                              />
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {dayjs(report.crimeDate).format("L")}
                                {" - "}
                                {dayjs(report.crimeTime).format("LT")}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <Typography className="max-w-[160px] truncate">
                                {dayjs(report.reportDate).format("L")}
                                {" - "}
                                {dayjs(report.reportTime).format("LT")}
                              </Typography>
                            </td>
                            <td className={tdClassName}>
                              <section className="flex gap-3">
                                <Link
                                  href={`/report/${report._id}/edit`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <IconButton color="light-blue">
                                    <span>
                                      <EditIcon />
                                    </span>
                                  </IconButton>
                                </Link>
                                <IconButton
                                  color="red"
                                  onClick={(e) => handleDelete(e, report._id)}
                                >
                                  <span>
                                    <DeleteForeverIcon />
                                  </span>
                                </IconButton>
                              </section>
                            </td>
                          </tr>
                        </>
                      ))
                    ))
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
          <DeleteModal
            open={showModal}
            loading={modalIsLoading}
            error={modalError}
            onConfirm={handleConfirmDelete}
            onCancel={handleModalCancel}
          />
        </section>
      </main>
    );
};

export default Dashboard;
