"use client";
import { useState } from "react";
import {
  Alert,
  Typography,
  IconButton,
  Spinner,
  DeleteModal,
  Chip,
} from "@/components/client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { useRouter } from "next/navigation";
import { deleteReport } from "@/services/api";
import dayjs from "dayjs";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import classNames from "classnames";

const ReportsTable = ({ data, setData = () => {}, isLoading, error }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const router = useRouter();
  const { isAdmin } = useUserStore();
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

  return (
    <>
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
                  className={classNames("font-normal leading-none opacity-70", {
                    "lg:max-w-[160px]": head,
                  })}
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
              <Alert color="blue-gray" variant="ghost" className="my-4 mx-3">
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
                    {error}
                  </Typography>
                </section>
              </Alert>
            </section>
          ) : (
            data &&
            (data.length <= 0 ? (
              <section className="absolute flex w-full">
                <Alert color="teal" variant="ghost" className="my-4 mx-3">
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
      <DeleteModal
        open={showModal}
        loading={modalIsLoading}
        error={modalError}
        onConfirm={handleConfirmDelete}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default ReportsTable;
