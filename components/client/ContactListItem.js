"use client";
import React from "react";
import { Typography, IconButton } from "@/components/client";
import Link from "next/link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import Messenger from "../svg/Messenger";
import Instagram from "../svg/Instagram";

const ContactListItem = ({ link = "", socialIcon = "", displayText = "" }) => {
  const socialIconList = {
    facebook: <FacebookRoundedIcon />,
    messenger: <Messenger fill="#ffffff" width="20" height="20" />,
    instagram: <Instagram fill="#ffffff" width="20" height="20" />,
    email: <EmailRoundedIcon />,
    phone: <CallRoundedIcon />,
  };
  return (
    <Link href={link} passHref target="_blank">
      <section className="flex items-center gap-2 hover:text-light-blue-700">
        {socialIconList.hasOwnProperty(socialIcon) && (
          <IconButton
            size="lg"
            variant="gradient"
            color="light-blue"
            className="rounded-full"
          >
            <span>{socialIconList[socialIcon]}</span>
          </IconButton>
        )}
        <Typography className="text-ellipsis overflow-hidden sm:block hidden">{displayText || link}</Typography>
      </section>
    </Link>
  );
};

export default ContactListItem;
