"use client";
import React from "react";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const MuiIcons = ({ icon }) => {
  const icons = {
    dateRange: <DateRangeRoundedIcon />,
    clock: <AccessTimeRoundedIcon />,
  };

  if (!icons.hasOwnProperty(icon)) return;

  return icons[icon];
};

export default MuiIcons;
