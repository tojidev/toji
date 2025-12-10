import AboutDetails from "@/components/about/AboutDetails";
import LeftContentAbout from "@/components/about/LeftContentAbout";
import PageContainer from "@/components/common/PageContainer";
import React from "react";

const About = () => {
  return (
    <>
      <PageContainer
        LeftContents={<LeftContentAbout />}
        RightcontentItems={<AboutDetails />}
      />
    </>
  );
};

export default About;
