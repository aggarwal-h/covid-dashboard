import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { parseCookies } from "../utils";

export default function Home({ initialSidebarMinimized }) {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19 Dashboard</title>
      </Head>
      <Sidebar initialSidebarMinimized={initialSidebarMinimized} />
      <Content>
        <Main />
      </Content>
    </div>
  );
}

Home.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);
  return {
    initialSidebarMinimized: cookies.sidebarMinimized,
  };
};
