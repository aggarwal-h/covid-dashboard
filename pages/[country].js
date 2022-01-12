import React from "react";
import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { parseCookies } from "../utils";
import axios from "axios";
import ErrorPage from "next/error";

export default function CountryPage({
  initialSidebarMinimized,
  country,
  errorStatus,
}) {
  if (errorStatus) {
    return <ErrorPage statusCode={errorStatus} />;
  }
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
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
