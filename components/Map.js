import React from "react";

const Map = ({
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3351.2215497397547!2d124.33060889643811!3d12.533713999650546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0b282bb1c15f5%3A0xe9dc4f8e9ea90a44!2sLavezares%20Municipal%20Hall!5e0!3m2!1sen!2sph!4v1706863491070!5m2!1sen!2sph",
  title,
  ...props
}) => {
  return (
    <iframe
      src={src}
      width="100%"
      height="450"
      frameborder="0"
      allowfullscreen=""
      title={title && `${title} office map`}
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      {...props}
    ></iframe>
  );
};

export default Map;
