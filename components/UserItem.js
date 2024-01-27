import { ProfileUploader, Typography } from "@/components/client";
import CancelIcon from "@mui/icons-material/Cancel";
import classNames from "classnames";

const UserItem = ({
  name,
  email,
  imageSrc,
  selected,
  disabled,
  onClick = () => {},
  onClose = () => {},
  hideClose,
}) => {
  return (
    <section
      onClick={disabled ? () => {} : onClick}
      className={classNames("flex gap-2 rounded-full relative", {
        "hover:bg-light-blue-50 cursor-pointer ": !disabled && !selected,
        "bg-light-blue-100 cursor-pointer": selected,
        "opacity-30": disabled,
        group: !disabled,
      })}
    >
      {!hideClose && (
        <section
          className={classNames(
            "absolute -top-1 -right-1 text-red-800 lg:text-gray-500 lg:hover:text-red-800 lg:hidden lg:group-hover:block",
            selected ? "block" : "hidden"
          )}
          onClick={onClose}
        >
          <CancelIcon />
        </section>
      )}
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

export default UserItem;
