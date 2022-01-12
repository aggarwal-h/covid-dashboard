import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import { ReactQueryDevtools } from "react-query/devtools";
import { parseCookies } from "../utils";
import BoldTitle from "../components/title/BoldTitle";

export default function Map({ initialSidebarMinimized }) {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19: Map</title>
      </Head>
      <Sidebar initialSidebarMinimized={initialSidebarMinimized} />
      <Content>
        <BoldTitle>This page is in development.</BoldTitle>
      </Content>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

Map.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);
  return {
    initialSidebarMinimized: cookies.sidebarMinimized,
  };
};
