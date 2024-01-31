import React from "react";
import ReportCrimeInfoCard from "./ReportCrimeInfoCard";
import shieldImage from "@/assets/img/reportCrimeSection/shield.png";
import eyeImage from "@/assets/img/reportCrimeSection/eye.png";
import loveOnesImage from "@/assets/img/reportCrimeSection/love-ones.png";

const ReportCrimeInfoSection = () => {
  return (
    <section className="w-full py-28 px-10 bg-blue-gray-700">
      <section className="mx-auto text-center">
        <h2 className="font-bold lg:text-5xl text-4xl text-center mb-4 text-white">
          Empower Safety: Report a Crime
        </h2>
        <p className="text-blue-gray-200 max-w-5xl mx-auto">
          Your voice matters, contribute to community well-being by reporting
          incidents and fostering a safer environment
        </p>
        <section className="flex xl:justify-between lg:justify-around justify-evenly gap-4 pt-20 max-w-7xl mx-auto flex-wrap">
          <section className="hover:-translate-y-6 ease-in-out duration-150">
            <ReportCrimeInfoCard
              imgSrc={shieldImage.src}
              title="Be a Community Guardian"
              text="Encourage community members to become guardians by reporting suspicious activities. Highlight the collective responsibility in keeping the neighborhood safe"
            />
          </section>
          <section className="hover:-translate-y-6 ease-in-out duration-150">
            <ReportCrimeInfoCard
              imgSrc={eyeImage.src}
              title="Silent Witnesses Speak Loudest"
              text="Emphasize the power of reporting as a silent witness to ensure justice. Assure anonymity and explain how even small details can make a significant impact"
            />
          </section>
          <section className="hover:-translate-y-6 ease-in-out duration-150">
            <ReportCrimeInfoCard
              imgSrc={loveOnesImage.src}
              title="Protect Your Loved Ones"
              text="Stress the role of crime reporting in safeguarding family and friends. Illustrate how reporting contributes to a safer environment for everyone"
            />
          </section>
        </section>
      </section>
    </section>
  );
};

export default ReportCrimeInfoSection;
