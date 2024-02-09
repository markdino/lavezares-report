import Image from "next/image";
import React from "react";

import brandLogo from "@/assets/img/logo.png";
import sharedContent from "@/config/sharedContent.json";
import Link from "next/link";
import { FooterSocialItem, Typography, MuiIcons } from "@/components/client";

const Footer = () => {
  const { title, description, navItems, socials, openingHours } = sharedContent;
  return (
    <footer className="w-full bg-blue-gray-800">
      <section className="max-w-7xl py-10 px-10 mx-auto text-blue-gray-500 flex lg:flex-row flex-col lg:gap-2 gap-6">
        <section className="lg:max-w-sm lg:border-r lg:pr-5 border-blue-gray-500">
          <Link href="/">
            <section className="flex items-center gap-1">
              <Image
                src={brandLogo.src}
                width={100}
                height={100}
                alt={`${title} logo`}
                className="opacity-50 hover:opacity-100 hover:scale-110 ease-in-out duration-150"
              />
              <h4 className="font-bold text-4xl w-56">{title}</h4>
            </section>
          </Link>
          <p className="font-light text-sm">{description}</p>
        </section>

        <section className="lg:px-10 flex justify-between lg:gap-2 gap-6 w-full md:flex-row flex-col">
          <section>
            <Typography variant="h6">Links</Typography>
            <ul>
              {Array.isArray(navItems) &&
                navItems.map((nav) => (
                  <Typography
                    key={nav.name}
                    as="li"
                    variant="small"
                    className="p-1 font-normal hover:text-blue-gray-200"
                  >
                    <Link href={nav.link} className="flex items-center">
                      {nav.name}
                    </Link>
                  </Typography>
                ))}
            </ul>
          </section>

          <section>
            <Typography variant="h6">Contacts</Typography>
            <ul className="flex sm:flex-col sm:gap-2 gap-4">
              {Array.isArray(socials) &&
                socials.map((social) => (
                  <li key={social.icon}>
                    <FooterSocialItem
                      socialIcon={social.icon}
                      link={social.link}
                      displayText={social.displayText}
                      className="fill-blue-gray-500 hover:fill-blue-gray-300 hover:text-blue-gray-300"
                    />
                  </li>
                ))}
            </ul>
          </section>

          <section>
            <Typography variant="h6">Opening Hours</Typography>
            <ul className="flex flex-col gap-2">
              <section className="flex gap-2">
                <MuiIcons icon="dateRange" />
                <Typography>{openingHours.day}</Typography>
              </section>
              <section className="flex gap-2">
                <MuiIcons icon="clock" />
                <Typography>{openingHours.time}</Typography>
              </section>
            </ul>
          </section>
        </section>
      </section>
      <section className="bg-blue-gray-900 py-2 px-10 text-blue-gray-400 text-center font-light text-sm">{`${title} © ${new Date().getFullYear()}`}</section>
    </footer>
  );
};

export default Footer;
