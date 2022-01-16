import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import { ReactQueryDevtools } from "react-query/devtools";
import { parseCookies } from "../utils";
import BoldTitle from "../components/title/BoldTitle";
import Navbar from "../components/navbar/Navbar";

export default function Map({ initialSidebarMinimized }) {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19: Map</title>
      </Head>
      <Navbar />
      <Sidebar initialSidebarMinimized={initialSidebarMinimized} />
      <Content>
        <BoldTitle>This page is in development.</BoldTitle>
      </Content>
    </div>
  );
}

Map.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);
  return {
    initialSidebarMinimized: cookies.sidebarMinimized,
  };
};
