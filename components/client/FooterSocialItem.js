"use client";
import React from "react";
import { Typography } from "@/components/client";
import Link from "next/link";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import Messenger from "../svg/Messenger";
import Instagram from "../svg/Instagram";
import classNames from "classnames";

const FooterSocialItem = ({
  link = "",
  socialIcon = "",
  displayText = "",
  iconFill = "",
  iconSize = "20",
  className = "",
}) => {
  const socialIconList = {
    facebook: <FacebookRoundedIcon />,
    messenger: <Messenger fill={iconFill} width={iconSize} height={iconSize} />,
    instagram: (
      <Instagram
        fill={iconFill}
        width={`${Number(iconSize) + 2}`}
        height={iconSize}
      />
    ),
    email: <EmailRoundedIcon />,
    phone: <CallRoundedIcon />,
  };
  return (
    <Link href={link} passHref target="_blank">
      <section className={classNames("flex items-center gap-2", className)}>
        {socialIconList.hasOwnProperty(socialIcon) &&
          socialIconList[socialIcon]}
        <Typography className="text-ellipsis overflow-hidden sm:block hidden">
          {displayText || link}
        </Typography>
      </section>
    </Link>
  );
};

export default FooterSocialItem;
