import React from "react";

const SafetyInfoSection = ({ id = "safety-info" }) => {
  return (
    <section id={id} className="w-full py-28 px-10 bg-gray-50">
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="font-bold lg:text-5xl text-4xl text-center mb-4">
          Help Yourself, Your Friends and Your Family
        </h2>
        <p>
          Reporting a crime is an important part of keeping our communities
          safe. By reporting a crime, you can help law enforcement to identify,
          investigate, and prosecute criminals. You can also help to protect
          yourself, your family, and your neighbors from becoming victims of
          crime. Reporting a crime also allows law enforcement to track and
          analyze crime trends, which can help them to be more effective in
          preventing and solving future crimes. Finally, by reporting a crime,
          you can help to ensure justice is served and that the perpetrators of
          the crime are held accountable.
        </p>
      </section>
    </section>
  );
};

export default SafetyInfoSection;
