import { useState } from "react";
import {
  Alert,
  IconButton,
  ProfileUploader,
  Spinner,
  Tooltip,
  Typography,
} from "@/components/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import classNames from "classnames";
import { useUserStore } from "@/store/userStore";
import { updateUser } from "@/services/api";
import { sortArrayOfObjects } from "@/utils/helper";

const UserItem = ({ name, email, imageSrc, selected, disabled, onClick }) => {
  return (
    <section
      onClick={disabled ? () => {} : onClick}
      className={classNames("flex gap-2 rounded-full", {
        "hover:bg-light-blue-50 cursor-pointer": !disabled && !selected,
        "bg-light-blue-100 cursor-pointer": selected,
        "opacity-30": disabled,
      })}
    >
      <ProfileUploader width={10} height={10} defaultSrc={imageSrc} readOnly />
      <section>
        <Typography
          color="blue-gray"
          className="max-w-[160px] truncate font-semibold text-sm"
        >
          {name}
        </Typography>
        <Typography
          color="blue-gray"
          className="text-sm max-w-[160px] truncate"
        >
          {email}
        </Typography>
      </section>
    </section>
  );
};

const ManageUsers = ({ data = [], setData = () => {}, isLoading, error }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [internalIsLoading, setInternalIsLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);

  const PROMOTE = "promote";
  const DEMOTE = "demote";

  const userId = useUserStore((state) => state._id);

  const regularUser = data?.filter((user) => !user.isAdmin);
  const adminUser = data?.filter((user) => user.isAdmin);

  const sortedRegularUser = sortArrayOfObjects(regularUser, "firstName");
  const sortedAdminUser = sortArrayOfObjects(adminUser, "firstName");

  const handleRank = (promote) => {
    if (!selectedUser) return;
    const isAdmin = promote === PROMOTE ? true : false;

    const userData = { ...selectedUser, isAdmin };
    updateUser({
      userId: userData._id,
      userUpdatedData: userData,
      onSubmit: () => {
        setInternalError(null);
        setInternalIsLoading(true);
      },
      onSuccess: (data) => {
        setInternalIsLoading(false);
        setData((prevState) => {
          const filteredUsers = prevState.filter(
            (user) => user._id !== data._id
          );
          return [data, ...filteredUsers];
        });
        setSelectedUser(null);
      },
      onFailed: ({ data }) => {
        setInternalIsLoading(false);
        setInternalError(data.error || "Failed updating rank");
      },
    });
  };

  return (
    <>
      <section className="flex p-5">
        <section className="w-60">
          <Typography className="font-bold text-center border-b">
            Regular Users
          </Typography>
          <section className="flex flex-col gap-2 py-4 px-2  max-h-[50vh] overflow-y-auto">
            {sortedRegularUser?.length <= 0 ? (
              <Typography color="gray" className="text-center">
                No users found
              </Typography>
            ) : (
              sortedRegularUser?.map((user) => (
                <UserItem
                  key={user._id}
                  name={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                  imageSrc={user.image?.url}
                  onClick={() =>
                    user._id === selectedUser?._id
                      ? setSelectedUser(null)
                      : setSelectedUser(user)
                  }
                  selected={user._id === selectedUser?._id}
                  disabled={user._id === userId}
                />
              ))
            )}
          </section>
        </section>

        <section className="flex flex-col gap-1 justify-center px-4 pt-10">
          {isLoading || internalIsLoading ? (
            <Spinner className="w-10 h-10" />
          ) : (
            <>
              <Tooltip content="Promote to Admin" placement="top">
                <IconButton
                  color="blue-gray"
                  disabled={!selectedUser || selectedUser?.isAdmin}
                  onClick={() => handleRank(PROMOTE)}
                >
                  <span>
                    <ArrowForwardIosIcon />
                  </span>
                </IconButton>
              </Tooltip>
              <Tooltip content="Demote to Regular" placement="bottom">
                <IconButton
                  color="blue-gray"
                  disabled={!selectedUser || !selectedUser?.isAdmin}
                  onClick={() => handleRank(DEMOTE)}
                >
                  <span>
                    <ArrowBackIosNewIcon />
                  </span>
                </IconButton>
              </Tooltip>
            </>
          )}
        </section>

        <section className="w-60">
          <Typography className="font-bold text-center border-b">
            Admin Users
          </Typography>
          <section className="flex flex-col gap-2 py-4 px-2  max-h-[50vh] overflow-y-auto">
            {sortedAdminUser?.length <= 0 ? (
              <Typography color="gray" className="text-center">
                No users found
              </Typography>
            ) : (
              sortedAdminUser?.map((user) => (
                <UserItem
                  key={user._id}
                  name={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                  imageSrc={user.image?.url}
                  onClick={() =>
                    user._id === selectedUser?._id
                      ? setSelectedUser(null)
                      : setSelectedUser(user)
                  }
                  selected={user._id === selectedUser?._id}
                  disabled={user._id === userId}
                />
              ))
            )}
          </section>
        </section>
      </section>
      {error ||
        (internalError && (
          <section className="px-6">
            <Alert variant="ghost" color="red">
              <section className="flex gap-2">
                <WarningRoundedIcon />
                <Typography>{error || internalError}</Typography>
              </section>
            </Alert>
          </section>
        ))}
    </>
  );
};

export default ManageUsers;
