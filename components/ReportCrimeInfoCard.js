import React from "react";
import { Card, CardHeader, CardBody, Typography } from "@/components/client";
import Image from "next/image";
import imagePlaceholder from "@/assets/img/image-placeholder.png";

const ReportCrimeInfoCard = ({ imgSrc, title, text }) => {
  return (
    <Card className="mt-6 sm:w-96 w-80">
      <CardHeader>
        <Image
          src={imgSrc || imagePlaceholder.src}
          placeholder="blur"
          blurDataURL={imgSrc || imagePlaceholder.src}
          width={400}
          height={400}
          alt="card-image"
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{text}</Typography>
      </CardBody>
    </Card>
  );
};

export default ReportCrimeInfoCard;
