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

const ContactUsCard = () => {
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
          <ContactListItem
            socialIcon="facebook"
            link="https://www.facebook.com/lavezarestoday"
            displayText="facebook.com/lavezarestoday"
          />
          <ContactListItem
            socialIcon="messenger"
            link="https://www.m.me/lavezarestoday"
            displayText="m.me/lavezarestoday"
          />
          <ContactListItem
            socialIcon="instagram"
            link="https://www.instagram.com/lavezarestoday"
            displayText="@lavezarestoday"
          />
          <ContactListItem
            socialIcon="email"
            link="mailto:report.lavezares@gmail.com"
            displayText="report.lavezares@gmail.com"
          />
          <ContactListItem
            socialIcon="phone"
            link="tel:09164683398"
            displayText="09164683398"
          />
        </section>
      </CardBody>
    </Card>
  );
};

export default ContactUsCard;
