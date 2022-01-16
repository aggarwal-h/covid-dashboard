import Head from "next/head";
import Content from "../components/content/Content";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../components/main/Main";
import { parseCookies } from "../utils";
import Navbar from "../components/navbar/Navbar";

export default function Home({ initialSidebarMinimized }) {
  return (
    <div className="wrapper">
      <Head>
        <title>COVID-19: Worldwide Cases</title>
        <meta name="title" content="COVID-19: Worldwide Cases" />
        <meta
          name="description"
          content="Visualize cases, deaths and recoveries from COVID-19 around the world!"
        />
        <meta property="og:title" content="COVID-19: Worldwide Cases" />
        <meta
          property="og:description"
          content="Visualize cases, deaths and recoveries from COVID-19 around the world!"
        />
      </Head>
      <Navbar />
      <Sidebar initialSidebarMinimized={initialSidebarMinimized} />
      <Content>
        <Main initialCountry="worldwide" />
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
