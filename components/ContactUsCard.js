import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@/components/client";
import Image from "next/image";
import contactusThumbnail from "@/assets/img/contactUsSection/contact-us-thumbnail.png";
import verticalRightCurve from "@/assets/img/vertical-right-curve.png";

const ContactUsCard = () => {
  return (
    <Card className="flex-row-reverse overflow-hidden">
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
      <section className="-mr-10 z-10 w-10 relative">
        <Image
          src={verticalRightCurve.src}
          placeholder="blur"
          blurDataURL={verticalRightCurve.src}
          fill
          alt="card-image"
        />
      </section>
      <CardBody className="flex-grow p-10">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Find Us On
        </Typography>
      </CardBody>
    </Card>
  );
};

export default ContactUsCard;
