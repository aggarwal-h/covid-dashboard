import React from "react";
import Head from "next/head";
import Content from "../../components/content/Content";
import Sidebar from "../../components/sidebar/Sidebar";
import Main from "../../components/main/Main";
import { parseCookies, capitalize } from "../../utils";
import axios from "axios";
import ErrorPage from "next/error";
import Navbar from "../../components/navbar/Navbar";

export default function CountryPage({
  initialSidebarMinimized,
  country,
  errorStatus,
}) {
  if (errorStatus) {
    return <ErrorPage statusCode={errorStatus} />;
  }
  const title = `COVID-19: ${capitalize(country)} Cases`;
  const description = `Visualize cases, deaths and recoveries from COVID-19 in ${capitalize(
    country
  )}`;
  return (
    <div className="wrapper">
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <Navbar />
      <Sidebar initialSidebarMinimized={initialSidebarMinimized} />
      <Content>
        <Main initialCountry={country} />
      </Content>
    </div>
  );
}

CountryPage.getInitialProps = async ({ req, query, res }) => {
  const countryExists = await axios
    .get(`country-info/exists/${query.country}`)
    .then((res) => res.data);
  if (!countryExists) {
    if (res) {
      res.statusCode = 404;
    }
    return { errorStatus: 404 };
  }
  const cookies = parseCookies(req);
  return {
    initialSidebarMinimized: cookies.sidebarMinimized,
    country: query.country,
  };
};
