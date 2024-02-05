import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  ContactListItem,
} from "@/components/client";
import Image from "next/image";
import contactusThumbnail from "@/assets/img/contactUsSection/contact-us-thumbnail.png";
import verticalRightCurve from "@/assets/img/vertical-right-curve.png";
import sharedContent from "@/config/sharedContent.json";

const ContactUsCard = () => {
  const { socials } = sharedContent;
  return (
    <Card className="lg:flex-row-reverse overflow-hidden lg:max-w-full max-w-md">
      <CardHeader floated={false} className="m-0 rounded-none shadow-none">
        <Image
          src={contactusThumbnail.src}
          placeholder="blur"
          blurDataURL={contactusThumbnail.src}
          width={500}
          height={500}
          alt="card-image"
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </CardHeader>
      <section className="-mr-10 z-10 w-10 relative lg:block hidden">
        <Image
          src={verticalRightCurve.src}
          placeholder="blur"
          blurDataURL={verticalRightCurve.src}
          fill
          alt="card-image"
        />
      </section>
      <CardBody className="flex-grow lg:py-10 sm:px-10">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Find Us On
        </Typography>
        <section className="flex sm:flex-col flex-wrap justify-evenly gap-2">
          {Array.isArray(socials) &&
            socials.map((social) => (
              <ContactListItem
                key={social.icon}
                socialIcon={social.icon}
                link={social.link}
                displayText={social.displayText}
              />
            ))}
        </section>
      </CardBody>
    </Card>
  );
};

export default ContactUsCard;
